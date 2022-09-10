"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		const categories = require("../data/categories.json");
		categories.forEach((category) => {
			delete category.id;
			category.createdAt = category.updatedAt = new Date();
		});

		await queryInterface.bulkInsert("Categories", categories);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Categories");
	},
};
