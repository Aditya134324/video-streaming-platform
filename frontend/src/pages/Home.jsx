import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { getAllVideos } from "../services/api";
import "../styles/Home.css";

const Home = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await getAllVideos();
                setVideos(data.videos);
            } catch (error) {
                console.log(error);
            }
        };
        fetchVideos();
    }, []);

    return (
        <div className="home">
            <div className="hero">
                <h1>Discover Amazing Videos</h1>
                <p>Watch, upload and explore content from creators around the world.</p>
            </div>

            <div className="videos-section">
                <h2>Trending Videos</h2>

                <div className="videos-grid">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;