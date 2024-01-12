"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Equipment_Status extends Model {
    static associate(models) {
      Equipment_Status.hasMany(models.Equipment, { foreignKey: "status_id" });
    }
  }
  Equipment_Status.init(
    {
      name: DataTypes.STRING,
      alias: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Equipment_Status",
      tableName: "equipment_statuses",
    }
  );
  return Equipment_Status;
};
