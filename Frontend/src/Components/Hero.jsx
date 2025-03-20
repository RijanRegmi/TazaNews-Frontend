import './../Style/Hero.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Hero(){
    const navigate = useNavigate();
        const location = useLocation();
    
        const isActive = (path) => location.pathname === path;
    return(
        <>
            <section className = "hero">
                <h4>Trending News</h4>
                <h2>Quickest News Platform</h2>
                <h1>On all catagories of News</h1>
                <p>You can explore all of them</p>
                <button className={isActive("/News") ? "active" : ""} onClick={() => navigate("/News")}>Explore</button>
            </section>
        </>
    );
}

export default Hero