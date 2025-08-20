const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define("category", {
    categoryid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Category;
};