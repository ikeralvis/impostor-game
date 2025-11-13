'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import Button from '@/components/Button';
import PlayerCard from '@/components/PlayerCard';
import { Check, ArrowLeft, AlertCircle } from 'lucide-react';

export default function VotePage() {
  const router = useRouter();
  const { players, currentRound } = useGameStore();
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!currentRound) {
      router.push('/setup');
    }
  }, [currentRound, router]);

  if (!currentRound) return null;

  const handleVote = () => {
    if (selectedPlayer) {
      router.push(`/results?voted=${selectedPlayer}`);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleSkipVote = () => {
    if (confirm('¿Seguro que no queréis votar? El impostor ganará puntos.')) {
      router.push(`/results?voted=none`);
    }
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/game')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Votación</h1>
            <p className="text-slate-200">¿Quién es el impostor?</p>
          </div>
        </div>

        {/* Instrucciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 text-center space-y-2"
        >
          <p className="text-slate-200 font-medium">
            👆 Toca un jugador para seleccionarlo
          </p>
          <p className="text-slate-200 text-sm">
            {selectedPlayer 
              ? '✓ Jugador seleccionado. Pulsa "Confirmar Voto"'
              : 'Ningún jugador seleccionado'}
          </p>
        </motion.div>

        {/* Error de selección */}
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card p-4 bg-red-500/20 border-red-500/50 flex items-center gap-3"
            >
              <AlertCircle className="text-red-400" size={24} />
              <p className="text-red-300">Por favor, selecciona un jugador antes de votar</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid de jugadores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-3"
        >
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="relative"
            >
              <div 
                onClick={() => setSelectedPlayer(player.id)}
                className={`cursor-pointer transition-all ${
                  selectedPlayer === player.id 
                    ? 'ring-2 ring-purple-500 rounded-2xl' 
                    : ''
                }`}
              >
                <PlayerCard player={player} />
              </div>
              
              {selectedPlayer === player.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none"
                >
                  <div className="bg-purple-500 rounded-full p-2 shadow-lg shadow-purple-500/50">
                    <Check size={24} className="text-white" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Botón confirmar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <Button
            onClick={handleVote}
            className={`w-full flex items-center justify-center gap-2 text-lg ${
              !selectedPlayer ? 'opacity-50' : ''
            }`}
          >
            <Check size={24} />
            {selectedPlayer ? 'Confirmar Voto' : 'Selecciona un Jugador'}
          </Button>

          {/* Opción de no votar */}
          <button
            onClick={handleSkipVote}
            className="w-full text-slate-600 hover:text-slate-300 underline text-sm transition-colors py-2"
          >
            Saltar votación (el impostor gana automáticamente)
          </button>
        </motion.div>
      </div>
    </div>
  );
}