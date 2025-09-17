// controllers/productController.js

// CREATE Product

const { Op } = require("sequelize");
exports.createProduct = (Product, imageBaseUrl) => async (req, res) => {
  try {
    const { 
      productName, 
      productDescription, 
      brandName, 
      material, 
      productMrpPrice,
      productOfferPrice, 
      subCategoryId,
      categoryId,
      
    } = req.body;

    const productImage = req.file ? req.file.filename : null;

    const product = await Product.create({
      productName,
      productDescription,
      brandName,
      material,
      productMrpPrice,
      productOfferPrice,
      productImage,
      subCategoryId,
      categoryId
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET All Products
exports.getProducts = (Product, SubCategory, Category, ProductVariant, ProductVariantChildImage) => async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { 
          model: SubCategory, 
          as: "SubCategory",
          include: [{ model: Category, as: "Category" }] //  nested include
        },
        { 
          model: ProductVariant, 
          as: "Variants",   // include variants also
          include: [
            { model: ProductVariantChildImage, as: "ChildImages" },
           
          ]
        }
      ],
      order: [["productId", "ASC"]],
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Product by ID
exports.getProductById = (Product, SubCategory, Category, ProductVariant, ProductVariantChildImage) => async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { 
          model: SubCategory, 
          as: "SubCategory",
          include: [{ model: Category, as: "Category" }]
        },
        { 
          model: ProductVariant, 
          as: "Variants",   //  include variants also
          include: [
            { model: ProductVariantChildImage, as: "ChildImages" },
           
          ]
        }
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
      subCategoryId,
      categoryId
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
      categoryId,
      productImage: req.file ? req.file.filename : product.productImage,
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


exports.getRelatedProducts = (Product, SubCategory, Category, ProductVariant, ProductVariantChildImage) => async (req, res) => {
  try {
    const { id } = req.params; // current productId

    // First get the current product
    const currentProduct = await Product.findByPk(id, {
      include: [{ model: SubCategory, as: "SubCategory" }]
    });

    if (!currentProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Find related products by same categoryId
    const relatedProducts = await Product.findAll({
      where: {
        categoryId: currentProduct.categoryId,
        productId: { [Op.ne]: id } // exclude current product
      },
      include: [
        { 
          model: SubCategory, 
          as: "SubCategory",
          include: [{ model: Category, as: "Category" }]
        },
        { 
          model: ProductVariant, 
          as: "Variants",
          include: [{ model: ProductVariantChildImage, as: "ChildImages" }]
        }
      ],
      limit: 10, // ✅ show max 10 related products
    });

    res.status(200).json({ success: true, data: relatedProducts });
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
