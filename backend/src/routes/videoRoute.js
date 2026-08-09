import express from "express";
import {uploadVideo,getAllVideos,getVideoById,updateVideo,deleteVideo,searchVideos,likeVideo} from "../controllers/videoControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.fields([{ name: "video", maxCount: 1 }, { name: "thumbnail", maxCount: 1 }]), uploadVideo);

router.get("/", getAllVideos);

router.get("/search", searchVideos);

router.post("/:id/like", verifyToken, likeVideo);

router.get("/:id", getVideoById);

router.put("/:id", verifyToken, updateVideo);

router.delete("/:id", verifyToken, deleteVideo);

export default router;