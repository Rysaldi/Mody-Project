const { User, UserWallet, Wallet, Transaction } = require("../models");
async function authorizationTransactionRole(req, res, next) {
	try {
		const { transactionId } = req.params;
		const findTransaction = await Transaction.findByPk(transactionId);

		if (!findTransaction) {
			throw { name: "TransactionsNotFound" };
		}

		const findWallet = await Wallet.findByPk(findTransaction.WalletId);

		if (!findWallet) {
			throw { name: "NotFound" };
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
			throw { name: "Forbidden" };
		}
		next();
	} catch (error) {
		next(error);
	}
}

module.exports = {
	authorizationTransactionRole,
	readOrCreateTransaction,
};
