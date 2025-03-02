const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Assuming you have sequelize instance in this file

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
  tableName: "news", // Ensure the table name is 'news'
  timestamps: false, // Since you're using 'created_at' explicitly, we don't need Sequelize's default timestamp fields
});

module.exports = News;
