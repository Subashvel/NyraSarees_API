const express = require("express");
const router = express.Router();
const multer = require("../middlewares/productMulter"); // same multer, can reuse
const homeBannerController = require("../controllers/homeBannerController");

module.exports = (HomeBanner, imageBaseUrl) => {
  // CREATE
  router.post(
    "/",
    multer.single("bannerImage"),
    homeBannerController.createHomeBanner(HomeBanner, imageBaseUrl)
  );

  // GET ALL
  router.get("/", homeBannerController.getHomeBanners(HomeBanner));

  // GET BY ID
  router.get("/:id", homeBannerController.getHomeBannerById(HomeBanner));

  // UPDATE
  router.put(
    "/:id",
    multer.single("bannerImage"),
    homeBannerController.updateHomeBanner(HomeBanner, imageBaseUrl)
  );

  // DELETE
  router.delete("/:id", homeBannerController.deleteHomeBanner(HomeBanner));

  return router;
};
