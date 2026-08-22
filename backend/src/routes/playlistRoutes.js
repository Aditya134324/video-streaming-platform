import express from 'express';
import { createPlaylist, getPlaylists, getPlaylistById, updatePlaylist, deletePlaylist } from '../controllers/playlistControllers.js';
import {verifyToken} from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/",verifyToken,createPlaylist);
router.get("/",verifyToken,getPlaylists);
router.get("/:id",verifyToken,getPlaylistById);
router.post("/:id/videos/:videoId",verifyToken,addVideoToPlaylist);
router.delete("/:id/videos/:videoId",verifyToken,removeVideoFromPlaylist);
router.delete("/:id",verifyToken,deletePlaylist);

export default router;