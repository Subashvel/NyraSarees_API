

const express = require("express");
const router = express.Router();

module.exports = (Contact) => {
  const contactController = require("../controllers/contactController")(Contact);

  // CREATE
  router.post("/", contactController.createContact);

  // GET ALL
  router.get("/", contactController.getAllContacts);

  // GET BY ID
  router.get("/:id", contactController.getContactById);

  // DELETE
  router.delete("/:id", contactController.deleteContact);

  return router;
};
