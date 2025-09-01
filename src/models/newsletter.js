const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Newsletter = sequelize.define("newsletter", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // prevent duplicate subscriptions
      validate: {
        isEmail: true, // validates format
      },
    },
  });

  return Newsletter;
};
