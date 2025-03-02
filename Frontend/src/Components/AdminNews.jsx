import { useState, useEffect } from "react";
import axios from "axios";
import './../Style/AdminNews.css';
import HeaderAdmin from './HeaderAdmin.jsx';
import Footer from './Footer.jsx';

const AdminNews = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [newsList, setNewsList] = useState([]); // State to store news articles
  const [editingNews, setEditingNews] = useState(null); // Track the news being edited
  const [expandedNews, setExpandedNews] = useState({}); // Track expanded news articles

  // Fetch all news articles on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Fetch news articles from the backend
  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/news/get-all-news");
      setNewsList(response.data); // Update the news list
    } catch (error) {
      console.error("Error fetching news:", error);
      setMessage("Failed to fetch news articles.");
    }
  };

  // Handle form submission (add or edit news)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("image", image);

    try {
      if (editingNews) {
        // If editing, send a PUT request
        const response = await axios.put(
          `http://localhost:5000/news/edit-news/${editingNews.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage(response.data.message);
      } else {
        // If creating, send a POST request
        const response = await axios.post(
          "http://localhost:5000/news/add-news",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage(response.data.message);
      }
      // Reset form and fetch updated news list
      setTitle("");
      setText("");
      setImage(null);
      setEditingNews(null);
      fetchNews(); // Refresh the news list
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to perform the operation.");
    }
  };

  // Handle edit button click
  const handleEdit = (news) => {
    setTitle(news.title);
    setText(news.text);
    setImage(null); // Reset image input (or pre-fill if you have an image URL)
    setEditingNews(news);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/news/delete-news/${id}`);
      setMessage(response.data.message);
      fetchNews(); // Refresh the news list
    } catch (error) {
      console.error("Error deleting news:", error);
      setMessage("Failed to delete news.");
    }
  };

  // Handle "Read More" button click
  const handleReadMore = (id) => {
    setExpandedNews((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle expanded state
    }));
  };

  return (
    <>
      <HeaderAdmin />
      <div className="admin-container">
        <h2>News Articles</h2>
        {message && <p className="message">{message}</p>}

        {/* Display existing news articles */}
        <div className="news-list">
          {newsList.map((news) => {
            const isExpanded = expandedNews[news.id]; // Check if the news is expanded
            const displayText = isExpanded
              ? news.text // Show full text if expanded
              : news.text.slice(0, 150) + "..."; // Show limited text if not expanded

            return (
              <div key={news.id} className="news-item">
                <h3>{news.title}</h3>
                <p className="news-text">
                  {displayText}
                  {news.text.length > 150 && ( // Show "Read More" button if text is long
                    <button
                      className="read-more-btn"
                      onClick={() => handleReadMore(news.id)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
                {news.image && (
                  <img
                    src={news.image}
                    alt={news.title}
                    className="news-image"
                  />
                )}
                <div className="news-actions">
                  <button onClick={() => handleEdit(news)}>Edit</button>
                  <button onClick={() => handleDelete(news.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add/Edit News Form */}
        <h2>{editingNews ? "Edit News Article" : "Add News Article"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="News Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required={!editingNews} // Only required when creating new news
          />
          <button type="submit">{editingNews ? "Update News" : "Add News"}</button>
          {editingNews && (
            <button type="button" onClick={() => setEditingNews(null)}>
              Cancel Edit
            </button>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AdminNews;