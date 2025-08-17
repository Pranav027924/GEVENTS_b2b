'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface NavigationItem {
  id: string;
  label: string;
}

interface IntegratedHeroProps {
  navigationItems?: NavigationItem[];
  subHeaders?: string[];
  mainText?: string;
  defaultSubHeader?: string;
  videoSrc?: string;
  className?: string;
}

const IntegratedHero: React.FC<IntegratedHeroProps> = ({
  navigationItems = [
    { id: 'item1', label: 'gallery' },
    { id: 'item2', label: 'about' },
    { id: 'item3', label: 'clients' },
    { id: 'item4', label: 'contact' }
  ],
  subHeaders = [
    "top notch web components.",
    "forging ahead with elite web designs.",
    "take the fast lane to mastery",
    "bring your projects to life, quicker than ever."
  ],
  mainText = 'GEVENTS',
  defaultSubHeader = 'Orchestrate your events with us.',
  videoSrc = 'https://ik.imagekit.io/etqbz7ayy/Real_Dimez_Video_Clip.mp4?updatedAt=1755334893862',
  className = ''
}) => {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const subheaderRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSubHeader, setCurrentSubHeader] = useState(defaultSubHeader);
  const intervalHandlesRef = useRef<NodeJS.Timeout[]>([]);

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Enhanced animated values with proper bounds
  const maskSize = useTransform(scrollYProgress, [0, 0.3, 0.7], [400, 1500, 5000]);
  const videoScale = useTransform(scrollYProgress, [0, 0.4, 0.9], [1.3, 1.1, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0]);
  const maskOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.6], [0, 1, 0.8]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
  
  // Multiple mask layers for depth
  const primaryMaskSize = useTransform(scrollYProgress, [0, 0.4, 0.8], [350, 1200, 4000]);
  const secondaryMaskSize = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [500, 1600, 5500]);
  
  // Color and filter effects
  const videoHue = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360]);
  const videoSaturation = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 1.2, 1]);
  const videoBrightness = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  // Rotation effects (reduced for stability)
  const maskRotation = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, -1]);
  
  // Final video reveal
  const transitionComplete = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  // Spring animations
  const springConfig = { stiffness: 100, damping: 25 };
  const smoothMaskSize = useSpring(maskSize, springConfig);
  const smoothPrimaryMask = useSpring(primaryMaskSize, springConfig);
  const smoothSecondaryMask = useSpring(secondaryMaskSize, springConfig);
  const smoothVideoScale = useSpring(videoScale, springConfig);
  const smoothHeroScale = useSpring(heroScale, springConfig);

  // Create enhanced SVG mask
  const createEnhancedMaskDataURL = (text: string, layer: 'primary' | 'secondary' = 'primary') => {
    const layerConfigs = {
      primary: {
        fontSize: '48',
        strokeWidth: '1',
        opacity: '1',
        letterSpacing: '4px'
      },
      secondary: {
        fontSize: '52',
        strokeWidth: '0.5',
        opacity: '0.8',
        letterSpacing: '6px'
      }
    };

    const config = layerConfigs[layer];
    
    const svgString = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 140'>
        <defs>
          <filter id="glow-${layer}">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="textGradient-${layer}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:white;stop-opacity:0.8"/>
            <stop offset="50%" style="stop-color:white;stop-opacity:1"/>
            <stop offset="100%" style="stop-color:white;stop-opacity:0.8"/>
          </linearGradient>
        </defs>
        <text 
          x='50%' 
          y='50%' 
          dominant-baseline='middle' 
          text-anchor='middle' 
          font-family='Orbitron, Arial Black, sans-serif' 
          font-size='${config.fontSize}' 
          font-weight='700' 
          fill='url(#textGradient-${layer})'
          stroke='white'
          stroke-width='${config.strokeWidth}'
          letter-spacing='${config.letterSpacing}'
          filter='url(#glow-${layer})'
        >
          ${text}
        </text>
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  };

  const primaryMaskDataURL = createEnhancedMaskDataURL(mainText, 'primary');
  const secondaryMaskDataURL = createEnhancedMaskDataURL(mainText, 'secondary');

  // Cleanup intervals
  const clearAllIntervals = () => {
    intervalHandlesRef.current.forEach(handle => clearInterval(handle));
    intervalHandlesRef.current = [];
  };

  const changeColors = () => {
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = "#000";
      containerRef.current.style.transition = "background-color 0.5s ease";
      
      const elements = document.querySelectorAll('.placeholder, .nav-item, .footer-item, .subheader');
      elements.forEach(el => {
        (el as HTMLElement).style.color = "#fff";
        (el as HTMLElement).style.transition = "color 0.5s ease";
      });
    }
  };

  const revertColors = () => {
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = "#e3e3e3";
      containerRef.current.style.transition = "background-color 0.5s ease";
      
      const elements = document.querySelectorAll('.placeholder, .nav-item, .footer-item, .subheader');
      elements.forEach(el => {
        (el as HTMLElement).style.color = "#000";
        (el as HTMLElement).style.transition = "color 0.5s ease";
      });
    }
  };

  const animateScale = (element: HTMLElement | null, scaleValue: number) => {
    if (element) {
      element.style.transform = `scale(${scaleValue})`;
      element.style.transition = "transform 1s ease-out";
    }
  };

  const wrapLetters = (text: string) => {
    if (!placeholderRef.current) return;
    
    placeholderRef.current.innerHTML = '';
    [...text].forEach(letter => {
      const span = document.createElement('span');
      span.style.filter = 'blur(8px)';
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      placeholderRef.current?.appendChild(span);
    });
  };

  const animateBlurEffect = () => {
    if (!placeholderRef.current) return;
    
    const letters = placeholderRef.current.children;
    let index = 0;

    const clearNextLetter = () => {
      if (index < letters.length) {
        (letters[index] as HTMLElement).style.filter = 'blur(0px)';
        (letters[index] as HTMLElement).style.transition = 'filter 0.3s ease';
        index++;
        if (index < letters.length) {
          setTimeout(clearNextLetter, 50);
        }
      }
    };
    clearNextLetter();
  };

  const shuffleLetters = (finalText: string) => {
    clearAllIntervals();
    wrapLetters(finalText);
    
    if (!placeholderRef.current) return;
    
    const letters = placeholderRef.current.children;
    let shufflingCounter = 0;

    const shuffle = (index: number) => {
      if (shufflingCounter < 20) {
        const randomChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
        if (letters[index]) {
          (letters[index] as HTMLElement).textContent = randomChar;
        }
      } else {
        if (letters[index]) {
          (letters[index] as HTMLElement).textContent = 
            finalText.charAt(index) === ' ' ? '\u00A0' : finalText.charAt(index);
          clearInterval(intervalHandlesRef.current[index]);
        }
      }
    };

    for (let i = 0; i < finalText.length; i++) {
      intervalHandlesRef.current[i] = setInterval(() => shuffle(i), 100);
    }

    setTimeout(() => {
      shufflingCounter = 20;
      for (let i = 0; i < finalText.length; i++) {
        if (letters[i]) {
          (letters[i] as HTMLElement).textContent = 
            finalText.charAt(i) === ' ' ? '\u00A0' : finalText.charAt(i);
          clearInterval(intervalHandlesRef.current[i]);
        }
      }
      setTimeout(() => {
        animateBlurEffect();
      }, 200);
    }, 800);
  };

  const handleMouseEnter = (index: number, text: string) => {
    const newText = text.toUpperCase();
    const newSubHeaderText = subHeaders[index] ? subHeaders[index].toUpperCase() : '';

    setCurrentSubHeader(newSubHeaderText);
    animateScale(placeholderRef.current, 1.1);
    shuffleLetters(newText);
    changeColors();
  };

  const handleMouseLeave = () => {
    setCurrentSubHeader(defaultSubHeader);
    animateScale(placeholderRef.current, 1);
    shuffleLetters(mainText);
    revertColors();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      shuffleLetters(mainText);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearAllIntervals();
    };
  }, [mainText]);

  useEffect(() => {
    if (subheaderRef.current) {
      subheaderRef.current.textContent = currentSubHeader;
    }
  }, [currentSubHeader]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      
      <div className={className}>
        {/* Transition Container */}
        <motion.div 
          ref={scrollContainerRef} 
          className="relative" 
          style={{ 
            height: '300vh',
            pointerEvents: 'auto'
          }}
        >
          {/* Hero Section */}
          <motion.div 
            className="sticky top-0 w-full h-screen z-10 overflow-hidden"
            style={{ 
              opacity: heroOpacity,
              scale: smoothHeroScale
            }}
          >
            <div 
              ref={containerRef}
              className="cgpro-container"
              style={{
                width: '100%',
                height: '100%',
                fontFamily: 'Arial, sans-serif',
                textTransform: 'uppercase',
                backgroundColor: '#e3e3e3',
                transition: 'background-color 0.5s ease',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Navigation */}
              <nav 
                style={{
                  position: 'absolute',
                  width: '100%',
                  padding: '2em',
                  display: 'flex',
                  justifyContent: 'space-between',
                  transition: 'color 0.5s ease',
                  zIndex: 30
                }}
              >
                {navigationItems.slice(0, 2).map((item, index) => (
                  <div
                    key={item.id}
                    className="nav-item"
                    onMouseEnter={() => handleMouseEnter(index, item.label)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      cursor: 'pointer',
                      padding: '10px',
                      transition: 'all 0.3s ease',
                      color: '#000'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {item.label}
                  </div>
                ))}
              </nav>

              {/* Footer */}
              <footer 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  padding: '2em',
                  display: 'flex',
                  justifyContent: 'space-between',
                  transition: 'color 0.5s ease',
                  cursor: 'pointer',
                  zIndex: 30
                }}
              >
                {navigationItems.slice(2, 4).map((item, index) => (
                  <div
                    key={item.id}
                    className="footer-item"
                    onMouseEnter={() => handleMouseEnter(index + 2, item.label)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      cursor: 'pointer',
                      padding: '10px',
                      transition: 'all 0.3s ease',
                      color: '#000'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {item.label}
                  </div>
                ))}
              </footer>

              {/* Header */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '75%',
                  zIndex: 25
                }}
              >
                <div
                  ref={placeholderRef}
                  className="placeholder"
                  style={{
                    textAlign: 'center',
                    fontFamily: "'Orbitron', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: '80px',
                    color: '#000',
                    lineHeight: 2.25,
                    transition: 'color 0.5s ease',
                    letterSpacing: '2px'
                  }}
                >
                  {mainText}
                </div>
                <p
                  ref={subheaderRef}
                  className="subheader"
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    transition: 'color 0.5s ease',
                    color: '#000'
                  }}
                >
                  {currentSubHeader}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Secondary Mask Layer */}
          <motion.div
            className="sticky top-0 w-full h-screen z-15 pointer-events-none overflow-hidden"
            style={{
              opacity: useTransform(maskOpacity, (opacity) => opacity * 0.4),
            }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                WebkitMaskImage: `url(${secondaryMaskDataURL})`,
                maskImage: `url(${secondaryMaskDataURL})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: smoothSecondaryMask,
                maskSize: smoothSecondaryMask,
                WebkitMaskPosition: 'center center',
                maskPosition: 'center center',
              }}
            >
              <motion.video
                className="w-full h-full object-cover"
                style={{
                  scale: useTransform(smoothVideoScale, (scale) => scale * 1.05),
                  filter: useTransform(
                    [videoHue, videoSaturation, videoBrightness],
                    (hue, sat, bright) => 
                      `hue-rotate(${hue * 0.5}deg) saturate(${sat * 0.9}) brightness(${bright * 0.95}) blur(1px)`
                  )
                }}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={videoSrc} type="video/mp4" />
              </motion.video>
            </motion.div>
          </motion.div>

          {/* Primary Mask Layer */}
          <motion.div
            className="sticky top-0 w-full h-screen z-20 pointer-events-none overflow-hidden"
            style={{
              opacity: maskOpacity,
            }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                WebkitMaskImage: `url(${primaryMaskDataURL})`,
                maskImage: `url(${primaryMaskDataURL})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: smoothPrimaryMask,
                maskSize: smoothPrimaryMask,
                WebkitMaskPosition: 'center center',
                maskPosition: 'center center',
                transform: useTransform(
                  maskRotation,
                  (rotation) => `rotate(${rotation}deg)`
                )
              }}
            >
              <motion.video
                className="w-full h-full object-cover"
                style={{
                  scale: smoothVideoScale,
                  filter: useTransform(
                    [videoHue, videoSaturation, videoBrightness],
                    (hue, sat, bright) => 
                      `hue-rotate(${hue}deg) saturate(${sat}) brightness(${bright}) contrast(1.1)`
                  )
                }}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={videoSrc} type="video/mp4" />
              </motion.video>
            </motion.div>
          </motion.div>

          {/* Final Video Section */}
          <motion.div
            className="sticky top-0 w-full h-screen z-5"
            style={{ 
              opacity: transitionComplete,
            }}
          >
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default IntegratedHero;