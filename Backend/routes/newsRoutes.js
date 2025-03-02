const express = require("express");
const { getAllNews, addNews, likeNews } = require("../controller/newsController");
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


const router = express.Router();

router.get("/get-all-news", getAllNews);
router.post("/add-news", upload.single("image"), addNews);
router.put("/news/:id/like", likeNews);

module.exports = router
