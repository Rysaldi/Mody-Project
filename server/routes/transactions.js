const TransactionsController = require("../controllers/transaction");
const transactions = require("express").Router();
const { authorizationTransactionRole, readOrCreateTransaction } = require("../middlewares/authorization");


transactions.get("/", readOrCreateTransaction, TransactionsController.getTransaction);
transactions.post("/", readOrCreateTransaction, TransactionsController.createTransaction);
transactions.get("/:transactionId", readOrCreateTransaction, TransactionsController.getDetailTransaction);
transactions.delete("/:transactionId", authorizationTransactionRole, TransactionsController.deleteTransaction);
transactions.put("/:transactionId", authorizationTransactionRole, TransactionsController.updateTransaction);


module.exports = transactions;
