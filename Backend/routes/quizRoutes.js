const express = require('express');
const { submitQuiz, getQuizResults } = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router({ mergeParams: true });

router.post('/:quizId/submit', authMiddleware, roleMiddleware('student'), submitQuiz);
router.get('/:quizId/results', authMiddleware, roleMiddleware('student'), getQuizResults);

module.exports = router;
