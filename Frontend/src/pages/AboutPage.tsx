import React from 'react';
import { Heart, Users, BookOpen, Award, Globe, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Inclusive by Design',
      description: 'Every feature is built with accessibility in mind, ensuring no learner is left behind.',
    },
    {
      icon: BookOpen,
      title: 'Adaptive Learning',
      description: 'Personalized learning paths that adjust to individual needs and learning styles.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with fellow learners, educators, and families in our supportive community.',
    },
    {
      icon: Globe,
      title: 'Universal Access',
      description: 'WCAG 2.1 AA compliant platform accessible from anywhere, on any device.',
    },
    {
      icon: Zap,
      title: 'Cutting-edge Technology',
      description: 'Text-to-speech, speech-to-text, and AI-powered tools enhance learning.',
    },
    {
      icon: Award,
      title: 'Quality Content',
      description: 'All educational materials are reviewed for accessibility and educational excellence.',
    },
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Martinez',
      role: 'Founder & CEO',
      background: 'Special Education & Accessibility Expert',
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Technology',
      background: 'Inclusive Design & Web Accessibility',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    },
    {
      name: 'Dr. Jennifer Williams',
      role: 'Educational Director',
      background: 'Learning Disabilities & Curriculum Development',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    },
    {
      name: 'Alex Rodriguez',
      role: 'UX Accessibility Lead',
      background: 'Human-Computer Interaction & Universal Design',
      image: 'https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Mission: Education for Everyone
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            At Inclusive Learning Hub, we believe that quality education should be accessible to all learners, 
            regardless of their abilities, learning styles, or circumstances. We're breaking down barriers 
            and building bridges to knowledge.
          </p>
        </div>
      </section>

      {/* Why Inclusive Education Matters */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Inclusive Education Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Education is a fundamental right, yet millions of learners face barriers due to disabilities, 
              learning differences, or lack of accessible resources. We're changing that narrative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1 in 7</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">People with Disabilities</h3>
              <p className="text-gray-600">
                Over 1 billion people worldwide have some form of disability, many of whom face educational barriers.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">15%</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Differences</h3>
              <p className="text-gray-600">
                Approximately 15% of students have learning differences like dyslexia, ADHD, or processing disorders.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">100%</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefit from Inclusion</h3>
              <p className="text-gray-600">
                When education is inclusive, all students benefit from diverse perspectives and teaching methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Accessibility Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every feature on our platform is designed with accessibility in mind, ensuring equal access to education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our diverse team combines expertise in education, accessibility, technology, and user experience 
              to create meaningful learning opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility Standards */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Commitment to Accessibility
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">WCAG 2.1 AA Compliance</h3>
              <p className="text-gray-600 leading-relaxed">
                Our platform meets and exceeds Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, 
                ensuring compatibility with assistive technologies and providing excellent user experiences for everyone.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Continuous Improvement</h3>
              <p className="text-gray-600 leading-relaxed">
                We regularly conduct accessibility audits, gather feedback from our diverse user community, 
                and implement improvements to ensure our platform remains at the forefront of inclusive design.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              "Education is the most powerful weapon which you can use to change the world."
            </h3>
            <p className="text-lg text-gray-600 italic">
              - Nelson Mandela
            </p>
            <p className="text-gray-600 mt-4">
              We're honored to be part of that change by making education accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Our Inclusive Learning Community
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to experience education without barriers? Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              className="bg-white text-blue-600 hover:bg-gray-100 focus:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Get Started
            </a>
            <a
              href="/community"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Join Community
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;