'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import Button from '@/components/Button';
import AvatarIcon from '@/components/AvatarIcon';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function RevealPage() {
  const router = useRouter();
  const { players, currentRound, currentPlayerIndex, nextPlayer } = useGameStore();
  const [showWord, setShowWord] = useState(false);

  useEffect(() => {
    if (!currentRound) {
      router.push('/setup');
    }
  }, [currentRound, router]);

  if (!currentRound) return null;

  const currentPlayer = players[currentPlayerIndex];
  const isImpostor = currentPlayer.id === currentRound.impostorId;
  const word = isImpostor ? currentRound.impostorWord : currentRound.word;
  const allPlayersRevealed = currentPlayerIndex >= players.length;

  const handleNext = () => {
    if (currentPlayerIndex < players.length - 1) {
      nextPlayer();
      setShowWord(false);
    } else {
      router.push('/game');
    }
  };

  if (allPlayersRevealed) {
    router.push('/game');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {!showWord ? (
            <motion.div
              key="pass-device"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-8 text-center space-y-6"
            >
              <div className="space-y-2">
                <p className="text-slate-100">Turno de</p>
                <div className="flex justify-center">
                  <AvatarIcon
                    seed={currentPlayer.avatar}
                    color={currentPlayer.color}
                    size={80}
                  />
                </div>
                <h2 className="text-3xl font-bold">{currentPlayer.name}</h2>
              </div>

              <div className="space-y-3">
                <p className="text-slate-100">
                  Pasa el dispositivo a {currentPlayer.name}
                </p>
                <p className="text-sm text-slate-100">
                  Jugador {currentPlayerIndex + 1} de {players.length}
                </p>
              </div>

              <Button
                onClick={() => setShowWord(true)}
                className="w-full flex items-center justify-center gap-2"
              >
                <Eye size={20} />
                Ver mi palabra
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="show-word"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              className="glass-card p-8 text-center space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <AvatarIcon
                    seed={currentPlayer.avatar}
                    color={currentPlayer.color}
                    size={60}
                  />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-slate-200">Tu palabra es:</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className={`text-5xl font-bold py-8 px-4 rounded-xl ${
                      isImpostor
                        ? 'bg-red-500/20 text-red-400 border-2 border-red-500/50'
                        : 'bg-purple-500/20 text-purple-300 border-2 border-purple-500/50'
                    }`}
                  >
                    {word}
                  </motion.div>
                  
                  {isImpostor && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-red-400 font-semibold text-sm"
                    >
                      🕵️ ¡ERES EL IMPOSTOR!
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-slate-100">
                  Memoriza tu palabra y no la compartas
                </p>
                <Button
                  onClick={handleNext}
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <EyeOff size={20} />
                  Entendido, siguiente
                  {currentPlayerIndex < players.length - 1 && <ArrowRight size={16} />}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}