import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUp } from "lucide-react";    
import { getVideoById, getVideoComments, addComment, deleteComment, getUserProfile, likeVideo } from "../services/api";
import "../styles/WatchVideo.css"

const WatchVideo = () => {

const { id } = useParams();
const [video, setVideo] = useState(null);
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");
const [currentUser, setCurrentUser] = useState(null);
const [openMenu, setOpenMenu] = useState(null);
const [likes,setLikes] = useState(0);

useEffect(() => {

    const fetchComments = async () => {
        try {
            const data = await getVideoComments(id);
            setComments(data.comments || []);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVideo = async () => {
        try {
            const data = await getVideoById(id);
            setVideo(data.video);
            setLikes(data.video.likes?.length || 0);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            const data = await getUserProfile(token);
            setCurrentUser(data.user);
        } catch (error) {
            console.log(error);
        }
    };

    fetchVideo();
    fetchComments();
    fetchCurrentUser();

}, [id]);

const handleLike = async () => {
    try {
        const token = localStorage.getItem("token");

        if(!token){
            return;
        }

        const data = await likeVideo(id,token);
        setLikes(data.likes);

    } catch(error){
        console.log(error);
    }
};

const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const data = await addComment(id,{content:newComment},token);

        if(data.comment){
            setComments((prevComments)=>[...prevComments,data.comment]);
        }

        setNewComment("");

    } catch(error){
        console.log(error);
    }
};

const handleDeleteComment = async (commentId) => {
    try {
        const token = localStorage.getItem("token");

        await deleteComment(commentId,token);

        setComments((prevComments)=>prevComments.filter((comment)=>comment._id!==commentId));

        setOpenMenu(null);

    } catch(error){
        console.log(error);
    }
};

if(!video){
    return <p>Loading the video</p>;
}

return (
    <div className="watch-video">

        <div className="video-player">
            <video src={video.videoUrl} controls />
        </div>

        <div className="video-details">

            <h1>{video.title}</h1>

            <div className="video-owner">
                <img src={video.owner?.avatar} alt={video.owner?.username} className="owner-avatar"/>

                <div className="owner-details">
                    <h3>{video.owner?.username}</h3>
                    <p>{video.views} views</p>
                    <button onClick={handleLike}><ThumbsUp size={20}/>{likes}</button>
                </div>
            </div>

            <p className="video-description">{video.description}</p>

        </div>

        <div className="comments-section">

            <h2>Comments</h2>

            <form className="comment-form" onSubmit={handleAddComment}>
                <input type="text" placeholder="Add a comment..." value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
                <button type="submit">Comment</button>
            </form>

            {comments.length>0 ? (
                comments.map((comment)=>(
                    <div className="comment-card" key={comment._id}>

                        <div className="comment-header">

                            <img src={comment.owner?.avatar} alt={comment.owner?.username} className="comment-avatar"/>

                            <div className="comment-info">
                                <h4>{comment.owner?.username}</h4>
                                <p>{comment.content}</p>
                            </div>

                            {currentUser && comment.owner?._id===currentUser._id && (
                                <div className="comment-menu-container">

                                    <button type="button" className="comment-menu-button" onClick={()=>setOpenMenu(openMenu===comment._id?null:comment._id)}>⋮</button>

                                    {openMenu===comment._id && (
                                        <div className="comment-menu">
                                            <button type="button" className="delete-comment" onClick={()=>handleDeleteComment(comment._id)}>Delete</button>
                                        </div>
                                    )}

                                </div>
                            )}

                        </div>

                    </div>
                ))
            ):(
                <p>No comments yet.</p>
            )}

        </div>

    </div>
);
};

export default WatchVideo;