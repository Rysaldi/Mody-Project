"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		const transactions = require("../data/transaction.json");
		transactions.forEach((transaction) => {
			delete transaction.id;
			transaction.createdAt = transaction.updatedAt = new Date();
		});
		await queryInterface.bulkInsert("Transactions", transactions);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Transactions");
	},
};
