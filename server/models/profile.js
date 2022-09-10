"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Profile.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      phone: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User ID is required",
          },
          notNull: {
            msg: "User ID is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
