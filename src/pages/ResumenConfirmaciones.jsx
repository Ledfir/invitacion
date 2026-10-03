import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Check, X, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ResumenConfirmaciones() {
  const [confirmaciones, setConfirmaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  // Contraseña para acceder al resumen (puedes cambiarla)
  const CONTRASENA = '2026';

  useEffect(() => {
    if (!autenticado) return;

    const q = query(collection(db, "confirmaciones"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setConfirmaciones(data);
      setCargando(false);
    }, (err) => {
      console.error("Error al cargar confirmaciones:", err);
      setCargando(false);
    });

    return unsubscribe;
  }, [autenticado]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (contrasena === CONTRASENA) {
      setAutenticado(true);
      setContrasena('');
    } else {
      alert('Contraseña incorrecta');
      setContrasena('');
    }
  };

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-400 to-primary-300 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-primary-400 mb-2 text-center">Resumen de Confirmaciones</h1>
          <p className="text-gray-600 text-center mb-6">Ingresa la contraseña para acceder</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Input
                type={mostrarContrasena ? "text" : "password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Contraseña"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-400"
              >
                {mostrarContrasena ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary-300 hover:bg-primary-400 text-white py-6"
            >
              Acceder
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Filtrar y buscar
  const confirmados = confirmaciones.filter(c => c.asistira);
  const noConfirmados = confirmaciones.filter(c => !c.asistira);

  let mostrados = confirmaciones;
  if (filtro === 'confirmar') mostrados = confirmados;
  if (filtro === 'no-confirmar') mostrados = noConfirmados;

  mostrados = mostrados.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calcular estadísticas
  const totalConfirmar = confirmados.reduce((sum, c) => sum + (c.cantidadPersonas || 1), 0);
  const totalNoConfirmar = noConfirmados.length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary-400 mb-2">Resumen de Confirmaciones</h1>
          <p className="text-gray-600">XV Años de Victoria</p>
        </motion.div>

        {/* Filtros y búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full"
            />
            
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setFiltro('todos')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filtro === 'todos'
                    ? 'bg-primary-300 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todos ({confirmaciones.length})
              </button>
              <button
                onClick={() => setFiltro('confirmar')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filtro === 'confirmar'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Confirman ({confirmados.length})
              </button>
              <button
                onClick={() => setFiltro('no-confirmar')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filtro === 'no-confirmar'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                No confirman ({noConfirmados.length})
              </button>
            </div>
          </div>
        </motion.div>

        {/* Lista de confirmaciones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {cargando ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary-300 animate-spin" />
            </div>
          ) : mostrados.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-500">No hay confirmaciones que coincidan</p>
            </div>
          ) : (
            mostrados.map((confirmacion, index) => (
              <motion.div
                key={confirmacion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                  confirmacion.asistira ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {confirmacion.asistira ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                      <h3 className="text-lg font-bold text-gray-800">{confirmacion.nombre}</h3>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>
                        Estado:{' '}
                        <strong className={confirmacion.asistira ? 'text-green-600' : 'text-red-600'}>
                          {confirmacion.asistira ? '✓ Confirmado' : '✗ No asiste'}
                        </strong>
                      </span>
                      {confirmacion.asistira && confirmacion.cantidadPersonas && (
                        <span>
                          Personas: <strong>{confirmacion.cantidadPersonas}</strong>
                        </span>
                      )}
                      {confirmacion.mensaje && (
                        <span>
                          Mensaje: <strong>"{confirmacion.mensaje}"</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {confirmacion.asistira && confirmacion.cantidadPersonas && (
                    <div className="bg-green-50 rounded-lg px-4 py-2 text-center">
                      <p className="text-sm text-gray-600">Personas</p>
                      <p className="text-2xl font-bold text-green-600">{confirmacion.cantidadPersonas}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Botón de cerrar sesión */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Button
            onClick={() => setAutenticado(false)}
            className="bg-gray-400 hover:bg-gray-500 text-white"
          >
            Cerrar sesión
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
