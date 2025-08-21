const initSequelize = require("../config/db");
const CategoryModel = require("./category");
const SubCategoryModel = require("./subcategory");
const ProductModel = require("./product");
// const VariantModel = require("./variant");

async function initModels() {
  const sequelize = await initSequelize();
  const Category = CategoryModel(sequelize);
  const SubCategory = SubCategoryModel(sequelize);
  const Product = ProductModel(sequelize);
  // const Variant = VariantModel(sequelize);


  // Associations

  // Category ↔ SubCategory
  Category.hasMany(SubCategory, { foreignKey: "categoryId", as: "SubCategories", onDelete: "CASCADE" });
  SubCategory.belongsTo(Category, { foreignKey: "categoryId", as: "Category" });

 // SubCategory ↔ Product 
  SubCategory.hasMany(Product, { foreignKey: "subCategoryId", as: "Products", onDelete: "CASCADE" });
  Product.belongsTo(SubCategory, { foreignKey: "subCategoryId", as: "SubCategory" });

  // Product.hasMany(Variant, { foreignKey: "productId", as: "Variants", onDelete: "CASCADE" });
  // Variant.belongsTo(Product, { foreignKey: "productId", as: "Product" });


  await sequelize.sync({ alter: true }); // auto create/update tables

  return { sequelize, Category, SubCategory, Product };
}

module.exports = initModels;