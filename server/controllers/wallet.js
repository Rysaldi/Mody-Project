const { Wallet, UserWallet, Transaction, User, Category } = require("../models");

class Controller {
	static async getAllWallet(req, res, next) {
		try {
			const wallets = await Wallet.findAll({
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["name"]],
			});

			res.status(200).json(wallets);
		} catch (error) {
			next(error);
		}
	}

	static async getDetailWallet(req, res, next) {
		try {
			const { walletId } = req.params;

			if (isNaN(+walletId)) {
				throw { name: "Invalid Id" };
			}

			const wallet = await Wallet.findByPk(walletId, {
				include: [
					{
						model: UserWallet,
						include: {
							model: User,
							attributes: ["username", "email"],
						},
					},
					{
						model: Transaction,
						attributes: ["name", "amount", "date"],
						include: {
							model: Category,
							attributes: ["name", "type"],
						},
					},
				],
			});

			if (!wallet) {
				throw { name: "NotFound" };
			}

			res.status(200).json(wallet);
		} catch (error) {
			next(error);
		}
	}

	static async addNewWallet(req, res, next) {
		try {
			const UserId = 1;
			const { name } = req.body;

			const newWallet = await Wallet.create({
				name,
			});

			const asd = await UserWallet.create({
				UserId,
				WalletId: newWallet.id,
				role: "editor",
			});

			res.status(201).json(newWallet);
		} catch (error) {
			next(error);
		}
	}

	static async deleteWallet(req, res, next) {
		try {
			const { walletId } = req.params;
			if (Number(walletId) !== "number") throw { name: "not a number" };

			const deletedWallet = await Wallet.destroy({
				where: {
					id: walletId,
				},
			});
			if (deletedWallet) {
				res.status(200).json({ message: `Wallet with id ${walletId} successfully deleted` });
			} else {
				throw { name: "Data not found" };
			}
		} catch (error) {
			if (error.name === "not a number")
				res.status(404).json({ message: "Wallet ID is not a number" });
			next(error);
		}
	}

	static async updateWallet(req, res) {
		try {
			const { name, totalAmount } = req.body;
			const { walletId } = req.params;
			if (Number(walletId) !== "number") throw { name: "WalletId is not a number" };

			const updatedWallet = await Wallet.update(
				{ name, totalAmount: Number(totalAmount) },
				{
					where: {
						id: walletId,
					},
				}
			);
			if (updatedWallet) {
				res.status(200).json({ message: `Wallet with id ${walletId} successfully updated` });
			} else {
				throw { name: "Data not found" };
			}
		} catch (error) {
			if (error.name === "not a number")
				res.status(404).json({ message: "Wallet ID is not a number" });
			next(error);
		}
	}
}

module.exports = Controller;
