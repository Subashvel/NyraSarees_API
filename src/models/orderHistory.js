const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OrderHistory = sequelize.define("order_history", {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    townCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    additionalText: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    product_price: {   //  store product price snapshot
      type: DataTypes.FLOAT,
      allowNull: true,
    },
     productColor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^#([0-9A-Fa-f]{6})$/, // strict hex code validation
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    grandTotalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    couponCodeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deliveryStatus: {
      type: DataTypes.ENUM(
        "pending",
        "dispatch",
        "packing",
        "outfordelivery",
        "delivered"
      ),
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
      defaultValue: DataTypes.NOW,
    },
    currency: {
    type: DataTypes.STRING,  // or ENUM('INR', 'USD') if stricter
    allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return OrderHistory;
};
