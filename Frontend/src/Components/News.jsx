import { useEffect, useState } from "react";
import axios from "axios";
import "./../Style/News.css";
import "./../Style/Header.css";
import { FaHeart } from "react-icons/fa";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import AdminNews from "./AdminNews.jsx";

const News = () => {
  const [news, setNews] = useState([]);
  const [likes, setLikes] = useState({});
  const [likedArticles, setLikedArticles] = useState({});

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
          [id]: !prevLiked[id], // Toggle like state
        }));
      })
      .catch(error => console.error("Error updating like:", error));
  };

  return (
    <>
      <Header />
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
                <button
                  className={`like-btn ${likedArticles[article.id] ? "liked" : ""}`}
                  onClick={() => handleLike(article.id)}
                >
                  <FaHeart className="like-icon" /> {likes[article.id] || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <AdminNews />
    </>
  );
};

export default News;
