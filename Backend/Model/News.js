const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const News = sequelize.define("News", {
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "news",
  timestamps: false,
});

module.exports = News;