// // controllers/categoryController.js
// const { Category } = require('../models');

// controllers/categoryController.js
// CRUD for Category

// Create a new category
exports.createCategory = async (req, res, Category) => {
  try {
    const { categoryName } = req.body;

    const category = await Category.create({ categoryName });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res, Category) => {
  try {
    const categories = await Category.findAll({
      order: [["categoryId", "ASC"]],
    });

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single category by ID
exports.getCategoryById = async (req, res, Category) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update category
exports.updateCategory = async (req, res, Category) => {
  try {
    const { categoryName } = req.body;

    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    await category.update({ categoryName });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res, Category) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    await category.destroy();
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
