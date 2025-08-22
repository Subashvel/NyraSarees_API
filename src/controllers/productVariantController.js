// controllers/productVariantController.js

// CREATE Product Variant
exports.createProductVariant = (ProductVariant) => async (req, res) => {
  try {
    const { productId, productColor, stockQuantity, lowStock } = req.body;

    const variant = await ProductVariant.create({
      productId,
      productColor,
      stockQuantity,
      lowStock,
      thumbImage1: req.files["thumbImage1"] ? req.files["thumbImage1"][0].filename : null,
      thumbImage2: req.files["thumbImage2"] ? req.files["thumbImage2"][0].filename : null,
      thumbImage3: req.files["thumbImage3"] ? req.files["thumbImage3"][0].filename : null,
      thumbImage4: req.files["thumbImage4"] ? req.files["thumbImage4"][0].filename : null,
    });

    res.status(201).json({ success: true, data: variant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET All Variants
exports.getProductVariants = (ProductVariant, Product) => async (req, res) => {
  try {
    const variants = await ProductVariant.findAll({
      include: [{ model: Product, as: "Product" }],
      order: [["variantId", "ASC"]],
    });

    res.status(200).json({ success: true, data: variants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Variant by ID
exports.getProductVariantById = (ProductVariant, Product) => async (req, res) => {
  try {
    const variant = await ProductVariant.findByPk(req.params.id, {
      include: [{ model: Product, as: "Product" }],
    });

    if (!variant) return res.status(404).json({ success: false, message: "Variant not found" });

    res.status(200).json({ success: true, data: variant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Variant
exports.updateProductVariant = (ProductVariant, imageBaseUrl) => async (req, res) => {
  try {
    const { productId, productColor, stockQuantity, lowStock } = req.body;

    const variant = await ProductVariant.findByPk(req.params.id);
    if (!variant) {
      return res.status(404).json({ success: false, message: "Variant not found" });
    }

    // Build update object starting with existing values
    let updateData = {
      productId: productId || variant.productId,
      productColor: productColor || variant.productColor,
      stockQuantity: stockQuantity || variant.stockQuantity,
      lowStock: lowStock || variant.lowStock,
    };

    // Only replace image fields if a new file is uploaded
    ["thumbImage1", "thumbImage2", "thumbImage3", "thumbImage4"].forEach(field => {
      if (req.files[field]) {
        updateData[field] = req.files[field][0].filename;
      } else {
        updateData[field] = variant[field]; // keep old value
      }
    });

    await variant.update(updateData);

    res.status(200).json({ success: true, data: variant });
  } catch (error) {
    console.error("❌ Error in updateProductVariant:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Variant
exports.deleteProductVariant = (ProductVariant) => async (req, res) => {
  try {
    const variant = await ProductVariant.findByPk(req.params.id);
    if (!variant) return res.status(404).json({ success: false, message: "Variant not found" });

    await variant.destroy();
    res.status(200).json({ success: true, message: "Variant deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
