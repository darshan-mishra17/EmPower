# 🎓 EmpowerMe - Inclusive Education Platform

**EmpowerMe** is a comprehensive inclusive education platform designed specifically for disabled students, providing accessible learning experiences with advanced Text-to-Speech (TTS) capabilities, comprehensive dashboards, and role-based access control.

## 🌟 **Features**

### 🎯 **Accessibility Features**
- **Advanced Text-to-Speech (TTS)** - Full screen reading with voice customization
- **Keyboard Navigation** - Complete keyboard accessibility with shortcuts
- **Screen Reader Support** - ARIA-compliant for assistive technologies
- **Individual Content Reading** - Click or press Enter to read specific sections
- **Auto-Read Mode** - Automatic content reading on page load
- **Voice Controls** - Adjustable speed, pitch, volume, and voice selection

### 👨‍🎓 **Student Features**
- **Personal Dashboard** - Overview of courses, grades, attendance, and upcoming tests
- **Course Management** - View enrolled courses and track progress
- **Assessment Tracking** - View grades, feedback, and improvement suggestions
- **Attendance Monitoring** - Monthly attendance tracking with percentages
- **Interactive Tools** - Quizzes, projects, and flashcards
- **Student Profile** - Personal information and disability type management

### 👨‍🏫 **Teacher Features**
- **Class Management** - Manage students and course content
- **Grade Management** - Record and track student assessments
- **Course Creation** - Create and manage educational content
- **Student Progress Tracking** - Monitor individual student performance

### 👨‍👩‍👧 **Parent Features**
- **Child Monitoring** - Track child's academic progress
- **Attendance Overview** - View child's attendance records
- **Grade Reports** - Access detailed grade information
- **Communication** - Communicate with teachers and school

### 👨‍💼 **Admin Features**
- **User Management** - Manage all platform users
- **Course Approval** - Review and approve course content
- **Content Review** - Monitor platform content for quality and accessibility
- **System Analytics** - Platform usage and performance metrics

### 💬 **Community Features**
- **Discussion Forums** - Student and teacher interaction
- **Post Creation** - Share thoughts and questions
- **Reply System** - Engage in meaningful discussions

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/darshan-mishra17/EmPower.git
   cd EmPower
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in Backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/empowerme
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

### **Running the Application**

1. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

2. **Seed the Database (First time only)**
   ```bash
   cd Backend
   npm run seed
   ```

3. **Start Backend Server**
   ```bash
   cd Backend
   npm run dev
   # Server will run on http://localhost:5000
   ```

4. **Start Frontend Application**
   ```bash
   cd Frontend
   npm run dev
   # Application will run on http://localhost:5174
   ```

5. **Access the Application**
   - Open your browser and navigate to `http://localhost:5174`
   - Use the test credentials below to login

## 🔑 **Test User Credentials**

### **Student Account**
- **Email**: `sarah.mitchell@student.edu`
- **Password**: `password123`
- **Role**: Student
- **Features**: Student dashboard, course access, TTS controls

### **Teacher Account**
- **Email**: `emily.johnson@school.edu`
- **Password**: `password123`
- **Role**: Teacher
- **Features**: Teacher dashboard, class management, grading

### **Parent Account**
- **Email**: `michael.mitchell@parent.com`
- **Password**: `password123`
- **Role**: Parent
- **Features**: Parent dashboard, child monitoring

### **Admin Account**
- **Email**: `admin@example.com`
- **Password**: `password123`
- **Role**: Admin
- **Features**: User management, content review, system analytics

## 🎮 **TTS Keyboard Shortcuts**

- **Ctrl + Shift + S**: Start/Stop reading the entire page
- **Ctrl + Shift + P**: Pause/Resume current speech
- **Ctrl + Shift + A**: Toggle auto-read mode
- **Enter**: Read focused content section
- **Tab/Shift + Tab**: Navigate between readable sections

## 🏗️ **Project Structure**

```
EmPower/
├── Backend/                 # Express.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication & authorization
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── seed.js            # Database seeding script
│   └── server.js          # Main server file
├── Frontend/               # React.js frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── hooks/         # Custom React hooks (TTS)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── main.tsx       # App entry point
│   ├── public/            # Static assets
│   └── index.html         # Main HTML template
└── README.md              # This file
```

## 🛠️ **Technology Stack**

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### **Frontend**
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

### **Accessibility**
- **Web Speech API** - Text-to-Speech
- **ARIA** - Screen reader support
- **Semantic HTML** - Proper document structure
- **Keyboard Navigation** - Full keyboard support

## 📱 **API Endpoints**

### **Authentication**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### **Student Routes**
- `GET /student/assessments` - Get student assessments
- `GET /student/attendance` - Get attendance records
- `GET /student/quizzes` - Get available quizzes
- `GET /student/projects` - Get student projects
- `GET /student/upcoming-tests` - Get upcoming tests
- `GET /student/feedback` - Get student feedback

### **Course Management**
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get specific course
- `POST /courses/:id/enroll` - Enroll in course

### **Community**
- `GET /community` - Get community posts
- `POST /community` - Create new post
- `POST /community/:id/reply` - Reply to post

### **Admin**
- `GET /admin/users` - Get all users
- `GET /admin/courses` - Get all courses
- `PUT /admin/courses/:id/approve` - Approve course

## 🎯 **Accessibility Compliance**

- **WCAG 2.1 AA Compliant** - Meets accessibility guidelines
- **Section 508 Compatible** - Government accessibility standards
- **Screen Reader Optimized** - Works with JAWS, NVDA, VoiceOver
- **Keyboard Only Navigation** - No mouse required
- **High Contrast Support** - Visual accessibility features

## 🔧 **Development**

### **Available Scripts**

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Populate database with test data

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### **Environment Variables**

**Backend (.env):**
```env
MONGODB_URI=mongodb://localhost:27017/empowerme
JWT_SECRET=your_secure_jwt_secret
PORT=5000
NODE_ENV=development
```

## 🐛 **Troubleshooting**

### **Common Issues**

1. **MongoDB Connection Error**
   - Ensure MongoDB is running: `mongod`
   - Check connection string in `.env`

2. **Port Already in Use**
   - Backend (5000): `lsof -ti:5000 | xargs kill -9`
   - Frontend (5174): `lsof -ti:5174 | xargs kill -9`

3. **TTS Not Working**
   - Ensure you're using a modern browser (Chrome, Firefox, Safari)
   - Check browser permissions for speech synthesis

4. **Authentication Issues**
   - Clear browser localStorage
   - Re-seed database with `npm run seed`

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Web Speech API** for enabling text-to-speech functionality
- **React Team** for the excellent frontend framework
- **MongoDB** for the flexible database solution
- **Tailwind CSS** for accessibility-first styling
- **Accessibility Community** for guidance on inclusive design

## 📞 **Support**

For support and questions:
- **GitHub Issues**: [Create an issue](https://github.com/darshan-mishra17/EmPower/issues)
- **Email**: mishradarshan22@gmail.com

---

**🎓 EmpowerMe - Making Education Accessible for Everyone**
