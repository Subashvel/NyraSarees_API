// routes/newsletter.routes.js
const express = require("express");
const newsletterController = require("../controllers/newsletterController");

module.exports = (Newsletter) => {
  const router = express.Router();

  router.post("/subscribe", (req, res) => newsletterController.subscribe(req, res, Newsletter));
  router.get("/", (req, res) => newsletterController.getAll(req, res, Newsletter));
  router.delete("/:id", (req, res) => newsletterController.delete(req, res, Newsletter));

  return router;
};