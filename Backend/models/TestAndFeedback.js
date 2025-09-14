const mongoose = require('mongoose');

const upcomingTestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  testDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  syllabus: [{
    topic: String,
    weightage: Number, // percentage
  }],
  instructions: [{
    type: String,
  }],
  type: {
    type: String,
    enum: ['midterm', 'final', 'quiz', 'practical', 'assignment'],
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled',
  },
}, {
  timestamps: true,
});

const studentFeedbackSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  type: {
    type: String,
    enum: ['course', 'teacher', 'platform', 'accessibility', 'general'],
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  categories: {
    contentQuality: { type: Number, min: 1, max: 5 },
    accessibility: { type: Number, min: 1, max: 5 },
    userExperience: { type: Number, min: 1, max: 5 },
    support: { type: Number, min: 1, max: 5 },
  },
  suggestions: [{
    category: String,
    suggestion: String,
  }],
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'implemented'],
    default: 'pending',
  },
  adminResponse: {
    response: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    respondedAt: Date,
  },
}, {
  timestamps: true,
});

const studentGuideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['academic', 'accessibility', 'navigation', 'tools', 'support'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  steps: [{
    stepNumber: Number,
    title: String,
    description: String,
    imageUrl: String,
  }],
  tags: [{
    type: String,
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  helpfulVotes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const UpcomingTest = mongoose.model('UpcomingTest', upcomingTestSchema);
const StudentFeedback = mongoose.model('StudentFeedback', studentFeedbackSchema);
const StudentGuide = mongoose.model('StudentGuide', studentGuideSchema);

module.exports = { UpcomingTest, StudentFeedback, StudentGuide };
