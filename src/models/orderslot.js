// models/orderSlot.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OrderSlot = sequelize.define("order_slot", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_variant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_variant_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return OrderSlot;
};
