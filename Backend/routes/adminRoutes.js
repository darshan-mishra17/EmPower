const express = require('express');
const { getUsers, getCourses, approveCourse } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/users', authMiddleware, roleMiddleware('admin'), getUsers);
router.get('/courses', authMiddleware, roleMiddleware('admin'), getCourses);
router.put('/courses/:id/approve', authMiddleware, roleMiddleware('admin'), approveCourse);

module.exports = router;
