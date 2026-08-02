import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadToCloudinary = async (filePath, folder)=>{
    try{
        const result = await cloudinary.uploader.upload(filePath,{
            resource_type: "auto",
        });

        fs.unlinkSync(filePath);

        return result;
    }

    catch(error){
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }

        throw error;
    }
}

export default uploadToCloudinary;