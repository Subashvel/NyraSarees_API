// controllers/productStockController.js

exports.addStock = (ProductStock) => async (req, res) => {
  try {
    const { productVariantId, quantity } = req.body;

    let stock = await ProductStock.findOne({ where: { productVariantId } });

    if (!stock) {
      stock = await ProductStock.create({ productVariantId, availableStock: quantity });
    } else {
      stock.availableStock += parseInt(quantity);
      await stock.save();
    }

    res.json({ message: "Stock added successfully", stock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reduceStock = (ProductStock) => async (req, res) => {
  try {
    const { productVariantId, quantity } = req.body;

    const stock = await ProductStock.findOne({ where: { productVariantId } });
    if (!stock || stock.availableStock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    stock.availableStock -= parseInt(quantity);
    stock.soldStock += parseInt(quantity);
    await stock.save();

    res.json({ message: "Stock reduced successfully", stock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStock = (ProductStock) => async (req, res) => {
  try {
    const { productVariantId } = req.params;
    const stock = await ProductStock.findOne({ where: { productVariantId } });

    if (!stock) return res.status(404).json({ message: "Stock not found" });

    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
