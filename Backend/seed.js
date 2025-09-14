const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Course = require('./models/Course');
const Assessment = require('./models/Assessment');
const Attendance = require('./models/Attendance');
const InteractiveTools = require('./models/InteractiveTools');
const TestAndFeedback = require('./models/TestAndFeedback');

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
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@school.edu',
    password: 'password123',
    role: 'teacher',
    phone: '+1-555-0101',
    address: {
      street: '456 Teacher Lane',
      city: 'Toronto',
      state: 'Ontario',
      zipCode: 'M5V 2B1',
      country: 'Canada',
    },
    subject: 'Special Education',
    experience: 8,
    qualifications: ['M.Ed in Special Education', 'B.A in Psychology', 'Certified Inclusive Education Specialist'],
    teachingClasses: ['Grade 8-A', 'Grade 9-B', 'Grade 10-C'],
    dateOfBirth: new Date('1985-03-15'),
  },
  {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@student.edu',
    password: 'password123',
    role: 'student',
    phone: '+1-555-0102',
    address: {
      street: '123 Student Street',
      city: 'Toronto',
      state: 'Ontario',
      zipCode: 'M5V 3A1',
      country: 'Canada',
    },
    batchNumber: 'BATCH-2024-A',
    disabilityType: ['Visual Impairment', 'Learning Disability'],
    dateOfBirth: new Date('2007-08-22'),
    accessibilityPreferences: {
      tts: true,
      fontSize: 'large',
      highContrast: true,
      dyslexiaFont: false,
    },
  },
  {
    name: 'Michael Mitchell',
    email: 'michael.mitchell@parent.com',
    password: 'password123',
    role: 'parent',
    phone: '+1-555-0103',
    address: {
      street: '123 Student Street',
      city: 'Toronto',
      state: 'Ontario',
      zipCode: 'M5V 3A1',
      country: 'Canada',
    },
    occupation: 'Software Engineer',
    relationship: 'Father',
    dateOfBirth: new Date('1980-12-10'),
  },
];

const seedCourses = [
  {
    title: 'Introduction to Inclusive Education',
    description: 'Learn the basics of inclusive education practices and how to create an accessible learning environment for all students.',
    lessons: [
      {
        title: 'What is Inclusive Education?',
        content: 'Inclusive education is about ensuring that all students, regardless of ability, have access to quality education. This lesson covers the fundamental principles and benefits of inclusive practices.',
        videoUrl: 'https://example.com/video1',
        captions: 'Welcome to our course on inclusive education. Today we will explore what makes education truly inclusive...',
        images: ['https://example.com/inclusive-classroom.jpg'],
        duration: 45,
      },
      {
        title: 'Understanding Different Learning Needs',
        content: 'Every student learns differently. This lesson explores various learning disabilities and how to accommodate them in the classroom.',
        videoUrl: 'https://example.com/video2',
        captions: 'Learning differences are not learning deficits. They are simply different ways of processing information...',
        images: ['https://example.com/learning-styles.jpg'],
        duration: 50,
      },
      {
        title: 'Assistive Technologies',
        content: 'Discover various assistive technologies that can help students with disabilities access education more effectively.',
        videoUrl: 'https://example.com/video3',
        captions: 'Assistive technology can range from simple tools like pencil grips to complex software applications...',
        images: ['https://example.com/assistive-tech.jpg'],
        duration: 40,
      },
    ],
    quizzes: [
      {
        question: 'What is the main goal of inclusive education?',
        options: ['To separate students by ability', 'To ensure all students have access to quality education', 'To focus only on disabled students', 'To reduce class sizes'],
        correctAnswer: 'To ensure all students have access to quality education',
      },
      {
        question: 'Which of the following is an example of assistive technology?',
        options: ['Screen reader software', 'Regular textbooks', 'Standard desks', 'Traditional teaching methods'],
        correctAnswer: 'Screen reader software',
      },
    ],
    totalLessons: 3,
    estimatedDuration: '2 weeks',
    difficulty: 'Beginner',
    category: 'Special Education',
  },
  {
    title: 'Mathematics for Special Needs',
    description: 'Adaptive mathematics curriculum designed for students with learning disabilities, featuring visual aids and interactive content.',
    lessons: [
      {
        title: 'Basic Number Concepts',
        content: 'Understanding numbers through visual and tactile methods. This lesson uses multiple sensory approaches to teach basic numeracy.',
        videoUrl: 'https://example.com/math-video1',
        captions: 'Numbers are all around us. Let us explore how to recognize and understand them using different senses...',
        images: ['https://example.com/number-blocks.jpg'],
        duration: 35,
      },
      {
        title: 'Addition and Subtraction',
        content: 'Learn addition and subtraction using visual aids, manipulatives, and real-world examples.',
        videoUrl: 'https://example.com/math-video2',
        captions: 'Addition means putting things together. Subtraction means taking things away...',
        images: ['https://example.com/math-manipulatives.jpg'],
        duration: 40,
      },
    ],
    quizzes: [
      {
        question: 'What is 5 + 3?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
      },
    ],
    totalLessons: 2,
    estimatedDuration: '3 weeks',
    difficulty: 'Beginner',
    category: 'Mathematics',
  },
];

const seedDB = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Assessment.deleteMany();
    await Attendance.deleteMany();
    await InteractiveTools.Quiz.deleteMany();
    await InteractiveTools.Project.deleteMany();
    await InteractiveTools.Flashcard.deleteMany();
    await TestAndFeedback.UpcomingTest.deleteMany();
    await TestAndFeedback.StudentFeedback.deleteMany();
    await TestAndFeedback.StudentGuide.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Hash passwords and create users
    for (let user of seedUsers) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    const users = await User.insertMany(seedUsers);
    console.log('👥 Created users');

    // Get specific users
    const teacher = users.find(u => u.role === 'teacher');
    const student = users.find(u => u.role === 'student');
    const parent = users.find(u => u.role === 'parent');

    // Link parent to student
    await User.findByIdAndUpdate(parent._id, {
      $push: {
        childProfiles: {
          childId: student._id,
          relationship: 'Child'
        }
      }
    });

    // Create courses and link to teacher and student
    seedCourses[0].createdBy = teacher._id;
    seedCourses[1].createdBy = teacher._id;
    
    const courses = await Course.insertMany(seedCourses);
    console.log('📚 Created courses');

    // Enroll student in courses
    await User.findByIdAndUpdate(student._id, {
      $push: {
        enrolledCourses: { $each: courses.map(c => c._id) }
      }
    });

    // Create assessments for the student
    const assessmentData = [
      {
        studentId: student._id,
        courseId: courses[0]._id,
        assessmentType: 'test',
        title: 'Inclusive Education Midterm Test',
        totalMarks: 50,
        obtainedMarks: 42,
        percentage: 84,
        grade: 'B+',
        feedback: 'Good understanding of inclusive principles, needs improvement in assistive technology application',
        improvements: [
          {
            area: 'Assistive Technology',
            suggestion: 'Focus on accessibility principles',
            dateAdded: new Date('2024-09-01'),
          },
          {
            area: 'Practical Application',
            suggestion: 'Practice with assistive technologies',
            dateAdded: new Date('2024-09-01'),
          }
        ],
        submittedAt: new Date('2024-09-01'),
      },
      {
        studentId: student._id,
        courseId: courses[1]._id,
        assessmentType: 'assignment',
        title: 'Visual Mathematics Problem Set',
        totalMarks: 40,
        obtainedMarks: 38,
        percentage: 95,
        grade: 'A',
        feedback: 'Exceptional work demonstrating excellent understanding of visual mathematics concepts',
        improvements: [
          {
            area: 'Visual Mathematics',
            suggestion: 'Excellent work with visual mathematics',
            dateAdded: new Date('2024-09-10'),
          }
        ],
        submittedAt: new Date('2024-09-10'),
      },
    ];

    await Assessment.insertMany(assessmentData);
    console.log('📊 Created assessments');

    // Create attendance records
    const attendanceData = [
      {
        studentId: student._id,
        year: 2025,
        monthlyData: [
          {
            month: 9, // September
            totalDays: 20,
            presentDays: 18,
            absentDays: 2,
            percentage: 90,
            lateArrivals: 1,
          },
          {
            month: 8, // August
            totalDays: 22,
            presentDays: 20,
            absentDays: 2,
            percentage: 91,
            lateArrivals: 0,
          },
          {
            month: 7, // July
            totalDays: 18,
            presentDays: 15,
            absentDays: 3,
            percentage: 83,
            lateArrivals: 2,
          },
        ],
      },
    ];

    await Attendance.insertMany(attendanceData);
    console.log('📅 Created attendance records');

    // Create interactive tools
    const quizData = [
      {
        title: 'Inclusive Education Quiz',
        description: 'Test your knowledge of inclusive education principles',
        courseId: courses[0]._id,
        createdBy: teacher._id,
        questions: [
          {
            question: 'What does UDL stand for?',
            options: ['Universal Design for Learning', 'Unique Disability Learning', 'United Disabled Learners'],
            correctAnswer: 0, // Index of correct answer (Universal Design for Learning)
            points: 1,
          },
          {
            question: 'Which is a key principle of inclusive education?',
            options: ['Segregation', 'Integration', 'Inclusion'],
            correctAnswer: 2, // Index of correct answer (Inclusion)
            points: 1,
          },
        ],
        timeLimit: 30,
        difficulty: 'medium',
      },
      {
        title: 'Math Basics Quiz',
        description: 'Practice basic math operations',
        courseId: courses[1]._id,
        createdBy: teacher._id,
        questions: [
          {
            question: 'What is 12 + 8?',
            options: ['18', '20', '22'],
            correctAnswer: 1, // Index of correct answer (20)
            points: 1,
          },
        ],
        timeLimit: 15,
        difficulty: 'easy',
      },
    ];

    await InteractiveTools.Quiz.insertMany(quizData);
    console.log('🧩 Created quizzes');

    // Create projects
    const projectData = [
      {
        title: 'Accessibility Audit Project',
        description: 'Conduct an accessibility audit of your learning environment',
        courseId: courses[0]._id,
        createdBy: teacher._id,
        type: 'practical',
        requirements: [
          'Identify barriers in the classroom',
          'Suggest improvements',
          'Create an action plan',
          'Present findings to class',
        ],
        resources: [
          {
            title: 'Accessibility Guidelines',
            url: 'https://example.com/accessibility-guide.pdf',
            type: 'pdf',
          }
        ],
        dueDate: new Date('2024-10-15'),
        maxPoints: 100,
        status: 'published',
      },
      {
        title: 'Math Problem Solving',
        description: 'Solve real-world math problems using visual methods',
        courseId: courses[1]._id,
        createdBy: teacher._id,
        type: 'creative',
        requirements: [
          'Choose 5 everyday scenarios',
          'Create visual solutions',
          'Explain your methods',
        ],
        resources: [
          {
            title: 'Visual Math Examples',
            url: 'https://example.com/visual-math.pdf',
            type: 'pdf',
          }
        ],
        dueDate: new Date('2024-09-30'),
        maxPoints: 75,
        status: 'completed',
      },
    ];

    await InteractiveTools.Project.insertMany(projectData);
    console.log('📝 Created projects');

    // Create flashcards
    const flashcardData = [
      {
        title: 'Education Terms',
        courseId: courses[0]._id,
        createdBy: teacher._id,
        category: 'Vocabulary',
        cards: [
          { 
            front: 'IEP', 
            back: 'Individualized Education Program',
            difficulty: 'medium',
          },
          { 
            front: 'UDL', 
            back: 'Universal Design for Learning',
            difficulty: 'medium',
          },
          { 
            front: 'Assistive Technology', 
            back: 'Tools that help students with disabilities access learning',
            difficulty: 'hard',
          },
        ],
        isPublic: true,
      },
    ];

    await InteractiveTools.Flashcard.insertMany(flashcardData);
    console.log('🃏 Created flashcards');

    // Create upcoming tests
    const testData = [
      {
        title: 'Inclusive Education Midterm',
        courseId: courses[0]._id,
        createdBy: teacher._id,
        description: 'Comprehensive test covering all inclusive education principles and practices covered in the first half of the semester.',
        testDate: new Date('2024-10-01'),
        duration: 90, // 90 minutes
        totalMarks: 100,
        type: 'midterm',
        syllabus: [
          {
            topic: 'Principles of inclusive education',
            weightage: 30,
          },
          {
            topic: 'Types of learning disabilities',
            weightage: 25,
          },
          {
            topic: 'Assistive technologies',
            weightage: 25,
          },
          {
            topic: 'Universal Design for Learning',
            weightage: 20,
          },
        ],
        instructions: [
          'Read all questions carefully',
          'Answer all sections',
          'Use examples where appropriate',
          'Time limit: 90 minutes',
        ],
        status: 'scheduled',
      },
      {
        title: 'Math Skills Assessment',
        courseId: courses[1]._id,
        createdBy: teacher._id,
        description: 'Assessment of basic mathematical concepts using visual and practical methods.',
        testDate: new Date('2024-09-25'),
        duration: 60, // 60 minutes
        totalMarks: 50,
        type: 'quiz',
        syllabus: [
          {
            topic: 'Basic number concepts',
            weightage: 40,
          },
          {
            topic: 'Addition and subtraction',
            weightage: 35,
          },
          {
            topic: 'Visual problem solving',
            weightage: 25,
          },
        ],
        instructions: [
          'Use visual aids provided',
          'Show your working clearly',
          'Ask for help if needed',
        ],
        status: 'scheduled',
      },
    ];

    await TestAndFeedback.UpcomingTest.insertMany(testData);
    console.log('📋 Created upcoming tests');

    // Create student feedback
    const feedbackData = [
      {
        studentId: student._id,
        courseId: courses[0]._id,
        type: 'course',
        rating: 5,
        feedback: 'This course really helped me understand how education can be made accessible for everyone. The visual aids were particularly helpful.',
        categories: {
          contentQuality: 5,
          accessibility: 5,
          userExperience: 4,
          support: 5,
        },
        suggestions: [
          {
            category: 'Content',
            suggestion: 'More interactive examples would be great',
          }
        ],
        isAnonymous: false,
        status: 'pending',
      },
      {
        studentId: student._id,
        courseId: courses[1]._id,
        type: 'course',
        rating: 4,
        feedback: 'I love the visual approach to math. It makes complex concepts much easier to understand.',
        categories: {
          contentQuality: 4,
          accessibility: 5,
          userExperience: 4,
          support: 4,
        },
        suggestions: [
          {
            category: 'Technology',
            suggestion: 'More visual math tools would be helpful',
          }
        ],
        isAnonymous: false,
        status: 'reviewed',
      },
    ];

    await TestAndFeedback.StudentFeedback.insertMany(feedbackData);
    console.log('💬 Created student feedback');

    // Create student guides
    const guideData = [
      {
        title: 'Getting Started with Assistive Technology',
        category: 'accessibility',
        content: 'A comprehensive guide to using assistive technology tools effectively in your learning journey.',
        steps: [
          {
            stepNumber: 1,
            title: 'Identify your specific needs',
            description: 'Assess what type of assistive technology would benefit your learning style and requirements.',
            imageUrl: 'https://example.com/step1.jpg',
          },
          {
            stepNumber: 2,
            title: 'Research available tools',
            description: 'Explore the various assistive technology options available for your specific needs.',
            imageUrl: 'https://example.com/step2.jpg',
          },
          {
            stepNumber: 3,
            title: 'Try different options',
            description: 'Test multiple tools to find the ones that work best for you.',
            imageUrl: 'https://example.com/step3.jpg',
          },
          {
            stepNumber: 4,
            title: 'Get training on selected tools',
            description: 'Receive proper training to maximize the effectiveness of your chosen tools.',
            imageUrl: 'https://example.com/step4.jpg',
          },
          {
            stepNumber: 5,
            title: 'Practice regularly',
            description: 'Use your assistive technology consistently to become proficient.',
            imageUrl: 'https://example.com/step5.jpg',
          },
          {
            stepNumber: 6,
            title: 'Seek support when needed',
            description: 'Don\'t hesitate to ask for help when you encounter difficulties.',
            imageUrl: 'https://example.com/step6.jpg',
          },
        ],
        tags: ['assistive technology', 'accessibility', 'learning tools'],
        difficulty: 'beginner',
        isActive: true,
        viewCount: 25,
        helpfulVotes: 18,
      },
      {
        title: 'Study Tips for Visual Learners',
        category: 'academic',
        content: 'Effective study strategies specifically designed for students who learn best through visual methods.',
        steps: [
          {
            stepNumber: 1,
            title: 'Use mind maps and diagrams',
            description: 'Create visual representations of information to better understand relationships between concepts.',
            imageUrl: 'https://example.com/mindmap.jpg',
          },
          {
            stepNumber: 2,
            title: 'Color-code your notes',
            description: 'Use different colors to categorize and highlight important information.',
            imageUrl: 'https://example.com/colornotes.jpg',
          },
          {
            stepNumber: 3,
            title: 'Create visual flashcards',
            description: 'Make flashcards with images, diagrams, and visual cues.',
            imageUrl: 'https://example.com/flashcards.jpg',
          },
          {
            stepNumber: 4,
            title: 'Watch educational videos',
            description: 'Supplement reading with visual content like educational videos and animations.',
            imageUrl: 'https://example.com/videos.jpg',
          },
          {
            stepNumber: 5,
            title: 'Use charts and graphs',
            description: 'Convert numerical data and processes into visual charts and graphs.',
            imageUrl: 'https://example.com/charts.jpg',
          },
          {
            stepNumber: 6,
            title: 'Practice with visual examples',
            description: 'Apply what you\'ve learned using real-world visual examples.',
            imageUrl: 'https://example.com/examples.jpg',
          },
        ],
        tags: ['visual learning', 'study tips', 'learning strategies'],
        difficulty: 'beginner',
        isActive: true,
        viewCount: 42,
        helpfulVotes: 35,
      },
    ];

    await TestAndFeedback.StudentGuide.insertMany(guideData);
    console.log('📖 Created student guides');

    console.log('🎉 Database seeded successfully with comprehensive test data!');
    console.log('📧 Test users created:');
    console.log('   👨‍🏫 Teacher: emily.johnson@school.edu (password: password123)');
    console.log('   👩‍🎓 Student: sarah.mitchell@student.edu (password: password123)');
    console.log('   👨‍👩‍👧 Parent: michael.mitchell@parent.com (password: password123)');
    console.log('   👤 Admin: admin@example.com (password: password123)');
    
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
