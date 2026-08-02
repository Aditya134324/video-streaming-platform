import express from "express";

import {getUserProfile,updateUserProfile,uploadAvatar,coverImage} from "../controllers/userProfileControllers.js";

import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/profile",verifyToken,getUserProfile);

router.put("/profile",verifyToken,updateUserProfile);

router.patch("/avatar",verifyToken,upload.single("avatar"),uploadAvatar);

router.patch("/cover-image",verifyToken,upload.single("coverImage"),coverImage);

export default router;