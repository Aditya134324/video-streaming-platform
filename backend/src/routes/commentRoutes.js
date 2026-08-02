import express from "express";
import {addComment,getVideoComments,updateComment,deleteComment} from "../controllers/commentControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/:videoId", verifyToken, addComment);

router.get("/:videoId", getVideoComments);

router.put("/:commentId", verifyToken, updateComment);

router.delete("/:commentId", verifyToken, deleteComment);

export default router;
