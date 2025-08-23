// models/wishlist.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Wishlist = sequelize.define("wishlist", {
    wishlistId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productVariantId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return Wishlist;
};