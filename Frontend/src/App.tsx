import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import CoursePage from './pages/CoursePage';
import AccessibilitySettings from './pages/AccessibilitySettings';
import CommunityPage from './pages/CommunityPage';
import AdminPanel from './pages/AdminPanel';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/accessibility" element={<AccessibilitySettings />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;