'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import Button from '@/components/Button';
import PlayerCard from '@/components/PlayerCard';
import CategorySelector from '@/components/CategorySelector';
import { ArrowLeft, Plus, Play } from 'lucide-react';

export default function SetupPage() {
  const router = useRouter();
  const { players, addPlayer, removePlayer, startNewRound } = useGameStore();
  const [playerName, setPlayerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>(['animales', 'lugares', 'comida', 'profesiones', 'objetos', 'deportes']);

  const handleAddPlayer = () => {
    if (playerName.trim() && players.length < 12) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  const handleStartGame = () => {
    if (players.length >= 3) {
      startNewRound(selectedCategory);
      router.push('/reveal');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold">Configurar Partida</h1>
        </div>

        {/* Añadir jugadores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Plus size={24} className="text-purple-400" />
            Añadir Jugadores
          </h2>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nombre del jugador..."
              maxLength={20}
              className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <Button
              onClick={handleAddPlayer}
              disabled={!playerName.trim() || players.length >= 12}
              className="px-6"
            >
              Añadir
            </Button>
          </div>

          <p className="text-sm text-slate-200">
            Jugadores: {players.length}/12 {players.length < 3 && '(mínimo 3)'}
          </p>
        </motion.div>

        {/* Lista de jugadores */}
        {players.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold">
              Jugadores ({players.length})
            </h2>
            
            <div className="space-y-2">
              <AnimatePresence>
                {players.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    onRemove={() => removePlayer(player.id)}
                    showScore={true}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Selector de categoría */}
        {players.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <CategorySelector
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </motion.div>
        )}

        {/* Botón iniciar */}
        {players.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={handleStartGame}
              className="w-full flex items-center justify-center gap-2 text-lg"
            >
              <Play size={24} />
              Iniciar Ronda
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}