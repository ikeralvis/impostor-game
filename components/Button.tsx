import { motion, MotionProps } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type MotionButtonProps = React.ComponentProps<typeof motion.button>;

interface ButtonProps extends MotionButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClass = variant === 'primary' 
    ? 'btn-primary' 
    : variant === 'danger'
    ? 'btn-danger'
    : 'btn-secondary';

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${baseClass} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}