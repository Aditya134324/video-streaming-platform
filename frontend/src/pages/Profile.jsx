import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile, updateAvatar, updateCoverImage, getPlaylists, createPlaylist, deletePlaylist,} from "../services/api";
import "../styles/Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [playlistName, setPlaylistName] = useState("");

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = await getUserProfile(token);

            if (data.user) {
                setProfile(data.user); 
                setUsername(data.user.username || "");
                setEmail(data.user.email || "");
            } else {
                alert(data.message || "Failed to load profile");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPlaylists = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = await getPlaylists(token);
            setPlaylists(data.playlists || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchPlaylists();
    }, []);

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();

        if (!playlistName.trim()) {
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const data = await createPlaylist(playlistName, token);

            if (data.playlist) {
                setPlaylists((prev) => [...prev, data.playlist]);
                setPlaylistName("");
            } else {
                alert(data.message || "Failed to create playlist");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to create playlist");
        }
    };

    const handleDeletePlaylist = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const data = await deletePlaylist(id, token);

            if (data.message) {
                setPlaylists((prev) => prev.filter((playlist) => playlist._id !== id));
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete playlist");
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = await updateUserProfile(
                {
                    username,
                    email,
                },
                token
            );

            console.log(data);

            if (data.user) {
                setProfile(data.user);
                alert("Profile updated successfully!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update profile");
        }
    };

    const handleAvatarUpload = async () => {
        if (!avatar) {
            alert("Please select an avatar image.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const data = await updateAvatar(avatar, token);

            console.log(data);

            if (data.user) {
                setProfile(data.user);
                alert("Avatar updated successfully!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update avatar");
        }
    };

    const handleCoverUpload = async () => {
        if (!coverImage) {
            alert("Please select a cover image.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const data = await updateCoverImage(coverImage, token);

            console.log(data);

            if (data.user) {
                setProfile(data.user);
                alert("Cover image updated successfully!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update cover image");
        }
    };

    if (!profile) {
        return <h2>Loading...</h2>;
    }

   return (
    <div className="profile-page">

        <div className="profile-banner">

            {profile.coverImage ? (
                <img className="cover-img" src={profile.coverImage} alt="Cover" />
            ) : (
                <div className="cover-placeholder">
                    No Cover Image
                </div>
            )}

        </div>

        <div className="profile-card">

            <div className="avatar-section">

                {profile.avatar ? (
                    <img className="avatar-img" src={profile.avatar} alt="Avatar" />
                ) : (
                    <div className="avatar-placeholder">
                        No Avatar
                    </div>
                )}

            </div>

            <h2 className="profile-title">{username}</h2>

            <p className="profile-email">{email}</p>

            <div className="profile-form">

                <input className="profile-input" type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />

                <input className="profile-input" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />

                <button className="profile-button" onClick={handleUpdateProfile}>
                    Update Profile
                </button>

            </div>

        </div>

        <div className="upload-card">

            <h3>Change Avatar</h3>

            <input className="profile-file" type="file" accept="image/*" onChange={(e)=>setAvatar(e.target.files[0])} />

            <button className="profile-button" onClick={handleAvatarUpload}>
                Upload Avatar
            </button>

        </div>

        <div className="upload-card">

            <h3>Change Cover</h3>

            <input className="profile-file" type="file" accept="image/*" onChange={(e)=>setCoverImage(e.target.files[0])} />

            <button className="profile-button" onClick={handleCoverUpload}>
                Upload Cover Image
            </button>

        </div>

        <div className="playlist-section">

            <h2>My Playlists</h2>

            <form className="playlist-form" onSubmit={handleCreatePlaylist}>
                <input type="text" placeholder="Create a playlist..." value={playlistName} onChange={(e)=>setPlaylistName(e.target.value)} />
                <button type="submit">Create Playlist</button>
            </form>

            <div className="playlist-grid">

                {playlists.length > 0 ? (
                    playlists.map((playlist)=>(
                        <div className="playlist-card" key={playlist._id}>

                            <div className="playlist-card-content" onClick={()=>navigate(`/playlist/${playlist._id}`)}>
                                <h3>{playlist.name}</h3>
                                <p>{playlist.videos?.length || 0} videos</p>
                            </div>

                            <button className="playlist-delete-button" onClick={()=>handleDeletePlaylist(playlist._id)}>
                                Delete
                            </button>

                        </div>
                    ))
                ) : (
                    <p>No playlists yet.</p>
                )}

            </div>

        </div>

    </div>
);
}
export default Profile;