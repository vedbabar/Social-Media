import express from 'express';
import { signup } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import { logout,getMe } from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/me',protectRoute,getMe)
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;