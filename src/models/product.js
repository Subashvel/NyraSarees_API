const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define("product", {
     productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.TEXT,   // better for longer descriptions
      allowNull: true,
    },
    productImage: {
      type: DataTypes.STRING, // store file path / URL
      allowNull: true,
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productMrpPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      
    },
    productOfferPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,

    },
    subCategoryId: {   // foreign key → SubCategory
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
  });

  return Product;
};
