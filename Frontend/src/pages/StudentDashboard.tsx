import React from 'react';
import { BookOpen, Clock, Users, Settings, TrendingUp } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript with accessibility best practices.',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      timeSpent: '12 hours',
    },
    {
      id: 2,
      title: 'Mathematics Foundations',
      description: 'Essential mathematical concepts with visual and auditory learning support.',
      progress: 45,
      totalLessons: 25,
      completedLessons: 11,
      timeSpent: '8 hours',
    },
    {
      id: 3,
      title: 'Digital Art Fundamentals',
      description: 'Creative expression through digital tools with adaptive interfaces.',
      progress: 30,
      totalLessons: 15,
      completedLessons: 5,
      timeSpent: '4 hours',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0" role="navigation" aria-label="Student dashboard navigation">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Student Portal</h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#courses"
                    className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-current="page"
                  >
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                    <span>My Courses</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#progress"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <TrendingUp className="h-5 w-5" aria-hidden="true" />
                    <span>Progress</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/accessibility"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Settings className="h-5 w-5" aria-hidden="true" />
                    <span>Accessibility Settings</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Users className="h-5 w-5" aria-hidden="true" />
                    <span>Community</span>
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
              Welcome back, Sarah! 👋
            </h1>
            <p className="text-gray-600">
              Ready to continue your learning journey? You have 3 active courses.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-500" aria-hidden="true" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-500" aria-hidden="true" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hours Studied</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-500" aria-hidden="true" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Progress</p>
                  <p className="text-2xl font-bold text-gray-900">50%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <section id="courses" aria-labelledby="courses-heading">
            <h2 id="courses-heading" className="text-2xl font-bold text-gray-900 mb-6">
              My Courses
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <a
                        href={`/course/${course.id}`}
                        className="hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        {course.title}
                      </a>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {course.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                          role="progressbar"
                          aria-valuenow={course.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Course progress: ${course.progress}%`}
                        />
                      </div>
                    </div>
                    
                    {/* Course Stats */}
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      <span>{course.timeSpent} studied</span>
                    </div>
                    
                    <a
                      href={`/course/${course.id}`}
                      className="w-full bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block text-center"
                    >
                      Continue Learning
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;