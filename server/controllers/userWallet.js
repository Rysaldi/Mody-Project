const { Wallet, UserWallet, Transaction, User, Category } = require("../models");

class Controller {
	static async getAllUserWallet(req, res, next) {
		try {
			const { id: UserId } = req.user;
			const userWallets = await UserWallet.findAll({
				where: {
					UserId,
				},
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});

			res.status(200).json(userWallets);
		} catch (error) {
			next(error);
		}
	}

	static async addNewUserWallet(req, res, next) {
		try {
			const { WalletId, role, email } = req.body;
			if (!email) {
				throw { name: "EmailRequired" };
			}
			const findUser = await User.findOne({
				where: {
					email: email
				}
			});
			if (findUser) {
				const newUserWallet = await UserWallet.create({
					UserId: +findUser.id,
					WalletId,
					role,
				});
				res.status(201).json(newUserWallet);
			} else {
				throw ({ name: "NotFound" });
			}

		} catch (error) {
			next(error);
		}
	}

	static async deleteUserWallet(req, res, next) {
		try {
			const { userWalletId } = req.params;
			if (isNaN(+userWalletId)) {
				throw { name: "Invalid Id" };
			}

			const deleteUserWallet = await UserWallet.findByPk(userWalletId);
			if (!deleteUserWallet) {
				throw { name: "NotFound" };
			}

			await UserWallet.destroy({
				where: {
					id: userWalletId,
				},
			});

			res.status(200).json({ message: `successfully delete userwallet with id ${userWalletId}` });
		} catch (error) {
			next(error);
		}
	}

	static async updateUserWallet(req, res, next) {
		try {
			const { userWalletId } = req.params;
			const { role, UserId } = req.body;
			if (isNaN(+userWalletId)) {
				throw { name: "Invalid Id" };
			}

			if (isNaN(+UserId)) {
				throw { name: "Invalid Id" };
			}

			if (!role) {
				throw { name: "Invalid input" };
			}

			const updatedUserWallet = await UserWallet.findByPk(userWalletId);
			if (!updatedUserWallet) {
				throw { name: "NotFound" };
			}

			await UserWallet.update(
				{
					role,
				},
				{
					where: {
						id: userWalletId,
						UserId,
					},
				}
			);

			res.status(200).json({ message: `successfully update userwallet with id ${userWalletId}` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = Controller;
