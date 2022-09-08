const { User, UserWallet, Wallet, Transaction } = require("../models");
async function authorizationTransactionRole(req, res, next) {
    try {
        const { id } = req.params;
        const findTransaction = await Transaction.findByPk(id);

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
                WalletId: findTransaction.WalletId
            }
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


module.exports = {
    authorizationTransactionRole
};