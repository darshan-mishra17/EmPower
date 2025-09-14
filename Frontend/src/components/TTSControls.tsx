import React, { useState, useEffect } from 'react';
import { 
  Volume2, VolumeX, Play, Pause, Square, Settings, 
  Minus, Plus, Eye, EyeOff 
} from 'lucide-react';
import { useTTS } from '../hooks/useTTS';

interface TTSControlsProps {
  className?: string;
}

export const TTSControls: React.FC<TTSControlsProps> = ({ className = '' }) => {
  const { speak, stop, pause, resume, speaking, paused, supported, voices, setDefaultOptions } = useTTS();
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [readMode, setReadMode] = useState<'page' | 'section' | 'element'>('page');

  useEffect(() => {
    setDefaultOptions({ rate, pitch, volume, voice: voices.find(v => v.name === selectedVoice) || null });
  }, [rate, pitch, volume, selectedVoice, voices, setDefaultOptions]);

  // Auto-read page content when enabled
  useEffect(() => {
    if (autoRead && supported) {
      readPageContent();
    }
  }, [autoRead, supported]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl + Shift + S = Start/Stop reading
      if (event.ctrlKey && event.shiftKey && event.key === 'S') {
        event.preventDefault();
        if (speaking) {
          stop();
        } else {
          readPageContent();
        }
      }
      
      // Ctrl + Shift + P = Pause/Resume
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        if (paused) {
          resume();
        } else if (speaking) {
          pause();
        }
      }

      // Ctrl + Shift + A = Toggle auto-read
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setAutoRead(!autoRead);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [speaking, paused, autoRead, stop, pause, resume]);

  const getPageText = (): string => {
    // Get main content, avoiding navigation and other non-content elements
    const mainContent = document.querySelector('main') || document.body;
    const elementsToRead = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, button, label, input[type="text"], input[type="email"], textarea, .sr-only');
    
    let text = '';
    elementsToRead.forEach((element) => {
      if (element.textContent && element.textContent.trim()) {
        // Add context for interactive elements
        if (element.tagName === 'BUTTON') {
          text += `Button: ${element.textContent.trim()}. `;
        } else if (element.tagName === 'INPUT') {
          const label = document.querySelector(`label[for="${element.id}"]`);
          const placeholder = element.getAttribute('placeholder');
          text += `Input field: ${label?.textContent || placeholder || 'text input'}. `;
        } else if (element.tagName === 'LABEL') {
          text += `${element.textContent.trim()}. `;
        } else if (element.tagName.startsWith('H')) {
          text += `Heading: ${element.textContent.trim()}. `;
        } else {
          text += `${element.textContent.trim()}. `;
        }
      }
    });

    return text || 'No readable content found on this page.';
  };

  const readPageContent = () => {
    const text = getPageText();
    speak(text);
  };

  const readCurrentSection = () => {
    // Try to find the current section based on focus or scroll position
    const sections = document.querySelectorAll('section, .section, [role="main"], main');
    let currentSection = sections[0]; // Default to first section
    
    // Find section in viewport
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSection = section;
      }
    });

    if (currentSection) {
      const text = currentSection.textContent || 'No content in this section.';
      speak(text);
    }
  };

  const handleElementClick = (event: MouseEvent) => {
    if (readMode === 'element') {
      const target = event.target as HTMLElement;
      if (target && target.textContent) {
        const elementType = target.tagName.toLowerCase();
        const text = `${elementType}: ${target.textContent}`;
        speak(text);
      }
    }
  };

  useEffect(() => {
    if (readMode === 'element') {
      document.addEventListener('click', handleElementClick);
      return () => document.removeEventListener('click', handleElementClick);
    }
  }, [readMode]);

  if (!supported) {
    return (
      <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded ${className}`}>
        <p>Text-to-Speech is not supported in this browser.</p>
      </div>
    );
  }

  return (
    <div className={`bg-blue-600 text-white shadow-lg rounded-lg ${className}`}>
      {/* Main TTS Toolbar */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Volume2 className="h-5 w-5" />
          <span className="font-medium text-sm">TTS Controls</span>
          {speaking && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">Speaking</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Controls */}
          <button
            onClick={speaking ? (paused ? resume : pause) : readPageContent}
            className="p-2 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            title={speaking ? (paused ? 'Resume (Ctrl+Shift+P)' : 'Pause (Ctrl+Shift+P)') : 'Start Reading (Ctrl+Shift+S)'}
            aria-label={speaking ? (paused ? 'Resume reading' : 'Pause reading') : 'Start reading page'}
          >
            {speaking ? (paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />) : <Play className="h-4 w-4" />}
          </button>

          <button
            onClick={stop}
            disabled={!speaking}
            className="p-2 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
            title="Stop Reading"
            aria-label="Stop reading"
          >
            <Square className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            title="TTS Settings"
            aria-label="Toggle TTS settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Expanded Settings */}
      {isExpanded && (
        <div className="border-t border-blue-500 p-4 space-y-4">
          {/* Reading Mode */}
          <div>
            <label className="block text-sm font-medium mb-2">Reading Mode:</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setReadMode('page')}
                className={`px-3 py-1 rounded text-xs ${readMode === 'page' ? 'bg-blue-800' : 'bg-blue-700 hover:bg-blue-800'}`}
              >
                Full Page
              </button>
              <button
                onClick={() => setReadMode('section')}
                className={`px-3 py-1 rounded text-xs ${readMode === 'section' ? 'bg-blue-800' : 'bg-blue-700 hover:bg-blue-800'}`}
              >
                Current Section
              </button>
              <button
                onClick={() => setReadMode('element')}
                className={`px-3 py-1 rounded text-xs ${readMode === 'element' ? 'bg-blue-800' : 'bg-blue-700 hover:bg-blue-800'}`}
              >
                Click to Read
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <label className="block text-sm font-medium mb-2">Quick Actions:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={readPageContent}
                className="px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded text-xs"
              >
                Read Page
              </button>
              <button
                onClick={readCurrentSection}
                className="px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded text-xs"
              >
                Read Section
              </button>
              <button
                onClick={() => setAutoRead(!autoRead)}
                className={`px-3 py-1 rounded text-xs flex items-center space-x-1 ${
                  autoRead ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-700 hover:bg-blue-800'
                }`}
              >
                {autoRead ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                <span>Auto-read</span>
              </button>
            </div>
          </div>

          {/* Voice Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Voice Selection */}
            {voices.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1">Voice:</label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full p-2 text-black rounded border"
                >
                  <option value="">Default Voice</option>
                  {voices.map((voice, index) => (
                    <option key={index} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Rate Control */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Speed: {rate.toFixed(1)}x
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setRate(Math.max(0.1, rate - 0.1))}
                  className="p-1 hover:bg-blue-700 rounded"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={() => setRate(Math.min(3, rate + 0.1))}
                  className="p-1 hover:bg-blue-700 rounded"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Pitch Control */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Pitch: {pitch.toFixed(1)}
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPitch(Math.max(0, pitch - 0.1))}
                  className="p-1 hover:bg-blue-700 rounded"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={() => setPitch(Math.min(2, pitch + 0.1))}
                  className="p-1 hover:bg-blue-700 rounded"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Volume Control */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Volume: {Math.round(volume * 100)}%
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setVolume(Math.max(0, volume - 0.1))}
                  className="p-1 hover:bg-blue-700 rounded"
                >
                  <VolumeX className="h-3 w-3" />
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={() => setVolume(Math.min(1, volume + 0.1))}
                  className="p-1 hover:bg-blue-700 rounded"
                >
                  <Volume2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="text-xs text-blue-200 border-t border-blue-500 pt-3">
            <p className="font-medium mb-1">Keyboard Shortcuts:</p>
            <ul className="space-y-1">
              <li>Ctrl + Shift + S: Start/Stop reading</li>
              <li>Ctrl + Shift + P: Pause/Resume</li>
              <li>Ctrl + Shift + A: Toggle auto-read</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
