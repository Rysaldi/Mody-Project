const express = require("express");
const router = express.Router();
const user = require("./user");
const transactions = require("./transactions");

router.use("/users", user);
router.use("/transactions", transactions);

module.exports = router;
