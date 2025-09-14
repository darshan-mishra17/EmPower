import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData: { name: string; email: string; password: string; role: string }) =>
    api.post('/auth/register', userData),
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

export const userAPI = {
  getProfile: (id: string) => api.get(`/users/${id}`),
  updatePreferences: (id: string, preferences: any) =>
    api.put(`/users/${id}/preferences`, preferences),
  getChildren: (id: string) => api.get(`/users/${id}/children`),
};

export const courseAPI = {
  getCourses: () => api.get('/courses'),
  getCourse: (id: string) => api.get(`/courses/${id}`),
  createCourse: (courseData: any) => api.post('/courses', courseData),
  enrollCourse: (id: string) => api.post(`/courses/${id}/enroll`),
  updateProgress: (id: string, progress: any) => api.put(`/courses/${id}/progress`, progress),
};

export const quizAPI = {
  submitQuiz: (courseId: string, quizId: string, answers: any) =>
    api.post(`/courses/${courseId}/quiz/${quizId}/submit`, { answers }),
  getQuizResults: (courseId: string, quizId: string) =>
    api.get(`/courses/${courseId}/quiz/${quizId}/results`),
};

export const communityAPI = {
  getPosts: () => api.get('/community'),
  createPost: (postData: { content: string }) => api.post('/community', postData),
  addReply: (id: string, replyData: { content: string }) =>
    api.post(`/community/${id}/reply`, replyData),
};

export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  getCourses: () => api.get('/admin/courses'),
  approveCourse: (id: string) => api.put(`/admin/courses/${id}/approve`),
};

// Student Dashboard APIs
export const studentAPI = {
  // Assessment APIs
  getAssessments: () => api.get('/student/assessments'),
  createAssessment: (assessmentData: any) => api.post('/student/assessments', assessmentData),
  updateAssessment: (id: string, updateData: any) => api.put(`/student/assessments/${id}`, updateData),
  
  // Attendance APIs
  getAttendance: () => api.get('/student/attendance'),
  updateAttendance: (attendanceData: any) => api.post('/student/attendance', attendanceData),
  
  // Interactive Tools APIs
  getQuizzes: () => api.get('/student/quizzes'),
  submitQuiz: (quizData: any) => api.post('/student/quizzes/submit', quizData),
  getProjects: () => api.get('/student/projects'),
  getFlashcards: () => api.get('/student/flashcards'),
  
  // Tests and Feedback APIs
  getUpcomingTests: () => api.get('/student/upcoming-tests'),
  getFeedback: () => api.get('/student/feedback'),
  submitFeedback: (feedbackData: any) => api.post('/student/feedback', feedbackData),
  getStudentGuides: () => api.get('/student/guides'),
};

export default api;
