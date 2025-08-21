const initSequelize = require("../config/db");
const CategoryModel = require("./category");
const SubCategoryModel = require("./subcategory");
const ProductModel = require("./product");
const VariantModel = require("./variant");

async function initModels() {
  const sequelize = await initSequelize();
  const Category = CategoryModel(sequelize);
  const SubCategory = SubCategoryModel(sequelize);
  const Product = ProductModel(sequelize);
  const Variant = VariantModel(sequelize);


  // Associations

  Category.hasMany(SubCategory, { foreignKey: "categoryId", as: "SubCategories", onDelete: "CASCADE" });
  SubCategory.belongsTo(Category, { foreignKey: "categoryId", as: "Category" });

  Category.hasMany(Product, { foreignKey: "categoryId", as: "Products", onDelete: "CASCADE" });
  Product.belongsTo(Category, { foreignKey: "categoryId", as: "Category" });

  Product.hasMany(Variant, { foreignKey: "productId", as: "Variants", onDelete: "CASCADE" });
  Variant.belongsTo(Product, { foreignKey: "productId", as: "Product" });


  await sequelize.sync({ alter: true }); // auto create/update tables

  return { sequelize, Category, SubCategory, Product, Variant };
}

module.exports = initModels;