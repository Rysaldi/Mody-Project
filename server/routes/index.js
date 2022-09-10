const express = require("express");
const router = express.Router();

const users = require("./users");
const categories = require("./categories");
const wallets = require("./wallets");
const transactions = require("./transactions");
const userWallets = require("./userWallets");
const { authentication } = require("../middlewares/authentication");

router.use("/users", users);
router.use(authentication);
router.use("/categories", categories);
router.use("/wallets", wallets);
router.use("/transactions", transactions);
router.use("/userWallets", userWallets);

module.exports = router;
