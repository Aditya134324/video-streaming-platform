import { Link } from "react-router-dom";
import "../styles/VideoCard.css";

const VideoCard = ({ video }) => {
    return (
        <div className="video-card">
            <Link to={`/video/${video._id}`}>
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail"/>
            </Link>
            <div className="video-content">
                <div className="video-owner">
                    <img src={video.owner?.avatar} alt={video.owner?.username} className="owner-avatar" />
                    <div className="owner-info">
                        <h3>{video.title}</h3>
                        <p className="owner-name">{video.owner?.username}</p>
                    </div>
                </div>
                <p className="video-views">{video.views} views</p>
            </div>
        </div>
    );
};

export default VideoCard;