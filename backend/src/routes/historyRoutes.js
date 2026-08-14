import express from "express";
import { addToHistory, getHistory } from "../controllers/historyControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/:videoId", verifyToken, addToHistory);
router.get("/", verifyToken, getHistory);

export default router;