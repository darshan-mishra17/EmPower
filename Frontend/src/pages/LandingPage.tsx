import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Heart, ChevronRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="hero-heading">
        <div className="max-w-7xl mx-auto text-center">
          <h1 
            id="hero-heading" 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Inclusive Learning Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Accessible, Adaptive, and Inclusive Education for All
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 min-w-[200px] flex items-center justify-center space-x-2"
              aria-label="Student login - Access your courses and learning materials"
            >
              <Users className="h-6 w-6" aria-hidden="true" />
              <span>I am a Student</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 min-w-[200px] flex items-center justify-center space-x-2"
              aria-label="Teacher login - Create and manage courses"
            >
              <BookOpen className="h-6 w-6" aria-hidden="true" />
              <span>I am a Teacher</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="features-heading" className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Inclusive Learning?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessible Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with accessibility in mind, featuring text-to-speech, high contrast modes, and keyboard navigation.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-colors duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Adaptive Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Personalized learning paths that adapt to individual learning styles and accessibility needs.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border-2 border-gray-200 hover:border-purple-300 transition-colors duration-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Inclusive Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with learners and educators in a supportive, moderated community environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 id="cta-heading" className="text-3xl font-bold mb-6">
            Ready to Start Your Inclusive Learning Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners who are already experiencing education without barriers.
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 hover:bg-gray-100 focus:bg-gray-100 px-8 py-4 rounded-lg text-xl font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 inline-flex items-center space-x-2"
            aria-label="Get started with your account"
          >
            <span>Get Started Today</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;