const express = require("express");
const userController = require("../controllers/user");
const users = express.Router();
const { authentication } = require("../middlewares/authentication");

users.post("/register", userController.register);
users.post("/login", userController.login);
users.use(authentication);
users.get("/", userController.findAllUser);
users.get("/detail", userController.findById);

module.exports = users;
