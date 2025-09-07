// models/productOrder.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProductOrder = sequelize.define("product_order", {
    orderId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    billId: {   //  add this
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    couponCodeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    grand_total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    deliveryStatus: {
      type: DataTypes.ENUM("pending", "dispatch", "packing", "outfordelivery", "delivered"),
      allowNull: true,
      defaultValue: "pending",
    },
    paymentStatus: {
      type: DataTypes.ENUM("unpaid", "paid"),
      allowNull: true,
      defaultValue: "unpaid",
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // auto set current date+time
    },
  });

  return ProductOrder;
};
