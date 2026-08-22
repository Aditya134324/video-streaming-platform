import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import { getPlaylistById,removeVideoFromPlaylist,getUserProfile } from "../services/api";
import "../styles/PlaylistDetails.css";

const PlaylistDetails = () => {
const { id } = useParams();
const [playlist,setPlaylist] = useState(null);
const [currentUser,setCurrentUser] = useState(null);

useEffect(() => {
    const fetchPlaylist = async () => {
        try {
            const token=localStorage.getItem("token");
            const data=await getPlaylistById(id,token);
            setPlaylist(data.playlist);

            if(token){
                const userData=await getUserProfile(token);
                setCurrentUser(userData.user);
            }
        } catch(error) {
            console.log(error);
        }
    };

    fetchPlaylist();
},[id]);

const handleRemoveVideo = async(videoId) => {
    try {
        const token=localStorage.getItem("token");
        await removeVideoFromPlaylist(id,videoId,token);

        setPlaylist((prev)=>({
            ...prev,
            videos:prev.videos.filter((video)=>video._id!==videoId)
        }));
    } catch(error) {
        console.log(error);
    }
};

if(!playlist){
    return <p>Loading playlist...</p>;
}

const isOwner=currentUser?._id===playlist.owner?._id;

return (
    <div className="playlist-details">

        <div className="playlist-header">
            <h1>{playlist.name}</h1>
            <p>By {playlist.owner?.username}</p>
            <p>{playlist.videos?.length || 0} videos</p>
        </div>

        <div className="playlist-videos">

            {playlist.videos?.length>0 ? (
                playlist.videos.map((video)=>(
                    <div className="playlist-video" key={video._id}>

                        <Link to={`/video/${video._id}`}>
                            <img src={video.thumbnail} alt={video.title}/>
                            <h3>{video.title}</h3>
                            <p>{video.views} views</p>
                        </Link>

                        {isOwner && (
                            <button onClick={()=>handleRemoveVideo(video._id)}>
                                Remove
                            </button>
                        )}

                    </div>
                ))
            ):(
                <p>No videos in this playlist.</p>
            )}

        </div>

    </div>
);
};

export default PlaylistDetails;