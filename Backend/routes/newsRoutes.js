const express = require("express");
const {
  getAllNews,
  addNews,
  editNews,
  deleteNews,
  likeNews,
  dislikeNews,
} = require("../controller/newsController");
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/get-all-news", getAllNews);
router.post("/add-news", upload.single("image"), addNews);
router.put("/edit-news/:id", upload.single("image"), editNews);
router.delete("/delete-news/:id", deleteNews);
router.post("/news/:id/like", authenticateToken, likeNews); 
router.post("/news/:id/dislike", authenticateToken, dislikeNews);

module.exports = router;