import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2 } from 'lucide-react';

const flores = [
  { x: '10%', y: '15%', size: 42, delay: 0, duration: 3 },
  { x: '85%', y: '20%', size: 34, delay: 0.4, duration: 2.6 },
  { x: '20%', y: '75%', size: 30, delay: 0.8, duration: 3.2 },
  { x: '78%', y: '70%', size: 46, delay: 0.2, duration: 2.8 },
  { x: '50%', y: '10%', size: 26, delay: 1, duration: 2.4 },
  { x: '40%', y: '85%', size: 38, delay: 0.6, duration: 3 },
  { x: '90%', y: '45%', size: 28, delay: 1.2, duration: 2.6 },
  { x: '8%', y: '50%', size: 32, delay: 0.9, duration: 3.1 },
];

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary-400 overflow-hidden"
        >
          {flores.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0.6],
                rotate: [0, 20, -15, 10],
                y: [0, -20, 10, -30],
              }}
              transition={{
                duration: f.duration,
                delay: f.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute"
              style={{ left: f.x, top: f.y }}
            >
              <Flower2 style={{ width: f.size, height: f.size }} className="text-primary-200/70" />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center relative z-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Flower2 className="w-16 h-16 text-primary-200 mb-6" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white text-2xl sm:text-3xl tracking-wide"
              style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
            >
              Mis XV Años
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-white/70 text-sm tracking-[0.4em] uppercase mt-3"
            >
              Victoria
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '160px' }}
            transition={{ duration: 2.2, delay: 0.5, ease: 'easeInOut' }}
            className="h-px bg-white/60 mt-8 relative z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}