
const { Wallet } = require("../models/index");
class WalletController {
  static async deleteWallet(req, res, next) {
    try {
      const { walletId } = req.params;
      const deletedWallet = await Wallet.destroy({
        where: {
          id: walletId,
        },
      });
      if (deletedWallet) {
        res
          .status(200)
          .json({ message: `Wallet with id ${walletId} successfully deleted` });
      } else {
        throw { name: "Data not found" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateWallet(req, res) {
    try {
      const { name, totalAmount } = req.body;
      const { walletId } = req.params;
      const updatedWallet = await Wallet.update(
        { name, totalAmount },
        {
          where: {
            id: walletId,
          },
        }
      );
      if (updatedWallet) {
        res
          .status(200)
          .json({ message: `Wallet with id ${walletId} successfully updated` });
      } else {
        throw { name: "Data not found" };
      }
    } catch (error) {
        next(error)
    }
  }
}

module.exports = WalletController;
