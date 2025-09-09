// controllers/productStockController.js

exports.addStock = (ProductStock, ProductVariant) => async (req, res) => {
  try {
    const { productVariantId, quantity } = req.body;

    let stock = await ProductStock.findOne({ where: { productVariantId } });

    if (!stock) {
      stock = await ProductStock.create({ productVariantId, availableStock: quantity, soldStock: 0 });
    } else {
      stock.availableStock += parseInt(quantity);
      await stock.save();
    }

     // 🔄 Sync with ProductVariant.stockQuantity
    const variant = await ProductVariant.findByPk(productVariantId);
    if (variant) {
      variant.stockQuantity += parseInt(quantity);
      await variant.save();
    }

    res.json({ message: "Stock added successfully", stock, variant});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reduceStock = (ProductStock, ProductVariant) => async (req, res) => {
  try {
    const { productVariantId, quantity } = req.body;

    const stock = await ProductStock.findOne({ where: { productVariantId } });
    if (!stock || stock.availableStock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    stock.availableStock -= parseInt(quantity);
    stock.soldStock += parseInt(quantity);
    await stock.save();

    //  Sync with ProductVariant.stockQuantity
    const variant = await ProductVariant.findByPk(productVariantId);
    if (variant) {
      variant.stockQuantity -= parseInt(quantity);
      if (variant.stockQuantity < 0) variant.stockQuantity = 0; // prevent negative
      await variant.save();
    }

    res.json({ message: "Stock reduced successfully", stock, variant });
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

exports.getAllStocks = (ProductStock) => async (req, res) => {
  try {
    const stocks = await ProductStock.findAll();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


