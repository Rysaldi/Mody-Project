"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserWallet extends Model {
		static associate(models) {
			UserWallet.belongsTo(models.Wallet, { foreignKey: "WalletId" });
			UserWallet.belongsTo(models.User, { foreignKey: "UserId" });
		}
	}
	UserWallet.init(
		{
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "User id is required",
					},
					notNull: {
						msg: "User id is required",
					},
				},
			},
			WalletId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Wallet id is required",
					},
					notNull: {
						msg: "Wallet id is required",
					},
				},
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Role is required",
					},
					notNull: {
						msg: "Role is required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "UserWallet",
		}
	);
	return UserWallet;
};
