const express = require("express");
const router = express.Router();

const wishlistController = require("../controllers/wishlistController");

module.exports = (Wishlist, ProductVariant) => {
  router.post("/add", wishlistController.addToWishlist(Wishlist));
  router.get("/:userId", wishlistController.getWishlist(Wishlist, ProductVariant));
  router.delete("/:wishlistId", wishlistController.removeFromWishlist(Wishlist));

  return router;
};
