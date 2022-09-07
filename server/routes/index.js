const express = require("express");
const router = express.Router();


const WalletController = require ('../controller/walletController')

//rio
router.delete('/wallets/:walletId', WalletController.deleteWallet)
router.put('/wallets/:walletId', WalletController.updateWallet)

=======
const wallet = require("./wallet");

// router.use("/users", user);
router.use("/wallets", wallet);


module.exports = router;
