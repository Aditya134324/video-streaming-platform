import User from "../models/Users.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const getUserProfile = async (req,res)=>{
    try{
    const getUser = await User.findById(req.user.id).select("-password");
        if(!getUser){
            return res.status(404).json({message:"User not found"});
        }
         return res.status(200).json({
            success: true,
            user : getUser
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Failed to get user"});
    }
}

export const updateUserProfile = async(req,res)=>{
    try{
        const {username,fullName,email} = req.body;
        
        const newUser = await User.findByIdAndUpdate(req.user.id,{
            username,
            fullName,
            email,
        },{new:true}).select("-password");
        
            if (!newUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: newUser
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Failed to update user"});
    }
}

export const uploadAvatar = async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"});
        }

        const result = await uploadToCloudinary(req.file.path);

        const updatedUser = await User.findByIdAndUpdate(req.user.id,{
            avatar: result.secure_url
        },
        {
            new:true
        }).select("-password");

        return res.status(200).json({
            message: "Avatar updated successfully",
            user: updatedUser
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({message:"failed to upload avatar"});
    }
}

export const coverImage = async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message:"no file uplaoded"});
        }

        const result = await uploadToCloudinary(req.file.path);

        const updateedUser = await User.findByIdAndUpdate(req.user.id,{
            coverImage: result.secure_url
        },
    {
        new:true
    }).select("-password");
      
    return res.status(200).json({
        message:"cover image updated successfully",
        user: updateedUser
    })
    }
    catch(error){
        console.log(error);

        return res.status(500).json({message:"failed to upload cover image"});
    }
}