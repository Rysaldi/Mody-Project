const { Transaction, Category, User, Wallet, sequelize } = require("../models");
class TransactionsController {
    static async createTransaction(req, res, next) {
        try {
            const { name, amount, date, UserId, CategoryId, WalletId } = req.body
            const transaction = await Transaction.create({ name, amount, date, UserId, CategoryId, WalletId })
            res.status(201).json({
                message: "Success Create Data",
                transaction
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getTransaction(req, res, next){ 
        try {
            const transaction = await Transaction.findAll({include: [ Category, Wallet]})
            res.status(200).json({transaction})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TransactionsController