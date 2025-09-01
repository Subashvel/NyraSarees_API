const { sendContactMail } = require("../utils/mailer");

module.exports = (Contact) => ({
  // CREATE (Submit Contact Form)
  createContact: async (req, res) => {
    try {
      const { name, email, phoneNumber, subject, comments } = req.body;

      // Save contact in DB
      const contact = await Contact.create({ name, email, phoneNumber, subject, comments });

      // Send email notification
      await sendContactMail(contact);

      return res.status(201).json({
        message: "Contact submitted successfully",
        contact,
      });
    } catch (error) {
      console.error("❌ Contact Create Error:", error);
      return res.status(500).json({
        message: "Failed to submit contact form",
        error: error.message || error.toString(),
      });
    }
  },

  // GET ALL
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.findAll({
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(contacts);
    } catch (error) {
      console.error("❌ Get Contacts Error:", error);
      return res.status(500).json({ message: "Failed to fetch contacts" });
    }
  },

  // GET BY ID
  getContactById: async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.findByPk(id);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json(contact);
    } catch (error) {
      console.error("❌ Get Contact By ID Error:", error);
      return res.status(500).json({ message: "Failed to fetch contact" });
    }
  },

  // DELETE
  deleteContact: async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.findByPk(id);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      await contact.destroy();
      return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error("❌ Delete Contact Error:", error);
      return res.status(500).json({ message: "Failed to delete contact" });
    }
  },
});
