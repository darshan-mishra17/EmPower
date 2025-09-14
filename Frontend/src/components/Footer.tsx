import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" aria-hidden="true" />
                <a 
                  href="mailto:support@inclusivelearning.edu" 
                  className="hover:text-blue-300 focus:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-label="Email support at support@inclusivelearning.edu"
                >
                  support@inclusivelearning.edu
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" aria-hidden="true" />
                <a 
                  href="tel:+1234567890" 
                  className="hover:text-blue-300 focus:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-label="Call us at 1-234-567-8900"
                >
                  1-234-567-8900
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/about" 
                    className="hover:text-blue-300 focus:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/accessibility" 
                    className="hover:text-blue-300 focus:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    Accessibility Settings
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/community" 
                    className="hover:text-blue-300 focus:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Accessibility Options */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Accessibility</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5" aria-hidden="true" />
                <span>WCAG 2.1 AA Compliant</span>
              </div>
              <p className="text-sm text-gray-300">
                This platform is designed to be accessible to all learners, including those with disabilities.
              </p>
              <Link 
                to="/accessibility" 
                className="text-blue-300 hover:text-blue-200 focus:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded underline"
              >
                Customize accessibility settings
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-300">
            © 2025 EmpowerMe. All rights reserved. | 
            <a 
              href="/privacy" 
              className="ml-1 text-blue-300 hover:text-blue-200 focus:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Privacy Policy
            </a> | 
            <a 
              href="/terms" 
              className="ml-1 text-blue-300 hover:text-blue-200 focus:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;