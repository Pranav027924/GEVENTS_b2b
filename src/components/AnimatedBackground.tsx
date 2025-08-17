import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent/30 to-primary-electric/20 rounded-full blur-xl"
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-primary-glow/40 to-accent/30 rounded-full blur-2xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-1/2 left-10 w-16 h-16 border border-accent/20 rotate-45"
        animate={{
          rotate: [45, 225, 45],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-primary-glow/30 rounded-lg"
        animate={{
          rotate: [0, 360],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-accent-soft/5" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-glow/5 to-transparent" />
    </div>
  );
};

export default AnimatedBackground;