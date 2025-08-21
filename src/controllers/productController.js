// controllers/productController.js

// CREATE Product
exports.createProduct = (Product, imageBaseUrl) => async (req, res) => {
  try {
    const { 
      productName, 
      productDescription, 
      brandName, 
      material, 
      productMrpPrice,
      productOfferPrice, 
      subCategoryId 
    } = req.body;

    const productImage = req.file ? `${imageBaseUrl}/${req.file.filename}` : null;

    const product = await Product.create({
      productName,
      productDescription,
      brandName,
      material,
      productMrpPrice,
      productOfferPrice,
      productImage,
      subCategoryId,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET All Products
exports.getProducts = (Product, SubCategory, Category) => async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: SubCategory, as: "SubCategory", include: [{ model: Category, as: "Category" }] }
      ],
      order: [["productId", "ASC"]],
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Product by ID
exports.getProductById = (Product, SubCategory, Category) => async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: SubCategory, as: "SubCategory", include: [{ model: Category, as: "Category" }] }
      ],
    });

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Product
exports.updateProduct = (Product, imageBaseUrl) => async (req, res) => {
  try {
    const { 
      productName, 
      productDescription, 
      brandName, 
      material, 
      productMrpPrice,
      productOfferPrice, 
      subCategoryId 
    } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    await product.update({
      productName,
      productDescription,
      brandName,
      material,
      productMrpPrice,
      productOfferPrice,
      subCategoryId,
      productImage: req.file ? `${imageBaseUrl}/${req.file.filename}` : product.productImage,
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Product
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
