import express from 'express';
const router = express.Router();

import { get, getHistory, add } from '../controllers/quiz-questions.js';

// import AuthMiddleware from '../middlewares/authorise.js';
// router.use(AuthMiddleware);

router.post('/get', get);
router.post('/add', add);
router.get('/history/:userID', getHistory);

export default router;