const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Coupon = sequelize.define("coupon", {
    couponCodeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    minimumPurchaseAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discountUnit: {
      type: DataTypes.ENUM("percentage", "flat"),
      allowNull: false,
    },
    discountValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return Coupon;
};
