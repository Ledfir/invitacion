import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Flower2 } from 'lucide-react';
import { Image } from '@/components/ui/image';

const petalos = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  delay: (i % 6) * 0.8,
  duration: 4 + (i % 4),
  size: 12 + (i % 3) * 6,
}));

export default function Lightbox({ imagenes, indice, onCerrar, onCambiar }) {
  const imagen = imagenes[indice];

  const anterior = useCallback(() => onCambiar((indice - 1 + imagenes.length) % imagenes.length), [indice, imagenes.length, onCambiar]);
  const siguiente = useCallback(() => onCambiar((indice + 1) % imagenes.length), [indice, imagenes.length, onCambiar]);

  useEffect(() => {
    const manejarTecla = (e) => {
      if (e.key === 'Escape') onCerrar();
      if (e.key === 'ArrowLeft') anterior();
      if (e.key === 'ArrowRight') siguiente();
    };
    window.addEventListener('keydown', manejarTecla);
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [onCerrar, anterior, siguiente]);

  return (
    <AnimatePresence>
      {imagen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-primary-400/95 backdrop-blur-sm p-4 sm:p-8"
          onClick={onCerrar}
        >
          {/* Pétalos flotando */}
          {petalos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: '-10%', rotate: 0 }}
              animate={{ opacity: [0, 0.7, 0], y: '110vh', rotate: 360 }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 pointer-events-none"
              style={{ left: p.left }}
            >
              <Flower2 style={{ width: p.size, height: p.size }} className="text-primary-200/60" />
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 200 }}
            className="relative max-w-4xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary-200/30 bg-primary-400/40">
              <Image
                src={imagen.src}
                alt={imagen.alt}
                className="w-full h-[55vh] sm:h-[68vh]"
                fittingType="fit"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center justify-center gap-3 mt-5"
            >
              <Flower2 className="w-4 h-4 text-primary-200/60" />
              <p className="text-white/90 text-sm tracking-wide" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                {imagen.alt}
              </p>
              <Flower2 className="w-4 h-4 text-primary-200/60" />
            </motion.div>

            <button
              onClick={onCerrar}
              className="absolute -top-3 -right-3 w-11 h-11 rounded-full bg-white text-primary-400 shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={anterior}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={siguiente}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}