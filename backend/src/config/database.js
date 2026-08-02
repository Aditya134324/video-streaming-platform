import mongoose from "mongoose";

export function connectDB(){
    const URL = process.env.MONGO_URI;
    
    mongoose.connection.on("open",()=>{
        console.log("MongoDB connected");
    })

    const connection = mongoose.connect(URL);
    
    return connection;

}