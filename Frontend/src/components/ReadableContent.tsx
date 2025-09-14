import React from 'react';
import { Volume2 } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';

interface ReadableContentProps {
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export const ReadableContent: React.FC<ReadableContentProps> = ({ 
  children, 
  ariaLabel, 
  className = ''
}) => {
  const { speak, speaking } = useTTS();

  const handleReadContent = () => {
    const element = document.getElementById(`readable-${Math.random()}`);
    if (element) {
      const text = element.textContent || '';
      const contextualText = ariaLabel ? `${ariaLabel}: ${text}` : text;
      speak(contextualText);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    // Press Enter or Space to read the content
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleReadContent();
    }
  };

  return (
    <div 
      className={`relative group ${className}`}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`${ariaLabel || 'Content'} - Press Enter to read aloud`}
    >
      <div id={`readable-${Math.random()}`}>
        {children}
      </div>
      
      {/* TTS Button - appears on hover/focus */}
      <button
        onClick={handleReadContent}
        className="absolute top-2 right-2 p-2 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Read this content aloud"
        aria-label={`Read ${ariaLabel || 'this content'} aloud`}
      >
        <Volume2 className={`h-4 w-4 ${speaking ? 'animate-pulse' : ''}`} />
      </button>
    </div>
  );
};
