import profilepic from './../assets/TazaNews.png';
import 'bootstrap/dist/css/bootstrap.css';
import './../Style/Footer.css';
import { useNavigate } from "react-router-dom";


function Footer(){
    const navigate = useNavigate();

    return(
        <>
            <section className='About' >
                <div className='Footer'>
                    <footer className="section-p1">
                        <div className="col">
                            <img className="logo" src={profilepic}  alt="" />
                            <h4>Contact</h4>
                            <p><strong>Address:</strong> Kalanki, Street 00, Kalanki </p>
                            <p><strong>Phone:</strong> (+977)9869061333</p>
                            <div className="follow">
                                <h4>Follow us</h4>
                                <div className="icon">
                                    <i class="bi bi-facebook"></i>
                                    <i className="fa fa-instagram"></i>
                                    <i className="fa fa-twitter"></i>
                                </div>
                            </div>
                    </div>
                    <div className="col">
                        <h4>About</h4>
                        <a href="#" onClick={() => navigate("/About")}>About Us</a>
                        <a href="#News" onClick={() => navigate("/News")}>News Information</a>
                        <a href="#" onClick={() => navigate("/About")}>Privacy Policy</a>
                        <a href="#" onClick={() => navigate("/About")}>Terms & Conditions</a>
                        <a href="#" onClick={() => navigate("/About")}>Contact Us</a>
                    </div>
                    <div className="col">
                        <h4>My Account</h4>
                        <a href="#" onClick={() => navigate("/Login")} >Sign In</a>
                        <a href="#" onClick={() => navigate("/News")}>View News</a>
                        <a href="#">My Whitelist</a>
                        <a href="#" onClick={() => navigate("/About")}>Help</a>
                    </div>

                    <div className="copyright">
                        <p>©️ 2025, TazaNews</p>
                    </div>
                </footer>
                </div>
            </section>
            
        </>
    );
}

export default Footer