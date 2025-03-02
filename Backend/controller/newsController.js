const News = require("../Model/News"); // Import the News model

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

    const imagePath = `${req.protocol}://${req.get('host')}/uploads/${image.filename}`;

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

// ✅ Like a News Article
const likeNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the news article by id
    const news = await News.findOne({
      where: { id },
    });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // Increment the like count
    news.likes += 1;
    await news.save(); // Save the updated news article

    res.json(news);
  } catch (error) {
    console.error("Error liking news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllNews, addNews, likeNews };
