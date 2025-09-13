import React, { useState } from 'react';
import { Plus, BookOpen, Upload, BarChart3, FileText, Video, Image } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    contentType: 'video' as 'video' | 'pdf' | 'text',
    file: null as File | null,
    captions: '',
    altText: '',
  });

  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      students: 24,
      progress: 78,
      lastUpdated: '2 days ago',
    },
    {
      id: 2,
      title: 'Mathematics Foundations',
      students: 18,
      progress: 65,
      lastUpdated: '1 week ago',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm({ ...uploadForm, file });
    }
  };

  const handleSubmitContent = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle content upload
    console.log('Content uploaded:', uploadForm);
    setShowUploadForm(false);
    setUploadForm({
      title: '',
      description: '',
      contentType: 'video',
      file: null,
      captions: '',
      altText: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0" role="navigation" aria-label="Teacher dashboard navigation">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Teacher Portal</h2>
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
                  <button
                    onClick={() => setShowUploadForm(true)}
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-left"
                  >
                    <Upload className="h-5 w-5" aria-hidden="true" />
                    <span>Upload Content</span>
                  </button>
                </li>
                <li>
                  <a
                    href="#reports"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <BarChart3 className="h-5 w-5" aria-hidden="true" />
                    <span>Student Reports</span>
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
              Welcome, Professor Johnson! 👨‍🏫
            </h1>
            <p className="text-gray-600">
              Manage your courses and create accessible content for all learners.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" aria-hidden="true" />
              <span>Add New Course</span>
            </button>
          </div>

          {/* Upload Content Modal */}
          {showUploadForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="upload-title">
              <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h2 id="upload-title" className="text-2xl font-bold text-gray-900 mb-6">
                  Upload Course Content
                </h2>
                
                <form onSubmit={handleSubmitContent} className="space-y-4">
                  <div>
                    <label htmlFor="content-title" className="block text-sm font-medium text-gray-700 mb-2">
                      Content Title
                    </label>
                    <input
                      id="content-title"
                      type="text"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="content-description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="content-description"
                      rows={3}
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="content-type" className="block text-sm font-medium text-gray-700 mb-2">
                      Content Type
                    </label>
                    <select
                      id="content-type"
                      value={uploadForm.contentType}
                      onChange={(e) => setUploadForm({ ...uploadForm, contentType: e.target.value as 'video' | 'pdf' | 'text' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="video">Video</option>
                      <option value="pdf">PDF Document</option>
                      <option value="text">Text Content</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="content-file" className="block text-sm font-medium text-gray-700 mb-2">
                      Upload File
                    </label>
                    <input
                      id="content-file"
                      type="file"
                      onChange={handleFileUpload}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      accept={uploadForm.contentType === 'video' ? 'video/*' : uploadForm.contentType === 'pdf' ? '.pdf' : '*'}
                    />
                  </div>

                  {uploadForm.contentType === 'video' && (
                    <div>
                      <label htmlFor="captions" className="block text-sm font-medium text-gray-700 mb-2">
                        Captions/Subtitles (Required for accessibility)
                      </label>
                      <textarea
                        id="captions"
                        rows={3}
                        value={uploadForm.captions}
                        onChange={(e) => setUploadForm({ ...uploadForm, captions: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Provide video captions or subtitle text..."
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="alt-text" className="block text-sm font-medium text-gray-700 mb-2">
                      Alternative Text Description
                    </label>
                    <textarea
                      id="alt-text"
                      rows={2}
                      value={uploadForm.altText}
                      onChange={(e) => setUploadForm({ ...uploadForm, altText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the content for screen readers..."
                      required
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Upload Content
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUploadForm(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
                    
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{course.students} students enrolled</span>
                      <span>Updated {course.lastUpdated}</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Course Completion</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                          role="progressbar"
                          aria-valuenow={course.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Course completion: ${course.progress}%`}
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <a
                        href={`/course/${course.id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
                      >
                        Manage Course
                      </a>
                      <button className="bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        View Reports
                      </button>
                    </div>
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

export default TeacherDashboard;