import express from 'express';
import journalControllers from '../../controllers/journal/journalControllers';
const router = express.Router();
router.post('/add', journalControllers.post);

export default journalRoutes = router;
