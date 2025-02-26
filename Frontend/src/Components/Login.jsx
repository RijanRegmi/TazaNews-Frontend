import { useState } from 'react';
import passwordIcon from './../assets/email.png';
import emailIcon from './../assets/password.png';
import userIcon from './../assets/person.png';
import './../Style/LoginSignup.css';
import { useNavigate } from "react-router-dom";
const Login = () => {

    const navigate = useNavigate();
    const [action, setAction] = useState("Login");

    return(
        <>
            <section>
                <h1 className='welcome'>Welcome to TazaNews</h1>
                
                <div className="container">
                    <div className="logHeader">
                        <div className="text">Login</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={emailIcon} alt="" />
                            <input type="email" placeholder='Email' />
                        </div>
                        <div className="input">
                            <img src={passwordIcon} alt="" />
                            <input type="password" placeholder='Password' />
                        </div>
                    </div>
                    <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
                    <div className="submit-container">
                    <div className="submit gray"  onClick={() => navigate("/SignUp")}>Sign Up</div>
                    <div className='submit' onClick={() => navigate("/MainApp")}>Login</div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login