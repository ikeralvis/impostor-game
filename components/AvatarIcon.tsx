import { motion } from 'framer-motion';

interface AvatarIconProps {
  seed: string;
  color: string;
  size?: number;
  className?: string;
}

export default function AvatarIcon({ 
  seed, 
  color, 
  size = 64,
  className = '' 
}: AvatarIconProps) {
  // Genera un patrón simple basado en el seed
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pattern = hash % 4;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`rounded-full flex items-center justify-center font-bold text-white shadow-lg ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.4,
      }}
    >
      {seed.charAt(0).toUpperCase()}
    </motion.div>
  );
}