import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../services/api";
import "../styles/UploadVideo.css";

const UploadVideo = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title || !description || !video || !thumbnail) {
            alert("Please fill all the fields");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("video", video);
            formData.append("thumbnail", thumbnail);

            const data = await uploadVideo(formData, token);

            if (data.video) {
                alert("Video uploaded successfully");
                navigate("/");
            } else {
                alert(data.message || "Failed to upload video");
            }

        } catch (error) {

            console.log(error);
            alert("Failed to upload video");

        }

    };

    return (

        <div className="upload-container">

            <h1 className="upload-title">Upload Video</h1>

            <form className="upload-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Title</label>
                    <input className="upload-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter video title" required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea className="upload-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter video description" required />
                </div>

                <div className="form-group">
                    <label>Video</label>
                    <input className="upload-file" type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} required />
                </div>

                <div className="form-group">
                    <label>Thumbnail</label>
                    <input className="upload-file" type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} required />
                </div>

                <button className="upload-button" type="submit"> Upload Video </button>

            </form>
        </div>
    );
};

export default UploadVideo;