const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  monthlyData: [{
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    presentDays: {
      type: Number,
      required: true,
    },
    absentDays: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    lateArrivals: {
      type: Number,
      default: 0,
    },
  }],
}, {
  timestamps: true,
});

// Calculate attendance percentage
attendanceSchema.pre('save', function(next) {
  this.monthlyData.forEach(month => {
    month.percentage = Math.round((month.presentDays / month.totalDays) * 100);
    month.absentDays = month.totalDays - month.presentDays;
  });
  next();
});

module.exports = mongoose.model('Attendance', attendanceSchema);
