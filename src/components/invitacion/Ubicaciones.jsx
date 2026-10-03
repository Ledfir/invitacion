import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Church, PartyPopper } from 'lucide-react';
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
    id: 'iglesia',
    titulo: 'Ceremonia Religiosa',
    icon: Church,
    nombre: 'Iglesia Bautista Dios Proveerá',
    direccion: 'Miguel Hidalgo 101, Heroes de Nacozari, Jardines de la Silla, 67288 Jardines de la Silla, N.L.',
    hora: '19:00 hrs',
    coords: [25.6366977, -100.1825569],
    maps: `https://www.google.com/maps/place/Iglesia+Bautista+Dios+Proveer%C3%A1/@25.6357726,-100.1817236,18.54z/data=!4m16!1m9!3m8!1s0x8662c1794e4cf23b:0xd0ff4b7efc7501d8!2sHacienda+Bugambilias!8m2!3d25.632943!4d-100.1764451!9m1!1b1!16s%2Fg%2F11cn8ysgkz!3m5!1s0x8662c177e5f70427:0x4106c2d03172c62f!8m2!3d25.6366977!4d-100.1825569!16s%2Fg%2F11b7gn00c5?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D`
  },
  {
    id: 'recepcion',
    titulo: 'Recepción',
    icon: PartyPopper,
    nombre: 'Salón Hacienda Bugambilias',
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
      style={{ height: '260px', width: '100%', borderRadius: '1rem' }}
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

        <div className="grid md:grid-cols-2 gap-8">
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