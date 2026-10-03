import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Flower2, Send, Loader2, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function LibroVisitas() {
  const { toast } = useToast();
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [paginaActual, setPaginaActual] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, "dedicatorias"),
      orderBy("fecha", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMensajes(data);
      setCargando(false);
    }, (err) => {
      console.error("Error al cargar dedicatorias:", err);
      setCargando(false);
    });

    return unsubscribe;
  }, []);

 

  const guardarDedicatoria = async (nombre, mensaje) => {
    try {
      await addDoc(collection(db, "dedicatorias"), {
        nombre: nombre.trim(),
        mensaje: mensaje.trim(),
        fecha: serverTimestamp()
      });

      console.log("Dedicatoria guardada");
    } catch (error) {
      console.error("Error al guardar:", error);
      throw error; // Lanza el error para que lo maneje handleSubmit
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !mensaje.trim()) {
      toast({ title: 'Escribe tu nombre y tu mensaje', variant: 'destructive' });
      return;
    }
    setEnviando(true);
    try {
      await guardarDedicatoria(nombre, mensaje);
      toast({ title: '¡Gracias por tu mensaje!', description: 'Tu dedicatoria fue publicada.' });
      setNombre('');
      setMensaje('');
    } catch (err) {
      toast({ title: 'Ocurrió un error', description: 'Intenta de nuevo más tarde.', variant: 'destructive' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="libro" className="py-24 px-6 bg-primary-50/40">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <Heart className="w-8 h-8 text-primary-200 mx-auto mb-4" />
          <p className="text-primary-300 tracking-[0.4em] text-xs uppercase mb-3">Dedicatorias</p>
          <h2 className="text-4xl sm:text-5xl text-primary-400 mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Libro de Visitas
          </h2>
          <div className="w-16 h-px bg-primary-200 mx-auto mt-6" />
          <p className="text-primary-400/60 mt-6 max-w-lg mx-auto">
            Déjale unas palabras bonitas a Victoria. Tus mensajes quedarán guardados como recuerdo de esta noche.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-primary-50 shadow-lg space-y-5 mb-16"
        >
          <div className="space-y-2">
            <Label htmlFor="nombre-libro" className="text-primary-400">Tu nombre</Label>
            <Input
              id="nombre-libro"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe tu nombre"
              className="bg-white border-primary-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mensaje-libro" className="text-primary-400">Tu mensaje</Label>
            <Textarea
              id="mensaje-libro"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe una dedicatoria especial para Victoria..."
              rows={4}
              className="bg-white border-primary-100 resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={enviando}
            className="w-full bg-primary-300 hover:bg-primary-400 text-white py-6 rounded-xl text-sm tracking-widest uppercase"
          >
            {enviando ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publicando...</>
            ) : (
              <><Send className="w-4 h-4 mr-2" /> Dejar mi mensaje</>
            )}
          </Button>
        </motion.form>

        {cargando ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 text-primary-200 animate-spin" />
          </div>
        ) : mensajes.length === 0 ? (
          <p className="text-center text-primary-400/50 italic" style={{ fontFamily: 'Georgia, serif' }}>
            Sé el primero en dejar un mensaje para Victoria.
          </p>
        ) : (
          <div className="flex flex-col items-center">
            {/* Libro */}
            <div className="w-full max-w-2xl perspective mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={paginaActual}
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.6 }}
                  style={{ perspective: '1000px' }}
                  className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-8 sm:p-12 border-4 border-amber-900 shadow-2xl"
                >
                  {/* Efecto de sombra interior (como un libro) */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                  
                  {/* Contenido de la página */}
                  <div className="relative z-10 min-h-96">
                    <Flower2 className="w-6 h-6 text-primary-200 mb-4" />
                    <p className="text-lg sm:text-xl text-primary-400/80 leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                      "{mensajes[paginaActual].mensaje}"
                    </p>
                    <p className="text-primary-300 text-base sm:text-lg tracking-wider font-semibold">
                      — {mensajes[paginaActual].nombre}
                    </p>
                    
                    {/* Número de página */}
                    <div className="absolute bottom-4 right-6 text-primary-200 text-sm font-serif">
                      {paginaActual + 1}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controles de navegación */}
            <div className="flex items-center gap-6 sm:gap-8">
              <Button
                onClick={() => setPaginaActual(Math.max(0, paginaActual - 1))}
                disabled={paginaActual === 0}
                className="bg-primary-300 hover:bg-primary-400 text-white rounded-full p-2 sm:p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>

              <span className="text-primary-400/70 font-serif text-sm sm:text-base whitespace-nowrap">
                Página {paginaActual + 1} de {mensajes.length}
              </span>

              <Button
                onClick={() => setPaginaActual(Math.min(mensajes.length - 1, paginaActual + 1))}
                disabled={paginaActual === mensajes.length - 1}
                className="bg-primary-300 hover:bg-primary-400 text-white rounded-full p-2 sm:p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}