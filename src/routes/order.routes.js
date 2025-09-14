// routes/order.routes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/checkout", orderController.checkout);
router.get("/all", orderController.getAllOrders);   // all orders
router.get("/:id", orderController.getOrderById);  // single order by ID
router.put("/:id/status", orderController.updateOrderStatus);
router.get("/user/:userId", orderController.getOrdersByUserId);

router.get("/order-history/:userId", orderController.getOrderHistoryByUserId);
router.get("/order-history/order/:orderId", orderController.getOrderHistoryByOrderId);

module.exports = router;
