import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AccessibilityToolbar from './AccessibilityToolbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50 rounded-br-md"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      <AccessibilityToolbar />
      <Navbar />
      <main id="main-content" className="flex-grow" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;