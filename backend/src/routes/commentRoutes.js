import express from "express";
import { addComment, getVideoComments, deleteComment } from "../controllers/commentControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/:videoId", verifyToken, addComment);

router.get("/:videoId", getVideoComments);

router.delete("/:commentId", verifyToken, deleteComment);

export default router;