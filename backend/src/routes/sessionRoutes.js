import express from 'express';
import sessionController from '../controllers/sessionController.js';

const router = express.Router();

router.post('/', sessionController.createSession);

router.get('/active', sessionController.getActiveSessions);
router.get('/my-recent', sessionController.getMyRecentSessions);

router.get('/:id', sessionController.getSessionById);
router.post('/:id/join', sessionController.joinSession);
router.post('/:id/end', sessionController.endSession);

export default router;
