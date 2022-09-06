"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			Category.hasMany(models.Transaction, { foreignKey: "CategoryId" });
		}
	}
	Category.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Category name is required",
					},
					notNull: {
						msg: "Category name is required",
					},
				},
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Category type is required",
					},
					notNull: {
						msg: "Category type is required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Category",
		}
	);
	return Category;
};
