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
  const [newsList, setNewsList] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [expandedNews, setExpandedNews] = useState({});

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/news/get-all-news");
      setNewsList(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
      setMessage("Failed to fetch news articles.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("image", image);

    try {
      if (editingNews) {
        const response = await axios.put(
          `http://localhost:5000/news/edit-news/${editingNews.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage(response.data.message);
      } else {
        const response = await axios.post(
          "http://localhost:5000/news/add-news",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage(response.data.message);
      }
      setTitle("");
      setText("");
      setImage(null);
      setEditingNews(null);
      fetchNews();
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to perform the operation.");
    }
  };

  const handleEdit = (news) => {
    setTitle(news.title);
    setText(news.text);
    setImage(null); 
    setEditingNews(news);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this news article?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`http://localhost:5000/news/delete-news/${id}`);
      setMessage(response.data.message);
      fetchNews(); 
    } catch (error) {
      console.error("Error deleting news:", error);
      setMessage("Failed to delete news.");
    }
  };
  

  const handleReadMore = (id) => {
    setExpandedNews((prev) => ({
      ...prev,
      [id]: !prev[id], 
    }));
  };

  return (
    <>
      <HeaderAdmin />
      <div className="admin-container">
      <div className="AddNews-container">
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
            placeholder="News Article"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required={!editingNews} 
          />
          <button type="submit">{editingNews ? "Update News" : "Add News"}</button>
          {editingNews && (
            <button type="button" onClick={() => setEditingNews(null)}>
              Cancel Edit
            </button>
          )}
          </form>
          </div>

        <h2>News Articles</h2>
        {message && <p className="message">{message}</p>}

        <div className="news-list">
          {newsList.map((news) => {
            const isExpanded = expandedNews[news.id]; 
            const displayText = isExpanded
              ? news.text 
              : news.text.slice(0, 150) + "..."; 

            return (
              <div key={news.id} className="news-item">
                <h3>{news.title}</h3>
                <p className="news-text">
                  {displayText}
                  {news.text.length > 150 && ( 
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
      </div>
      <Footer />
    </>
  );
};

export default AdminNews;