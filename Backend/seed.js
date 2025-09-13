const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Course = require('./models/Course');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  },
  {
    name: 'Teacher One',
    email: 'teacher@example.com',
    password: 'password123',
    role: 'teacher',
  },
  {
    name: 'Student One',
    email: 'student@example.com',
    password: 'password123',
    role: 'student',
  },
  {
    name: 'Parent One',
    email: 'parent@example.com',
    password: 'password123',
    role: 'parent',
  },
];

const seedCourses = [
  {
    title: 'Introduction to Inclusive Education',
    description: 'Learn the basics of inclusive education practices.',
    lessons: [
      {
        title: 'What is Inclusive Education?',
        content: 'Inclusive education is about ensuring that all students, regardless of ability, have access to quality education.',
        videoUrl: 'https://example.com/video1',
        captions: 'Caption text here',
        images: ['https://example.com/image1.jpg'],
      },
    ],
    quizzes: [
      {
        question: 'What is inclusive education?',
        options: ['Education for all', 'Education for some', 'Education for none'],
        correctAnswer: 'Education for all',
      },
    ],
  },
];

const seedDB = async () => {
  try {
    await User.deleteMany();
    await Course.deleteMany();

    // Hash passwords
    for (let user of seedUsers) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    const users = await User.insertMany(seedUsers);
    const teacher = users.find(u => u.role === 'teacher');

    seedCourses[0].createdBy = teacher._id;
    await Course.insertMany(seedCourses);

    console.log('Database seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
