import mongoose,{Schema} from "mongoose";

const videoSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    views:{
        type:Number,
        default:0,
    }
},
{
    timestamps:true,
});

export default mongoose.model("Video",videoSchema);