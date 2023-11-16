import express from 'express';
const router = express.Router();
import { getTherapists } from '../controllers/therapistControllers.js';

router.get('/getTherapists', getTherapists);
export default router;