const express = require("express");
const userWallets = express.Router();
const UserWalletController = require("../controllers/userWallet");

userWallets.get("/", UserWalletController.getAllUserWallet);
userWallets.post("/", UserWalletController.addNewUserWallet);
userWallets.delete("/:userWalletId", UserWalletController.deleteUserWallet);
userWallets.put("/:userWalletId", UserWalletController.updateUserWallet);

module.exports = userWallets;
