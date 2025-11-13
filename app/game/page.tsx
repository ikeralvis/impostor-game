'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import Button from '@/components/Button';
import PlayerCard from '@/components/PlayerCard';
import { Vote, Home } from 'lucide-react';

export default function GamePage() {
  const router = useRouter();
  const { players, currentRound } = useGameStore();

  useEffect(() => {
    if (!currentRound) {
      router.push('/setup');
    }
  }, [currentRound, router]);

  if (!currentRound) return null;

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-bold">Ronda {currentRound.roundNumber}</h1>
          <p className="text-slate-200">Categoría: {currentRound.category}</p>
        </motion.div>

        {/* Instrucciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 space-y-3"
        >
          <h2 className="text-xl font-semibold text-purple-400">¿Cómo jugar?</h2>
          <ol className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2">
              <span className="text-purple-400 font-bold">1.</span>
              <span>Por turnos, describid vuestra palabra sin decirla directamente</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400 font-bold">2.</span>
              <span>El impostor debe fingir que tiene la misma palabra que los demás</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400 font-bold">3.</span>
              <span>Observad y descubrid quién no encaja con el grupo</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400 font-bold">4.</span>
              <span>Cuando estéis listos, votad al impostor</span>
            </li>
          </ol>
        </motion.div>

        {/* Lista de jugadores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold">
            Jugadores en la ronda ({players.length})
          </h2>
          <div className="grid gap-2">
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <PlayerCard player={player} showScore={false} />
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
            onClick={() => router.push('/vote')}
            className="w-full flex items-center justify-center gap-2 text-lg"
          >
            <Vote size={24} />
            Votar al Impostor
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