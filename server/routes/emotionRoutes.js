import express from 'express';
import { Auth } from '../middleware/user.js';
import emotionControllers from '../controllers/emotionControllers.js';
const router = express.Router();
router.get('/', emotionControllers.getPastData);
router.get('/bars', emotionControllers.getEmotionBars);

export default router;
