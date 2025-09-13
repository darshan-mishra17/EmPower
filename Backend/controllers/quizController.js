const Course = require('../models/Course');
const Progress = require('../models/Progress');

const submitQuiz = async (req, res) => {
  const { answers } = req.body; // answers is an array of selected options
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const quiz = course.quizzes[req.params.quizId];
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.correctAnswer) {
        score++;
      }
    });
    // Update progress
    let progress = await Progress.findOne({ studentId: req.user.id, courseId: req.params.id });
    if (!progress) {
      progress = new Progress({ studentId: req.user.id, courseId: req.params.id });
    }
    progress.quizScores.push({ quizId: req.params.quizId, score });
    await progress.save();
    res.json({ score, total: quiz.options.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getQuizResults = async (req, res) => {
  try {
    const progress = await Progress.findOne({ studentId: req.user.id, courseId: req.params.id });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    const result = progress.quizScores.find(qs => qs.quizId === req.params.quizId);
    if (!result) {
      return res.status(404).json({ message: 'Quiz result not found' });
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { submitQuiz, getQuizResults };
