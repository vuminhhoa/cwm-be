const { Sequelize } = require("sequelize");
require("dotenv").config();

// Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
    logging: true,
  }
);

// test connect to DB
let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection: OK, port: " + process.env.DB_HOST);
    console.log("============================================================");
  } catch (error) {
    console.error("Database connection: Failed", error);
  }
};

module.exports = connectDB;
