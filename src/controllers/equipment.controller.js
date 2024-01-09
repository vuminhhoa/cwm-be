const err = require("../errors/index");
const db = require("../models");
const { successHandler, errorHandler } = require("../utils/ResponseHandle");
const { Op } = require("sequelize");
const { getList } = require("../utils/query.util");
const cloudinary = require("../utils/cloudinary.util");
const qr = require("qrcode");
const { checkRoleFromToken } = require("../utils/auth.util");
const { getRoleEmailConfig } = require("../utils/query.util");
const { sequelize } = require("../models");
const { sendUnuseEquipmentEmail } = require("../utils/sendEmail.util");

//Equipment Controller
exports.listEquipmentStatuses = async (req, res) => {
  try {
    const statuses = await db.Equipment_Status.findAll({});
    return successHandler(res, { statuses }, 200);
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.create = async (req, res) => {
  try {
    const data = req?.body;
    await db.sequelize.transaction(async (t) => {
      const equipmentInDB = await db.Equipment.findOne({
        where: {
          // fixed_asset_number: data?.fixed_asset_number,
          code: data?.code,
        },
        attributes: ["id", "name"],
      });
      if (equipmentInDB)
        return errorHandler(res, err.EQUIPMENT_FIELD_DUPLICATED);
      let equipment;

      if (data?.image) {
        const result = await cloudinary.uploader.upload(data?.image, {
          folder: "equipment",
        });
        equipment = await db.Equipment.create(
          {
            ...data,
            image: result?.secure_url,
            amount: calculateAmount,
            status_id: 1,
          },
          { transaction: t }
        );
      } else {
        equipment = await db.Equipment.create(
          { ...data, status_id: 1 },
          { transaction: t }
        );
      }

      return successHandler(res, {}, 201);
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.detail = async (req, res) => {
  try {
    const { id } = req?.query;
    const equipment = await db.Equipment.findOne({
      where: { id },
      include: [{ model: db.Equipment_Status, attributes: ["id", "name"] }],
      raw: false,
    });
    return successHandler(res, { equipment }, 200);
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.detailPro = async (req, res) => {
  try {
    const { id } = req?.query;
    const equipment = await db.Equipment.findOne({
      where: { id },
      include: [
        { model: db.Equipment_Type, attributes: ["id", "name"] },
        { model: db.Equipment_Unit, attributes: ["id", "name"] },
        { model: db.Equipment_Status, attributes: ["id", "name"] },
        { model: db.Equipment_Risk_Level, attributes: ["id", "name"] },
        { model: db.Department, attributes: ["id", "name"] },
        { model: db.Project, attributes: ["id", "name"] },
        { model: db.Provider, attributes: ["id", "name"] },
        { model: db.Supply_Accompany, attributes: ["id", "name"] },
        {
          model: db.Equipment_Supply,
          attributes: ["equipment_id", "count"],
          include: [
            {
              model: db.Supply,
              attributes: [
                "id",
                "name",
                "code",
                "year_in_use",
                "year_of_manufacture",
              ],
            },
          ],
        },
      ],
      raw: false,
    });
    const inventoyId = await db.Inventory.findOne({
      where: { equipment_id: equipment.id },
      attributes: [sequelize.fn("MAX", sequelize.col("times"))],
    });

    const inventory = await db.Inventory.findOne({
      where: {
        equipment_id: equipment.id,
        times: Object.values(inventoyId),
      },
    });
    return successHandler(res, { equipment, inventory }, 200);
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.update = async (req, res) => {
  try {
    const data = req?.body;
    await db.sequelize.transaction(async (t) => {
      const isHas = await db.Equipment.findOne({
        where: { id: data?.id },
      });
      if (!isHas) return errorHandler(res, err.EQUIPMENT_NOT_FOUND);

      if (data?.image) {
        const result = await cloudinary.uploader.upload(data?.image, {
          folder: "equipment",
        });
        await db.Equipment.update(
          { ...data, image: result?.secure_url },
          { where: { id: data?.id }, transaction: t }
        );
      } else {
        await db.Equipment.update(
          { ...data },
          {
            where: { id: data?.id },
            transaction: t,
          }
        );
      }
      return successHandler(res, {}, 201);
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    await db.sequelize.transaction(async (t) => {
      let isHas = await db.Equipment.findOne({
        where: { id: req?.body?.id },
      });
      if (!isHas) return errorHandler(res, err.EQUIPMENT_NOT_FOUND);
      await db.Equipment.destroy({
        where: { id: req?.body?.id },
        transaction: t,
      });
      return successHandler(res, {}, 201);
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.search = async (req, res) => {
  try {
    let { limit, page, name, status_id } = req?.query;

    let filter = {
      status_id,
    };

    if (name) {
      filter = {
        ...filter,
        [Op.or]: [
          { name: { [Op.like]: `%${name}%` } },
          { code: { [Op.like]: `%${name}%` } },
        ],
      };
    }
    let include = [{ model: db.Equipment_Status, attributes: ["id", "name"] }];
    let equipments = await getList(+limit, page, filter, "Equipment", include);
    return successHandler(res, { equipments, count: equipments.length }, 200);
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.createByExcel = async (req, res) => {
  try {
    const data = req.body;
    let duplicateArray = [];
    await db.sequelize.transaction(async (t) => {
      await Promise.all(
        data.map(async (equipment) => {
          const isDuplicate = await db.Equipment.findOne({
            where: {
              [Op.or]: [
                // { hash_code: equipment?.hash_code },
                { fixed_asset_number: equipment?.fixed_asset_number },
              ],
            },
            attributes: ["id", "fixed_asset_number", "serial"],
          });
          if (isDuplicate) {
            duplicateArray.push(equipment);
          } else {
            await db.Equipment.create(equipment, { transaction: t });
          }
        })
      );
    });
    return successHandler(res, { duplicateArray }, 200);
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.statisticDashBoard = async (req, res) => {
  try {
    const { isHasRole, department_id_from_token } = await checkRoleFromToken(
      req
    );
    let count_department,
      count_broken,
      count_repair,
      count_level,
      count_status,
      most_repair_cost;
    let filter = {};

    if (isHasRole) {
      count_department = await db.Equipment.findAll({
        attributes: [
          "department_id",
          [sequelize.fn("COUNT", sequelize.col("Equipment.id")), "count"],
        ],
        group: ["department_id"],
        include: [{ model: db.Department, attributes: ["id", "name"] }],
        raw: true,
      });

      count_broken = await db.Equipment.findAll({
        where: { status_id: 4 },
        attributes: [
          "department_id",
          [sequelize.fn("COUNT", sequelize.col("Equipment.id")), "count"],
        ],
        group: ["department_id"],
        include: [{ model: db.Department, attributes: ["id", "name"] }],
        raw: true,
      });

      count_repair = await db.Equipment.findAll({
        where: { status_id: 5 },
        attributes: [
          "department_id",
          [sequelize.fn("COUNT", sequelize.col("Equipment.id")), "count"],
        ],
        group: ["department_id"],
        include: [{ model: db.Department, attributes: ["id", "name"] }],
        raw: true,
      });
    } else {
      count_department = [];
      count_broken = [];
      count_repair = [];
      filter = {
        department_id: department_id_from_token,
      };
    }

    count_level = await db.Equipment.findAll({
      where: {
        ...filter,
        risk_level: {
          [Op.lt]: 5,
          [Op.gt]: 0,
        },
      },
      attributes: [
        "risk_level",
        [sequelize.fn("COUNT", sequelize.col("Equipment.id")), "count"],
      ],
      group: ["risk_level"],
      include: [{ model: db.Equipment_Risk_Level, attributes: ["id", "name"] }],
      raw: true,
    });

    const statuses = await db.Equipment_Status.findAll({
      attributes: ["id", "name"],
    });
    count_status = await db.Equipment.findAll({
      where: {
        ...filter,
        status_id: {
          [Op.ne]: null,
        },
      },
      attributes: [
        "status_id",
        [sequelize.fn("COUNT", sequelize.col("Equipment.id")), "count"],
      ],
      group: ["status_id"],
      include: [{ model: db.Equipment_Status, attributes: ["id", "name"] }],
      raw: true,
    });

    count_status = statuses.map((status) => {
      let item = count_status.find((item) => item.status_id === status.id);
      if (item?.hasOwnProperty("status_id")) {
        status = {
          status_id: item.status_id,
          count: item.count,
          Equipment_Status: {
            id: item["Equipment_Status.id"],
            name: item["Equipment_Status.name"],
          },
        };
      } else {
        status = {
          status_id: status.id,
          count: 0,
          Equipment_Status: status,
        };
      }
      return status;
    });

    most_repair_cost = await db.Repair.findAll({
      where: {
        actual_repair_cost: {
          [Op.ne]: null,
          [Op.gte]: 10000000,
        },
      },
      attributes: [
        "equipment_id",
        [
          sequelize.fn("SUM", sequelize.col("Repair.actual_repair_cost")),
          "total",
        ],
      ],
      group: ["equipment_id"],
      include: [
        {
          model: db.Equipment,
          where: { ...filter },
          attributes: ["id", "name", "code", "model", "serial"],
          include: [
            {
              model: db.Department,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      raw: false,
    });

    return successHandler(
      res,
      {
        count_department,
        count_level,
        count_status,
        count_broken,
        count_repair,
        most_repair_cost,
      },
      200
    );
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.unUseEquipment = async (req, res) => {
  try {
    const data = req.body;
    const roles = await getRoleEmailConfig(3);

    const users = await Promise.all(
      roles.map(async (role) => {
        const user = await db.User.findAll({
          where: {
            department_id: data?.department_id,
            role_id: role.role_id,
          },
          attributes: ["id", "name", "email"],
        });
        return user;
      })
    );
    await db.sequelize.transaction(async (t) => {
      await Promise.all([
        await db.Equipment.update(
          { status_id: 6 },
          {
            where: { id: data?.equipment_id },
            transaction: t,
          }
        ),
        await sendUnuseEquipmentEmail(req, data, users.flat()),
        await db.Notification.create(
          {
            user_id: data.create_user_id,
            content: `Thiết bị ${data?.name} thuộc ${data?.department} đã được chuyển trạng thái ngừng sử dụng để cân nhắc thanh lý.`,
            is_seen: 0,
          },
          { transaction: t }
        ),
      ]);
      return successHandler(res, {}, 201);
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.updateEquipment = async (req, res) => {
  try {
    await db.sequelize.transaction(async (t) => {
      await db.Equipment.update(
        { regular_inspection: 12 },
        { where: { status_id: 3 }, transaction: t }
      );
      return successHandler(res, {}, 201);
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

exports.updateQrCode = async (req, res) => {
  try {
    const limit = 40;
    const page = 11;
    const equipments = await db.Equipment.findAndCountAll({
      limit: limit,
      offset: page > 1 ? limit * (page - 1) : 0,
      attributes: ["id"],
    });
    await db.sequelize.transaction(async (t) => {
      await Promise.all(
        equipments?.rows?.map(async (item) => {
          const equipment = await db.Equipment.findOne({
            where: { id: item.id },
            attributes: ["id", "qrcode"],
            raw: false,
          });
          if (!equipment.qrcode) {
            const dataEq = { id: equipment.id };
            const strJson = JSON.stringify(dataEq);
            qr.toDataURL(strJson, async (err, code) => {
              if (err) return errorHandler(res, err.EQUIPMENT_NOT_FOUND);
              const result = await cloudinary.uploader.upload(code, {
                folder: "equipment_qrcode",
              });
              equipment.qrcode = result?.secure_url;
              await equipment.save();
            });
          }
        })
      );
      return successHandler(res, {}, 201);
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};
