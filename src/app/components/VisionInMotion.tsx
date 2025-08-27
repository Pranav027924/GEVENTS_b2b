'use client'
import React, { useEffect, useRef } from 'react';

const VisionInMotion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const textLinesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Load GSAP and its plugins dynamically
    const loadGSAP = async () => {
      // Create script elements for GSAP libraries
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      document.head.appendChild(gsapScript);

      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      document.head.appendChild(scrollTriggerScript);

      const lenisScript = document.createElement('script');
      lenisScript.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js';
      document.head.appendChild(lenisScript);

      // Wait for all scripts to load
      await Promise.all([
        new Promise(resolve => { gsapScript.onload = resolve; }),
        new Promise(resolve => { scrollTriggerScript.onload = resolve; }),
        new Promise(resolve => { lenisScript.onload = resolve; })
      ]);

      // Initialize animations after scripts load
      initializeAnimations();
    };

    const initializeAnimations = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      const Lenis = (window as any).Lenis;

      if (!gsap || !ScrollTrigger || !Lenis) return;

      // Register GSAP plugin
      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis for smooth scrolling
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      // Lenis scroll event
      lenis.on('scroll', ScrollTrigger.update);

      // Animation frame function for Lenis
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // Main scroll animation
      const numberDisplay = numberRef.current;
      const textLines = textLinesRef.current.filter(Boolean);
      const visionContainer = containerRef.current;

      if (!visionContainer || !numberDisplay) return;

      // Create the main scroll trigger
      ScrollTrigger.create({
        trigger: visionContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self: any) => {
          // Calculate current section (1-8)
          const progress = self.progress;
          const totalSections = 8;
          const currentSection = Math.min(Math.ceil(progress * totalSections), totalSections);
          
          // Update number display
          const paddedNumber = currentSection.toString().padStart(2, '0');
          numberDisplay.textContent = paddedNumber;
          
          // Update text highlighting
          textLines.forEach((line, index) => {
            const lineSection = index + 1;
            if (lineSection <= currentSection) {
              line?.classList.add('highlighted');
            } else {
              line?.classList.remove('highlighted');
            }
          });
        }
      });

      // Individual text line animations for smooth highlighting
      textLines.forEach((line, index) => {
        const sectionNumber = index + 1;
        
        ScrollTrigger.create({
          trigger: visionContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self: any) => {
            const progress = self.progress;
            const sectionProgress = progress * 8;
            
            if (sectionProgress >= sectionNumber - 0.5 && sectionProgress < sectionNumber + 0.5) {
              // Smooth transition effect
              const localProgress = (sectionProgress - (sectionNumber - 0.5)) / 1;
              const opacity = gsap.utils.clamp(0, 1, localProgress * 2);
              
              gsap.set(line, {
                color: gsap.utils.interpolate("#333", "#fff", opacity)
              });
            }
          }
        });
      });

      // Refresh ScrollTrigger on window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    loadGSAP();
  }, []);

  const textContent = [
    "Turn vision into motion.",
    "Challenge, refine, evolve.",
    "The future is a playground.",
    "Change starts within.",
    "Nourish curiosity, expand possibility.",
    "Shift perspectives, shape reality.",
    "Think freely, act boldly.",
    "Stay restless, stay real."
  ];

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #000;
          color: #fff;
          overflow-x: hidden;
        }

        /* Container for the entire animation section */
        .vision-container {
          height: 400vh; /* Reduced from 500vh */
          position: relative;
          background-color: #000;
        }

        /* Fixed content that stays in place while scrolling */
        .vision-content {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 5%;
        }

        /* Left side - Number display */
        .number-section {
          flex: 0 0 30%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .number-display {
          font-size: clamp(8rem, 15vw, 20rem);
          font-weight: 300;
          line-height: 1;
        }

        /* Right side - Text content */
        .text-section {
          flex: 1;
          padding-left: 5%;
          max-width: 60%;
        }

        .text-block {
          font-size: clamp(1.8rem, 4vw, 4rem);
          line-height: 1.3;
          font-weight: 400;
        }

        /* Text highlighting states */
        .text-line {
          display: block;
          transition: color 0.6s ease;
          color: #333; /* Dark gray for unhighlighted text */
        }

        .text-line.highlighted {
          color: #fff; /* White for highlighted text */
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .vision-content {
            flex-direction: column;
            justify-content: center;
            padding: 0 3%;
            gap: 2rem;
          }
          
          .number-section {
            flex: none;
          }
          
          .number-display {
            font-size: clamp(4rem, 12vw, 8rem);
          }
          
          .text-section {
            flex: none;
            max-width: 100%;
            padding-left: 0;
            text-align: center;
          }
          
          .text-block {
            font-size: clamp(1.2rem, 3vw, 2rem);
          }
        }
      `}</style>

      {/* Main Vision Container - Now starts immediately */}
      <div className="vision-container" ref={containerRef}>
        <div className="vision-content">
          {/* Left Side - Numbers */}
          <div className="number-section">
            <div className="number-display" ref={numberRef}>01</div>
          </div>
          
          {/* Right Side - Text Content */}
          <div className="text-section">
            <div className="text-block">
              {textContent.map((text, index) => (
                <span
                  key={index}
                  className="text-line"
                  data-section={index + 1}
                  ref={el => textLinesRef.current[index] = el}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionInMotion;