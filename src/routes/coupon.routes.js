const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");

module.exports = (Coupon) => {
  // Create coupon
  router.post("/", couponController.createCoupon(Coupon));

  // Get all coupons
  router.get("/", couponController.getCoupons(Coupon));

  // Update coupon
  router.put("/:id", couponController.updateCoupon(Coupon));

  // Delete coupon
  router.delete("/:id", couponController.deleteCoupon(Coupon));

  // Validate coupon
  router.post("/validate", couponController.validateCoupon(Coupon));

  return router;
};
