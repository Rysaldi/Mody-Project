const express = require("express");
const router = express.Router();
// const user = require("./user");
const WalletController = require ('../controller/walletController')

// router.use("/users", user);

//rio
router.delete('/wallets/:walletId', WalletController.deleteWallet)
router.put('/wallets/:walletId', WalletController.updateWallet)


module.exports = router;
