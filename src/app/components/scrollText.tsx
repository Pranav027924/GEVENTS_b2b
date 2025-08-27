'use client'
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TextSlider: React.FC = () => {
  const texts = [
    "Wenn es höchste Zeit für mehr Kapazität wird...",
    "Wenn Konzept zu Projektplan werden muss...",
    "Wenn die Pitch-Deadline mal wieder gestern war..."
  ];

  // Individual text slide component
  const SlideInText: React.FC<{
    children: React.ReactNode;
    delay?: number;
    direction?: 'left' | 'right';
  }> = ({ children, delay = 0, direction = 'left' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { 
      once: false,
      margin: '-20% 0px -20% 0px',
      amount: 0.3
    });

    const slideVariants = {
      hidden: {
        opacity: 0,
        x: direction === 'left' ? -100 : 100,
        filter: 'blur(8px)',
      },
      visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 1.2,
          delay: delay,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={slideVariants}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <>
      {/* Import Borel font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Borel&display=swap" rel="stylesheet" />

      <section
        className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 relative overflow-hidden"
        style={{ 
          fontFamily: '"Borel", cursive',
        }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        
        {/* Content container */}
        <div className="max-w-6xl mx-auto relative z-10 space-y-16">
          {texts.map((text, index) => (
            <SlideInText
              key={index}
              delay={index * 0.4}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="text-center">
                <h2 
                  className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal text-white leading-relaxed tracking-wide"
                  style={{ 
                    fontFamily: '"Borel", cursive',
                    fontStyle: 'italic'
                  }}
                >
                  {text}
                </h2>
              </div>
            </SlideInText>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/40 text-sm tracking-wider uppercase"
          >
            Scroll to reveal
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TextSlider;