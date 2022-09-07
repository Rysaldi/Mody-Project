const category = require("express").Router();
const CategoryController = require("../controller/categoryController");
category.get("/", CategoryController.getCategories);
category.post("/", CategoryController.addCategory);
category.put("/:categoryId", CategoryController.updateCategory);
category.delete("/:categoryId", CategoryController.deleteCategory);

module.exports = category;
