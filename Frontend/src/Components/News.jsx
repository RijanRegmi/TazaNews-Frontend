import { useState } from "react";
import "./../Style/News.css";
import "./../Style/Header.css";
import mnr from "./../assets/mnr.jpg";
import profilepic from "./../assets/TazaNews.png";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
const News = () => {
  const fullText =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid consectetur labore quasi! Aspernatur minima modi dignissimos, eligendi facere animi asperiores totam atque ea at obcaecati voluptates. Alias voluptates ducimus fuga?";
  
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    let cutIndex = text.lastIndexOf(" ", length);
    return text.substring(0, cutIndex) + "...";
  };
  const navigate = useNavigate();

  return (
    <>
      <Header/>

      <section className="page-header">
        <div className="news-header">
          <h2>#ReadMore</h2>
          <p>Read all latest news of the world</p>
        </div>
      </section>

      <section className="news">
        <div className="news-box">
          <div className="news-img">
            <img src={mnr} alt="Messi Neymar Ronaldo" />
          </div>
          <div className="news-details">
            <h4 className="news-title">Messi Neymar and Ronaldo</h4>
            <p className={`news-text ${isExpanded ? "expanded" : "collapsed"}`}>
              {isExpanded ? fullText : truncateText(fullText, 500)}
            </p>
            <button
              className="read-more-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Show less text" : "Expand full text"}
            >
              {isExpanded ? "SHOW LESS" : "CONTINUE READING"}
            </button>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default News;
