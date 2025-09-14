const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'parent', 'admin'],
    required: true,
  },
  // Student Profile Information
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zipCode: { type: String, default: '' },
    country: { type: String, default: '' },
  },
  phone: { type: String, default: '' },
  dateOfBirth: { type: Date },
  batchNumber: {
    type: String,
    default: '',
  },
  disabilityType: [{
    type: String,
    enum: ['Visual Impairment', 'Hearing Impairment', 'Motor Disability', 'Cognitive Disability', 'Learning Disability', 'None'],
  }],
  
  // Teacher Profile Information
  subject: { type: String, default: '' },
  experience: { type: Number, default: 0 },
  qualifications: [{ type: String }],
  teachingClasses: [{ type: String }],
  
  // Parent Profile Information
  occupation: { type: String, default: '' },
  relationship: { type: String, default: '' }, // Mother, Father, Guardian
  
  accessibilityPreferences: {
    tts: { type: Boolean, default: false },
    stt: { type: Boolean, default: false },
    fontSize: { type: String, default: 'medium' },
    highContrast: { type: Boolean, default: false },
    dyslexiaFont: { type: Boolean, default: false },
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  childProfiles: [{
    childId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    relationship: { type: String, default: 'Child' },
  }],
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
