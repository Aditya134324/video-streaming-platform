import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { searchVideos } from "../services/api";
import "../styles/Home.css";

const Search = () => {

const [videos, setVideos] = useState([]);
const [searchParams] = useSearchParams();

const query = searchParams.get("query");

useEffect(() => {

    const fetchVideos = async () => {
        try {
            const data = await searchVideos(query);
            console.log(data);
            setVideos(data.videos || []);
        } catch (error) {
            console.log(error);
        }
    };

    if(query){
        fetchVideos();
    }

}, [query]);

return (
    <div className="home">

        <div className="videos-section">

            <h2>Search Results for "{query}"</h2>

            <div className="videos-grid">
                {videos.length > 0 ? (
                    videos.map((video)=>(
                        <VideoCard key={video._id} video={video}/>
                    ))
                ) : (
                    <p>No videos found</p>
                )}
            </div>

        </div>

    </div>
);

};

export default Search;