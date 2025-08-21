// routes/subcategoryRoutes.js
const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

module.exports = (SubCategory, Category) => {
  // CREATE
  router.post(
    "/",
    subcategoryController.createSubCategory(SubCategory, Category)
  );

  // GET ALL
  router.get(
    "/",
    subcategoryController.getSubCategories(SubCategory, Category)
  );

  // GET BY ID
  router.get(
    "/:id",
    subcategoryController.getSubCategoryById(SubCategory, Category)
  );

  // UPDATE
  router.put(
    "/:id",
    subcategoryController.updateSubCategory(SubCategory, Category)
  );

  // DELETE
  router.delete(
    "/:id",
    subcategoryController.deleteSubCategory(SubCategory)
  );

  return router;
};
