import React from 'react';
import Hero from '@/components/invitacion/Hero';
import Galeria from '@/components/invitacion/Galeria';
import Quinceanera from '@/components/invitacion/Quinceanera';
import Familia from '@/components/invitacion/Familia';
import Ubicaciones from '@/components/invitacion/Ubicaciones';
import Confirmacion from '@/components/invitacion/Confirmacion';
import LibroVisitas from '@/components/invitacion/LibroVisitas';
import Footer from '@/components/invitacion/Footer';
import Preloader from '@/components/invitacion/Preloader';
import Petalos from '@/components/invitacion/Petalos';
import MusicControl from '@/components/invitacion/MusicControl';

export default function Home() {
  return (
    <div className="bg-white">
      <MusicControl />
      <Preloader />
      <Petalos />
      <Hero />
      <Galeria />
      <Quinceanera />
      <Familia />
      <Ubicaciones />
      <Confirmacion />
      <LibroVisitas />
      <Footer />
    </div>
  );
}