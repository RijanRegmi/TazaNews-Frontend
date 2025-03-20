const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false, 
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
      isEmail: true, 
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePic: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
});

module.exports = User;
