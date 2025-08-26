const express = require("express");
const router = express.Router();
const stockController = require("../controllers/productStockController");

module.exports = (ProductStock, ProductVariant) => {
  // Add stock
  router.post("/add", stockController.addStock(ProductStock));

  // Reduce stock
  router.post("/reduce", stockController.reduceStock(ProductStock));

  // Get stock by variant
  router.get("/:productVariantId", stockController.getStock(ProductStock));

  return router;
};
