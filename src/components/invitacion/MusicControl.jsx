import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, Volume2 } from 'lucide-react';

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // URL de la música (reemplaza con tu URL)
  const MUSIC_URL = '/music/fondo.mp3';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Reproducir automáticamente después de que se carga el preloader (2800ms)
  // Solo si el usuario ha interactuado con la página
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('mousemove', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);
    document.addEventListener('mousemove', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('mousemove', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (!hasInteracted) return;

    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log('Autoplay bloqueado:', err);
        });
        setIsPlaying(true);
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed top-6 right-6 z-50"
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute -left-48 top-0 flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-primary-100"
            >
              <Volume2 className="w-4 h-4 text-primary-400 flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 h-1 bg-primary-100 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, rgb(90, 150, 112) 0%, rgb(90, 150, 112) ${
                    volume * 100
                  }%, rgb(205, 210, 202) ${volume * 100}%, rgb(205, 210, 202) 100%)`,
                }}
              />
              <span className="text-xs text-primary-400 font-semibold w-6 text-center">
                {Math.round(volume * 100)}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative w-14 h-14 rounded-full shadow-lg border-2 backdrop-blur-md transition-all duration-300 flex items-center justify-center group ${
            isPlaying
              ? 'bg-primary-300/95 border-primary-400 hover:border-primary-400'
              : 'bg-white/90 border-primary-100 hover:border-primary-300'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Efecto de onda si está reproduciendo */}
          {isPlaying && (
            <>
              <motion.div
                animate={{ scale: [1, 1.2], opacity: [0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-primary-300"
              />
              <motion.div
                animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="absolute inset-0 rounded-full border-2 border-primary-300"
              />
            </>
          )}

          {/* Icono interior */}
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="relative z-10 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause
                className={`w-6 h-6 transition-colors ${
                  isPlaying ? 'text-white' : 'text-primary-400'
                }`}
                fill={isPlaying ? 'white' : 'none'}
              />
            ) : (
              <Play
                className={`w-6 h-6 transition-colors ml-0.5 ${
                  isPlaying ? 'text-white' : 'text-primary-400'
                }`}
                fill={isPlaying ? 'white' : 'currentColor'}
              />
            )}
          </motion.div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-primary-400 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap pointer-events-none"
          >
            {isPlaying ? 'Pausar música' : 'Reproducir música'}
          </motion.div>
        </motion.button>
      </motion.div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          background: linear-gradient(135deg, #5A9670, #7AB087);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        input[type='range']::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: linear-gradient(135deg, #5A9670, #7AB087);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}
