const { DataTypes } = require("sequelize");
const product = require("./product");

module.exports = (sequelize) => {
  const ProductVariant = sequelize.define("productvariant", {
    productVariantId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "variantId"
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true, // foreign key reference to Product
    },
    subCategoryId: {  // add this
    type: DataTypes.INTEGER,
    allowNull: true,
    },
    categoryId: {     // add this
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productColor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^#([0-9A-Fa-f]{6})$/, // strict hex code validation
      }
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lowStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    productVariantImage: {  
      type: DataTypes.STRING,
      allowNull: true,
    },
    isNewArrival: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBestSeller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isTrending: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
  });

  return ProductVariant;
};



