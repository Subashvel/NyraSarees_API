const express = require("express");
const router = express.Router();
const multer = require("../middlewares/variantMulter"); // <-- use variant multer
const productVariantController = require("../controllers/productVariantController");

module.exports = (ProductVariant, Product, imageBaseUrl) => {
  // CREATE
  router.post(
  "/",
  multer.fields([
    { name: "thumbImage1", maxCount: 1 },
    { name: "thumbImage2", maxCount: 1 },
    { name: "thumbImage3", maxCount: 1 },
    { name: "thumbImage4", maxCount: 1 },
  ]),
  productVariantController.createProductVariant(ProductVariant, imageBaseUrl)
);

  // GET ALL
  router.get("/", productVariantController.getProductVariants(ProductVariant, Product));

  // GET BY ID
  router.get("/:id", productVariantController.getProductVariantById(ProductVariant, Product));

  // UPDATE
  router.put(
  "/:id",
  multer.fields([
    { name: "thumbImage1", maxCount: 1 },
    { name: "thumbImage2", maxCount: 1 },
    { name: "thumbImage3", maxCount: 1 },
    { name: "thumbImage4", maxCount: 1 },
  ]),
  productVariantController.updateProductVariant(ProductVariant, imageBaseUrl)
);

  // DELETE
  router.delete("/:id", productVariantController.deleteProductVariant(ProductVariant));

  return router;
};
