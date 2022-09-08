const express = require("express");
const router = express.Router();

const users = require("./users");
const category = require("./category");
const wallet = require("./wallet");
const transactions = require("./transactions");
const { authentication } = require("../middlewares/authentication");

router.use("/users", users);
router.use(authentication);
router.use("/categories", category);
router.use("/wallets", wallet);
router.use("/transactions", transactions);

module.exports = router
