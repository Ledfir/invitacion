import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Mail } from 'lucide-react';

export default function Regalos() {
  return (
    <section id="regalos" className="px-4 py-12 bg-white">
      <h2
        className="text-center text-4xl sm:text-5xl text-primary-400 mb-8"
        style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
      >
        Regalos
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto rounded-2xl bg-[#eef0e0] px-4 py-6 text-center text-primary-400 sm:px-6"
      >
        <Gift aria-hidden="true" className="w-5 h-5 mx-auto mb-2" />
        <p className="text-[10px] font-medium uppercase tracking-wide mb-2">
          Un detalle especial
        </p>
        <h2
          className="text-xl font-semibold italic"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Mesa de Regalos
        </h2>
        <div className="w-16 h-px bg-primary-300/60 mx-auto mt-2 mb-2" />
        <p className="text-sm leading-relaxed mb-2">
          Tu presencia es el mejor regalo que puedo recibir, pero si deseas tener
          un detalle conmigo, puedes hacerlo mediante:
        </p>

        <div className="grid grid-cols-2 gap-3">
          <motion.div
            whileHover={{ y: -4, scale: 1.03, boxShadow: '0 10px 24px rgba(90, 150, 112, 0.18)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white px-3 py-3 text-sm font-medium"
          >
            <motion.span whileHover={{ scale: 1.15 }} transition={{ duration: 0.2 }}>
              <Mail aria-hidden="true" className="w-4 h-4" />
            </motion.span>
            <span>Sobre</span>
          </motion.div>
          <motion.div
            whileHover={{ y: -4, scale: 1.03, boxShadow: '0 10px 24px rgba(90, 150, 112, 0.18)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white px-3 py-3 text-sm font-medium"
          >
            <motion.span whileHover={{ scale: 1.15 }} transition={{ duration: 0.2 }}>
              <Gift aria-hidden="true" className="w-4 h-4" />
            </motion.span>
            <span>Regalo físico</span>
          </motion.div>
        </div>

        <p
          className="mt-2 text-xs italic"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          ¡Gracias por acompañarme en este día tan especial!
        </p>
      </motion.div>
    </section>
  );
}