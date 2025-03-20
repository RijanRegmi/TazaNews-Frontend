import { useEffect, useState } from "react";
import axios from "axios";
import "./../Style/News.css";
import "./../Style/Header.css";
import { FaHeart } from "react-icons/fa";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const News = () => {
  const [news, setNews] = useState([]);
  const [likedArticles, setLikedArticles] = useState({}); // Track liked state
  const [expandedArticles, setExpandedArticles] = useState({}); // Track expanded state

  // Fetch all news articles on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/news/get-all-news")
      .then((response) => {
        setNews(response.data);
        const initialLikedState = {};
        response.data.forEach((article) => {
          initialLikedState[article.id] = false; // Initialize liked state
        });
        setLikedArticles(initialLikedState);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  // Handle like button click
  const handleLike = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/news/${id}/like`);
      setLikedArticles((prevLiked) => ({
        ...prevLiked,
        [id]: !prevLiked[id], // Toggle liked state
      }));
      setNews((prevNews) =>
        prevNews.map((article) =>
          article.id === id
            ? { ...article, likes: response.data.likes }
            : article
        )
      );
    } catch (error) {
      console.error("Error liking news:", error);
    }
  };

  // Handle "Read More" button click
  const handleReadMore = (id) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle expanded state
    }));
  };

  return (
    <>
      <Header />
      <section className="news-section">
        <div className="news-container">
        <section className = "page-header">
            <div className="about-header">
                <h2>#News</h2>
                <p>See the latest and fastest news.</p>
            </div>
        </section>
          {news.map((article) => {
            const isExpanded = expandedArticles[article.id]; // Check if the article is expanded
            const displayText = isExpanded
              ? article.text // Show full text if expanded
              : article.text.slice(0, 150) + "..."; // Show limited text if not expanded

            return (
              <div className="news-box" key={article.id}>
                <div className="news-img">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="news-details">
                  <h4 className="news-title">{article.title}</h4>
                  <p className="news-text">
                    {displayText}
                    {article.text.length > 150 && ( // Show "Read More" button if text is long
                      <button
                        className="read-more-btn"
                        onClick={() => handleReadMore(article.id)}
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </p>
                  <button
                    className={`like-btn ${likedArticles[article.id] ? "liked" : ""}`}
                    onClick={() => handleLike(article.id)}
                  >
                    <FaHeart className="like-icon" /> {article.likes || 0}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default News;