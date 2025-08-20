// controllers/productController.js
exports.createProduct = (Product, imageBaseUrl) => async (req, res) => {
  try {
    const { productName, productDescription, categoryId } = req.body;
    const productImage = req.file ? `${imageBaseUrl}/${req.file.filename}` : null;

    const product = await Product.create({
      productName,
      productDescription,
      productImage,
      categoryId,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProducts = (Product, Category) => async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: "Category" }],
      order: [["productId", "ASC"]],
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductById = (Product, Category) => async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "Category" }],
    });

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = (Product, imageBaseUrl) => async (req, res) => {
  try {
    const { productName, productDescription, categoryId } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    await product.update({
      productName,
      productDescription,
      categoryId,
      productImage: req.file ? `${imageBaseUrl}/${req.file.filename}` : product.productImage,
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = (Product) => async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    await product.destroy();
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
