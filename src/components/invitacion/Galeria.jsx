import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Lightbox from '@/components/invitacion/Lightbox';

const imagenes = [
  { src: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/f7d1e2608_generated_8f2e43f6.jpg', alt: 'Detalle del vestido', span: 'sm:col-span-2 sm:row-span-2' },
  { src: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/fca95ff56_generated_6caf6591.jpg', alt: 'Decoración de la mesa', span: '' },
  { src: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/eabaddf5c_generated_10328b99.jpg', alt: 'Salón de recepción', span: '' },
  { src: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/4c50daf79_generated_95a89696.jpg', alt: 'Pastel de quince años', span: 'sm:col-span-2' },
  { src: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/de1a4ec0f_generated_image.png', alt: 'La tiara', span: '' },
  { src: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/07d282201_generated_image.png', alt: 'La pista de baile', span: '' },
  { src: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/e468da5e4_generated_image.png', alt: 'La invitación', span: '' },
  { src: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/900f35e3d_generated_image.png', alt: 'La muñeca tradicional', span: '' },
];

export default function Galeria() {
  const [indice, setIndice] = useState(null);

  return (
    <section id="galeria" className="py-24 px-6 bg-primary-50/40">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-primary-300 tracking-[0.4em] text-xs uppercase mb-3">Recuerdos</p>
          <h2 className="text-4xl sm:text-5xl text-primary-400" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Galería
          </h2>
          <div className="w-16 h-px bg-primary-200 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[160px] sm:auto-rows-[220px] gap-3 sm:gap-4">
          {imagenes.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              onClick={() => setIndice(i)}
              className={`relative overflow-hidden rounded-2xl cursor-zoom-in group ${img.span}`}
              aria-label={`Ver ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                fittingType="fill"
              />
              <div className="absolute inset-0 bg-primary-400/0 group-hover:bg-primary-400/20 transition-colors duration-500" />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        imagenes={imagenes}
        indice={indice}
        onCerrar={() => setIndice(null)}
        onCambiar={setIndice}
      />
    </section>
  );
}