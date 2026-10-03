import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function Quinceanera() {
  return (
    <section id="quinceanera" className="py-24 px-6 bg-white">
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
              src="https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/d10cdd73a_generated_9d233579.jpg"
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