'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import Button from '@/components/Button';
import PlayerCard from '@/components/PlayerCard';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { players, currentRound, endRound, resetRound } = useGameStore();
  const [revealed, setRevealed] = useState(false);

  const votedPlayerId = searchParams.get('voted');
  const correctGuess = votedPlayerId === currentRound?.impostorId;
  const impostor = players.find(p => p.id === currentRound?.impostorId);

  useEffect(() => {
    if (!currentRound) {
      router.push('/setup');
      return;
    }

    // Actualizar puntuaciones
    if (votedPlayerId && votedPlayerId !== 'none') {
      endRound(votedPlayerId);
    } else {
      endRound(null);
    }

    // Revelar después de un momento
    const timer = setTimeout(() => {
      setRevealed(true);
      
      // Confetti si adivinaron correctamente
      if (correctGuess) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!currentRound || !impostor) return null;

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const handleNewRound = () => {
    resetRound();
    router.push('/setup');
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Resultado principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`glass-card p-8 text-center space-y-4 ${
            correctGuess
              ? 'border-2 border-green-500/50 bg-green-500/10'
              : 'border-2 border-red-500/50 bg-red-500/10'
          }`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-6xl"
          >
            {correctGuess ? '🎉' : '😈'}
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              {correctGuess ? '¡Impostor Descubierto!' : '¡El Impostor Escapa!'}
            </h1>
            <p className="text-slate-100">
              {correctGuess
                ? 'Los jugadores ganan +1 punto'
                : 'El impostor gana +2 puntos'}
            </p>
          </div>
        </motion.div>

        {/* Revelar impostor */}
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold text-center">El impostor era:</h2>
            <PlayerCard player={impostor} isImpostor={true} />
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              <div className="text-center">
                <p className="text-sm text-slate-300">Palabra correcta</p>
                <p className="text-lg font-bold text-purple-400">
                  {currentRound.word}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-300">Palabra impostor</p>
                <p className="text-lg font-bold text-red-400">
                  {currentRound.impostorWord}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Clasificación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Trophy size={24} className="text-yellow-400" />
            Clasificación
          </h2>
          
          <div className="space-y-2">
            {sortedPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className={`text-2xl font-bold w-8 text-center ${
                  index === 0 ? 'text-yellow-400' :
                  index === 1 ? 'text-slate-300' :
                  index === 2 ? 'text-amber-600' :
                  'text-slate-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <PlayerCard player={player} showScore={true} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Button
            onClick={handleNewRound}
            className="w-full flex items-center justify-center gap-2 text-lg"
          >
            <RotateCcw size={24} />
            Nueva Ronda
          </Button>

          <Button
            onClick={() => router.push('/')}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Volver al Inicio
          </Button>
        </motion.div>
      </div>
    </div>
  );
}