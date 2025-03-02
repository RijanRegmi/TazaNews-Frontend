const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
  },
});

// No size limit and allow any file type
const upload = multer({
  storage,
  // File size limit removed
  limits: { fileSize: Infinity }, // Alternatively, you can omit this line entirely
  fileFilter: (req, file, cb) => {
    cb(null, true); // Accept all file types
  },
});

module.exports = upload;
