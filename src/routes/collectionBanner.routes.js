const express = require("express");
const router = express.Router();
const multer = require("../middlewares/productMulter"); // reuse same multer
const collectionBannerController = require("../controllers/collectionBannerController");

module.exports = (CollectionBanner, imageBaseUrl) => {
  // CREATE
  router.post(
    "/",
    multer.single("bannerImage"),
    collectionBannerController.createCollectionBanner(CollectionBanner, imageBaseUrl)
  );

  // GET ALL
  router.get("/", collectionBannerController.getCollectionBanners(CollectionBanner));

  // GET BY ID
  router.get("/:id", collectionBannerController.getCollectionBannerById(CollectionBanner));

  // UPDATE
  router.put(
    "/:id",
    multer.single("bannerImage"),
    collectionBannerController.updateCollectionBanner(CollectionBanner, imageBaseUrl)
  );

  // DELETE
  router.delete("/:id", collectionBannerController.deleteCollectionBanner(CollectionBanner));

  return router;
};
