import React from 'react';
import { User, TrendingUp, Bell, Settings, Clock, Award, AlertCircle } from 'lucide-react';

const ParentDashboard: React.FC = () => {
  const children = [
    {
      id: 1,
      name: 'Emma Johnson',
      grade: '5th Grade',
      totalCourses: 4,
      activeCourses: 3,
      averageScore: 85,
      timeThisWeek: '6.5 hours',
      strengths: ['Mathematics', 'Science'],
      needsWork: ['Reading Comprehension'],
    },
    {
      id: 2,
      name: 'Liam Johnson',
      grade: '8th Grade',
      totalCourses: 6,
      activeCourses: 5,
      averageScore: 78,
      timeThisWeek: '8.2 hours',
      strengths: ['Art', 'History'],
      needsWork: ['Mathematics', 'Physics'],
    },
  ];

  const notifications = [
    {
      id: 1,
      child: 'Emma Johnson',
      message: 'Completed Mathematics Quiz with 92% score',
      time: '2 hours ago',
      type: 'success',
    },
    {
      id: 2,
      child: 'Liam Johnson',
      message: 'Assignment due tomorrow: History Essay',
      time: '1 day ago',
      type: 'warning',
    },
    {
      id: 3,
      child: 'Emma Johnson',
      message: 'Started new course: Digital Art Fundamentals',
      time: '3 days ago',
      type: 'info',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0" role="navigation" aria-label="Parent dashboard navigation">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Parent Portal</h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#overview"
                    className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-current="page"
                  >
                    <User className="h-5 w-5" aria-hidden="true" />
                    <span>Children Overview</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#reports"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <TrendingUp className="h-5 w-5" aria-hidden="true" />
                    <span>Progress Reports</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#notifications"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Bell className="h-5 w-5" aria-hidden="true" />
                    <span>Notifications</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/accessibility"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Settings className="h-5 w-5" aria-hidden="true" />
                    <span>Child Settings</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6" role="main">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, Mrs. Johnson! 👩‍👧‍👦
            </h1>
            <p className="text-gray-600">
              Monitor your children's learning progress and adjust their accessibility preferences.
            </p>
          </div>

          {/* Children Overview */}
          <section id="overview" aria-labelledby="overview-heading" className="mb-8">
            <h2 id="overview-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Children's Progress
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">{child.name}</h3>
                      <p className="text-gray-600">{child.grade}</p>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" aria-hidden="true" />
                        <span className="ml-2 text-sm font-medium text-blue-600">Average Score</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-800">{child.averageScore}%</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-green-600" aria-hidden="true" />
                        <span className="ml-2 text-sm font-medium text-green-600">This Week</span>
                      </div>
                      <p className="text-2xl font-bold text-green-800">{child.timeThisWeek}</p>
                    </div>
                  </div>

                  {/* Course Information */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">{child.activeCourses}</span> active courses out of <span className="font-medium">{child.totalCourses}</span> total
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(child.activeCourses / child.totalCourses) * 100}%` }}
                        role="progressbar"
                        aria-valuenow={(child.activeCourses / child.totalCourses) * 100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${child.name} course progress`}
                      />
                    </div>
                  </div>

                  {/* Strengths and Areas for Improvement */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center mb-2">
                        <Award className="h-4 w-4 text-green-600" aria-hidden="true" />
                        <span className="ml-2 text-sm font-medium text-green-700">Strengths</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {child.strengths.map((strength, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <AlertCircle className="h-4 w-4 text-orange-600" aria-hidden="true" />
                        <span className="ml-2 text-sm font-medium text-orange-700">Needs Focus</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {child.needsWork.map((area, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <a
                      href={`/student/${child.id}/details`}
                      className="w-full bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block text-center"
                    >
                      View Detailed Report
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notifications Section */}
          <section id="notifications" aria-labelledby="notifications-heading">
            <h2 id="notifications-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Recent Activity
            </h2>
            
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border-l-4 ${
                        notification.type === 'success'
                          ? 'bg-green-50 border-green-400'
                          : notification.type === 'warning'
                          ? 'bg-yellow-50 border-yellow-400'
                          : 'bg-blue-50 border-blue-400'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'success'
                          ? 'bg-green-400'
                          : notification.type === 'warning'
                          ? 'bg-yellow-400'
                          : 'bg-blue-400'
                      }`} />
                      
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{notification.child}</p>
                        <p className="text-gray-700 mt-1">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;