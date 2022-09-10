const { Op } = require("sequelize");
const { Transaction, sequelize, Category, User, Wallet } = require("../models");

class TransactionsController {
	static async updateTransaction(req, res, next) {
		const t = await sequelize.transaction();
		try {
			const { transactionId } = req.params;

			let { name, amount, CategoryId, date } = req.body;

			const findTransactions = await Transaction.findByPk(transactionId, { transaction: t });

			if (!findTransactions) {
				throw { name: "TransactionsNotFound" };
			}
			const findCategory = await Category.findByPk(findTransactions.CategoryId, { transaction: t });

			const findWallet = await Wallet.findByPk(findTransactions.WalletId, { transaction: t });

			if (findCategory.type === "Income") {
				await Wallet.update(
					{
						totalAmount: findWallet.totalAmount - findTransactions.amount,
					},
					{
						where: {
							id: findWallet.id,
						},
						transaction: t,
					}
				);
			} else if (findCategory.type === "Expense") {
				await Wallet.update(
					{
						totalAmount: findWallet.totalAmount + findTransactions.amount,
					},
					{
						where: {
							id: findWallet.id,
						},
						transaction: t,
					}
				);
			}

			const updateTransaction = await Transaction.update(
				{
					name,
					amount: +amount,
					date,
					CategoryId,
					UserId: req.user.id,
				},
				{
					where: {
						id: transactionId,
					},
					returning: true,
					transaction: t,
				}
			);

			const updatedWallet = await Wallet.findByPk(findTransactions.WalletId, { transaction: t });

			const updatedCategory = await Category.findByPk(CategoryId, { transaction: t });

			if (updatedCategory.type === "Income") {
				await Wallet.update(
					{
						totalAmount: updatedWallet.totalAmount + Number(amount),
					},
					{
						where: {
							id: findWallet.id,
						},
						transaction: t,
					}
				);
			} else if (updatedCategory.type === "Expense") {
				await Wallet.update(
					{
						totalAmount: updatedWallet.totalAmount - Number(amount),
					},
					{
						where: {
							id: findWallet.id,
						},
						transaction: t,
					}
				);
			}

			await t.commit();

			res.status(200).json({
				message: "Succes Edit Transaction with Id " + id,
			});
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}

	static async deleteTransaction(req, res, next) {
		try {
			const { transactionId } = req.params;
			const findTransactions = await Transaction.findByPk(transactionId);
			if (!findTransactions) {
				throw { name: "TransactionsNotFound" };
			}
			const deleteTransaction = await Transaction.destroy({
				where: {
					id: transactionId,
				},
			});
			res.status(200).json({
				message: "Success delete Transaction with Id " + id,
			});
		} catch (error) {
			next(error);
		}
	}

	static async createTransaction(req, res, next) {
		const t = await sequelize.transaction();
		try {
			const { name, amount, date, CategoryId, WalletId } = req.body;

			const createTransaction = await Transaction.create(
				{
					name,
					amount,
					date,
					UserId: req.user.id,
					CategoryId,
					WalletId,
				},
				{
					returning: true,
					transaction: t,
				}
			);

			const findCategory = await Category.findByPk(CategoryId, { transaction: t });

			const findWallet = await Wallet.findByPk(WalletId, { transaction: t });

			if (findCategory.type === "Income") {
				await Wallet.update(
					{
						totalAmount: findWallet.totalAmount + Number(amount),
					},
					{
						where: {
							id: findWallet.id,
						},
						transaction: t,
					}
				);
			} else if (findCategory.type === "Expense") {
				await Wallet.update(
					{
						totalAmount: findWallet.totalAmount - Number(amount),
					},
					{
						where: {
							id: findWallet.id,
						},
						transaction: t,
					}
				);
			}

			await t.commit();
			res.status(201).json({
				message: "Success create new Transaction",
				Transaction: createTransaction,
			});
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}

	static async getTransaction(req, res, next) {
		try {
			const { WalletId } = req.body;
			const { search } = req.query;
			const param = {
				include: [
					{
						model: Category,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
				order: [["id", "DESC"]],
				where: {
					WalletId: WalletId,
				},
			};
			if (search) {
				param.where = {
					...param.where,
					name: {
						[Op.iLike]: `%${search}%`,
					},
				};
			}
			const findTransactions = await Transaction.findAll(param);
			if (findTransactions.length === 0) {
				throw { name: "TransactionsNotFound" };
			}
			res.status(200).json(findTransactions);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = TransactionsController;
