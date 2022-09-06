"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasOne(models.Profile, { foreignKey: "UserId" });
			User.hasMany(models.Transaction, { foreignKey: "UserId" });
			User.hasMany(models.UserWallet, { foreignKey: "UserId" });
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Username is required",
					},
					notNull: {
						msg: "Username is required",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "Email already in use",
				},
				validate: {
					notEmpty: {
						msg: "Email is required",
					},
					notNull: {
						msg: "Email is required",
					},
					isEmail: {
						msg: "Invalid email format",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Password is required",
					},
					notNull: {
						msg: "Password is required",
					},
					len: {
						args: [4, Infinity],
						msg: "Minimum password length is 4",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
