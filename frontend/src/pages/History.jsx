import { useEffect,useState } from "react";
import { getHistory } from "../services/api";
import VideoCard from "../components/VideoCard";
import "../styles/History.css";

const History = () => {
const [history,setHistory] = useState([]);

useEffect(() => {
    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token){
                return;
            }
            const data = await getHistory(token);
            setHistory(data.history || []);
        } catch(error) {
            console.log(error);
        }
    };
    fetchHistory();
},[]);

return (
    <div className="history">
        <h1>Watch History</h1>
        <div className="history-grid">
            {history.length > 0 ? (
                history.map((item) => (
                    <VideoCard key={item._id} video={item.video}/>
                ))
            ) : (
                <p>No watch history yet.</p>
            )}
        </div>
    </div>
);
};

export default History;