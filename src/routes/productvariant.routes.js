const express = require("express");
const router = express.Router();
const multer = require("../middlewares/variantMulter"); // <-- use variant multer
const productVariantController = require("../controllers/productVariantController");

module.exports = (ProductVariant, ProductStock, Product, SubCategory, Category, imageBaseUrl) => {
  // CREATE
  router.post(
  "/",
  multer.fields([
    { name: "productVariantImage", maxCount: 1 },
  ]),
  productVariantController.createProductVariant(ProductVariant, ProductStock, imageBaseUrl)
);

  // GET ALL
  router.get("/", productVariantController.getProductVariants(ProductVariant, Product, SubCategory, Category, ProductStock));

  // GET BY ID
  router.get("/:id", productVariantController.getProductVariantById(ProductVariant, Product, SubCategory, Category, ProductStock));

  // UPDATE
  router.put(
  "/:id",
  multer.fields([
    { name: "productVariantImage", maxCount: 1 },
  ]),
  productVariantController.updateProductVariant(ProductVariant, ProductStock, imageBaseUrl)
);
 
  // DELETE
  router.delete("/:id", productVariantController.deleteProductVariant(ProductVariant));

  router.get(
  "/",
  productVariantController.getLowStockProducts(ProductVariant, ProductStock, Product)
);

  return router;
};
