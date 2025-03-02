const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Set as primary key
    autoIncrement: true, // Auto-increment the userId
    allowNull: false, // Ensure it is not null
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures the value is a valid email
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, // Phone is optional
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePic: {
    type: DataTypes.STRING, // Store the path or URL of the profile picture
    allowNull: true, // Make it optional
  },
});

module.exports = User;
