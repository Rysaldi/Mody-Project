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

			if (!email || !WalletId || !role) {
				throw { name: "Invalid input" };
			}
			const findWallet = await Wallet.findByPk(WalletId);
			if (!findWallet) {
				throw { name: "WalletNotFound" };
			}
			
			const userWantAdd = await UserWallet.findOne({
				where: {
					UserId: req.user.id,
					WalletId: WalletId
				}
			});

			if (!userWantAdd || userWantAdd.role === "Member") {
				throw { name: "Forbidden" };
			}

			const findUser = await User.findOne({
				where: {
					email: email,
				},
			});

			if (!findUser) {
				throw { name: "EmailNotFound" };
			}
			const findUserWallet = await UserWallet.findOne({
				where: {
					WalletId: WalletId,
					UserId: findUser.id
				}
			});

			if (findUserWallet) {
				throw { name: "Alreadyinthiswallet" };
			}

			const newUserWallet = await UserWallet.create({
				UserId: +findUser.id,
				WalletId,
				role,
			});
			res.status(201).json(newUserWallet);
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

			const findUserWalletById = await UserWallet.findByPk(userWalletId);

			if (!findUserWalletById) {
				throw { name: "NotFound" };
			}
			console.log(findUserWalletById);

			const useWantDelete = await UserWallet.findOne({
				where: {
					UserId: req.user.id,
					WalletId: findUserWalletById.WalletId
				}
			});
			
			if (!useWantDelete) {
				throw { name: "Forbidden" };
			}


			if (findUserWalletById.UserId === req.user.id && useWantDelete.role !== "Owner") {
				await UserWallet.destroy({
					where: {
						id: userWalletId,
					},
				});
				res.status(200).json({ message: `successfully delete userwallet with id ${userWalletId}` });
			} else if (useWantDelete.role === "Member") {
				throw { name: "Forbidden" };
			} else {
				if (findUserWalletById.role === "Owner") {
					throw { name: "Cantdeleteowner" };
				}

				await UserWallet.destroy({
					where: {
						id: userWalletId,
					},
				});
				res.status(200).json({ message: `successfully delete userwallet with id ${userWalletId}` });
			}
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
