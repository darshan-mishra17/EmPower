const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getStudentAssessments,
  createAssessment,
  updateAssessment,
  getStudentAttendance,
  updateAttendance,
  getQuizzes,
  submitQuizAnswer,
  getProjects,
  getFlashcards,
  getUpcomingTests,
  getFeedback,
  submitFeedback,
  getStudentGuides,
} = require('../controllers/studentController');

const router = express.Router();

// Assessment routes
router.get('/assessments', authMiddleware, getStudentAssessments);
router.post('/assessments', authMiddleware, createAssessment);
router.put('/assessments/:id', authMiddleware, updateAssessment);

// Attendance routes
router.get('/attendance', authMiddleware, getStudentAttendance);
router.post('/attendance', authMiddleware, updateAttendance);

// Quiz routes
router.get('/quizzes', authMiddleware, getQuizzes);
router.post('/quizzes/submit', authMiddleware, submitQuizAnswer);

// Project routes
router.get('/projects', authMiddleware, getProjects);

// Flashcard routes
router.get('/flashcards', authMiddleware, getFlashcards);

// Upcoming tests routes
router.get('/upcoming-tests', authMiddleware, getUpcomingTests);

// Feedback routes
router.get('/feedback', authMiddleware, getFeedback);
router.post('/feedback', authMiddleware, submitFeedback);

// Student guide routes
router.get('/guides', authMiddleware, getStudentGuides);

module.exports = router;
