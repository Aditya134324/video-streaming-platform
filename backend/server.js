import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {connectDB} from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import userProfileRoutes from "./src/routes/userProfile.js";
import videoRoutes from "./src/routes/videoRoute.js";
import commentRoutes from "./src/routes/commentRoutes.js"
import historyRoutes from "./src/routes/historyRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/user",userProfileRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/history",historyRoutes);

const PORT = process.env.PORT || 5000;



connectDB().then(()=>{

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
})
.catch((error)=>{
   console.log("Error connecting to the database:", error);
})
