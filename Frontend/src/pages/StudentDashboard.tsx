import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Clock, Users, Settings, TrendingUp, User, MapPin, 
  Calendar, Award, BarChart3, FileText, PlayCircle, Target,
  MessageSquare, CheckCircle, AlertCircle, Star, Download
} from 'lucide-react';
import { courseAPI, studentAPI } from '../services/api';
import { ReadableContent } from '../components/ReadableContent';

interface Course {
  _id: string;
  title: string;
  description: string;
  progress?: number;
  totalLessons?: number;
  completedLessons?: number;
  timeSpent?: string;
}

interface StudentProfile {
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  batchNumber: string;
  disabilityType: string[];
}

interface Assessment {
  _id: string;
  courseName: string;
  marks: number;
  totalMarks: number;
  grade: string;
  percentage: number;
  improvements: string[];
  submittedAt: Date;
}

interface Attendance {
  _id: string;
  month: string;
  daysPresent: number;
  totalDays: number;
  percentage: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  course: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  submissionDate: Date;
  status: 'pending' | 'submitted' | 'graded';
  course: string;
}

interface UpcomingTest {
  _id: string;
  title: string;
  course: string;
  date: Date;
  syllabus: string[];
}

interface StudentFeedback {
  _id: string;
  course: string;
  rating: number;
  comment: string;
  submittedAt: Date;
}

const StudentDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [upcomingTests, setUpcomingTests] = useState<UpcomingTest[]>([]);
  const [feedbacks, setFeedbacks] = useState<StudentFeedback[]>([]);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get user profile from localStorage (from login)
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setStudentProfile({
            name: user.name || 'Student',
            email: user.email || '',
            address: user.address || {
              street: '',
              city: '',
              state: '',
              zipCode: ''
            },
            batchNumber: user.batchNumber || '',
            disabilityType: user.disabilityType || []
          });
        }
        
        const [coursesRes, assessmentsRes, attendanceRes, quizzesRes, projectsRes, testsRes, feedbackRes] = await Promise.all([
          courseAPI.getCourses(),
          studentAPI.getAssessments(),
          studentAPI.getAttendance(),
          studentAPI.getQuizzes(),
          studentAPI.getProjects(),
          studentAPI.getUpcomingTests(),
          studentAPI.getFeedback()
        ]);
        
        setCourses(coursesRes.data);
        setAssessments(assessmentsRes.data);
        setAttendance(attendanceRes.data);
        setQuizzes(quizzesRes.data);
        setProjects(projectsRes.data);
        setUpcomingTests(testsRes.data);
        setFeedbacks(feedbackRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set fallback data if API calls fail
        setStudentProfile({
          name: 'Sarah Mitchell',
          email: 'sarah.mitchell@student.edu',
          address: {
            street: '123 Student Street',
            city: 'Toronto',
            state: 'Ontario',
            zipCode: 'M5V 3A1'
          },
          batchNumber: 'BATCH-2024-A',
          disabilityType: ['Visual Impairment', 'Learning Disability']
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderProfileSection = () => {
    if (!studentProfile) return null;
    
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center mb-4">
          <User className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Student Profile</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{studentProfile.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{studentProfile.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <p className="font-medium">
              {studentProfile.address.street}, {studentProfile.address.city}, {studentProfile.address.state} {studentProfile.address.zipCode}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Batch Number</p>
            <p className="font-medium">{studentProfile.batchNumber}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600 mb-2">Disability Type</p>
            <div className="flex flex-wrap gap-2">
              {studentProfile.disabilityType.map((type, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAssessmentsSection = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center mb-4">
        <Award className="h-6 w-6 text-green-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Assessments & Performance</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Improvements</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assessments.map((assessment) => (
              <tr key={assessment._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {assessment.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {assessment.marks}/{assessment.totalMarks}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    assessment.grade === 'A' || assessment.grade === 'A+' ? 'bg-green-100 text-green-800' :
                    assessment.grade === 'B' || assessment.grade === 'B+' ? 'bg-blue-100 text-blue-800' :
                    assessment.grade === 'C' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {assessment.grade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {assessment.percentage}%
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc list-inside">
                    {assessment.improvements.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendanceSection = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center mb-4">
        <Calendar className="h-6 w-6 text-purple-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Attendance Tracker</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attendance.map((record) => (
          <div key={record._id} className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">{record.month}</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Attendance</span>
                <span>{record.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    record.percentage >= 90 ? 'bg-green-500' :
                    record.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${record.percentage}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {record.daysPresent}/{record.totalDays} days present
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInteractiveToolsSection = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center mb-4">
        <PlayCircle className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Interactive Learning Tools</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quizzes */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Available Quizzes</h3>
          <div className="space-y-3">
            {quizzes.slice(0, 3).map((quiz) => (
              <div key={quiz._id} className="border rounded-lg p-3 hover:bg-gray-50">
                <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
                <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700">
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Projects */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Active Projects</h3>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div key={project._id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{project.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    project.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(project.submissionDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpcomingTestsSection = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center mb-4">
        <AlertCircle className="h-6 w-6 text-orange-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Tests</h2>
      </div>
      <div className="space-y-4">
        {upcomingTests.map((test) => (
          <div key={test._id} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{test.title}</h3>
                <p className="text-sm text-gray-600">{test.course}</p>
              </div>
              <span className="text-sm text-orange-600 font-medium">
                {new Date(test.date).toLocaleDateString()}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-700 mb-1">Syllabus:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {test.syllabus.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeedbackSection = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center mb-4">
        <MessageSquare className="h-6 w-6 text-pink-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Student Feedback</h2>
      </div>
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{feedback.course}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600">{feedback.comment}</p>
            <p className="text-xs text-gray-500 mt-2">
              Submitted: {new Date(feedback.submittedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TTS Instructions Banner for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        <p>Welcome to EmpowerMe Student Dashboard. Text-to-Speech is available. Press Ctrl+Shift+S to start reading the page, Ctrl+Shift+P to pause or resume, and Ctrl+Shift+A to toggle auto-read mode. You can also press Enter on any content section to read it individually.</p>
      </div>
      
      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0" role="navigation">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Student Portal</h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'overview' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span>Overview</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'courses' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>My Courses</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('assessments')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'assessments' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Award className="h-5 w-5" />
                    <span>Assessments</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('attendance')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'attendance' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Attendance</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('tools')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'tools' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <PlayCircle className="h-5 w-5" />
                    <span>Learning Tools</span>
                  </button>
                </li>
                <li>
                  <a
                    href="/accessibility"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Accessibility</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                  >
                    <Users className="h-5 w-5" />
                    <span>Community</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6" role="main">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {studentProfile?.name || 'Student'}! 👋
            </h1>
            <p className="text-gray-600">
              Ready to continue your learning journey? Here's your personalized dashboard.
            </p>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <ReadableContent ariaLabel="Active Courses Statistics" className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                    </div>
                  </div>
                </ReadableContent>
                
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Grade</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {assessments.length > 0 ? 
                          (assessments.reduce((sum, a) => sum + a.percentage, 0) / assessments.length).toFixed(1) + '%' 
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-purple-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Attendance</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {attendance.length > 0 ? 
                          (attendance.reduce((sum, a) => sum + a.percentage, 0) / attendance.length).toFixed(1) + '%' 
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-orange-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Upcoming Tests</p>
                      <p className="text-2xl font-bold text-gray-900">{upcomingTests.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {renderUpcomingTestsSection()}
              {renderInteractiveToolsSection()}
            </>
          )}
          
          {activeTab === 'profile' && renderProfileSection()}
          
          {activeTab === 'courses' && (
            <section id="courses">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <div key={course._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <a href={`/course/${course._id}`} className="hover:text-blue-600">
                          {course.title}
                        </a>
                      </h3>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span>{course.timeSpent} studied</span>
                      </div>
                      
                      <a
                        href={`/course/${course._id}`}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors text-center block"
                      >
                        Continue Learning
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {activeTab === 'assessments' && renderAssessmentsSection()}
          {activeTab === 'attendance' && renderAttendanceSection()}
          {activeTab === 'tools' && renderInteractiveToolsSection()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;