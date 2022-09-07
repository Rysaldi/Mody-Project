const express = require("express");
const router = express.Router();
const wallet = require("./wallet");

router.use("/wallets", wallet);

module.exports = router;
