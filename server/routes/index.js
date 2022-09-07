const express = require("express");
const router = express.Router();

const category = require("./category");
const wallet = require("./wallet");
const transactions = require("./transactions");

router.use("/categories", category);
router.use("/wallets", wallet);
router.use("/transactions", transactions);

module.exports = router;
