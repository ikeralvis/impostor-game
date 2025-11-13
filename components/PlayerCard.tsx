import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import AvatarIcon from './AvatarIcon';
import { Player } from '@/lib/types';

interface PlayerCardProps {
  player: Player;
  onRemove?: () => void;
  showScore?: boolean;
  isImpostor?: boolean;
  onClick?: () => void;
}

export default function PlayerCard({ 
  player, 
  onRemove, 
  showScore = false,
  isImpostor = false,
  onClick
}: PlayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: onClick ? 1.05 : 1 }}
      className={`glass-card p-4 flex items-center gap-3 relative ${
        onClick ? 'cursor-pointer hover:border-purple-500/50' : ''
      } ${isImpostor ? 'ring-2 ring-red-500' : ''}`}
      onClick={onClick}
    >
      <AvatarIcon seed={player.avatar} color={player.color} size={48} />
      
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{player.name}</h3>
        {showScore && (
          <p className="text-sm text-slate-400">
            {player.score} {player.score === 1 ? 'punto' : 'puntos'}
          </p>
        )}
        {isImpostor && (
          <p className="text-xs text-red-400 font-semibold">IMPOSTOR</p>
        )}
      </div>

      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-slate-400 hover:text-red-400 transition-colors"
        >
          <X size={20} />
        </button>
      )}
    </motion.div>
  );
}