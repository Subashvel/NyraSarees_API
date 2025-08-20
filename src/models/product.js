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
    productImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {   // foreign key
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Product;
};
