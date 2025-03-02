const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
  },
});

// Initialize Multer
const upload = multer({
  storage,
  limits: { fileSize: Infinity }, // No file size limit
  fileFilter: (req, file, cb) => {
    cb(null, true); // Accept all file types
  },
});

module.exports = upload;