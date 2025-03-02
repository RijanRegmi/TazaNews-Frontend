import { useEffect, useState } from "react";
import axios from "axios";
import "./../Style/News.css";
import "./../Style/Header.css";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const UpdateNews = () => {
  const [news, setNews] = useState([]);
  const [likes, setLikes] = useState({});
  const [likedArticles, setLikedArticles] = useState({});
  const [editingArticle, setEditingArticle] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  
  useEffect(() => {
    axios.get("http://localhost:5000/news/get-all-news")
      .then(response => {
        setNews(response.data);
        const initialLikes = {};
        const initialLikedState = {};
        response.data.forEach(article => {
          initialLikes[article.id] = article.likes;
          initialLikedState[article.id] = false;
        });
        setLikes(initialLikes);
        setLikedArticles(initialLikedState);
      })
      .catch(error => console.error("Error fetching news:", error));
  }, []);

  const handleLike = (id) => {
    const isLiked = likedArticles[id];

    axios.post(`http://localhost:5000/news/${isLiked ? "unlike" : "like"}/${id}`)
      .then(response => {
        setLikes(prevLikes => ({
          ...prevLikes,
          [id]: response.data.likes,
        }));
        setLikedArticles(prevLiked => ({
          ...prevLiked,
          [id]: !prevLiked[id],
        }));
      })
      .catch(error => console.error("Error updating like:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      axios.delete(`http://localhost:5000/news/delete/${id}`)
        .then(() => {
          setNews(news.filter(article => article.id !== id));
        })
        .catch(error => console.error("Error deleting news:", error));
    }
  };

  const handleUpdate = (article) => {
    setEditingArticle(article);
    setUpdatedTitle(article.title);
    setUpdatedText(article.text);
  };

  const handleUpdateSubmit = () => {
    axios.put(`http://localhost:5000/news/update/${editingArticle.id}`, {
      title: updatedTitle,
      text: updatedText
    }).then(() => {
      setNews(news.map(article => article.id === editingArticle.id ? { ...article, title: updatedTitle, text: updatedText } : article));
      setEditingArticle(null);
    }).catch(error => console.error("Error updating news:", error));
  };

  return (
    <>
      <section className="news-section">
        <div className="news-container">
          {news.map((article) => (
            <div className="news-box" key={article.id}>
              <div className="news-img">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="news-details">
                <h4 className="news-title">{article.title}</h4>
                <p className="news-text">{article.text}</p>
                <button className={`like-btn ${likedArticles[article.id] ? "liked" : ""}`} onClick={() => handleLike(article.id)}>
                  <FaHeart className="like-icon" /> {likes[article.id] || 0}
                </button>
                <button className="edit-btn" onClick={() => handleUpdate(article)}>
                  <FaEdit />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(article.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {editingArticle && (
        <div className="update-modal">
          <h3>Update News</h3>
          <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
          <textarea value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} />
          <button onClick={handleUpdateSubmit}>Save Changes</button>
          <button onClick={() => setEditingArticle(null)}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default UpdateNews;