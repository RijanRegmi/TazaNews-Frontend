const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Like = sequelize.define("Like", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  newsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  liked: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "likes",
  timestamps: false,
});

module.exports = Like;