"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }

  File.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
    }
  );

  return File;
};
