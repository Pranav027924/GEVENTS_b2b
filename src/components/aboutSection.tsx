'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface AboutSection {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  highlights?: string[];
}

interface AboutUsProps {
  sections?: AboutSection[];
  className?: string;
}

const AboutUs: React.FC<AboutUsProps> = ({
  sections = [
    {
      id: 'about',
      title: 'About Us',
      subtitle: 'Creating Unforgettable Experiences',
      description: 'G Event Management is a professionally managed organization which has been hosting best of events & providing services for the past 9 years across Bangalore, Chennai, Kochi, Hyderabad & other parts of South India. Its a team of young, enthusiastic and creative professionals who specialize in organizing events that leave lasting impressions.',
      highlights: ['professionally managed', 'young, enthusiastic and creative', 'lasting impressions']
    },
    {
      id: 'services',
      title: 'Our Expertise',
      subtitle: 'Complete Event Solution Factory',
      description: 'We make things easier and provide excellent services to our clients. Our expertise covers all aspects of Events: Planning, Coordination, & Execution. We deliver cost effective events without compromising on the final output.',
      highlights: [
        'Corporate Events',
        'Sports Events',
        'Holiday Planning',
        'Wedding Planning',
        'Product Launches',
        'Gifting Solutions',
        'Event Screening',
        'Corporate Off-sites',
        'Celebrations'
      ]
    },
    {
      id: 'stats',
      title: 'Our Track Record',
      description: '',
      highlights: [
        '9+ Years of Excellence',
        '500+ Successful Events',
        '5 Major Cities Coverage',
        'Complete Turnkey Solutions'
      ]
    }
  ],
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Individual text slide component with animation on every scroll
  const SlideInText: React.FC<{
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
  }> = ({ children, delay = 0, className = '', direction = 'left' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { 
      once: false,
      margin: '-15% 0px -15% 0px',
      amount: 0.3
    });

    const getInitialPosition = () => {
      switch (direction) {
        case 'right': return { x: 120, y: 0 };
        case 'up': return { x: 0, y: -60 };
        case 'down': return { x: 0, y: 60 };
        default: return { x: -120, y: 0 };
      }
    };

    const slideVariants = {
      hidden: {
        opacity: 0,
        ...getInitialPosition(),
        filter: 'blur(12px)',
        scale: 0.9
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
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
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  // Highlight text component for emphasized words
  const HighlightText: React.FC<{ text: string; highlights: string[] }> = ({
    text,
    highlights
  }) => {
    let processedText = text;
    
    highlights.forEach((highlight) => {
      const regex = new RegExp(`(${highlight})`, 'gi');
      processedText = processedText.replace(
        regex,
        `<span class="relative inline-block font-semibold text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/30 backdrop-blur-sm shadow-lg">$1</span>`
      );
    });

    return (
      <span
        dangerouslySetInnerHTML={{ __html: processedText }}
        className="leading-relaxed"
      />
    );
  };

  // Advanced floating elements with multiple layers
  const FloatingOrb: React.FC<{ 
    delay: number; 
    className?: string; 
    size?: 'sm' | 'md' | 'lg';
    direction?: number;
  }> = ({ delay, className = '', size = 'md', direction = 1 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });

    const sizeClasses = {
      sm: 'w-16 h-16',
      md: 'w-32 h-32',
      lg: 'w-48 h-48'
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={isInView ? {
          opacity: [0, 0.1, 0.05, 0.15, 0.08],
          scale: [0, 1, 0.8, 1.2, 1],
          rotate: [0, 180 * direction, 360 * direction]
        } : {
          opacity: 0,
          scale: 0
        }}
        transition={{
          duration: 8,
          delay,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className={`absolute ${sizeClasses[size]} border-2 border-white/10 rounded-full backdrop-blur-sm ${className}`}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)'
        }}
      />
    );
  };

  // Geometric background pattern
  const GeometricPattern: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : { opacity: 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '100px 100px, 150px 150px',
          backgroundPosition: '0 0, 50px 50px'
        }}></div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Import Borel font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Borel&display=swap" rel="stylesheet" />

      <section
        ref={containerRef}
        className={`min-h-screen bg-black text-white py-32 px-6 relative overflow-hidden ${className}`}
        style={{ 
          fontFamily: '"Borel", cursive',
        }}
      >
        {/* Enhanced background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent"></div>
        <GeometricPattern />

        {/* Floating orbs with varied sizes and positions */}
        <FloatingOrb delay={0} className="top-20 left-10" size="md" direction={1} />
        <FloatingOrb delay={2} className="top-32 right-20" size="lg" direction={-1} />
        <FloatingOrb delay={4} className="bottom-40 left-1/4" size="sm" direction={1} />
        <FloatingOrb delay={1} className="bottom-20 right-1/3" size="md" direction={-1} />
        <FloatingOrb delay={3} className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size="lg" direction={1} />

        {/* Content container with enhanced styling */}
        <div className="max-w-7xl mx-auto relative z-10">
          {sections.map((section, sectionIndex) => (
            <div key={section.id} className="mb-40">
              {/* Section divider line */}
              {sectionIndex > 0 && (
                <SlideInText delay={sectionIndex * 0.05} className="mb-20" direction="left">
                  <div className="flex items-center justify-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <div className="mx-8">
                      <div className="w-3 h-3 bg-white rounded-full shadow-lg shadow-white/20"></div>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/30 to-transparent"></div>
                  </div>
                </SlideInText>
              )}

              {/* Section Title */}
              {section.title && (
                <SlideInText delay={sectionIndex * 0.1} className="mb-12" direction="up">
                  <div className="text-center mb-6">
                    <h2 className="text-5xl md:text-6xl lg:text-8xl font-normal text-white leading-tight tracking-wide relative inline-block">
                      {section.title}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white rounded-full shadow-lg shadow-white/30"></div>
                    </h2>
                  </div>
                </SlideInText>
              )}

              {/* Section Subtitle */}
              {section.subtitle && (
                <SlideInText delay={sectionIndex * 0.1 + 0.2} className="mb-16" direction="left">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal text-gray-300 leading-relaxed tracking-wide relative">
                      <span className="relative z-10 bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        {section.subtitle}
                      </span>
                    </h3>
                  </div>
                </SlideInText>
              )}

              {/* Section Description */}
              {section.description && (
                <SlideInText delay={sectionIndex * 0.1 + 0.3} className="mb-20" direction="right">
                  <div className="max-w-5xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                      <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed font-light tracking-wide text-center" 
                         style={{ fontFamily: '"Borel", cursive' }}>
                        {section.highlights ? (
                          <HighlightText
                            text={section.description}
                            highlights={section.highlights}
                          />
                        ) : (
                          section.description
                        )}
                      </p>
                    </div>
                  </div>
                </SlideInText>
              )}

              {/* Enhanced Services Grid */}
              {section.highlights && section.id !== 'about' && section.id !== 'stats' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.highlights.map((highlight, index) => (
                    <SlideInText
                      key={index}
                      delay={sectionIndex * 0.1 + 0.4 + index * 0.15}
                      className="group h-full"
                      direction={index % 2 === 0 ? 'left' : 'right'}
                    >
                      <div className="relative h-full p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-white/10 group-hover:shadow-2xl overflow-hidden">
                        {/* Card background effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="relative z-10 flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-3 h-3 bg-white rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-100 font-light leading-relaxed tracking-wide text-lg">
                              {highlight}
                            </p>
                          </div>
                        </div>

                        {/* Decorative corner element */}
                        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
                      </div>
                    </SlideInText>
                  ))}
                </div>
              )}

              {/* Enhanced Stats Display */}
              {section.id === 'stats' && section.highlights && (
                <div className="text-center">
                  {/* Decorative header */}
                  <SlideInText delay={sectionIndex * 0.1 + 0.2} className="mb-16" direction="up">
                    <div className="flex items-center justify-center mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-px bg-white"></div>
                        <div className="w-4 h-4 bg-white rounded-full shadow-lg"></div>
                        <div className="w-24 h-px bg-white"></div>
                        <div className="w-4 h-4 bg-white rounded-full shadow-lg"></div>
                        <div className="w-12 h-px bg-white"></div>
                      </div>
                    </div>
                  </SlideInText>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {section.highlights.map((stat, index) => (
                      <SlideInText
                        key={index}
                        delay={sectionIndex * 0.1 + index * 0.2}
                        direction="up"
                        className="group"
                      >
                        <div className="relative overflow-hidden">
                          <div className="p-8 md:p-10 bg-white text-black rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-700 hover:scale-105 border-4 border-transparent hover:border-white/20 relative overflow-hidden">
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white group-hover:from-white group-hover:to-gray-50 transition-all duration-700"></div>
                            
                            {/* Content */}
                            <div className="relative z-10">
                              <p className="text-xl md:text-2xl font-normal tracking-wide leading-tight" 
                                 style={{ fontFamily: '"Borel", cursive' }}>
                                {stat}
                              </p>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 border-4 border-black/10 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-4 border-black/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                          </div>
                        </div>
                      </SlideInText>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Enhanced Call to Action */}
          <SlideInText delay={1} className="text-center mt-32" direction="up">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-1"></div>
              <div className="relative bg-white text-black rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>
                <div className="relative z-10 p-12 md:p-16">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-6 tracking-wide leading-tight">
                    Think of Events, Think G Event Management
                  </h3>
                  <div className="flex justify-center">
                    <div className="w-32 h-1 bg-black rounded-full shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </SlideInText>
        </div>
      </section>
    </>
  );
};

export default AboutUs;