const {
  Wallet,
  UserWallet,
  Transaction,
  User,
  Category,
} = require("../models");
const { Op } = require("sequelize");

class Controller {
  static async getAllWallet(req, res, next) {
    try {
      const { id } = req.user;

      const wallets = await Wallet.findAll({
        include: {
          model: UserWallet,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          where: {
            UserId: id,
          },
          include: {
            model: User,
            attributes: ["id", "username", "email"],
          },
        },
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
      const { search } = req.query;
      if (isNaN(+walletId)) {
        throw { name: "Invalid Id" };
      }
      const param = {
        include: [
          {
            model: UserWallet,
            include: {
              model: User,
              attributes: ["username", "email"],
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Transaction,
            include: {
              model: Category,
              attributes: ["name", "type", "date", "createdAt"],
            },
          },
        ],
        order: [[Transaction, "createdAt", "DESC"]],
        attributes: {
          exclude: ["updatedAt"],
        },
      };

      if (search) {
        param.include[1].where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      const wallet = await Wallet.findByPk(walletId, param);

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
      const { name } = req.body;
      const { id } = req.user;

      const newWallet = await Wallet.create({
        name,
      });

      await UserWallet.create({
        UserId: id,
        WalletId: newWallet.id,
        role: "Owner",
      });

      res.status(201).json(newWallet);
    } catch (error) {
      next(error);
    }
  }

  static async deleteWallet(req, res, next) {
    try {
      const { walletId } = req.params;

      await Wallet.destroy({
        where: {
          id: walletId,
        },
      });

      res
        .status(200)
        .json({ message: `Wallet with id ${walletId} successfully deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async updateWallet(req, res, next) {
    try {
      const { walletId } = req.params;
      const { name } = req.body;
      if (isNaN(+walletId)) throw { name: "Invalid Id" };

      if (!name) {
        throw { name: "Invalid input" };
      }

      const updatedWallet = await Wallet.update(
        { name },
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
        throw { name: "NotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
