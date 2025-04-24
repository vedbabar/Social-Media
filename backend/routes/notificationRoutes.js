import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getNotifications,deleteNotifications,deleteNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', protectRoute,getNotifications);
router.delete('/', protectRoute,deleteNotifications);
router.delete('/:id', protectRoute,deleteNotification); // delete a specific notification

export default router;