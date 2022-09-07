const transactions = require("express").Router();
const TransactionsController = require("../controller/transactions");

transactions.get("/", TransactionsController.getTransaction)

transactions.post("/", TransactionsController.createTransaction)



module.exports = transactions