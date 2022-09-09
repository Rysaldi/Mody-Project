const TransactionsController = require("../controllers/transaction");
const transactions = require("express").Router();
const { authorizationTransactionRole, readOrCreateTransaction } = require("../middlewares/authorization");


transactions.get("/", readOrCreateTransaction, TransactionsController.getTransaction);
transactions.post("/", readOrCreateTransaction, TransactionsController.createTransaction);
transactions.delete("/:id", authorizationTransactionRole, TransactionsController.deleteTransaction);
transactions.put("/:id", authorizationTransactionRole, TransactionsController.updateTransaction);


module.exports = transactions;
