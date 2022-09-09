const express = require("express");
const wallet = express.Router();
const WalletController = require("../controllers/wallet");

wallet.get("/", WalletController.getAllWallet);
wallet.get("/:walletId", WalletController.getDetailWallet);
wallet.post("/", WalletController.addNewWallet);
wallet.delete("/:walletId", WalletController.deleteWallet);
wallet.put("/:walletId", WalletController.updateWallet);

module.exports = wallet;
