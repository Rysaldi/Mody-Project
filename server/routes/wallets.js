const express = require("express");
const wallets = express.Router();
const WalletController = require("../controllers/wallet");

wallets.get("/", WalletController.getAllWallet);
wallets.get("/:walletId", WalletController.getDetailWallet);
wallets.post("/", WalletController.addNewWallet);
wallets.delete("/:walletId", WalletController.deleteWallet);
wallets.put("/:walletId", WalletController.updateWallet);

module.exports = wallets;
