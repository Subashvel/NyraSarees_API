const express = require("express");
const router = express.Router();

const wishlistController = require("../controllers/wishlistController");

module.exports = (Wishlist, ProductVariant, Product) => {
  router.post("/add", wishlistController.addToWishlist(Wishlist));
  router.get("/:userId", wishlistController.getWishlist(Wishlist, ProductVariant, Product));
  router.delete("/:wishlistId", wishlistController.removeFromWishlist(Wishlist));

  return router;
};
