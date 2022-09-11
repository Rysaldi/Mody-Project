const { UserWallet, Wallet, Transaction } = require("../models");
async function authorizationTransactionRole(req, res, next) {
	try {
		const { transactionId } = req.params;
		const findTransaction = await Transaction.findByPk(transactionId);

		if (!findTransaction) {
			throw { name: "TransactionsNotFound" };
		}

		const findUserWallet = await UserWallet.findOne({
			where: {
				UserId: req.user.id,
				WalletId: findTransaction.WalletId,
			},
		});
		if (!findUserWallet) {
			throw { name: "Forbidden" };
		} else if (findUserWallet.role === "Owner" || findUserWallet.role === "Manager") {
			next();
		} else {
			throw { name: "Forbidden" };
		}
	} catch (error) {
		next(error);
	}
}

async function readOrCreateTransaction(req, res, next) {
	try {
		const { WalletId } = req.body;
		const findWallet = await Wallet.findByPk(WalletId);
		if (!findWallet) {
			throw { name: "WalletNotFound" };
		}
		const findUserWallet = await UserWallet.findOne({
			where: {
				UserId: req.user.id,
				WalletId: WalletId,
			},
		});
		if (!findUserWallet) {
			throw { name: "THROW BANGSATTTTTTTTTT" };
		}
		next();
	} catch (error) {
		next(error);
	}
}

async function deleteAuthorization(req, res, next) {
	try {
		const { walletId } = req.params;
		if (isNaN(+walletId)) throw { name: "Invalid Id" };

		const findWallet = await Wallet.findByPk(walletId);

		if (!findWallet) {
			throw { name: "WalletNotFound" };
		}

		const findUserWallet = await UserWallet.findOne({
			where: {
				UserId: req.user.id,
				WalletId: walletId,
			},
		});

		if (!findUserWallet) {
			throw { name: "Forbidden" };
		} else if (findUserWallet.role !== "Owner") {
			throw { name: "Forbidden" };
		}
		next()
	} catch (error) {
		next(error);
	}
}

module.exports = {
	authorizationTransactionRole,
	readOrCreateTransaction,
	deleteAuthorization,
};
