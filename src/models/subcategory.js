const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SubCategory = sequelize.define("subcategory", {
    subCategoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subCategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    categoryId: { // foreign key reference to Category
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return SubCategory;
};