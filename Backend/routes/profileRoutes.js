const express = require("express");
const upload = require("../middleware/uploadMiddleware"); // Import multer middleware
const { updateUser,getUserProfile } = require("../controller/userController"); // Correct path based on your structure

const router = express.Router();

router.put("/update/:id", upload.single("image"), updateUser);
router.get("/get-profile/:id",getUserProfile)
module.exports = router;
