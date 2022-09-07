const express = require("express");
const router = express.Router();
const transactions = require("./transactions");

router.use("/transactions", transactions);

module.exports = router;
