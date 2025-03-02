const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a Sequelize instance with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASS, // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: "postgres", // Database dialect (e.g., postgres, mysql, etc.)
    port: process.env.DB_PORT || 5432, // Database port
    logging: false, // Disable logging; set to true for debugging
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
