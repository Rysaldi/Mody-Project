const { Transaction, sequelize } = require("../models");

class TransactionsController {
	static async updateTransaction(req, res, next) {
		const t = await sequelize.transaction();
		try {
			const { id } = req.params;
			const { name, amount, CategoryId } = req.body;
			const findTransactions = await Transaction.findByPk(id);
			if (!findTransactions) {
				throw { name: "TransactionsNotFound" };
			}
			const updateTransaction = await Transaction.update(
				{
					name,
					amount,
					date,
					CategoryId,
					UserId: findTransactions.UserId,
					WalletId: findTransactions.WalletId,
				},
				{
					where: {
						id,
					},
					transaction: t,
				}
			);
			await t.commit();
			res.status(200).json({
				message: "Succes Edit Transaction with Id " + id,
			});
		} catch (error) {
            console.log(error);
			await t.rollback();
			// next(error);
			if (error.name === "TransactionsNotFound") {
				res.status(404).json({
					message: "Transaction cannot be found",
				});
			} else if (error.name === "SequelizeValidationError") {
				res.status(400).json({
					message: error.errors.map((el) => {
						return el.message;
					}),
				});
			} else {
				res.status(500).json({
					message: "Internal Server Error",
				});
			}
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
			// next(error);
			if (error.name === "TransactionsNotFound") {
				res.status(404).json({
					message: "Transaction cannot be found",
				});
			} else {
				res.status(500).json({
					message: "Internal Server Error",
				});
			}
		}
	}
}

module.exports = TransactionsController;
