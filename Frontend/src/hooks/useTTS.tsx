import { useState, useEffect, useCallback } from 'react';

interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
}

interface UseTTSReturn {
  speak: (text: string, options?: TTSOptions) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  speaking: boolean;
  paused: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
  setDefaultOptions: (options: TTSOptions) => void;
}

export const useTTS = (): UseTTSReturn => {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [defaultOptions, setDefaultOptions] = useState<TTSOptions>({
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
      
      const updateVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Set default voice to English if available
        const englishVoice = availableVoices.find(voice => 
          voice.lang.startsWith('en') && voice.default
        ) || availableVoices.find(voice => voice.lang.startsWith('en'));
        
        if (englishVoice && !defaultOptions.voice) {
          setDefaultOptions(prev => ({ ...prev, voice: englishVoice }));
        }
      };

      updateVoices();
      speechSynthesis.addEventListener('voiceschanged', updateVoices);

      return () => {
        speechSynthesis.removeEventListener('voiceschanged', updateVoices);
      };
    }
  }, []);

  const speak = useCallback((text: string, options: TTSOptions = {}) => {
    if (!supported || !text.trim()) return;

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply options
    utterance.rate = options.rate || defaultOptions.rate || 1;
    utterance.pitch = options.pitch || defaultOptions.pitch || 1;
    utterance.volume = options.volume || defaultOptions.volume || 1;
    utterance.voice = options.voice || defaultOptions.voice || null;

    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };

    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };

    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };

    utterance.onpause = () => {
      setPaused(true);
    };

    utterance.onresume = () => {
      setPaused(false);
    };

    speechSynthesis.speak(utterance);
  }, [supported, defaultOptions]);

  const stop = useCallback(() => {
    if (supported) {
      speechSynthesis.cancel();
      setSpeaking(false);
      setPaused(false);
    }
  }, [supported]);

  const pause = useCallback(() => {
    if (supported && speaking) {
      speechSynthesis.pause();
      setPaused(true);
    }
  }, [supported, speaking]);

  const resume = useCallback(() => {
    if (supported && paused) {
      speechSynthesis.resume();
      setPaused(false);
    }
  }, [supported, paused]);

  return {
    speak,
    stop,
    pause,
    resume,
    speaking,
    paused,
    supported,
    voices,
    setDefaultOptions,
  };
};
