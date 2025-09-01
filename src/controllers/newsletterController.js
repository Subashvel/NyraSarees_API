// controllers/newsletterController.js
exports.subscribe = async (req, res, Newsletter) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const existing = await Newsletter.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscription = await Newsletter.create({ email });
    res.status(201).json({ message: "Subscribed successfully", subscription });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing", error: error.message });
  }
};

exports.getAll = async (req, res, Newsletter) => {
  try {
    const subscribers = await Newsletter.findAll();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscribers", error: error.message });
  }
};

exports.delete = async (req, res, Newsletter) => {
  try {
    const { id } = req.params;
    const deleted = await Newsletter.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Subscriber not found" });
    res.json({ message: "Subscriber deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subscriber", error: error.message });
  }
};
