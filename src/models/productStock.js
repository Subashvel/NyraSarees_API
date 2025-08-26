// models/productStock.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProductStock = sequelize.define("productstock", {
    stockId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productVariantId: {
      type: DataTypes.INTEGER,
      allowNull: false, // foreign key
    },
    availableStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    soldStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return ProductStock;
};