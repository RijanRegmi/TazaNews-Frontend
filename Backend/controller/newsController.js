const News = require("../Model/News");
const fs = require("fs");
const path = require("path");
const Like = require("../Model/Like");

const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({
      order: [["created_at", "DESC"]],
    });
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addNews = async (req, res) => {
  try {
    const { title, text } = req.body;
    const image = req.file;

    if (!title || !text || !image) {
      return res.status(400).json({ message: "Title, text, and image are required" });
    }

    const imagePath = `${req.protocol}://${req.get("host")}/uploads/${image.filename}`;

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

const editNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    const image = req.file;

    const news = await News.findOne({
      where: { id },
    });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    news.title = title || news.title;
    news.text = text || news.text;

    if (image) {
      if (news.image) {
        const oldImagePath = path.join(__dirname, "..", "uploads", path.basename(news.image));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const imagePath = `${req.protocol}://${req.get("host")}/uploads/${image.filename}`;
      news.image = imagePath;
    }

    await news.save();

    res.json(news);
  } catch (error) {
    console.error("Error editing news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findOne({
      where: { id },
    });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    if (news.image) {
      const imagePath = path.join(__dirname, "..", "uploads", path.basename(news.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await news.destroy();

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const likeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingLike = await Like.findOne({
      where: { userId, newsId: id },
    });

    if (existingLike) {
      if (existingLike.liked) {
        await existingLike.destroy();
        await News.decrement("likes", { where: { id } });
        return res.json({ message: "Like removed", likes: await getLikesCount(id) });
      } else {
        existingLike.liked = true;
        await existingLike.save();
        await News.increment("likes", { where: { id } });
        return res.json({ message: "Dislike changed to like", likes: await getLikesCount(id) });
      }
    }

    await Like.create({ userId, newsId: id, liked: true });
    await News.increment("likes", { where: { id } });

    res.json({ message: "News liked successfully", likes: await getLikesCount(id) });
  } catch (error) {
    console.error("Error liking news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const dislikeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingLike = await Like.findOne({
      where: { userId, newsId: id },
    });

    if (existingLike) {
      if (!existingLike.liked) {
        await existingLike.destroy();
        await News.increment("likes", { where: { id } });
        return res.json({ message: "Dislike removed", likes: await getLikesCount(id) });
      } else {
        existingLike.liked = false;
        await existingLike.save();
        await News.decrement("likes", { where: { id } });
        return res.json({ message: "Like changed to dislike", likes: await getLikesCount(id) });
      }
    }

    await Like.create({ userId, newsId: id, liked: false });
    await News.decrement("likes", { where: { id } });

    res.json({ message: "News disliked successfully", likes: await getLikesCount(id) });
  } catch (error) {
    console.error("Error disliking news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getLikesCount = async (newsId) => {
  const news = await News.findOne({ where: { id: newsId } });
  return news.likes;
};

module.exports = { getAllNews, addNews, editNews, deleteNews, likeNews, dislikeNews };