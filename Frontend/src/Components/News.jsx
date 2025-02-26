import { useState } from "react";
import "./../Style/News.css";
import mnr from "./../assets/mnr.jpg";

function News() {
  const fullText =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid consectetur labore quasi! Aspernatur minima modi dignissimos, eligendi facere animi asperiores totam atque ea at obcaecati voluptates. Alias voluptates ducimus fuga?";
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <section className="page-header">
        <div className="blog-header">
          <h2>#ReadMore</h2>
          <p>Read all case studies about our product</p>
        </div>
      </section>

      <section className="blog">
        <div className="blog-box">
          <div className="blog-img">
            <img src={mnr} alt="Messi Neymar Ronaldo" />
          </div>
          <div className="blog-details">
            <h4 className="blog-title">Messi Neymar and Ronaldo</h4>
            <p className={`blog-text ${isExpanded ? "expanded" : "collapsed"}`}>
              {isExpanded ? fullText : `${fullText.substring(0, 100)}...`}
            </p>
            <button
              className="read-more-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "SHOW LESS" : "CONTINUE READING"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default News;
