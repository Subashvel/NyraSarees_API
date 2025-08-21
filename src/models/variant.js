// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Variant = sequelize.define("variant", {
//     variantId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     // images
//     image: { type: DataTypes.STRING, allowNull: true },
//     thumbImage1: { type: DataTypes.STRING, allowNull: true },
//     thumbImage2: { type: DataTypes.STRING, allowNull: true },
//     thumbImage3: { type: DataTypes.STRING, allowNull: true },
//     thumbImage4: { type: DataTypes.STRING, allowNull: true },

//     // prices
//     mrpPrice: { type: DataTypes.FLOAT, allowNull: false },
//     discountPrice: { type: DataTypes.FLOAT, allowNull: true },

//     // product details
//     description: { type: DataTypes.STRING, allowNull: true },
//     color: { type: DataTypes.STRING, allowNull: true },
//     quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
//     skuCode: { type: DataTypes.STRING, allowNull: false, unique: true },

//     // extra
//     reviews: { type: DataTypes.TEXT, allowNull: true },
//     leather: { type: DataTypes.STRING, allowNull: true },
//     brand: { type: DataTypes.STRING, allowNull: true },

//     // foreign key (product relation)
//     productId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   });

//   return Variant;
// };
