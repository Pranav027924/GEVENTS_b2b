"use client";
import { useScroll, useTransform, motion, useMotionTemplate, useSpring  } from 'framer-motion';
import { useState, useEffect } from 'react';

// import MaskSvg from '../../assets/images/gevents.svg'

import React from 'react';

const springVars = {
    stiffness: 120,
    damping: 20,
}

const Mask = () => {
    const videoSrc = 'https://ik.imagekit.io/c2meo2qln/19679435-uhd_3840_2160_25fps.mp4?updatedAt=1755467559385';
    const MaskSvg = "https://ik.imagekit.io/c2meo2qln/2-Photoroom.png?updatedAt=1755468392525";

    const [windowDimensions, setWindowDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll();

    // Responsive mask sizing based on screen size and orientation
    const getResponsiveMaskSizes = () => {
        const { width, height } = windowDimensions;
        const isPortrait = height > width;
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1024;
        const isDesktop = width >= 1024;

        let minSize, maxSize;

        if (isMobile) {
            minSize = isPortrait ? Math.min(width * 0.8, 400) : Math.min(width * 0.6, 350);
            maxSize = Math.max(width, height) * 4;
        } else if (isTablet) {
            minSize = isPortrait ? Math.min(width * 0.7, 500) : Math.min(width * 0.5, 450);
            maxSize = Math.max(width, height) * 3.5;
        } else {
            minSize = Math.min(width * 0.4, 700);
            maxSize = Math.max(width, height) * 3;
        }

        return { minSize, maxSize };
    };

    const { minSize, maxSize } = getResponsiveMaskSizes();

    // Responsive animations with different timing for mobile
    const isMobile = windowDimensions.width < 768;
    const scrollRange = isMobile ? [0, 0.25] : [0, 0.2];
    const opacityRange = isMobile ? [0, 0.22] : [0, 0.18];
    const whiteRange = isMobile ? [0, 0.12] : [0, 0.1];

    // Responsive mask size animation
    const maskSize = useSpring(
        useTransform(scrollYProgress, scrollRange, [minSize, maxSize]), 
        springVars
    );

    // Responsive video scaling
    const videoScale = useSpring(
        useTransform(scrollYProgress, scrollRange, [1, isMobile ? 1.5 : 1.8]), 
        springVars
    );

    // Responsive opacity animations
    const outerVideoOpacity = useSpring(
        useTransform(scrollYProgress, opacityRange, [0, 1]), 
        springVars
    );
    
    const whiteFillOpacity = useSpring(
        useTransform(scrollYProgress, whiteRange, [1, 0]), 
        springVars
    );

    // Responsive height adjustment
    const containerHeight = isMobile ? 'h-[400vh]' : windowDimensions.width < 1024 ? 'h-[500vh]' : 'h-[600vh]';

    return(
        <div className={`${containerHeight} bg-black overflow-hidden`}>
            {/* outer video */}
            <motion.video 
                className="fixed inset-0 h-full w-full object-cover"
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                    scale: videoScale,
                    opacity: outerVideoOpacity,
                }}
            />
               
            {/* mask */}
            <motion.div
                    className="fixed inset-0 w-full h-full flex"
                    style={{
                        maskImage: `url(${MaskSvg})`,
                        maskRepeat: 'no-repeat',
                        maskSize: useMotionTemplate`${maskSize}px`,
                        maskPosition: 'center center',
                        WebkitMaskImage: `url(${MaskSvg})`, // Safari support
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskSize: useMotionTemplate`${maskSize}px`,
                        WebkitMaskPosition: 'center center',
                    }}
                >
                    {/* inner video */}
                    <motion.video 
                        className="fixed inset-0 h-full w-full object-cover"
                        src={videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        style={{
                            scale: videoScale,
                        }}
                    />
                    
                    <motion.div 
                        className="fixed inset-0 w-full h-full bg-white"
                        style={{
                            opacity: whiteFillOpacity,
                        }}
                    />
                </motion.div>
        </div>
    )
}

export default Mask;