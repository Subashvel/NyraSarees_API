// models/orderSlot.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OrderSlot = sequelize.define("order_slot", {
    
    productOrderId: {   // this must exist for the relation
      type: DataTypes.INTEGER,
      allowNull: true,
    },
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
    productColor: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^#([0-9A-Fa-f]{6})$/, // strict hex code validation
      }
    },
    product_price: {   //  store product price snapshot
      type: DataTypes.FLOAT,
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
    currency: {       // NEW COLUMN to store 'INR' or 'USD'
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  return OrderSlot;
};
