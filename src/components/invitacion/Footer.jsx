import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-400 py-12 px-6 text-center">
      <Heart className="w-6 h-6 text-primary-200 mx-auto mb-4" />
      <p className="text-white/70 text-sm tracking-widest uppercase mb-2" style={{ fontFamily: 'Georgia, serif' }}>
        Victoria · Mis XV Años
      </p>
      <p className="text-white/50 text-xs">4 de Diciembre de 2026</p>
    </footer>
  );
}