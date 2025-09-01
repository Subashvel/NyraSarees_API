// models/Contact.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Contact = sequelize.define("contact", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // name is required
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // email is required
      validate: {
        isEmail: true, // ensures it's a valid email format
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false, // phone is required
    },
     subject: {
      type: DataTypes.STRING,   // NEW FIELD
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT, // for longer messages
      allowNull: false,     // must provide message
    },
  });

  return Contact;
};
