const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProductVariantChildImage = sequelize.define("productvariantchildimage", {
    childImageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "childImageId"
    },
    variantId: {  // FK to ProductVariant
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    childImage: {   // the actual image file
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return ProductVariantChildImage;
};
