const express = require("express");
const categoryController = require("../controllers/categoryController");

module.exports = (Category) => {
  const router = express.Router();

  // Create category
  router.post("/", (req, res) =>
    categoryController.createCategory(req, res, Category)
  );

  // Get all categories
  router.get("/", (req, res) =>
    categoryController.getCategories(req, res, Category)
  );

  // Get category by ID
  router.get("/:id", (req, res) =>
    categoryController.getCategoryById(req, res, Category)
  );

  // Update category
  router.put("/:id", (req, res) =>
    categoryController.updateCategory(req, res, Category)
  );

  // Delete category
  router.delete("/:id", (req, res) =>
    categoryController.deleteCategory(req, res, Category)
  );

  return router;
};
