"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Transaction.belongsTo(models.Category, { foreignKey: "CategoryId" });
			Transaction.belongsTo(models.User, { foreignKey: "UserId" });
			Transaction.belongsTo(models.Wallet, { foreignKey: "WalletId" });
		}
	}
	Transaction.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Transaction name is required",
					},
					notNull: {
						msg: "Transaction name is required",
					},
				},
			},
			amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Transaction amount is required",
					},
					notNull: {
						msg: "Transaction amount is required",
					},
					min: {
						args: [1],
						msg: "Minimum transaction amount is 1",
					},
				},
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Transaction date is required",
					},
					notNull: {
						msg: "Transaction date is required",
					},
				},
			},
			photo: {
				type: DataTypes.STRING,
			},
			description: {
				type: DataTypes.STRING,
			},
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
			CategoryId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Category id is required",
					},
					notNull: {
						msg: "Category id is required",
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
		},
		{
			sequelize,
			modelName: "Transaction",
		}
	);
	return Transaction;
};
