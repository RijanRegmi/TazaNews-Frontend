import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import emailIcon from './../assets/email.png';
import passwordIcon from './../assets/password.png';
import userIcon from './../assets/person.png';
import phoneIcon from './../assets/phone.png';
import './../Style/LoginSignup.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, password }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Signup successful!");
                navigate("/login");
            } else {
                alert(data.error || "An error occurred.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Server error, try again later.");
        }
    };
    

    return (
        <section>
            <h1 className='welcome'>Welcome to TazaNews</h1>
            <div className="container">
                <div className="logHeader">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={userIcon} alt="" />
                        <input 
                            type="text" 
                            placeholder='Name' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>       
                    <div className="input">
                        <img src={emailIcon} alt="" />
                        <input 
                            type="email" 
                            placeholder='Email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="input">
                        <img src={phoneIcon} alt="" />
                        <input 
                            type="text" 
                            placeholder='Phone' 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                        />
                    </div>
                    <div className="input">
                        <img src={passwordIcon} alt="" />
                        <input 
                            type="password" 
                            placeholder='Password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="submit-container">
                    <div className="submit" onClick={handleSignUp}>Sign Up</div>
                    <div className='submit gray' onClick={() => navigate("/login")}>Login</div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
