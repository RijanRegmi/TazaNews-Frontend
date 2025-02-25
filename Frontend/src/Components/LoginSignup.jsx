import { useState } from 'react';
import passwordIcon from './../assets/email.png';
import emailIcon from './../assets/password.png';
import userIcon from './../assets/person.png';
import './../Style/LoginSignup.css';
const LoginSignup = () => {

    const [action, setAction] = useState("Login");

    return(
        <>
            <section>
                <h1 className='welcome'>Welcome to TazaNews</h1>
                
                <div className="container">
                    <div className="logHeader">
                        <div className="text">{action}</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        
                        {action==="Login"?<div></div>:
                            <div className="input">
                            <img src={userIcon} alt="" />
                            <input type="text" placeholder='Name' />
                            </div>                        
                        }
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
                        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginSignup