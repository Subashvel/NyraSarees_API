// // models/register.js
// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const User = sequelize.define('User', {
//     fullname: {
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     email: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: {
//     name: 'unique_email_constraint',
//     msg: 'Email already exists'
//   }
// },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: true
//     }
//   }, {
//     tableName: 'users',
//     timestamps: true,
//     underscored: true
//   });

//   return User;
// };
