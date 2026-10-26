import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Image } from '@/components/ui/image';

function Flor({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 60 60" className={`w-12 h-12 ${className}`}>
      <path d="M30 56C26 44 22 36 10 28" stroke="#7AB087" strokeWidth="1.5" fill="none" />
      <ellipse cx="14" cy="40" rx="5" ry="9" transform="rotate(-50 14 40)" fill="#A9C4A0" />
      <ellipse cx="46" cy="38" rx="5" ry="9" transform="rotate(50 46 38)" fill="#A9C4A0" />
      <g fill="#F6C9C4">
        <ellipse cx="30" cy="14" rx="7" ry="10" />
        <ellipse cx="30" cy="38" rx="7" ry="10" />
        <ellipse cx="18" cy="26" rx="10" ry="7" />
        <ellipse cx="42" cy="26" rx="10" ry="7" />
      </g>
      <circle cx="30" cy="26" r="4" fill="#F0A9A0" />
    </svg>
  );
}

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

          <div className="relative my-8 mx-4 rounded-2xl bg-[#eef0e0] px-10 py-5 text-center">
            <Flor className="absolute -left-5 top-1/2 -translate-y-1/2" />
            <Flor className="absolute -right-5 top-1/2 -translate-y-1/2 -scale-x-100" />
            <p className="text-primary-400/80 text-xs tracking-[0.3em] uppercase mb-2">Salmos 37:5</p>
            <p className="text-primary-400 text-xl leading-snug" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              “Encomienda a Jehová tu camino, y confía en él; y él hará.”
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-16 h-px bg-rose-300" />
              <Heart className="w-3 h-3 text-rose-300 fill-rose-300" />
              <span className="w-16 h-px bg-rose-300" />
            </div>
          </div>

          <p className="text-primary-400/70 leading-relaxed text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Le doy gracias a Dios por el regalo de la vida, por su amor infinito y por permitirme llegar a esta etapa tan especial. 
            Hoy, con el corazón lleno de alegría y gratitud, celebro mis quince años, confiando en que Él seguirá guiando cada uno de mis pasos.
          </p>
          <p className="text-primary-400/70 leading-relaxed text-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Con mucha ilusión, quiero compartir contigo este momento tan especial, rodeada de las personas que forman parte de mi historia. 
            Gracias por acompañarme en este hermoso comienzo y por ser parte de una bendición que guardaré siempre en mi corazón.
          </p>
        </motion.div>
      </div>
    </section>
  );
}