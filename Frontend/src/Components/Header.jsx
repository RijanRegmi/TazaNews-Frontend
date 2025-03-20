import { useLocation, useNavigate } from 'react-router-dom';
import profilepic from './../assets/TazaNews.png';
import './../Style/Header.css';
import 'bootstrap/dist/css/bootstrap.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');
    
    const isActive = (path) => location.pathname === path;
    if (bar){
        bar.addEventListener('click', () => {
        nav.classList.add('active');
        })
    }
    if (close){
        close.addEventListener('click', () => {
        nav.classList.remove('active');
        })
    }

    return (
        <>
            <section className="header">
                <a href="#" onClick={() => navigate("/Home")}>
                    <img src={profilepic} alt="Taza News Logo" className="logo" />
                </a>
                <div>
                    <nav>
                        <ul className="navbar" id="navbar">
                            <li><a href="" className={isActive("/Home") ? "active" : ""} onClick={() => navigate("/Home")}>Home</a></li>
                            <li><a href="" className={isActive("/News") ? "active" : ""} onClick={() => navigate("/News")}>News</a></li>
                            <li><a href="" className={isActive("/About") ? "active" : ""} onClick={() => navigate("/About")}>About</a></li>
                            <li><a href="#" className={isActive("/Profile") ? "active" : ""} onClick={() => navigate("/Profile")}>Profile</a></li>
                            <li><a href="#" className={isActive("/Login") ? "active" : ""} onClick={() => navigate("/Login")}>Log Out</a></li>
                            <a href="#" className="close">❌</a>
                        </ul>
                    </nav>
                </div>
                <div className="mobile">
                <i className="bar" A></i>
                </div>
            </section>
        </>
    );
}

export default Header;
