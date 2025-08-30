// routes/bill.routes.js
const express = require("express");
const router = express.Router();

module.exports = (Bill, User) => {
  const billController = require("../controllers/billController")(Bill, User);

  router.post("/", billController.createBill);
  router.get("/", billController.getBills);
  router.get("/:id", billController.getBillById);
  router.put("/:id", billController.updateBill);
  router.delete("/:id", billController.deleteBill);

  return router;
};
