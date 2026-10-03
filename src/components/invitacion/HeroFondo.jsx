import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';

// Para agregar el video, solo añade un elemento:
// { tipo: 'video', src: 'https://...' }
const slides = [
  { tipo: 'foto', src: '/images/hero-1.jpg' },
  { tipo: 'foto', src: '/images/hero-2.png' },
  // { tipo: 'video', src: 'URL_DEL_VIDEO' },
];

const DURACION_SLIDE = 6000;

export default function HeroFondo() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActual((i) => (i + 1) % slides.length);
    }, DURACION_SLIDE);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[actual];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={actual}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {slide.tipo === 'video' ? (
            <video
              src={slide.src}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src={slide.src}
              alt="Fondo de los XV años"
              className="w-full h-full object-cover"
              fittingType="fill"
            />
          )}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-400/40 via-primary-400/30 to-primary-400/60" />

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActual(i)}
              aria-label={`Fondo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                actual === i ? 'w-8 bg-white/80' : 'w-3 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}