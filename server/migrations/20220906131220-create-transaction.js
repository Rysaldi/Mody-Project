"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Transactions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			UserId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			},
			CategoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Categories",
					key: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			},
			WalletId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Wallets",
					key: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Transactions");
	},
};
