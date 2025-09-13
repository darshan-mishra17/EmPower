import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Volume2, FileText, CheckCircle, Circle, ArrowRight } from 'lucide-react';

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'lessons' | 'quizzes' | 'progress'>('lessons');
  const [currentLesson, setCurrentLesson] = useState(0);

  const course = {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript with accessibility best practices.',
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
  };

  const lessons = [
    {
      id: 1,
      title: 'HTML Fundamentals',
      duration: '15 min',
      completed: true,
      content: 'Learn the basic structure of HTML documents and semantic elements.',
      videoUrl: 'https://example.com/video1.mp4',
    },
    {
      id: 2,
      title: 'CSS Styling Basics',
      duration: '20 min',
      completed: true,
      content: 'Understand how to style your HTML with CSS properties and selectors.',
      videoUrl: 'https://example.com/video2.mp4',
    },
    {
      id: 3,
      title: 'Accessibility in Web Design',
      duration: '25 min',
      completed: false,
      content: 'Learn about WCAG guidelines and how to create accessible web experiences.',
      videoUrl: 'https://example.com/video3.mp4',
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: 'HTML Knowledge Check',
      questions: 10,
      completed: true,
      score: 85,
    },
    {
      id: 2,
      title: 'CSS Fundamentals Quiz',
      questions: 8,
      completed: false,
      score: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Course Progress</span>
              <span>{course.progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
                role="progressbar"
                aria-valuenow={course.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Course progress: ${course.progress}%`}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {course.completedLessons} of {course.totalLessons} lessons completed
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" role="tablist" aria-label="Course sections">
            {[
              { key: 'lessons', label: 'Lessons', icon: Play },
              { key: 'quizzes', label: 'Quizzes', icon: FileText },
              { key: 'progress', label: 'Progress', icon: CheckCircle },
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
        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div role="tabpanel" id="lessons-panel" aria-labelledby="lessons-tab">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lesson List */}
              <div className="lg:col-span-1">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Course Lessons</h2>
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(index)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        currentLesson === index
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{lesson.title}</p>
                          <p className="text-sm text-gray-500">{lesson.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lesson Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {lessons[currentLesson].title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {lessons[currentLesson].content}
                    </p>
                  </div>

                  {/* Video Player Placeholder */}
                  <div className="mb-6">
                    <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                      <div className="text-center text-white">
                        <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <p className="text-lg">Video content would play here</p>
                        <p className="text-sm opacity-70">Captions and audio descriptions available</p>
                      </div>
                    </div>
                    
                    {/* Video Controls */}
                    <div className="mt-4 flex space-x-4">
                      <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Play className="h-4 w-4" />
                        <span>Play Video</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <Volume2 className="h-4 w-4" />
                        <span>Listen (TTS)</span>
                      </button>
                    </div>
                  </div>

                  {/* Lesson Text Content */}
                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      This lesson covers the fundamental concepts of {lessons[currentLesson].title.toLowerCase()}. 
                      You'll learn through interactive examples and hands-on practice.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      All content is designed with accessibility in mind, featuring clear visual hierarchy, 
                      descriptive alt text for images, and comprehensive audio descriptions for video content.
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <button
                      disabled={currentLesson === 0}
                      onClick={() => setCurrentLesson(currentLesson - 1)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 focus:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      <ArrowRight className="h-4 w-4 transform rotate-180" />
                      <span>Previous</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        // Mark lesson as complete
                        console.log('Lesson completed');
                      }}
                      className="bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Mark as Complete
                    </button>
                    
                    <button
                      disabled={currentLesson === lessons.length - 1}
                      onClick={() => setCurrentLesson(currentLesson + 1)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 focus:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      <span>Next</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div role="tabpanel" id="quizzes-panel" aria-labelledby="quizzes-tab">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Quizzes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 mb-4">{quiz.questions} questions</p>
                  
                  {quiz.completed ? (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-700 font-medium">Completed</span>
                      </div>
                      <p className="text-gray-600">Score: <span className="font-bold text-green-600">{quiz.score}%</span></p>
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-4">Not yet attempted</p>
                  )}
                  
                  <button
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      quiz.completed
                        ? 'bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 text-gray-700 focus:ring-gray-500'
                        : 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white focus:ring-blue-500'
                    }`}
                  >
                    {quiz.completed ? 'Review Quiz' : 'Start Quiz'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div role="tabpanel" id="progress-panel" aria-labelledby="progress-tab">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Course Completion</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  You've completed {course.completedLessons} out of {course.totalLessons} lessons
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Lessons Completed</h4>
                  <p className="text-2xl font-bold text-blue-800">{course.completedLessons}</p>
                  <p className="text-sm text-blue-600">out of {course.totalLessons}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Quiz Average</h4>
                  <p className="text-2xl font-bold text-green-800">85%</p>
                  <p className="text-sm text-green-600">across all quizzes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;