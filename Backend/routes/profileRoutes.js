const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { updateUser,getUserProfile } = require("../controller/userController");

const router = express.Router();

router.put("/update/:id", upload.single("image"), updateUser);
router.get("/get-profile/:id",getUserProfile)
module.exports = router;
