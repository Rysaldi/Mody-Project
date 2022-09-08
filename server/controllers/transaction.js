const { Transaction, sequelize, Category, Wallet } = require("../models");

class TransactionsController {
	static async updateTransaction(req, res, next) {
		const t = await sequelize.transaction();
		try {
			const { id } = req.params;

			let { name, amount, CategoryId, date } = req.body;

			const findTransactions = await Transaction.findByPk(id, { transaction: t, });

			if (!findTransactions) {
				throw { name: "TransactionsNotFound" };
			}
			const findCategory = await Category.findByPk(findTransactions.CategoryId, { transaction: t, });

			const findWallet = await Wallet.findByPk(findTransactions.WalletId, { transaction: t, });
			
			if (findCategory.type === "Income") {
				await Wallet.update({
					totalAmount: findWallet.totalAmount - findTransactions.amount
				}, {
					where: {
						id: findWallet.id
					},
					transaction: t
				});
			} else if (findCategory.type === "Expense") {
				await Wallet.update({
					totalAmount: findWallet.totalAmount + findTransactions.amount
				}, {
					where: {
						id: findWallet.id
					},
					transaction: t
				});
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
						id,
					},
					returning: true,
					transaction: t,
				}
			);

			const updatedWallet = await Wallet.findByPk(findTransactions.WalletId, { transaction: t });

			const updatedCategory = await Category.findByPk(CategoryId, { transaction: t });

			if (updatedCategory.type === "Income") {
				await Wallet.update({
					totalAmount: updatedWallet.totalAmount + Number(amount)
				}, {
					where: {
						id: findWallet.id
					},
					transaction: t
				});
			} else if (updatedCategory.type === "Expense") {
				await Wallet.update({
					totalAmount: updatedWallet.totalAmount - Number(amount)
				}, {
					where: {
						id: findWallet.id
					},
					transaction: t
				});
			}

			await t.commit();

			res.status(200).json({
				message: "Succes Edit Transaction with Id " + id,
			});
		} catch (error) {
			next(error);
			await t.rollback();
		}
	}

	static async deleteTransaction(req, res, next) {
		try {
			const { id } = req.params;
			const findTransactions = await Transaction.findByPk(id);
			if (!findTransactions) {
				throw { name: "TransactionsNotFound" };
			}
			const deleteTransaction = await Transaction.destroy({
				where: {
					id,
				},
			});
			res.status(200).json({
				message: "Success delete Transaction with Id " + id,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = TransactionsController;
