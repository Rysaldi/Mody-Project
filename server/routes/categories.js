const categories = require("express").Router();
const CategoryController = require("../controllers/category");

categories.get("/", CategoryController.getCategories);
categories.post("/", CategoryController.addCategory);
categories.put("/:categoryId", CategoryController.updateCategory);
categories.delete("/:categoryId", CategoryController.deleteCategory);

module.exports = categories;
