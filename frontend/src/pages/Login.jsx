import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api.js";
import "../styles/Login.css";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const data = await login(formData);

            if (data.token) {

                localStorage.setItem("token", data.token);

                navigate("/");

            } else {

                setMessage(data.message);

            }

        } catch (error) {

            console.log(error);

            setMessage("Failed to login");

        }
    };

    return (
        <div className="login-container">

            <div className="login-left">

                <h1>VideoVerse</h1>

                <h2>Discover The Future Of Streaming</h2>

                <p>
                    Watch amazing videos, upload your own content and connect with creators around the world.
                </p>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <h1 className="login-title">Welcome Back</h1>

                    <p className="login-subtitle">
                        Login to continue your journey.
                    </p>

                    <form className="login-form" onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Email</label>

                            <input className="login-input" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input className="login-input" type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />

                        </div>

                        {message && <p className="login-message">{message}</p>}

                        <button className="login-button" type="submit">
                            Login
                        </button>

                    </form>

                    <p className="login-footer">

                        Don't have an account?{" "}

                        <Link className="login-link" to="/signup">
                            Sign Up
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;