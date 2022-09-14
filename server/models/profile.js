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
  Profile.beforeCreate((profile, options) => {
    profile.profilePicture =
      "https://ik.imagekit.io/mody/96de62b2-0a6b-4ea5-871b-25e2b0a61052_kjQZ5lpnD.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1663161960227";
  });
  return Profile;
};
