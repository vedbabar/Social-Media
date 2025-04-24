import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { createPost } from '../controllers/postController.js';
import { deletePost } from '../controllers/postController.js';
import { commentOnPost } from '../controllers/postController.js';
import { likeUnlikePost } from '../controllers/postController.js';
import { getAllPosts } from '../controllers/postController.js';
import { getLikedPosts,getFollowingPosts,getUserPosts } from '../controllers/postController.js';

const router = express.Router();


router.get("/all", protectRoute, getAllPosts)
router.get("/following", protectRoute, getFollowingPosts)
router.get("/likes/:id", protectRoute, getLikedPosts)
router.get("/user/:username", protectRoute, getUserPosts)
router.post("/create",protectRoute,createPost)
router.post("/like/:id", protectRoute, likeUnlikePost)
router.post("/comment/:id", protectRoute, commentOnPost)
router.delete("/:id", protectRoute, deletePost)

export default router;