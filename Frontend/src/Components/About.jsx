import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profilepic from "./../assets/TazaNews.png";
import "bootstrap/dist/css/bootstrap.css";
import './../Style/About.css';
import TazaNews from './../assets/TazaNews.png';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
function About() {
  const navigate = useNavigate();
  const [action, setAction] = useState("News");

  return (
    <>
        <Header/>

        <section className = "page-header">
            <div className="about-header">
                <h2>#KnowUs</h2>
                <p>Lorem ipsum dolor sit amet, consecteur</p>
            </div>
        </section>

        <section className="about-head" >
            <div className="section-p1">
                <img src={TazaNews} alt="" />
                <div>
                <h2>Who We Are?</h2>
                <p>Learn more about who we are and what we do. Our platform delivers the latest and most relevant news, covering a wide range of topics including politics, sports, entertainment, and technology. We strive to provide accurate and timely reports, keeping our audience informed and engaged. Explore our top stories, trending topics, and in-depth analyses. Stay updated with the news that matters, anytime, anywhere.</p>
                <abbr title="Create stunning image with as much or as lettle control as you like"></abbr>
                <br/>
                    <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">Our platform brings you stunning images that capture the essence of every news.</marquee>
                </div>
            </div>
        </section>
        <Footer/>
    </>
  );
}

export default About;
