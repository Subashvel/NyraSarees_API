// CREATE Product Variant

// helper to parse boolean from req.body
const parseBool = (val) => {
  if (typeof val === "string") {
    return val === "true" || val === "1";
  }
  return !!val;
};

exports.createProductVariant = (ProductVariant, ProductStock) => async (req, res) => {
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

    // ✅ Create ProductStock entry if initial stock exists
    if (stockQuantity && Number(stockQuantity) > 0) {
      await ProductStock.create({
  productVariantId: variant.productVariantId, // ✅ use Sequelize property name
  availableStock: Number(stockQuantity),
  soldStock: 0,
});
    }

    res.status(201).json({ success: true, data: variant });
  } catch (error) {
    console.error("Error in createProductVariant:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET All Variants
exports.getProductVariants = (ProductVariant, Product, SubCategory, Category, ProductStock) => async (req, res) => {
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
        },
        {
          model: ProductStock,
          as: "Stock",       // <-- make sure you defined association
          attributes: ["availableStock"]
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
exports.getProductVariantById = (ProductVariant, Product, SubCategory, Category, ProductStock) => async (req, res) => {
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
       },
        {
          model: ProductStock,
          as: "Stock",       // <-- make sure you defined association
          attributes: ["availableStock"]
        }

      ],
      order: [["variantId", "ASC"]],
    });

    if (!variant) return res.status(404).json({ success: false, message: "Variant not found" });

    res.status(200).json({ success: true, data: variant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Variant
exports.updateProductVariant = (ProductVariant, ProductStock) => async (req, res) => {
  try {
    const { productId, productColor, stockQuantity, lowStock, subCategoryId, categoryId, isNewArrival, isBestSeller, isTrending } = req.body;

    const variant = await ProductVariant.findByPk(req.params.id);
    if (!variant) {
      return res.status(404).json({ success: false, message: "Variant not found" });
    }

    let updateData = {
      productId: productId || variant.productId,
      productColor: productColor || variant.productColor,
     stockQuantity:
        stockQuantity !== undefined ? stockQuantity : variant.stockQuantity,
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

     // Sync ProductStock if stockQuantity is changed
    if (stockQuantity !== undefined) {
      const stock = await ProductStock.findOne({
        where: { productVariantId: variant.productVariantId },
      });

      if (stock) {
        await stock.update({ availableStock: Number(stockQuantity) });
      } else {
        await ProductStock.create({
          productVariantId: variant.variantId,
          availableStock: Number(stockQuantity),
          soldStock: 0,
        });
      }
    }

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

exports.getLowStockProducts = (ProductVariant, ProductStock, Product) => async (req, res) => {
  try {
    const items = await ProductVariant.findAll({
      include: [
        { model: Product, as: "Product" },
        { model: ProductStock, as: "Stock" },
      ],
      where: Sequelize.where(
        Sequelize.col("Stock.availableStock"),
        "<=",
        Sequelize.col("productvariant.lowStock")
      ),
    });

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
