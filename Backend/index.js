  const express = require("express");
  const cors = require("cors");
  const authRoutes = require("./routes/authRoutes");
  const newsRoutes = require("./routes/newsRoutes");
  const pool  = require("./config/db"); // Assuming createNewsTable is defined in ./db
  require("dotenv").config(); // Load environment variables
  const sequelize = require("./config/db");
  const profieRoutes = require("./routes/profileRoutes");

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Use `force: true` to drop and recreate tables
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
})();

const app = express();

app.use(express.json());
// Use express.static to serve static files (e.g., images in 'uploads' folder)
app.use("/uploads", express.static("uploads")); // Make files in 'uploads' accessible via /uploads route



  app.use(express.json());

  const allowedOrigins = ['http://localhost:5173']; // Add your frontend URL here
const options = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(options));

  // Route handler
  app.use("/api", authRoutes);
  app.use("/profile", profieRoutes);

  app.use("/news", newsRoutes);

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
