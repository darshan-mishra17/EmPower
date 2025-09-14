import React, { useState, useEffect } from 'react';
import { 
  User, Calendar, Award, TrendingUp, Bell, MessageSquare, 
  FileText, Clock, BookOpen, BarChart3, AlertCircle, CheckCircle 
} from 'lucide-react';
import { studentAPI } from '../services/api';

interface Child {
  _id: string;
  name: string;
  email: string;
  batchNumber: string;
  disabilityType: string[];
}

interface Assessment {
  _id: string;
  title: string;
  percentage: number;
  grade: string;
  submittedAt: Date;
}

interface Attendance {
  monthlyData: {
    month: number;
    percentage: number;
    presentDays: number;
    totalDays: number;
  }[];
}

interface UpcomingTest {
  _id: string;
  title: string;
  testDate: Date;
  syllabus: { topic: string; weightage: number }[];
}

const ParentDashboard: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [upcomingTests, setUpcomingTests] = useState<UpcomingTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demo - in real app, this would come from API
  const mockParent = {
    name: "Michael Mitchell",
    email: "michael.mitchell@parent.com",
    children: [
      {
        _id: "child1",
        name: "Sarah Mitchell",
        email: "sarah.mitchell@student.edu",
        batchNumber: "BATCH-2024-A",
        disabilityType: ["Visual Impairment", "Learning Disability"]
      }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setChildren(mockParent.children);
        setSelectedChild(mockParent.children[0]?._id || '');
        
        // Fetch child's data
        if (mockParent.children.length > 0) {
          const [assessmentsRes, attendanceRes, testsRes] = await Promise.all([
            studentAPI.getAssessments(),
            studentAPI.getAttendance(),
            studentAPI.getUpcomingTests()
          ]);
          
          setAssessments(assessmentsRes.data);
          setAttendance(attendanceRes.data[0] || null);
          setUpcomingTests(testsRes.data);
        }
      } catch (error) {
        console.error('Error fetching parent dashboard data:', error);
        // Set fallback data
        setChildren(mockParent.children);
        setSelectedChild(mockParent.children[0]?._id || '');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedChildData = children.find(child => child._id === selectedChild);

  const getMonthName = (monthNumber: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNumber - 1] || 'Unknown';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-2xl font-bold text-gray-900">
                {assessments.length > 0 ? 
                  (assessments.reduce((sum, a) => sum + a.percentage, 0) / assessments.length).toFixed(1) + '%' 
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-gray-900">
                {attendance?.monthlyData?.length > 0 ? 
                  (attendance.monthlyData.reduce((sum, m) => sum + m.percentage, 0) / attendance.monthlyData.length).toFixed(1) + '%' 
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

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Progress Trend</p>
              <p className="text-2xl font-bold text-gray-900">↗ Improving</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Assessments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessments</h3>
        <div className="space-y-3">
          {assessments.slice(0, 3).map((assessment) => (
            <div key={assessment._id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{assessment.title}</h4>
                <p className="text-sm text-gray-600">
                  Submitted: {new Date(assessment.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${
                  assessment.grade === 'A' || assessment.grade === 'A+' ? 'bg-green-100 text-green-800' :
                  assessment.grade === 'B' || assessment.grade === 'B+' ? 'bg-blue-100 text-blue-800' :
                  assessment.grade === 'C' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {assessment.grade}
                </span>
                <p className="text-sm text-gray-600 mt-1">{assessment.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Tests */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tests</h3>
        <div className="space-y-3">
          {upcomingTests.map((test) => (
            <div key={test._id} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{test.title}</h4>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(test.testDate).toLocaleDateString()}
                  </p>
                </div>
                <Bell className="h-5 w-5 text-orange-500" />
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-700 font-medium">Topics to cover:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {test.syllabus.slice(0, 3).map((item, index) => (
                    <li key={index}>{item.topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
      {attendance?.monthlyData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attendance.monthlyData.map((record, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{getMonthName(record.month)} 2024</h4>
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
                {record.presentDays}/{record.totalDays} days present
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No attendance data available</p>
      )}
    </div>
  );

  const renderAcademicProgress = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assessment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assessments.map((assessment) => (
                <tr key={assessment._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {assessment.title}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(assessment.submittedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading parent dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Parent Portal</h2>
            
            {/* Child Selector */}
            {children.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
                <select
                  value={selectedChild}
                  onChange={(e) => setSelectedChild(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {children.map((child) => (
                    <option key={child._id} value={child._id}>
                      {child.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
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
                    onClick={() => setActiveTab('academic')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-left transition-colors ${
                      activeTab === 'academic' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Award className="h-5 w-5" />
                    <span>Academic Progress</span>
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
              Welcome, {mockParent.name}! 👨‍👩‍👧
            </h1>
            {selectedChildData && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">
                  Monitoring: {selectedChildData.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-700">Batch:</span>
                    <span className="ml-2 text-blue-600">{selectedChildData.batchNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Email:</span>
                    <span className="ml-2 text-blue-600">{selectedChildData.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Accommodations:</span>
                    <span className="ml-2 text-blue-600">{selectedChildData.disabilityType.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'attendance' && renderAttendance()}
          {activeTab === 'academic' && renderAcademicProgress()}
          {activeTab === 'communication' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Center</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Message Teachers</h4>
                  <p className="text-sm text-gray-600 mb-3">Send messages to your child's teachers directly</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                    Start Conversation
                  </button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Schedule Parent-Teacher Meeting</h4>
                  <p className="text-sm text-gray-600 mb-3">Book a meeting to discuss your child's progress</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
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

export default ParentDashboard;
