import History from "../models/History.js";
import Video from "../models/Video.js";

export const addToHistory = async(req,res)=>{
   try{
    const {videoId} = req.body;
    const userId = req.user._id;

    const video = await Video.findById(videoId);

    if(!video){
        return res.status(404).json({
            message : "Video not found"
        })
    }

    const history = await History.findOne({
        user : userId,
        video : videoId
    })

    if(history){
        history.watchedAt = Date.now();
        await history.save();
    }
    else{
        await History.create({
            user : userId,
            video : videoId
        })
    }
    res.status(200).json({
        message : "Video added to history"
    })
   }
   catch(error){
    console.log(error);
    res.status(500).json({
        message : "Failed to add video to history"
    })
   }
}

export const getHistory = async(req,res)=>{
try{
    const userId=req.user.id;

    const history=await History.find({user:userId}).populate("video").sort({watchedAt:-1});

    res.status(200).json({
        history
    });
}catch(error){
    res.status(500).json({
        message:"Failed to get history",
        error:error.message
    });
}
};