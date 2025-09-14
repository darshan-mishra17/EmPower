const Assessment = require('../models/Assessment');
const Attendance = require('../models/Attendance');
const { Quiz, Project, Flashcard } = require('../models/InteractiveTools');
const { UpcomingTest, StudentFeedback, StudentGuide } = require('../models/TestAndFeedback');

// Assessment Controllers
const getStudentAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ studentId: req.user.id })
      .populate('courseId', 'title')
      .sort({ submittedAt: -1 });
    res.json(assessments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createAssessment = async (req, res) => {
  try {
    const { courseId, assessmentType, title, totalMarks, obtainedMarks, feedback } = req.body;
    const percentage = Math.round((obtainedMarks / totalMarks) * 100);
    
    const assessment = new Assessment({
      studentId: req.user.id,
      courseId,
      assessmentType,
      title,
      totalMarks,
      obtainedMarks,
      percentage,
      feedback,
    });

    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    const { obtainedMarks, feedback, improvements } = req.body;
    if (obtainedMarks) {
      assessment.obtainedMarks = obtainedMarks;
      assessment.percentage = Math.round((obtainedMarks / assessment.totalMarks) * 100);
    }
    if (feedback) assessment.feedback = feedback;
    if (improvements) assessment.improvements.push(...improvements);

    await assessment.save();
    res.json(assessment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Attendance Controllers
const getStudentAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ 
      studentId: req.user.id,
      year: new Date().getFullYear()
    });
    
    // Return the monthlyData array directly for frontend compatibility
    res.json(attendance ? attendance.monthlyData : []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { month, totalDays, presentDays } = req.body;
    const year = new Date().getFullYear();
    
    let attendance = await Attendance.findOne({ 
      studentId: req.user.id,
      year 
    });

    if (!attendance) {
      attendance = new Attendance({
        studentId: req.user.id,
        year,
        monthlyData: []
      });
    }

    const monthIndex = attendance.monthlyData.findIndex(m => m.month === month);
    const monthData = {
      month,
      totalDays,
      presentDays,
      absentDays: totalDays - presentDays,
      percentage: Math.round((presentDays / totalDays) * 100)
    };

    if (monthIndex >= 0) {
      attendance.monthlyData[monthIndex] = monthData;
    } else {
      attendance.monthlyData.push(monthData);
    }

    await attendance.save();
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Quiz Controllers
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isActive: true })
      .populate('courseId', 'title')
      .populate('createdBy', 'name');
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const submitQuizAnswer = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    let totalPoints = 0;
    
    quiz.questions.forEach((question, index) => {
      totalPoints += question.points;
      if (answers[index] === question.correctAnswer) {
        score += question.points;
      }
    });

    const percentage = Math.round((score / totalPoints) * 100);
    
    // Create assessment record
    const assessment = new Assessment({
      studentId: req.user.id,
      courseId: quiz.courseId,
      assessmentType: 'quiz',
      title: quiz.title,
      totalMarks: totalPoints,
      obtainedMarks: score,
      percentage,
    });

    await assessment.save();
    res.json({ score, totalPoints, percentage, assessment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Project Controllers
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'published' })
      .populate('courseId', 'title')
      .populate('createdBy', 'name');
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Flashcard Controllers
const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ isPublic: true })
      .populate('courseId', 'title')
      .populate('createdBy', 'name');
    res.json(flashcards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upcoming Tests Controllers
const getUpcomingTests = async (req, res) => {
  try {
    const tests = await UpcomingTest.find({ 
      testDate: { $gte: new Date() },
      status: 'scheduled'
    })
      .populate('courseId', 'title')
      .sort({ testDate: 1 });
    res.json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Feedback Controllers
const getFeedback = async (req, res) => {
  try {
    const feedback = await StudentFeedback.find({ studentId: req.user.id })
      .populate('courseId', 'title')
      .sort({ submittedAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const submitFeedback = async (req, res) => {
  try {
    const feedback = new StudentFeedback({
      studentId: req.user.id,
      ...req.body
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStudentGuides = async (req, res) => {
  try {
    const guides = await StudentGuide.find({ isActive: true })
      .sort({ viewCount: -1 });
    res.json(guides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
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
};
