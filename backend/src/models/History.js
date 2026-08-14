import mongoose from "mongoose";
import { Schema } from "mongoose";

const historySchema = new Schema(
    {
        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        video:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Video",
            required : true
        },
        watchedAt:{
            type : Date,
            default : Date.now
        }
    }
);

export default mongoose.model("History",historySchema);