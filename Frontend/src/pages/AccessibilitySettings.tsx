import React, { useState } from 'react';
import { Volume2, Type, Eye, Palette, Keyboard, Save } from 'lucide-react';

const AccessibilitySettings: React.FC = () => {
  const [settings, setSettings] = useState({
    textToSpeech: true,
    speechToText: false,
    fontSize: 'large',
    highContrast: false,
    dyslexiaFriendly: true,
    darkMode: false,
    keyboardNavigation: true,
    autoReadAloud: false,
    captionsEnabled: true,
    animationsReduced: false,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleFontSizeChange = (size: string) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  };

  const handleSaveSettings = () => {
    // Save settings to local storage or backend
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Accessibility Settings
            </h1>
            <p className="text-gray-600">
              Customize your learning experience to match your accessibility needs and preferences.
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Text-to-Speech Settings */}
            <section aria-labelledby="tts-heading">
              <h2 id="tts-heading" className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Volume2 className="h-6 w-6 mr-2 text-blue-600" aria-hidden="true" />
                Audio & Speech
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Text-to-Speech</h3>
                    <p className="text-sm text-gray-600">Have text content read aloud automatically</p>
                  </div>
                  <button
                    onClick={() => handleToggle('textToSpeech')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.textToSpeech ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.textToSpeech}
                    aria-labelledby="tts-toggle"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                        settings.textToSpeech ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Speech-to-Text Input</h3>
                    <p className="text-sm text-gray-600">Use voice input for forms and quizzes</p>
                  </div>
                  <button
                    onClick={() => handleToggle('speechToText')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.speechToText ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.speechToText}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                        settings.speechToText ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Video Captions</h3>
                    <p className="text-sm text-gray-600">Show captions for all video content</p>
                  </div>
                  <button
                    onClick={() => handleToggle('captionsEnabled')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.captionsEnabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.captionsEnabled}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                        settings.captionsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Visual Settings */}
            <section aria-labelledby="visual-heading">
              <h2 id="visual-heading" className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-green-600" aria-hidden="true" />
                Visual Preferences
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Font Size</h3>
                  <div className="flex space-x-4">
                    {['small', 'normal', 'large', 'x-large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleFontSizeChange(size)}
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize ${
                          settings.fontSize === size
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        {size === 'x-large' ? 'Extra Large' : size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">High Contrast Mode</h3>
                    <p className="text-sm text-gray-600">Enhance color contrast for better visibility</p>
                  </div>
                  <button
                    onClick={() => handleToggle('highContrast')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.highContrast ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.highContrast}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                        settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Dyslexia-Friendly Font</h3>
                    <p className="text-sm text-gray-600">Use OpenDyslexic font for easier reading</p>
                  </div>
                  <button
                    onClick={() => handleToggle('dyslexiaFriendly')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.dyslexiaFriendly ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.dyslexiaFriendly}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                        settings.dyslexiaFriendly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Dark Mode</h3>
                    <p className="text-sm text-gray-600">Use dark theme to reduce eye strain</p>
                  </div>
                  <button
                    onClick={() => handleToggle('darkMode')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.darkMode}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                        settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Reduce Motion</h3>
                    <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                  </div>
                  <button
                    onClick={() => handleToggle('animationsReduced')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.animationsReduced ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.animationsReduced}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                        settings.animationsReduced ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Navigation Settings */}
            <section aria-labelledby="navigation-heading">
              <h2 id="navigation-heading" className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Keyboard className="h-6 w-6 mr-2 text-purple-600" aria-hidden="true" />
                Navigation & Interaction
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Enhanced Keyboard Navigation</h3>
                    <p className="text-sm text-gray-600">Improved keyboard shortcuts and focus indicators</p>
                  </div>
                  <button
                    onClick={() => handleToggle('keyboardNavigation')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.keyboardNavigation ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.keyboardNavigation}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                        settings.keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Auto-Read New Content</h3>
                    <p className="text-sm text-gray-600">Automatically read new content when it appears</p>
                  </div>
                  <button
                    onClick={() => handleToggle('autoReadAloud')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.autoReadAloud ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.autoReadAloud}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                        settings.autoReadAloud ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Save Settings Button */}
            <div className="flex justify-center pt-8 border-t border-gray-200">
              <button
                onClick={handleSaveSettings}
                className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
              >
                <Save className="h-5 w-5" aria-hidden="true" />
                <span>Save Accessibility Preferences</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;