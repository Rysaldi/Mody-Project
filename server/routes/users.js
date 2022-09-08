const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.get("/:userId", userController.findById);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
