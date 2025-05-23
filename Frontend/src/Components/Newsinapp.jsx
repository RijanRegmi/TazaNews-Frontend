import { useEffect, useState } from "react";
import axios from "axios";
import './../Style/Newsinapp.css';

function Newsinapp() {
  const [news, setNews] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/news/get-all-news")
      .then((response) => {
        const sortedNews = response.data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6);
        setNews(sortedNews);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const handleReadMore = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <section className="News section-p1" id="News">
        <h2>Latest News</h2>
        <div className="pro-container">
          {news.map((article) => {
            const isExpanded = expandedId === article.id;
            const displayText = isExpanded
              ? article.text
              : article.text.slice(0, 150) + "...";

            return (
              <div
                className={`pro ${isExpanded ? "expanded" : ""}`}
                key={article.id}
              >
                {article.image && (
                  <img src={article.image} alt={article.title} />
                )}
                <div className="des">
                  <span>{article.category || "News Category"}</span>
                  <h5>{article.title}</h5>
                  <p>
                    {displayText}
                    {article.text.length > 150 && ( 
                      <button
                        className="read-more-btn"
                        onClick={() => handleReadMore(article.id)}
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Newsinapp;