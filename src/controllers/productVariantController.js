// CREATE Product Variant

// helper to parse boolean from req.body
const parseBool = (val) => {
  if (typeof val === "string") {
    return val === "true" || val === "1";
  }
  return !!val;
};

exports.createProductVariant = (ProductVariant) => async (req, res) => {
  try {
    const { productId, productColor, stockQuantity, lowStock, subCategoryId, categoryId, isNewArrival, isBestSeller, isTrending } = req.body;

    const variant = await ProductVariant.create({
      productId,
      subCategoryId,
      categoryId,
      productColor,
      stockQuantity,
      lowStock,
      isNewArrival: parseBool(isNewArrival),
      isBestSeller: parseBool(isBestSeller),
      isTrending: parseBool(isTrending),
      productVariantImage: req.files && req.files["productVariantImage"]
        ? req.files["productVariantImage"][0].filename
        : null,
    });

    res.status(201).json({ success: true, data: variant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET All Variants
exports.getProductVariants = (ProductVariant, Product, SubCategory, Category) => async (req, res) => {
  try {
    const variants = await ProductVariant.findAll({
      include: [
        { 
          model: Product, 
          as: "Product",
          include: [
            { 
              model: SubCategory, 
              as: "SubCategory",
              include: [{ model: Category, as: "Category" }]
            }
          ]
        }
      ],
      order: [["variantId", "ASC"]],
    });

    res.status(200).json({ success: true, data: variants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Variant by ID
exports.getProductVariantById = (ProductVariant, Product, SubCategory, Category) => async (req, res) => {
  try {
    const variant = await ProductVariant.findByPk(req.params.id, {
      include: [
        { 
          model: Product, 
          as: "Product",
          include: [
            { 
              model: SubCategory, 
              as: "SubCategory",
              include: [{ model: Category, as: "Category" }]
            }
          ]
        }
      ]
    });

    if (!variant) return res.status(404).json({ success: false, message: "Variant not found" });

    res.status(200).json({ success: true, data: variant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Variant
exports.updateProductVariant = (ProductVariant) => async (req, res) => {
  try {
    const { productId, productColor, stockQuantity, lowStock, subCategoryId, categoryId, isNewArrival, isBestSeller, isTrending } = req.body;

    const variant = await ProductVariant.findByPk(req.params.id);
    if (!variant) {
      return res.status(404).json({ success: false, message: "Variant not found" });
    }

    let updateData = {
      productId: productId || variant.productId,
      productColor: productColor || variant.productColor,
      stockQuantity: stockQuantity || variant.stockQuantity,
      lowStock: lowStock || variant.lowStock,
      subCategoryId: subCategoryId || variant.subCategoryId,
      categoryId: categoryId || variant.categoryId,
      isNewArrival:
        isNewArrival !== undefined ? parseBool(isNewArrival) : variant.isNewArrival,
      isBestSeller:
        isBestSeller !== undefined ? parseBool(isBestSeller) : variant.isBestSeller,
      isTrending:
        isTrending !== undefined ? parseBool(isTrending) : variant.isTrending,
    };

    if (req.files && req.files["productVariantImage"]) {
      updateData.productVariantImage = req.files["productVariantImage"][0].filename;
    }

    await variant.update(updateData);

    res.status(200).json({ success: true, data: variant });
  } catch (error) {
    console.error("Error in updateProductVariant:", error);
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
