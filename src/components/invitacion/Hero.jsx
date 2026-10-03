import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroFondo from '@/components/invitacion/HeroFondo';

const EVENT_DATE = new Date('2026-12-05T18:30:00');

function getTimeLeft() {
  const now = new Date();
  const diff = EVENT_DATE - now;
  if (diff <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, done: true };
  }
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);
  return { dias, horas, minutos, segundos, done: false };
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unidades = [
    { label: 'Días', value: timeLeft.dias },
    { label: 'Horas', value: timeLeft.horas },
    { label: 'Minutos', value: timeLeft.minutos },
    { label: 'Segundos', value: timeLeft.segundos },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <HeroFondo />

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white/90 tracking-[0.4em] text-xs sm:text-sm uppercase mb-6"
        >
          Mis XV Años
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl text-white mb-4 drop-shadow-lg"
          style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
        >
          Victoria Raquel Martinez de la Rosa
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-24 h-px bg-white/70 mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-white/90 text-lg sm:text-xl mb-2"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          5 de Diciembre de 2026
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/70 text-sm tracking-widest uppercase mb-12"
        >
          Te invito a celebrar conmigo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-4 gap-3 sm:gap-5"
        >
          {unidades.map((u) => (
            <div
              key={u.label}
              className="flex flex-col items-center justify-center w-20 h-24 sm:w-28 sm:h-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
            >
              <span className="text-2xl sm:text-4xl font-light text-white tabular-nums">
                {String(u.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-white/80 tracking-widest uppercase mt-2">
                {u.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#confirmacion"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-12 px-8 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm tracking-widest uppercase hover:bg-white/25 transition-colors"
        >
          Confirmar Asistencia
        </motion.a>
      </div>
    </section>
  );
}