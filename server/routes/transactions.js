const TransactionsController = require("../controller/transactions");
const transactions = require("express").Router();

transactions.delete("/:id", TransactionsController.deleteTransaction);
transactions.put("/:id", TransactionsController.updateTransaction);


module.exports = transactions;