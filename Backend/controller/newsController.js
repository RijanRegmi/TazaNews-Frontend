const News = require("../Model/News"); // Import the News model
const fs = require("fs"); // For handling file deletion
const path = require("path"); // For handling file paths
const Like = require("../Model/Like"); // Import the Like model

// ✅ Get All News
const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({
      order: [["created_at", "DESC"]], // Order by created_at in descending order
    });
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Add News
const addNews = async (req, res) => {
  try {
    const { title, text } = req.body;
    const image = req.file; // Multer handles file upload

    if (!title || !text || !image) {
      return res.status(400).json({ message: "Title, text, and image are required" });
    }

    const imagePath = `${req.protocol}://${req.get("host")}/uploads/${image.filename}`;

    // Create new news article using Sequelize
    const newNews = await News.create({
      title,
      text,
      image: imagePath,
    });

    res.status(201).json(newNews);
  } catch (error) {
    console.error("Error adding news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Edit News
const editNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    const image = req.file; // Multer handles file upload

    // Find the news article by id
    const news = await News.findOne({
      where: { id },
    });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // Update the news article
    news.title = title || news.title;
    news.text = text || news.text;

    if (image) {
      // Delete the old image file (if it exists)
      if (news.image) {
        const oldImagePath = path.join(__dirname, "..", "uploads", path.basename(news.image));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete the old image file
        }
      }

      // Update the image path
      const imagePath = `${req.protocol}://${req.get("host")}/uploads/${image.filename}`;
      news.image = imagePath;
    }

    await news.save(); // Save the updated news article

    res.json(news);
  } catch (error) {
    console.error("Error editing news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Delete News
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the news article by id
    const news = await News.findOne({
      where: { id },
    });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // Delete the associated image file (if it exists)
    if (news.image) {
      const imagePath = path.join(__dirname, "..", "uploads", path.basename(news.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      }
    }

    // Delete the news article from the database
    await news.destroy();

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Like a News Article
const likeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assuming you have user authentication

    // Check if the user has already liked/disliked the news
    const existingLike = await Like.findOne({
      where: { userId, newsId: id },
    });

    if (existingLike) {
      // If the user already liked, unlike the article
      if (existingLike.liked) {
        await existingLike.destroy();
        await News.decrement("likes", { where: { id } });
        return res.json({ message: "Like removed", likes: await getLikesCount(id) });
      } else {
        // If the user disliked, change it to a like
        existingLike.liked = true;
        await existingLike.save();
        await News.increment("likes", { where: { id } });
        return res.json({ message: "Dislike changed to like", likes: await getLikesCount(id) });
      }
    }

    // If the user hasn't liked/disliked before, add a like
    await Like.create({ userId, newsId: id, liked: true });
    await News.increment("likes", { where: { id } });

    res.json({ message: "News liked successfully", likes: await getLikesCount(id) });
  } catch (error) {
    console.error("Error liking news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Dislike a News Article
const dislikeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assuming you have user authentication

    // Check if the user has already liked/disliked the news
    const existingLike = await Like.findOne({
      where: { userId, newsId: id },
    });

    if (existingLike) {
      // If the user already disliked, remove the dislike
      if (!existingLike.liked) {
        await existingLike.destroy();
        await News.increment("likes", { where: { id } });
        return res.json({ message: "Dislike removed", likes: await getLikesCount(id) });
      } else {
        // If the user liked, change it to a dislike
        existingLike.liked = false;
        await existingLike.save();
        await News.decrement("likes", { where: { id } });
        return res.json({ message: "Like changed to dislike", likes: await getLikesCount(id) });
      }
    }

    // If the user hasn't liked/disliked before, add a dislike
    await Like.create({ userId, newsId: id, liked: false });
    await News.decrement("likes", { where: { id } });

    res.json({ message: "News disliked successfully", likes: await getLikesCount(id) });
  } catch (error) {
    console.error("Error disliking news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Helper function to get the current like count
const getLikesCount = async (newsId) => {
  const news = await News.findOne({ where: { id: newsId } });
  return news.likes;
};

module.exports = { getAllNews, addNews, editNews, deleteNews, likeNews, dislikeNews };