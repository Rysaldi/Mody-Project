const express = require("express");
const router = express.Router();

const category = require("./category");
const wallet = require("./wallet");

router.use("/categories", category);
router.use("/wallets", wallet);

module.exports = router;
