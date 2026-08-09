import Video from "../models/Video.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const uploadVideo = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);
        console.log("USER:", req.user);

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        if (!req.files?.video || !req.files?.thumbnail) {
            return res.status(400).json({
                message: "Video and thumbnail are required"
            });
        }

        const videoPath = req.files.video[0].path;
        const thumbnailPath = req.files.thumbnail[0].path;

        console.log("VIDEO PATH:", videoPath);
        console.log("THUMBNAIL PATH:", thumbnailPath);

        const videoResult = await uploadToCloudinary(videoPath);
        const thumbnailResult = await uploadToCloudinary(thumbnailPath);

        if (!videoResult || !videoResult.secure_url) {
            return res.status(500).json({
                message: "Failed to upload video to Cloudinary"
            });
        }

        if (!thumbnailResult || !thumbnailResult.secure_url) {
            return res.status(500).json({
                message: "Failed to upload thumbnail to Cloudinary"
            });
        }

        const newVideo = await Video.create({
            title,
            description,
            videoUrl: videoResult.secure_url,
            thumbnail: thumbnailResult.secure_url,
            owner: req.user.id
        });

        return res.status(201).json({
            message: "Successfully uploaded the video",
            video: newVideo
        });

    } catch (error) {

        console.log("UPLOAD VIDEO ERROR:", error);

        return res.status(500).json({
            message: "Failed to upload the video",
            error: error.message
        });

    }
};

export const getAllVideos = async (req, res) => {
    try {

        const videos = await Video.find()
            .populate(
                "owner",
                "username avatar"
            )
            .sort({
                createdAt: -1
            });

        return res.status(200).json({
            videos
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch the videos"
        });

    }
};

export const getVideoById = async (req, res) => {
    try {

        const video = await Video.findByIdAndUpdate(
            req.params.id,
            {
                $inc: {
                    views: 1
                }
            },
            {
                returnDocument: "after"
            }
        ).populate(
            "owner",
            "username avatar"
        );

        if (!video) {
            return res.status(404).json({
                message: "Video not found"
            });
        }

        return res.status(200).json({
            video
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch video"
        });

    }
};

export const updateVideo = async (req, res) => {
    try {

        const { title, description } = req.body;

        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                message: "Video not found"
            });
        }

        if (video.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You cannot update this video"
            });
        }

        if (title) {
            video.title = title;
        }

        if (description) {
            video.description = description;
        }

        await video.save();

        return res.status(200).json({
            message: "Video updated successfully",
            video
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Failed to update video"
        });

    }
};
export const searchVideos = async (req,res)=>{
    try{
        const {query} = req.query;

        if(!query){
            return res.status(400).json({
                message:"Search query is required"
            });
        }

        const videos = await Video.find({
            $or:[
                {
                    title:{ $regex:query, $options:"i"}
                },
                {
                    description:{ $regex:query, $options:"i"}
                }
            ]
        }).populate("owner","username avatar");
        return res.status(200).json({
            videos
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Failed to search videos",
            error:error.message
        });
    }
};
export const likeVideo = async (req,res)=>{
try{
    const {id}=req.params;

    const video=await Video.findById(id);

    if(!video){
        return res.status(404).json({
            message:"Video not found"
        });
    }

    video.likes.push(req.user.id);

    await video.save();

    res.status(200).json({
        message:"Video liked",
        likes:video.likes.length
    });

}catch(error){
    res.status(500).json({
        message:"Failed to like video",
        error:error.message
    });
}
};