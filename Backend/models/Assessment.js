const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  assessmentType: {
    type: String,
    enum: ['quiz', 'test', 'assignment', 'project'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  obtainedMarks: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  feedback: {
    type: String,
    default: '',
  },
  improvements: [{
    area: String,
    suggestion: String,
    dateAdded: { type: Date, default: Date.now },
  }],
}, {
  timestamps: true,
});

// Calculate grade based on percentage
assessmentSchema.pre('save', function(next) {
  if (this.percentage >= 95) this.grade = 'A+';
  else if (this.percentage >= 90) this.grade = 'A';
  else if (this.percentage >= 85) this.grade = 'B+';
  else if (this.percentage >= 80) this.grade = 'B';
  else if (this.percentage >= 75) this.grade = 'C+';
  else if (this.percentage >= 70) this.grade = 'C';
  else if (this.percentage >= 60) this.grade = 'D';
  else this.grade = 'F';
  
  next();
});

module.exports = mongoose.model('Assessment', assessmentSchema);
