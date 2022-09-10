"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		const userWallets = require("../data/userWallet.json");
		userWallets.forEach((userWallet) => {
			delete userWallet.id;
			userWallet.createdAt = userWallet.updatedAt = new Date();
		});
		await queryInterface.bulkInsert("UserWallets", userWallets);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("UserWallets");
	},
};
