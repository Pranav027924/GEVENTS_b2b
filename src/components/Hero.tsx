'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface NavigationItem {
  id: string;
  label: string;
}

interface HeroProps {
  navigationItems?: NavigationItem[];
  subHeaders?: string[];
  mainText?: string;
  defaultSubHeader?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
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
  className = ''
}) => {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const subheaderRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSubHeader, setCurrentSubHeader] = useState(defaultSubHeader);
  const intervalHandlesRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup intervals
  const clearAllIntervals = () => {
    intervalHandlesRef.current.forEach(handle => clearInterval(handle));
    intervalHandlesRef.current = [];
  };

  const changeColors = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, { backgroundColor: "#000", duration: 0.5 });
      gsap.to('.placeholder, .nav-item, .footer-item, .subheader', { color: "#fff", duration: 0.5 });
    }
  };

  const revertColors = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, { backgroundColor: "#e3e3e3", duration: 0.5 });
      gsap.to('.placeholder, .nav-item, .footer-item, .subheader', { color: "#000", duration: 0.5 });
    }
  };

  const animateScale = (element: HTMLElement | null, scaleValue: number) => {
    if (element) {
      gsap.fromTo(element, { scale: 1 }, { scale: scaleValue, duration: 1, ease: "power2.out" });
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
        gsap.to(letters[index], { filter: 'blur(0px)', duration: 0.3 });
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

    // Start shuffling for each letter
    for (let i = 0; i < finalText.length; i++) {
      intervalHandlesRef.current[i] = setInterval(() => shuffle(i), 100);
    }

    // Stop shuffling and reveal final text
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

  // Update subheader text when currentSubHeader changes
  useEffect(() => {
    if (subheaderRef.current) {
      subheaderRef.current.textContent = currentSubHeader;
    }
  }, [currentSubHeader]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
      `}</style>
      
      <div 
        ref={containerRef}
        className={`cgpro-container ${className}`}
        style={{
          width: '100vw',
          height: '100vh',
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
            transition: 'color 0.5s ease'
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
                transition: 'all 0.3s ease'
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
            cursor: 'pointer'
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
                transition: 'all 0.3s ease'
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
            width: '75%'
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
              transition: 'color 0.5s ease'
            }}
          >
            {currentSubHeader}
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;