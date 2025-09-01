// controllers/billController.js

module.exports = (Bill, User) => {
    return {
      // Create Bill
      async createBill(req, res) {
  try {
    let { userId, ...rest } = req.body;
    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({ error: "Invalid userId" });
    }
    userId = Number(userId);

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate orderId
    const lastBill = await Bill.findOne({
      order: [["createdAt", "DESC"]],
    });

    let nextNumber = 1;
    if (lastBill && lastBill.orderId) {
      const match = lastBill.orderId.match(/NYRASAREES-ORD-(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    const orderId = `NYRASAREES-ORD-${String(nextNumber).padStart(4, "0")}`;

    const bill = await Bill.create({ userId, orderId, ...rest });
    res.status(201).json({ message: "Bill created", bill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
  
      // Get All Bills
      async getBills(req, res) {
        try {
          const bills = await Bill.findAll({ include: User });
          res.status(200).json(bills);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
  
      // Get Bill by ID
      async getBillById(req, res) {
        try {
          const bill = await Bill.findByPk(req.params.id, { include: User });
          if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
          }
          res.status(200).json(bill);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
  
      // Update Bill
      async updateBill(req, res) {
        try {
          const [updated] = await Bill.update(req.body, {
            where: { id: req.params.id },
          });
          if (!updated) {
            return res.status(404).json({ message: "Bill not found" });
          }
          const updatedBill = await Bill.findByPk(req.params.id);
          res.status(200).json(updatedBill);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
  
      // Delete Bill
      async deleteBill(req, res) {
        try {
          const deleted = await Bill.destroy({
            where: { id: req.params.id },
          });
          if (!deleted) {
            return res.status(404).json({ message: "Bill not found" });
          }
          res.status(200).json({ message: "Bill deleted successfully" });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    };
  };
  