const express = require("express");
const wallets = express.Router();
const WalletController = require("../controllers/wallet");
const { deleteAuthorization } = require("../middlewares/authorization");

wallets.get("/", WalletController.getAllWallet);
wallets.get("/:walletId", WalletController.getDetailWallet);
wallets.post("/", WalletController.addNewWallet);
wallets.delete("/:walletId", deleteAuthorization, WalletController.deleteWallet);
wallets.put("/:walletId",deleteAuthorization, WalletController.updateWallet);

module.exports = wallets;
