const express = require("express");
const router = express.Router();
const multer = require("../middlewares/productMulter");
const productController = require("../controllers/productController");

module.exports = (Product, SubCategory, imageBaseUrl) => {
  // CREATE
  router.post("/", multer.single("productImage"),
    productController.createProduct(Product, imageBaseUrl)
  );

  // GET ALL
  router.get("/", productController.getProducts(Product, SubCategory));

  // GET BY ID
  router.get("/:id", productController.getProductById(Product, SubCategory));

  // UPDATE
  router.put("/:id", multer.single("productImage"),
    productController.updateProduct(Product, imageBaseUrl)
  );

  // DELETE
  router.delete("/:id", productController.deleteProduct(Product));

  return router;
};
