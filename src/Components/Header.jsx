import profilepic from './../assets/TazaNews.png';
import './../Style/Header.css';
import 'bootstrap/dist/css/bootstrap.css';

function Header() {
    return (
        <>
            <sectio className = "header">
                
                    <a href="#">
                    <img src={profilepic} alt=""  className="logo"/>
                    </a>
                <div>
                    <nav>
                        <ul className="navbar" id="navbar">
                            <li><a href="#" className="active">Home</a></li>
                            <li><a href="#News" >News</a></li>
                            <li><a href="#" >Category</a></li>
                            <li><a href="#About" >About</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="mobile">
                    <i class="bi bi-x-lg"></i>
                </div>
            </sectio>
        </>
    );
}

export default Header;
