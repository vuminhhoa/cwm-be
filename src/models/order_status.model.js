"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Status extends Model {
    static associate(models) {
      Order_Status.hasMany(models.Order, { foreignKey: "status_id" });
    }
  }
  Order_Status.init(
    {
      name: DataTypes.STRING,
      alias: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order_Status",
      tableName: "order_statuses",
    }
  );
  return Order_Status;
};
