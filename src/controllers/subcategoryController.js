// controllers/subcategoryController.js

exports.createSubCategory = (SubCategory, Category) => async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;

    // Check if category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const subCategory = await SubCategory.create({
      subCategoryName,
      categoryId,
    });

    res.status(201).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSubCategories = (SubCategory, Category) => async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll({
      include: [{ model: Category, as: "Category" }],
      order: [["subCategoryId", "ASC"]],
    });

    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSubCategoryById = (SubCategory, Category) => async (req, res) => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id, {
      include: [{ model: Category, as: "Category" }],
    });

    if (!subCategory) {
      return res.status(404).json({ success: false, message: "SubCategory not found" });
    }

    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSubCategory = (SubCategory, Category) => async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;
    const subCategory = await SubCategory.findByPk(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ success: false, message: "SubCategory not found" });
    }

    // If updating category, check if it exists
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
    }

    await subCategory.update({
      subCategoryName,
      categoryId: categoryId || subCategory.categoryId,
    });

    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSubCategory = (SubCategory) => async (req, res) => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ success: false, message: "SubCategory not found" });
    }

    await subCategory.destroy();
    res.status(200).json({ success: true, message: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
