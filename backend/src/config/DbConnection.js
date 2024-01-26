const Sequelize = require("sequelize");
require("dotenv").config();

var dbName = process.env.DB_NAME;
var username = process.env.DB_USERNAME;
var password = process.env.DB_PASSWORD;
var host = process.env.DB_HOST;
var port = process.env.DB_PORT;

module.exports = devConnection = new Sequelize(dbName, username, password, {
  host: host,
  port: port,
  dialect: "mysql",
  logging: false,
  timezone: "+05:30",
});
