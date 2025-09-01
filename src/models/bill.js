const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Bill = sequelize.define("bill", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
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
  });

  return Bill;
};
