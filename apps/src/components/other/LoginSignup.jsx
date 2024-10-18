import React, { useState } from 'react';
import user_icon from '../assets/user.svg';
import email_icon from '../assets/email.svg';
import password_icon from '../assets/password.svg';
import '../css/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginSignup() {
    const navigate = useNavigate();
    const [Action, setAction] = useState("LOGIN");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);  // State for error messages

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form refresh
        setError(null); // Reset error state before each submission

        if (Action === "SIGNUP") {
            try {
                const response = await axios.post('http://localhost:8000/api/signup/', {
                    username,
                    email,
                    password,
                });
                console.log(response.data);
                alert(response.data.success);
                setUsername('');  // Clear the username field
                setEmail('');     // Clear the email field
                setPassword('');  // Clear the password field
                setAction("LOGIN"); // Switch to LOGIN after successful signup
            } catch (error) {
                console.error(error.response ? error.response.data : error.message); // Log detailed error
                setError(error.response ? error.response.data.error : "An error occurred during signup");
            }
        } else if (Action === "LOGIN") {
            try {
                const response = await axios.post('http://localhost:8000/api/login/', {
                    email,
                    password,
                });
                console.log(response.data);
                alert(response.data.success);
                navigate('/homepage'); // Navigate to homepage after successful login
            } catch (error) {
                console.error(error.response ? error.response.data : error.message); // Log detailed error
                setError(error.response ? error.response.data.error : "An error occurred during login");
            }
        }
    };

    return (
        <div className='container'> {/* Single parent element */}
            <div className="header">
                <h2>{Action}</h2>
            </div>
            <form onSubmit={handleSubmit}> {/* Handle form submission here */}
                <div className="contents">
                    {Action === "SIGNUP" && (
                        <div className="inputs">
                            <img src={user_icon} alt='user icon' />
                            <input
                                type="text"
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required />
                        </div>
                    )}
                    <div className="inputs">
                        <img src={email_icon} alt='email icon' />
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className="inputs">
                        <img src={password_icon} alt='password icon' />
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>} {/* Display error messages */}
                
                <div className="text-1">
                    {Action === "LOGIN" && (
                        <div>
                            <span>Don't have an account? </span>
                            <span
                                className="toggle-action"
                                onClick={() => setAction("SIGNUP")}
                            >
                                Sign Up
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="submit-buttons">
                    <button type="submit" className="submit">
                        {Action === "SIGNUP" ? "SIGNUP" : "LOGIN"}
                    </button>
                </div>
            </form> {/* Form wrapped around the button */}
        </div>
    );
}
