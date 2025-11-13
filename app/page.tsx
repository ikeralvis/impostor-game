'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import Button from '@/components/Button';
import { Users, Play } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { players, gameActive, resetGame } = useGameStore();

  const handleNewGame = () => {
    if (players.length > 0 && gameActive) {
      if (confirm('¿Seguro que quieres empezar una nueva partida? Se perderán las puntuaciones.')) {
        resetGame();
        router.push('/setup');
      }
    } else {
      router.push('/setup');
    }
  };

  const handleContinue = () => {
    router.push('/setup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo/Título */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🕵️</div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            El Impostor
          </h1>
          <p className="text-slate-300 text-lg">
            Encuentra al impostor antes de que sea tarde
          </p>
        </motion.div>

        {/* Botones principales */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={handleNewGame}
            className="w-full flex items-center justify-center gap-2 text-lg"
          >
            <Users size={24} />
            Nueva Partida
          </Button>

          {players.length > 0 && (
            <Button
              onClick={handleContinue}
              variant="secondary"
              className="w-full flex items-center justify-center gap-2 text-lg"
            >
              <Play size={24} />
              Continuar Partida
            </Button>
          )}
        </motion.div>

        {/* Instrucciones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 space-y-2"
        >
          <h3 className="font-semibold text-purple-400 mb-3">¿Cómo jugar?</h3>
          <ul className="space-y-2 text-sm text-slate-200">
            <li className="flex gap-2">
              <span className="text-purple-400">1.</span>
              <span>Todos reciben una palabra excepto el impostor</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">2.</span>
              <span>El impostor recibe una palabra similar</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">3.</span>
              <span>Describid vuestras palabras sin decirlas directamente</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">4.</span>
              <span>¡Votad quién creéis que es el impostor!</span>
            </li>
          </ul>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-slate-800 text-sm"
        >
          Mínimo 3 jugadores para comenzar
        </motion.p>
      </motion.div>
    </div>
  );
}