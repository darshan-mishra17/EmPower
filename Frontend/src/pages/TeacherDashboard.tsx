import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, ClipboardList, 
  TrendingUp, MessageSquare,
  Award, UserCheck, BarChart3
} from 'lucide-react';

interface Student {
  _id: string;
  name: string;
  email: string;
  batchNumber: string;
  disabilityType: string[];
  averageGrade: number;
  attendancePercentage: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  totalStudents: number;
  completionRate: number;
}

interface Assignment {
  _id: string;
  title: string;
  dueDate: Date;
  submissions: number;
  totalStudents: number;
}

interface ClassAnalytics {
  totalStudents: number;
  averageGrade: number;
  attendanceRate: number;
  completionRate: number;
}

const TeacherDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [analytics, setAnalytics] = useState<ClassAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demo - in real app, this would come from API
  const mockTeacher = {
    name: "Dr. Emily Johnson",
    email: "emily.johnson@school.edu",
    department: "Special Education",
    classes: ["Math 101", "Science Basics", "Communication Skills"]
  };

  const mockStudents: Student[] = [
    {
      _id: "1",
      name: "Sarah Mitchell",
      email: "sarah.mitchell@student.edu",
      batchNumber: "BATCH-2024-A",
      disabilityType: ["Visual Impairment", "Learning Disability"],
      averageGrade: 85,
      attendancePercentage: 92
    },
    {
      _id: "2", 
      name: "Alex Chen",
      email: "alex.chen@student.edu",
      batchNumber: "BATCH-2024-A",
      disabilityType: ["Hearing Impairment"],
      averageGrade: 78,
      attendancePercentage: 88
    },
    {
      _id: "3",
      name: "Maria Rodriguez", 
      email: "maria.rodriguez@student.edu",
      batchNumber: "BATCH-2024-B",
      disabilityType: ["Motor Disability"],
      averageGrade: 91,
      attendancePercentage: 95
    }
  ];

  const mockCourses: Course[] = [
    {
      _id: "1",
      title: "Mathematics Fundamentals",
      description: "Basic math concepts with visual aids",
      totalStudents: 25,
      completionRate: 78
    },
    {
      _id: "2", 
      title: "Science Exploration",
      description: "Interactive science learning",
      totalStudents: 22,
      completionRate: 85
    },
    {
      _id: "3",
      title: "Communication Skills",
      description: "Building effective communication",
      totalStudents: 18,
      completionRate: 92
    }
  ];

  const mockAssignments: Assignment[] = [
    {
      _id: "1",
      title: "Math Problem Set 5",
      dueDate: new Date('2024-12-20'),
      submissions: 18,
      totalStudents: 25
    },
    {
      _id: "2",
      title: "Science Project Presentation",
      dueDate: new Date('2024-12-22'),
      submissions: 15,
      totalStudents: 22
    },
    {
      _id: "3",
      title: "Communication Journal",
      dueDate: new Date('2024-12-25'),
      submissions: 16,
      totalStudents: 18
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real app, these would be actual API calls
        setStudents(mockStudents);
        setCourses(mockCourses);
        setAssignments(mockAssignments);
        
        // Calculate analytics
        const totalStudents = mockStudents.length;
        const averageGrade = mockStudents.reduce((sum, s) => sum + s.averageGrade, 0) / totalStudents;
        const attendanceRate = mockStudents.reduce((sum, s) => sum + s.attendancePercentage, 0) / totalStudents;
        const completionRate = mockCourses.reduce((sum, c) => sum + c.completionRate, 0) / mockCourses.length;
        
        setAnalytics({
          totalStudents,
          averageGrade: Math.round(averageGrade),
          attendanceRate: Math.round(attendanceRate),
          completionRate: Math.round(completionRate)
        });
        
      } catch (error) {
        console.error('Error fetching teacher dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.totalStudents || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Class Average</p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.averageGrade || 0}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="flex items-center">
            <UserCheck className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.attendanceRate || 0}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.completionRate || 0}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Assignments</h3>
        <div className="space-y-3">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                <p className="text-sm text-gray-600">
                  Due: {assignment.dueDate.toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {assignment.submissions}/{assignment.totalStudents} submitted
                </p>
                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course._id} className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{course.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{course.totalStudents} students</span>
                <span className={`font-medium ${
                  course.completionRate >= 90 ? 'text-green-600' :
                  course.completionRate >= 75 ? 'text-blue-600' : 'text-orange-600'
                }`}>
                  {course.completionRate}% completion
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${
                    course.completionRate >= 90 ? 'bg-green-500' :
                    course.completionRate >= 75 ? 'bg-blue-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${course.completionRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Management</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Accommodations</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Average Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.batchNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.disabilityType.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    student.averageGrade >= 90 ? 'bg-green-100 text-green-800' :
                    student.averageGrade >= 80 ? 'bg-blue-100 text-blue-800' :
                    student.averageGrade >= 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {student.averageGrade}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    student.attendancePercentage >= 90 ? 'bg-green-100 text-green-800' :
                    student.attendancePercentage >= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {student.attendancePercentage}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                  <button className="text-green-600 hover:text-green-900">Message</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Assignment Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            Create New Assignment
          </button>
        </div>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                  <p className="text-sm text-gray-600">Due: {assignment.dueDate.toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-900 text-sm">View Submissions</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {assignment.submissions}/{assignment.totalStudents} submissions
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading teacher dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Teacher Portal</h2>
            
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'overview' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Overview</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('students')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'students' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Users className="h-5 w-5" />
                    <span>Students</span>
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
                    <span>Courses</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('assignments')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'assignments' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ClipboardList className="h-5 w-5" />
                    <span>Assignments</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('communication')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'communication' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Communication</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, {mockTeacher.name}! 👩‍🏫
            </h1>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h2 className="text-lg font-semibold text-green-900 mb-2">
                {mockTeacher.department} Department
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Email:</span>
                  <span className="ml-2 text-green-600">{mockTeacher.email}</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Classes:</span>
                  <span className="ml-2 text-green-600">{mockTeacher.classes.join(', ')}</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Total Students:</span>
                  <span className="ml-2 text-green-600">{analytics?.totalStudents || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'assignments' && renderAssignments()}
          {activeTab === 'courses' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course._id} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">{course.totalStudents} students</span>
                      <span className={`font-medium ${
                        course.completionRate >= 90 ? 'text-green-600' :
                        course.completionRate >= 75 ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {course.completionRate}% completion
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className={`h-2 rounded-full ${
                          course.completionRate >= 90 ? 'bg-green-500' :
                          course.completionRate >= 75 ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${course.completionRate}%` }}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Edit Course</button>
                      <button className="text-green-600 hover:text-green-900 text-sm">View Content</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'communication' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Center</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Message Students/Parents</h4>
                  <p className="text-sm text-gray-600 mb-3">Send updates and communicate with your students and their parents</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                    Send Message
                  </button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Announcements</h4>
                  <p className="text-sm text-gray-600 mb-3">Post class announcements and important updates</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
                    Create Announcement
                  </button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Meeting Requests</h4>
                  <p className="text-sm text-gray-600 mb-3">Schedule meetings with parents or students</p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700">
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;