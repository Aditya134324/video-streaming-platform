import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../services/api";
import "../styles/Navbar.css";

const Navbar = () => {

const navigate = useNavigate();
const token = localStorage.getItem("token");

const [user, setUser] = useState(null);
const [search, setSearch] = useState("");

useEffect(() => {
    const fetchUser = async () => {

        if (!token) {
            return;
        }

        try {
            const data = await getUserProfile(token);

            if (data.user) {
                setUser(data.user);
            }

        } catch (error) {
            console.log(error);
        }
    };

    fetchUser();
}, [token]);

const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};

const handleSearch = (e) => {
    if(e.key === "Enter" && search.trim()){
        navigate(`/search?query=${search}`);
    }
};

return (
    <nav className="navbar">
        <div className="logo">Video Verse</div>
        <div className="search-bar">
            <input type="text" placeholder="Search videos..." value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleSearch}/>
        </div>

        <div className="nav-links">
            <Link to="/" className="page">Home</Link>

            {token ? (
                <>
             <Link to="/upload" className="page">Upload</Link>
             <button onClick={handleLogout} className="button logout-btn">Logout</button>
             <Link to="/profile" className="profile-link">
             <img src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=8B5CF6&color=fff"} alt="Profile" className="nav-avatar" />
             </Link>
                </>
            ) : (
                <>
                    <Link to="/login" className="button login-btn">Login</Link>
                    <Link to="/signup" className="button signup-btn">Sign Up</Link>
                </>
            )}

        </div>

    </nav>
);
};

export default Navbar;