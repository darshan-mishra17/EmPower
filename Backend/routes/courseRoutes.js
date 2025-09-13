const express = require('express');
const { createCourse, getCourses, getCourse, enrollCourse, updateProgress } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const quizRoutes = require('./quizRoutes');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('teacher'), createCourse);
router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/:id/enroll', authMiddleware, roleMiddleware('student'), enrollCourse);
router.put('/:id/progress', authMiddleware, roleMiddleware('student'), updateProgress);
router.use('/:id/quiz', quizRoutes);

module.exports = router;
