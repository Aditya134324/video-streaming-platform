import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api.js";
import "../styles/Signup.css";

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
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

            const data = await signup(formData);

            if (data.message === "User created successfully") {
                navigate("/login");
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.log(error);
            setMessage("Failed to signup");
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">Sign up to start watching and sharing videos.</p>

            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input className="signup-input" type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input className="signup-input" type="text" name="username" placeholder="Choose a username" value={formData.username} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input className="signup-input" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input className="signup-input" type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
                </div>

                {message && <p className="signup-message">{message}</p>}

                <button className="signup-button" type="submit">
                    Create Account
                </button>
            </form>

            <p className="signup-footer">
                Already have an account?{" "}
                <Link className="signup-link" to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;