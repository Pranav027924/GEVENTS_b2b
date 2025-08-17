import React from 'react';
import { motion } from 'framer-motion';

interface ParticleSystemProps {
  count?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  count = 50, 
  color = 'accent', 
  size = 'sm' 
}) => {
  const particles = Array.from({ length: count }, (_, i) => i);
  
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className={`absolute ${sizeClasses[size]} bg-${color}/30 rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;