import mongoose from "mongoose";
import { Schema } from "mongoose";

const playListSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    owner:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:true,
    },
    videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video",
        required:true,
    }]
},{timestamps:true});

export default mongoose.model("Playlist",playListSchema);