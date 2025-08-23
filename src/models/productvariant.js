const { DataTypes } = require("sequelize");

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
    thumbImage1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbImage2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbImage3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbImage4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return ProductVariant;
};
