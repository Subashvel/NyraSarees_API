const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

module.exports = (Cart, ProductVariant, Product) => {
  // Add to cart
  router.post("/add", cartController.addToCart(Cart, ProductVariant));

  // Get cart by user
  router.get("/:userId", cartController.getCart(Cart, ProductVariant, Product));

  // Update quantity (REST style)
  router.put("/update/:cartId", cartController.updateCart(Cart));

  // Remove from cart
  router.delete("/:cartId", cartController.removeFromCart(Cart));

  return router;
};
