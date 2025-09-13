import React, { useState } from 'react';
import { Users, FileText, BarChart3, Shield, CheckCircle, AlertTriangle, X } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'analytics'>('users');

  const users = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', role: 'Student', status: 'Active', joinDate: '2025-01-15' },
    { id: 2, name: 'Prof. Michael Chen', email: 'mchen@email.com', role: 'Teacher', status: 'Active', joinDate: '2025-01-10' },
    { id: 3, name: 'Lisa Williams', email: 'lwilliams@email.com', role: 'Parent', status: 'Active', joinDate: '2025-01-12' },
    { id: 4, name: 'David Brown', email: 'dbrown@email.com', role: 'Student', status: 'Pending', joinDate: '2025-01-20' },
  ];

  const contentReviews = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      teacher: 'Prof. Chen',
      uploadDate: '2025-01-18',
      status: 'Pending Review',
      accessibilityScore: 85,
      issues: ['Missing alt text for 2 images', 'Video needs captions'],
    },
    {
      id: 2,
      title: 'Mathematics Fundamentals',
      teacher: 'Prof. Williams',
      uploadDate: '2025-01-16',
      status: 'Approved',
      accessibilityScore: 95,
      issues: [],
    },
  ];

  const analytics = {
    totalUsers: 1247,
    activeStudents: 856,
    teachers: 94,
    parents: 297,
    totalCourses: 156,
    discussionPosts: 2843,
    averageAccessibilityScore: 87,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-red-600" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-gray-600">
            Manage users, review content, and monitor platform analytics
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" role="tablist" aria-label="Admin panel sections">
            {[
              { key: 'users', label: 'User Management', icon: Users },
              { key: 'content', label: 'Content Review', icon: FileText },
              { key: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                role="tab"
                aria-selected={activeTab === key}
                aria-controls={`${key}-panel`}
                onClick={() => setActiveTab(key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2 ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div role="tabpanel" id="users-panel" aria-labelledby="users-tab">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow border">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" aria-hidden="true" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">S</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Students</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.activeStudents}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">T</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Teachers</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.teachers}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">P</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Parents</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.parents}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'Teacher' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'Parent' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Suspend</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Content Review Tab */}
        {activeTab === 'content' && (
          <div role="tabpanel" id="content-panel" aria-labelledby="content-tab">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Review</h2>
              <p className="text-gray-600 mb-6">
                Review uploaded content for accessibility compliance and educational quality.
              </p>
            </div>

            <div className="space-y-6">
              {contentReviews.map((content) => (
                <div key={content.id} className="bg-white rounded-lg shadow-md border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {content.title}
                      </h3>
                      <p className="text-gray-600">
                        Uploaded by {content.teacher} on {content.uploadDate}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {content.status === 'Approved' ? (
                        <span className="flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approved
                        </span>
                      ) : (
                        <span className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Pending Review
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Accessibility Score</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              content.accessibilityScore >= 90 ? 'bg-green-600' :
                              content.accessibilityScore >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${content.accessibilityScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {content.accessibilityScore}/100
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Issues Found</h4>
                      {content.issues.length > 0 ? (
                        <ul className="space-y-1">
                          {content.issues.map((issue, index) => (
                            <li key={index} className="flex items-center text-sm text-red-600">
                              <X className="h-3 w-3 mr-2" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-green-600 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2" />
                          No accessibility issues found
                        </p>
                      )}
                    </div>
                  </div>

                  {content.status === 'Pending Review' && (
                    <div className="flex space-x-4 mt-6 pt-4 border-t border-gray-200">
                      <button className="bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                        Approve Content
                      </button>
                      <button className="bg-yellow-600 hover:bg-yellow-700 focus:bg-yellow-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        Request Changes
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Reject Content
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div role="tabpanel" id="analytics-panel" aria-labelledby="analytics-tab">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Analytics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" aria-hidden="true" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Students</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.activeStudents}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-green-600" aria-hidden="true" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalCourses}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-purple-600" aria-hidden="true" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Discussion Posts</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.discussionPosts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border md:col-span-2 lg:col-span-1">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-orange-600" aria-hidden="true" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg. Accessibility Score</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.averageAccessibilityScore}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">User Engagement</span>
                  <span className="text-green-600 font-medium">Excellent (92%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Content Quality</span>
                  <span className="text-green-600 font-medium">High (87% avg. accessibility)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">System Performance</span>
                  <span className="text-green-600 font-medium">Optimal (99.8% uptime)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;