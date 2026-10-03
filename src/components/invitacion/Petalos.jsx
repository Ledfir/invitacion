import React from 'react';
import { motion } from 'framer-motion';

const PETALOS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 9 + Math.random() * 8,
  size: 12 + Math.random() * 14,
  drift: (Math.random() - 0.5) * 120,
  rotacion: Math.random() * 360,
  opacidad: 0.35 + Math.random() * 0.35,
}));

const COLORES = ['#fda4af', '#fbcfe8', '#fecdd3', '#f9a8d4'];

export default function Petalos() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden="true">
      {PETALOS.map((p, i) => (
        <motion.div
          key={p.id}
          className="absolute top-[-10%]"
          style={{ left: `${p.left}%` }}
          initial={{ y: '-10vh', x: 0, rotate: p.rotacion, opacity: 0 }}
          animate={{
            y: '110vh',
            x: [0, p.drift, 0],
            rotate: p.rotacion + 360,
            opacity: [0, p.opacidad, p.opacidad, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8 5 5 8 5 13a7 7 0 0 0 14 0c0-5-3-8-7-11Z"
              fill={COLORES[i % COLORES.length]}
              transform="rotate(35 12 12)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}