import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import emailIcon from './../assets/email.png';
import passwordIcon from './../assets/password.png';
import './../Style/LoginSignup.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage("");
    
        // Check if admin credentials are entered
        if (email === "admin" && password === "123") {
            console.log("Admin login detected. Redirecting to Admin page.");
            navigate("/Admin");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Login failed");
            }
    
            const data = await response.json();
            console.log("Login successful!", data);
    
            // Save the token and userId in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
    
            // Navigate to home page
            navigate("/Home");
    
        } catch (error) {
            setErrorMessage(error.message);
            console.error("Login error:", error.message);
    
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    return (
        <section>
            {errorMessage && (
                <div className="error-popup">
                    <span className="error-icon">❌</span>
                    <span>{errorMessage}</span>
                    <button className="close-btn" onClick={() => setErrorMessage("")}>✖</button>
                </div>
            )}

            <h1 className='welcome'>Welcome to TazaNews</h1>
            <div className="container">
                <div className="logHeader">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
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
                    <div className="submit gray" onClick={() => navigate("/signup")}>Sign Up</div>
                    <div className='submit' onClick={handleLogin}>Login</div>
                </div>
            </div>
        </section>
    );
}

export default Login;
