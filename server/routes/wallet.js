const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet");

router.get("/", walletController.getAllWallet);
router.get("/:walletId", walletController.getDetailWallet);
router.post("/", walletController.addNewWallet);
router.delete("/wallets/:walletId", walletController.deleteWallet);
router.put("/wallets/:walletId", walletController.updateWallet);

module.exports = router;
