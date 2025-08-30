const express = require("express");
const router = express.Router();
const multer = require("../middlewares/variantMulter");
const childImageController = require("../controllers/productVariantChildImageController");

// module.exports = (ProductVariantChildImage) => {
//   // Upload multiple child images for a variant
//   router.post(
//     "/",
//     multer.array("childImages", 10),  // upload up to 10 images at once
//     childImageController.addChildImages(ProductVariantChildImage)
//   );

//   // Get all child images for a variant
//   router.get("/:variantId", childImageController.getChildImagesByVariant(ProductVariantChildImage));

//   // Delete a child image
//   router.delete("/:id", childImageController.deleteChildImage(ProductVariantChildImage));

//   return router;
// };


module.exports = (ProductVariantChildImage, imageBaseUrl) => {
  router.post(
    "/",
    multer.array("childImages", 10),
    childImageController.addChildImages(ProductVariantChildImage)
  );

  router.get(
    "/:variantId",
    childImageController.getChildImagesByVariant(ProductVariantChildImage, imageBaseUrl)
  );

  router.delete(
    "/:id",
    childImageController.deleteChildImage(ProductVariantChildImage)
  );

  return router;
};