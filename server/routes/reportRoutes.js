import express from 'express';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { Auth } from '../middleware/user.js';
import reportControllers from '../controllers/reportControllers.js';
const router = express.Router();

router.post('/upload', upload.single('file'), reportControllers.uploadBlob);

export default router;
