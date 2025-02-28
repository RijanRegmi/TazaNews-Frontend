import { useLocation, useNavigate } from 'react-router-dom';
import profilepic from './../assets/TazaNews.png';
import './../Style/Header.css';
import 'bootstrap/dist/css/bootstrap.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

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
                        </ul>
                    </nav>
                </div>
                <div className="mobile">
                    <i className="bi bi-x-lg"></i>
                </div>
            </section>
        </>
    );
}

export default Header;
