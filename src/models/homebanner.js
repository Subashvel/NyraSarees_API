// models/HomeBanner.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const HomeBanner = sequelize.define("homeBanner", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bannerImage: {
      type: DataTypes.STRING,  // file path or URL
      allowNull: false,
    },
  });

  return HomeBanner;
};
