import express from 'express';
const router = express.Router();
import journalControllers from '../../controllers/journal/journalControllers.js';
router.post('/', journalControllers.postJournal);
router.get('/', journalControllers.getJournal);

export default router;
