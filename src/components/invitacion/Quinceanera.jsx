import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

function Rama({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 120"
      className={`w-10 sm:w-14 h-auto text-primary-300 ${className}`}
      fill="currentColor"
    >
      <path d="M30 118C28 90 30 50 40 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="22" cy="96" rx="9" ry="16" transform="rotate(-35 22 96)" opacity="0.7" />
      <ellipse cx="40" cy="80" rx="8" ry="15" transform="rotate(35 40 80)" opacity="0.6" />
      <ellipse cx="20" cy="66" rx="8" ry="15" transform="rotate(-35 20 66)" opacity="0.7" />
      <ellipse cx="42" cy="48" rx="7" ry="13" transform="rotate(35 42 48)" opacity="0.6" />
      <ellipse cx="26" cy="34" rx="6" ry="12" transform="rotate(-30 26 34)" opacity="0.7" />
      <ellipse cx="40" cy="16" rx="5" ry="10" transform="rotate(20 40 16)" opacity="0.6" />
    </svg>
  );
}

export default function Quinceanera() {
  return (
    <section id="quinceanera" className="py-24 px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto mb-16 flex items-center justify-between gap-4 rounded-2xl bg-[#eef0e0] px-4 py-8 text-center"
      >
        <Rama />
        <div>
          <p className="text-primary-300 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4">
            Con el amor y la bendición de mis padres
          </p>
          <p
            className="text-xl sm:text-3xl text-primary-400 font-semibold leading-snug"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            Josué Nemesio Martínez Sarmiento
            <span className="block">y</span>
            Yadirá de la Rosa Ávalos
          </p>
        </div>
        <Rama className="-scale-x-100" />
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-primary-50/60 -z-10 rotate-2" />
          <div className="overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/images/Victoria-Raquel.jpeg"
              alt="Victoria Raquel Martinez de la Rosa, la quinceañera"
              className="w-full h-[520px] object-cover"
              fittingType="fill"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <p className="text-primary-300 tracking-[0.4em] text-xs uppercase mb-3">La Quinceañera</p>
          <h2 className="text-4xl sm:text-5xl text-primary-400 mb-6" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Victoria Raquel Martinez de la Rosa
          </h2>
          <div className="w-16 h-px bg-primary-200 mx-auto md:mx-0 mb-6" />
          <p className="text-primary-400/70 leading-relaxed text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            "Hoy cumplo un sueño que he esperado toda mi vida. Quince años de risas, de aprendizajes
            y de momentos inolvidables que me han hecho quien soy."
          </p>
          <p className="text-primary-400/70 leading-relaxed text-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Quiero compartir contigo esta noche mágica, llena de luz, música y alegría. Gracias por
            ser parte de mi historia y por acompañarme en el inicio de esta nueva etapa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}