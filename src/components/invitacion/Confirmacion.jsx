import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function Confirmacion() {
  const { toast } = useToast();
  const [nombre, setNombre] = useState('');
  const [asistira, setAsistira] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      toast({ title: 'Por favor escribe tu nombre', variant: 'destructive' });
      return;
    }
    if (asistira === null) {
      toast({ title: 'Indica si asistirás o no', variant: 'destructive' });
      return;
    }
    setEnviando(true);
    try {
      const datosConfirmacion = {
        nombre: nombre.trim(),
        asistira,
        mensaje: mensaje.trim() || "",
        fecha: serverTimestamp()
      };

      // Solo agregar cantidadPersonas si asiste
      if (asistira) {
        datosConfirmacion.cantidadPersonas = Number(cantidad);
      }

      await addDoc(collection(db, "confirmaciones"), datosConfirmacion);
      toast({ title: '¡Gracias por confirmar!', description: 'Tu respuesta fue enviada con éxito.' });
      setNombre('');
      setAsistira(null);
      setCantidad(1);
      setMensaje('');
    } catch (err) {
      console.error('Error al guardar confirmación:', err);
      toast({ title: 'Ocurrió un error', description: 'Intenta de nuevo más tarde.', variant: 'destructive' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="confirmacion" className="py-24 px-6 bg-primary-400 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary-200 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-primary-200 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-xl mx-auto"
      >
        <div className="text-center mb-10">
          <p className="text-white tracking-[0.4em] text-xs uppercase mb-3">Confirma tu asistencia</p>
          <h2 className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            ¿Nos acompañas?
          </h2>
          <div className="w-16 h-px bg-white/50 mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-white tracking-wide">Nombre completo</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe tu nombre"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white tracking-wide">¿Asistirás?</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAsistira(true)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                  asistira === true
                    ? 'bg-primary-300 border-primary-300 text-white'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                }`}
              >
                <Check className="w-4 h-4" /> Sí, asistiré
              </button>
              <button
                type="button"
                onClick={() => setAsistira(false)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                  asistira === false
                    ? 'bg-primary-300 border-primary-300 text-white'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                }`}
              >
                <X className="w-4 h-4" /> No podré
              </button>
            </div>
          </div>

          {asistira && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <Label htmlFor="cantidad" className="text-white tracking-wide">Cantidad de personas</Label>
              <Input
                id="cantidad"
                type="number"
                min="1"
                max="10"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </motion.div>
          )}

          <div className="space-y-2">
            <Label htmlFor="mensaje" className="text-white tracking-wide">Mensaje (opcional)</Label>
            <Textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Deja un mensaje para Victoria"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={enviando}
            className="w-full bg-primary-300 hover:bg-primary-400 text-white py-6 rounded-xl text-sm tracking-widest uppercase"
          >
            {enviando ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...</>
            ) : (
              'Confirmar'
            )}
          </Button>
        </form>
      </motion.div>
    </section>
  );
}