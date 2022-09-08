const TransactionsController = require("../controllers/transaction");
const transactions = require("express").Router();
const { authorizationTransactionRole } = require("../middlewares/authorization");


transactions.delete("/:id", authorizationTransactionRole, TransactionsController.deleteTransaction);
transactions.put("/:id", authorizationTransactionRole, TransactionsController.updateTransaction);




module.exports = transactions;