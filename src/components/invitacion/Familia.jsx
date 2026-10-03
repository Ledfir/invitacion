import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';

const familiares = [
  {
    nombre: 'María González',
    rol: 'Mamá',
    frase: 'Gracias por enseñarme que el amor más grande se construye con detalles pequeños.',
    foto: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/b5ae06ac7_generated_image.png',
  },
  {
    nombre: 'Carlos González',
    rol: 'Papá',
    frase: 'Siempre seré tu primer amor y tu mayor protector. Hoy brillas más que nunca.',
    foto: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/5fdaf1b77_generated_image.png',
  },
  {
    nombre: 'Sofía González',
    rol: 'Hermana',
    frase: 'Crecer contigo ha sido mi mayor aventura. Este día es nuestro también.',
    foto: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/c9d9b341c_generated_image.png',
  },
  {
    nombre: 'Abuelitos',
    rol: 'Con todo nuestro cariño',
    frase: 'Ver florecer a nuestra nieta es el regalo más hermoso que la vida nos ha dado.',
    foto: 'https://media.base44.com/images/public/6ab17a79e4bae24a2e7624b6/9c7933b3a_generated_image.png',
  },
];

export default function Familia() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [seleccionado, setSeleccionado] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSeleccionado(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="familia" className="py-24 px-6 bg-primary-50/40 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary-300 tracking-[0.4em] text-xs uppercase mb-3">Con el cariño de</p>
          <h2 className="text-4xl sm:text-5xl text-primary-400 mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Mi Familia
          </h2>
          <div className="w-16 h-px bg-primary-200 mx-auto mt-6 mb-12" />
        </motion.div>

        <div className="relative" ref={emblaRef}>
          <div className="flex">
            {familiares.map((f) => (
              <div key={f.nombre} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_70%] md:flex-[0_0_50%] px-3">
                <div className="rounded-3xl overflow-hidden bg-white/60 backdrop-blur-sm border border-primary-50 shadow-lg">
                  <div className="overflow-hidden">
                    <Image
                      src={f.foto}
                      alt={f.nombre}
                      className="w-full h-72 sm:h-80 object-cover"
                      fittingType="fill"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-primary-300 text-xs tracking-widest uppercase mb-1">{f.rol}</p>
                    <h3 className="text-xl text-primary-400 mb-3" style={{ fontFamily: 'Georgia, serif' }}>{f.nombre}</h3>
                    <p className="text-primary-400/60 text-sm leading-relaxed italic">"{f.frase}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-4 w-11 h-11 rounded-full bg-white shadow-lg border border-primary-50 flex items-center justify-center text-primary-300 hover:bg-primary-50 transition-colors z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-4 w-11 h-11 rounded-full bg-white shadow-lg border border-primary-50 flex items-center justify-center text-primary-300 hover:bg-primary-50 transition-colors z-10"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {familiares.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ir a la foto ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                seleccionado === i ? 'w-8 bg-primary-300' : 'w-2 bg-primary-200/60 hover:bg-primary-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}