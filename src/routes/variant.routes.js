// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/variantMulter"); // notice changed name
// const variantController = require("../controllers/variantController");

// module.exports = (Variant, Product, imageBaseUrl) => {
//   // CREATE
//   router.post(
//     "/",
//     upload.fields([
//       { name: "image", maxCount: 1 },
//       { name: "thumbImage1", maxCount: 1 },
//       { name: "thumbImage2", maxCount: 1 },
//       { name: "thumbImage3", maxCount: 1 },
//       { name: "thumbImage4", maxCount: 1 },
//     ]),
//     variantController.createVariant(Variant, imageBaseUrl)
//   );

//   // GET ALL
//   router.get("/", variantController.getVariants(Variant, Product));

//   // GET BY ID
//   router.get("/:id", variantController.getVariantById(Variant, Product));

//   // UPDATE
//   router.put(
//     "/:id",
//     upload.fields([
//       { name: "image", maxCount: 1 },
//       { name: "thumbImage1", maxCount: 1 },
//       { name: "thumbImage2", maxCount: 1 },
//       { name: "thumbImage3", maxCount: 1 },
//       { name: "thumbImage4", maxCount: 1 },
//     ]),
//     variantController.updateVariant(Variant, imageBaseUrl)
//   );

//   // DELETE
//   router.delete("/:id", variantController.deleteVariant(Variant));

//   return router;
// };
