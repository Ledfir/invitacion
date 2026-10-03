import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Church, PartyPopper, Clock } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icono personalizado verde
const pinkIcon = L.divIcon({
  html: `<div style="background:#5A9670;width:24px;height:24px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const lugares = [
  {
    id: 'recepcion',
    titulo: 'Ceremonia Religiosa y Recepción',
    icon: PartyPopper,
    nombre: 'Salón Hacienda Bugambilias | XV años de Victoria',
    direccion: 'Av. Acueducto 33, Rancho Viejo, Jardines de la Silla, 67250 Jardines de la Silla, N.L.',
    hora: '21:00 hrs',
    coords: [25.632943, -100.1764451],
    maps: `https://www.google.com/maps/place/Hacienda+Bugambilias/@25.6313564,-100.1761543,17.67z/data=!4m16!1m9!3m8!1s0x8662c1794e4cf23b:0xd0ff4b7efc7501d8!2sHacienda+Bugambilias!8m2!3d25.632943!4d-100.1764451!9m1!1b1!16s%2Fg%2F11cn8ysgkz!3m5!1s0x8662c1794e4cf23b:0xd0ff4b7efc7501d8!8m2!3d25.632943!4d-100.1764451!16s%2Fg%2F11cn8ysgkz?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D`
  },
];

function Mapa({ coords, nombre, direccion }) {
  return (
    <MapContainer
      center={coords}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%', borderRadius: '1rem' }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />
      <Marker position={coords} icon={pinkIcon}>
        <Popup>
          <strong>{nombre}</strong>
          <br />
          {direccion}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default function Ubicaciones() {
  return (
    <section id="ubicaciones" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-primary-300 tracking-[0.4em] text-xs uppercase mb-3">Dónde será</p>
          <h2 className="text-4xl sm:text-5xl text-primary-400" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Ubicaciones
          </h2>
          <div className="w-16 h-px bg-primary-200 mx-auto mt-6" />
        </motion.div>

        {/* Alerta sobre llegar temprano */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 p-6 bg-gradient-to-r from-primary-200/20 to-primary-100/20 border-l-4 border-primary-300 rounded-lg"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center flex-shrink-0 mt-1">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-400 mb-2">¡Importante! ⏰</h3>
              <p className="text-primary-400/80 text-sm leading-relaxed">
                Te pedimos encarecidamente que <strong>llegues con anticipación</strong> a la ceremonia religiosa. 
                La entrada será a partir de las <strong>18:30 hrs</strong> para garantizar que todos podamos comenzar puntualmente a las <strong>19:00 hrs</strong>.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-8">
          {lugares.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="rounded-3xl overflow-hidden shadow-lg border border-primary-50 bg-primary-50/30"
            >
              <div className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <l.icon className="w-6 h-6 text-primary-300" />
                </div>
                <div>
                  <p className="text-primary-300 text-xs tracking-widest uppercase mb-1">{l.titulo}</p>
                  <h3 className="text-xl text-primary-400 mb-1" style={{ fontFamily: 'Georgia, serif' }}>{l.nombre}</h3>
                  <p className="text-primary-400/60 text-sm">{l.direccion}</p>
                  <p className="text-primary-300 text-sm font-medium mt-1">{l.hora}</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Mapa coords={l.coords} nombre={l.nombre} direccion={l.direccion} />
                <a
                  href={`https://www.google.com/maps?q=${l.coords[0]},${l.coords[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center mt-4 text-sm text-primary-300 hover:text-primary-400 tracking-wide"
                >
                  Cómo llegar →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}