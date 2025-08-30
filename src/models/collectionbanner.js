// models/CollectionBanner.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CollectionBanner = sequelize.define("collectionbanner", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bannerImage: {
      type: DataTypes.STRING, // file path or URL
      allowNull: false,
    },
  });

  return CollectionBanner;
};