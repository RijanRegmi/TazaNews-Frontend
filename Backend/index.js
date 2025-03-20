  const express = require("express");
  const cors = require("cors");
  const authRoutes = require("./routes/authRoutes");
  const newsRoutes = require("./routes/newsRoutes");
  const pool  = require("./config/db"); 
  require("dotenv").config(); 
  const sequelize = require("./config/db");
  const profieRoutes = require("./routes/profileRoutes");

(async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
})();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));



  app.use(express.json());

  const allowedOrigins = ['http://localhost:5173']; 
const options = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(options));

  app.use("/api", authRoutes);
  app.use("/profile", profieRoutes);

  app.use("/news", newsRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
