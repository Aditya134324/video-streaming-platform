import Playlist from "../models/Playlist";
import Video from "../models/Video";

export const createPlaylist = async (req, res) =>{
    try{
    const {name} = req.body;
    const owner = req.user._id;

    if(!name){
        return res.status(400).json({
            message: "Playlist name is required"
        })
    }

    const playlist = new Playlist({
        name,
        owner
    })
    res.status(201).json({
        message: "Playlist created successfully",
        playlist
    })
  } 
  catch(error){
    console.log(error);
    res.status(500).json({
       message: "Failed to create playlist",
       error: error.message
    })
  }  
}

export const getPlaylists = async(req,res)=>{
    try{
        const owner = req.user._id;

        const playlists = await Playlist.find({owner});

        res.status(200).json({
            playlists
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Failed to get playlists",
            error: error.message
        })
    }
}

export const getPlaylistById = async(req,res)=>{
try{
    const {id}=req.params;

    const playlist=await Playlist.findById(id).populate("videos").populate("owner","username avatar");

    if(!playlist){
        return res.status(404).json({
            message:"Playlist not found"
        });
    }

    res.status(200).json({
        playlist
    });
}catch(error){
    console.log(error);
    res.status(500).json({
        message:"Failed to get playlist",
        error:error.message
    });
}
};
export const addVideoToPlaylist = async(req,res)=>{
    try{
        const {id,videoId} = req.params;
        const playlist = await Playlist.findOne({
            _id:id,
            owner: req.user._id
        })

        if(!playlist){
            return res.status(404).json({
                message: "Playlist not found"
            })
        }

        const video = await Video.findById(videoId);

        if(!video){
            return res.status(404).json({
                message: "Video not found"
            })
        }
        if(playlist.videos.includes(videoId)){
            return res.status(400).json({
                message: "Video already exists in the playlist"
            })
        }
        playlist.videos.push(videoId);
        await playlist.save();

        return res.status(200).json({
            message: "Video added to playlist successfully",
            playlist
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Failed to add video to playlist",
            error: error.message
        })
    }
}

export const removeVideoFromPLaylist = async(req,res)=>{
    try{
        const {id,videoId} = req.params;
        const playlist = await Playlist.findOne({
            _id:id,
            owner: req.user._id
        })

        if(!playlist){
            return res.status(404).json({
                message: "Playlist not found"
            })
        }

        playlist.videos = playlist.videos.filter(
            (video) => video.toString() !== videoId
        );

        await playlist.save();

        return res.status(200).json({
            message: "Video removed from playlist successfully",
            playlist
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Failed to remove video from playlist",
            error: error.message
        })
    }
}

export const deletePlaylist = async(req,res)=>{
    try{
        const {id} = req.params;
        const playlist = await Playlist.findOneAndDelete({
            _id:id,
            owner: req.user._id
        })

        if(!playlist){
            return res.status(404).json({
                message: "Playlist not found"
            })
        }

        return res.status(200).json({
            message: "Playlist deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Failed to delete playlist",
            error: error.message
        })
    }
}