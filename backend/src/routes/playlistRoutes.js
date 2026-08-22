import express from 'express';
import { createPlaylist, getPlaylists, getPlaylistById, addVideoToPlaylist, removeVideoFromPlaylist, deletePlaylist } from '../controllers/playlistContollers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createPlaylist);
router.get('/', verifyToken, getPlaylists);
router.get('/:id', verifyToken, getPlaylistById);
router.post('/:id/videos/:videoId', verifyToken, addVideoToPlaylist);
router.delete('/:id/videos/:videoId', verifyToken, removeVideoFromPlaylist);
router.delete('/:id', verifyToken, deletePlaylist);

export default router;