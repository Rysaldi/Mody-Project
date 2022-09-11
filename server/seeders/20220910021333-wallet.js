"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		const wallets = require("../data/wallet.json");
		wallets.forEach((el) => {
			el.createdAt = el.updatedAt = new Date();
			delete el.id;
		});
		await queryInterface.bulkInsert("Wallets", wallets, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Wallets", null, {});
	},
};
