// controllers/productVariantChildImageController.js

// CREATE child images (multiple upload)
exports.addChildImages = (ProductVariantChildImage) => async (req, res) => {
  try {
    const { variantId } = req.body;

    if (!variantId) {
      return res.status(400).json({ success: false, message: "variantId is required" });
    }

    const images = req.files.map(file => ({
      variantId,
      childImage: file.filename
    }));

    const created = await ProductVariantChildImage.bulkCreate(images);

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all child images for a variant
exports.getChildImagesByVariant = (ProductVariantChildImage, imageBaseUrl) => async (req, res) => {
  try {
    const { variantId } = req.params;

    const images = await ProductVariantChildImage.findAll({ where: { variantId } });

    const formatted = images.map(img => ({
      childImageId: img.childImageId,
      variantId: img.variantId,
      childImage: img.childImage // construct URL here
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// DELETE child image
exports.deleteChildImage = (ProductVariantChildImage) => async (req, res) => {
  try {
    const image = await ProductVariantChildImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ success: false, message: "Child image not found" });

    await image.destroy();
    res.status(200).json({ success: true, message: "Child image deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
