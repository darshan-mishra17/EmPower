const Course = require('../models/Course');
const Progress = require('../models/Progress');

const createCourse = async (req, res) => {
  const { title, description, lessons, quizzes } = req.body;
  try {
    const course = new Course({
      title,
      description,
      createdBy: req.user.id,
      lessons,
      quizzes,
    });
    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('createdBy', 'name');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if (course.enrolledStudents.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }
    course.enrolledStudents.push(req.user.id);
    await course.save();
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateProgress = async (req, res) => {
  const { completedLessons, quizScores } = req.body;
  try {
    let progress = await Progress.findOne({ studentId: req.user.id, courseId: req.params.id });
    if (!progress) {
      progress = new Progress({
        studentId: req.user.id,
        courseId: req.params.id,
        completedLessons,
        quizScores,
      });
    } else {
      progress.completedLessons = completedLessons;
      progress.quizScores = quizScores;
      progress.lastAccessed = Date.now();
    }
    await progress.save();
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createCourse, getCourses, getCourse, enrollCourse, updateProgress };
