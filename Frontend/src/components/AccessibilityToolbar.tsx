import React, { useState } from 'react';
import { Volume2, VolumeX, Type, Sun, Moon, Contrast } from 'lucide-react';

const AccessibilityToolbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [settings, setSettings] = useState({
    ttsEnabled: false,
    fontSize: 'normal',
    darkMode: false,
    highContrast: false,
  });

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const changeFontSize = () => {
    const sizes = ['normal', 'large', 'x-large'];
    const currentIndex = sizes.indexOf(settings.fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setSettings(prev => ({ ...prev, fontSize: sizes[nextIndex] }));
    
    // Apply font size to document root
    const root = document.documentElement;
    root.style.fontSize = sizes[nextIndex] === 'normal' ? '16px' : 
                         sizes[nextIndex] === 'large' ? '18px' : '20px';
  };

  return (
    <div 
      className="bg-blue-600 text-white py-2 px-4"
      role="region"
      aria-label="Accessibility toolbar"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-sm font-medium hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1"
          aria-expanded={isExpanded}
          aria-controls="accessibility-options"
        >
          <span>Accessibility Options</span>
          <span className="text-xs">{isExpanded ? '▲' : '▼'}</span>
        </button>
        
        {isExpanded && (
          <div 
            id="accessibility-options"
            className="flex items-center space-x-4"
            role="toolbar"
            aria-label="Accessibility controls"
          >
            <button
              onClick={() => toggleSetting('ttsEnabled')}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                settings.ttsEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-white`}
              aria-pressed={settings.ttsEnabled}
              aria-label={`Text to speech ${settings.ttsEnabled ? 'enabled' : 'disabled'}`}
            >
              {settings.ttsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <span>TTS</span>
            </button>

            <button
              onClick={changeFontSize}
              className="flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
              aria-label={`Font size: ${settings.fontSize}`}
            >
              <Type className="h-4 w-4" />
              <span className="capitalize">{settings.fontSize}</span>
            </button>

            <button
              onClick={() => toggleSetting('highContrast')}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                settings.highContrast ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-600 hover:bg-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-white`}
              aria-pressed={settings.highContrast}
              aria-label={`High contrast ${settings.highContrast ? 'enabled' : 'disabled'}`}
            >
              <Contrast className="h-4 w-4" />
              <span>Contrast</span>
            </button>

            <button
              onClick={() => toggleSetting('darkMode')}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                settings.darkMode ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-600 hover:bg-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-white`}
              aria-pressed={settings.darkMode}
              aria-label={`Dark mode ${settings.darkMode ? 'enabled' : 'disabled'}`}
            >
              {settings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>Dark</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilityToolbar;