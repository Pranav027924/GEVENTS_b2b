"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

// --- Section type
interface Section {
  category: string;
  background: string;
  backgroundColor?: string;
  title: string;
  subtitle?: string;
  description: string;
  textColor?: string;
  accentColor?: string;
}

interface InfiniteScrollProps {
  sections?: Section[];
}

// --- Default sections with full-screen designs
const defaultSections: Section[] = [
  {
    category: "THE NEXUS OF",
    title: "INNOVATION",
    subtitle: "96",
    description: "Beyond the horizon, where technology meets vision.",
    background: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=center",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    accentColor: "#ffffff",
  },
  {
    category: "PUSHING THE FRONTIER",
    title: "EVOLUTION,",
    subtitle: "THE FUTURE",
    description: "In a world shaped by velocity and precision, we engineer the next generation of experiences. From hyper-intelligent design to immersive narratives, our creations defy convention, challenging the boundaries of form and function.",
    background: "",
    backgroundColor: "#ff0000",
    textColor: "#ffffff",
    accentColor: "#ffffff",
  },
  {
    category: "DIGITAL",
    title: "REVOLUTION",
    subtitle: "2025",
    description: "Where infinite possibilities meet cutting-edge technology, and dreams transform into digital reality.",
    background: "https://images.unsplash.com/photo-1551651767-e8b0b5d4d7a9?w=1920&h=1080&fit=crop&crop=center",
    backgroundColor: "#1a1a1a",
    textColor: "#ffffff",
    accentColor: "#00ff88",
  },
  {
    category: "BEYOND THE",
    title: "BOUNDARIES",
    subtitle: "∞",
    description: "Propelled by data, intuition, and creativity, we build ecosystems where the digital and physical seamlessly converge. Our work isn't just visual—it's visceral, experiential, and profoundly transformative.",
    background: "",
    backgroundColor: "#8b5cf6",
    textColor: "#ffffff",
    accentColor: "#fbbf24",
  },
  {
    category: "THE FUTURE IS",
    title: "NOW",
    subtitle: "AI",
    description: "Artificial intelligence reshapes every aspect of human experience, creating unprecedented opportunities for innovation.",
    background: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&crop=center",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    accentColor: "#00d4ff",
  },
  {
    category: "DESIGNING",
    title: "TOMORROW",
    subtitle: "X1",
    description: "Every pixel, every interaction, every moment crafted with precision and purpose. This is where vision becomes reality.",
    background: "",
    backgroundColor: "#f59e0b",
    textColor: "#000000",
    accentColor: "#dc2626",
  },
  {
    category: "INFINITE",
    title: "POSSIBILITIES",
    subtitle: "∆",
    description: "In the convergence of art and science, we discover new dimensions of human potential and technological capability.",
    background: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&crop=center",
    backgroundColor: "#1f2937",
    textColor: "#ffffff",
    accentColor: "#ec4899",
  },
  {
    category: "QUANTUM",
    title: "LEAP",
    subtitle: "Q7",
    description: "Breaking through traditional limitations, we architect experiences that transcend the ordinary and embrace the extraordinary.",
    background: "",
    backgroundColor: "#059669",
    textColor: "#ffffff",
    accentColor: "#fde047",
  },
];

export default function InfiniteHorizontalScroll({
  sections = defaultSections,
}: InfiniteScrollProps) {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Scroll state
  const scrollState = useRef({
    targetX: 0,
    currentX: 0,
    lastTouchX: 0,
    isTouching: false,
    touchVelocity: 0,
    lastTouchTime: 0,
    momentumRAF: null as number | null,
    animating: false,
    setupData: null as any,
  });

  // Constants
  const BUFFER_CLONES = 2;
  const SMOOTH_FACTOR = 0.08;
  const VELOCITY_MULTIPLIER = 1.5;
  const MOMENTUM_DECAY = 0.95;

  const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

  // Setup cloned sections for infinite loop
  const cloneSections = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return null;
    const oldClones = scroller.querySelectorAll(".clone");
    oldClones.forEach((clone) => clone.remove());
    const sectionsElements = Array.from(
      scroller.querySelectorAll(".section:not(.clone)")
    );
    // Left clones
    for (let i = 0; i < BUFFER_CLONES; i++) {
      for (let s = sectionsElements.length - 1; s >= 0; s--) {
        const clone = sectionsElements[s].cloneNode(true) as HTMLElement;
        clone.classList.add("clone");
        scroller.insertBefore(clone, scroller.firstChild);
      }
    }
    // Right clones
    for (let i = 0; i < BUFFER_CLONES; i++) {
      for (let s = 0; s < sectionsElements.length; s++) {
        const clone = sectionsElements[s].cloneNode(true) as HTMLElement;
        clone.classList.add("clone");
        scroller.appendChild(clone);
      }
    }
    const sectionWidth = window.innerWidth;
    const totalSections = sections.length + 2 * sections.length * BUFFER_CLONES;
    scroller.style.width = totalSections * sectionWidth + "px";
    return {
      totalWidth: sections.length * sectionWidth,
      sectionsLength: sections.length,
      sectionWidth: sectionWidth,
    };
  }, [sections.length]);

  // Update progress
  const updateProgress = useCallback(() => {
    const { setupData, currentX } = scrollState.current;
    if (!setupData) return;
    const { sectionsLength, sectionWidth } = setupData;
    const baseX = -BUFFER_CLONES * sectionsLength * sectionWidth;
    let amount = (currentX - baseX) / (sectionsLength * sectionWidth);
    amount = ((amount % 1) + 1) % 1;
    setProgress(amount);
  }, []);

  // Update scroller position
  const updateScroller = useCallback(() => {
    if (scrollerRef.current) {
      scrollerRef.current.style.transform = `translate3d(${scrollState.current.currentX}px, 0, 0)`;
    }
  }, []);

  // Check boundaries for infinite loop
  const checkBoundaries = useCallback(() => {
    const { setupData } = scrollState.current;
    if (!setupData) return;
    const { sectionsLength, sectionWidth } = setupData;
    const loopWidth = sectionsLength * sectionWidth;
    const leftBoundary = -((BUFFER_CLONES + sectionsLength) * sectionWidth);
    const rightBoundary = -(BUFFER_CLONES * sectionWidth);
    if (scrollState.current.currentX > rightBoundary) {
      scrollState.current.currentX -= loopWidth;
      scrollState.current.targetX -= loopWidth;
    } else if (scrollState.current.currentX < leftBoundary) {
      scrollState.current.currentX += loopWidth;
      scrollState.current.targetX += loopWidth;
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    scrollState.current.animating = true;
    scrollState.current.currentX = lerp(
      scrollState.current.currentX,
      scrollState.current.targetX,
      SMOOTH_FACTOR
    );
    updateScroller();
    updateProgress();
    checkBoundaries();
    if (
      Math.abs(scrollState.current.currentX - scrollState.current.targetX) >
      0.01
    ) {
      requestAnimationFrame(animate);
    } else {
      scrollState.current.animating = false;
    }
  }, [updateScroller, updateProgress, checkBoundaries]);

  // Setup function
  const setup = useCallback(() => {
    const setupData = cloneSections();
    if (!setupData) return;
    scrollState.current.setupData = setupData;
    const { sectionsLength, sectionWidth } = setupData;
    scrollState.current.targetX = -BUFFER_CLONES * sectionsLength * sectionWidth;
    scrollState.current.currentX = scrollState.current.targetX;
    updateScroller();
    updateProgress();
  }, [cloneSections, updateScroller, updateProgress]);

  // Wheel event handler
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const predominantHorizontal =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (predominantHorizontal) {
        e.preventDefault();
        const delta =
          Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        scrollState.current.targetX += -delta * VELOCITY_MULTIPLIER;
        if (!scrollState.current.animating) animate();
      }
    },
    [animate]
  );

  // Touch handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    scrollState.current.isTouching = true;
    scrollState.current.lastTouchX = e.touches[0].clientX;
    scrollState.current.lastTouchTime = Date.now();
    scrollState.current.touchVelocity = 0;
    if (scrollState.current.momentumRAF) {
      cancelAnimationFrame(scrollState.current.momentumRAF);
      scrollState.current.momentumRAF = null;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!scrollState.current.isTouching) return;
    const thisTouchX = e.touches[0].clientX;
    const dx = thisTouchX - scrollState.current.lastTouchX;
    if (Math.abs(dx) < 2) return;
    e.preventDefault();
    const dt = Math.max(Date.now() - scrollState.current.lastTouchTime, 1);
    scrollState.current.targetX += dx * VELOCITY_MULTIPLIER;
    scrollState.current.touchVelocity = dx / dt;
    scrollState.current.lastTouchX = thisTouchX;
    scrollState.current.lastTouchTime = Date.now();
    if (!scrollState.current.animating) animate();
  }, [animate]);

  const handleTouchEnd = useCallback(() => {
    scrollState.current.isTouching = false;
    const runMomentum = () => {
      scrollState.current.targetX += scrollState.current.touchVelocity * 30;
      scrollState.current.touchVelocity *= MOMENTUM_DECAY;
      if (Math.abs(scrollState.current.touchVelocity) > 0.03) {
        if (!scrollState.current.animating) animate();
        scrollState.current.momentumRAF = requestAnimationFrame(runMomentum);
      } else {
        scrollState.current.momentumRAF = null;
      }
    };
    if (Math.abs(scrollState.current.touchVelocity) > 0.1) {
      runMomentum();
    }
  }, [animate]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const { setupData } = scrollState.current;
    if (!setupData) return;
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        scrollState.current.targetX += setupData.sectionWidth;
        if (!scrollState.current.animating) animate();
        break;
      case "ArrowRight":
        e.preventDefault();
        scrollState.current.targetX -= setupData.sectionWidth;
        if (!scrollState.current.animating) animate();
        break;
      default:
        break;
    }
  }, [animate]);

  // Resize handler
  const handleResize = useCallback(() => {
    setTimeout(() => {
      setup();
    }, 250);
  }, [setup]);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setup();
    }, 400);
    return () => clearTimeout(timer);
  }, [setup]);

  useEffect(() => {
    if (!isMounted) return;
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    isMounted,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
    handleResize,
  ]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#000000",
      }}
    >
      {/* Main Scroll Container */}
      <div
        ref={scrollerRef}
        className="infinite-horizontal-scroller"
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          userSelect: "none",
          willChange: "transform",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {sections.map((section, idx) => (
          <div
            className="section"
            style={{
              width: "100vw",
              height: "100vh",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "0 6vw",
              background: section.background 
                ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${section.background})` 
                : section.backgroundColor || "#000000",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              color: section.textColor || "#ffffff",
              overflow: "hidden",
            }}
            key={idx}
          >
            {/* Background overlay for better text readability */}
            {section.background && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)",
                  zIndex: 1,
                }}
              />
            )}

            {/* Content Container */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                maxWidth: "70vw",
              }}
            >
              {/* Category */}
              <div
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
                  fontWeight: "400",
                  letterSpacing: "0.15em",
                  opacity: 0.8,
                  marginBottom: "2vh",
                  textTransform: "uppercase",
                  color: section.textColor || "#ffffff",
                }}
              >
                {section.category}
              </div>

              {/* Main Title */}
              <h1
                style={{
                  fontSize: "clamp(4rem, 12vw, 16rem)",
                  fontWeight: "900",
                  lineHeight: "0.85",
                  margin: "0",
                  letterSpacing: "-0.02em",
                  color: section.textColor || "#ffffff",
                  textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                  marginBottom: section.subtitle ? "1vh" : "4vh",
                }}
              >
                {section.title}
              </h1>

              {/* Subtitle (if exists) */}
              {section.subtitle && (
                <div
                  style={{
                    fontSize: "clamp(3rem, 8vw, 12rem)",
                    fontWeight: "900",
                    lineHeight: "0.85",
                    margin: "0 0 4vh 0",
                    letterSpacing: "-0.02em",
                    color: section.accentColor || section.textColor || "#ffffff",
                    textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {section.subtitle}
                </div>
              )}

              {/* Description */}
              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.4rem)",
                  lineHeight: "1.6",
                  maxWidth: "45vw",
                  margin: "0",
                  opacity: 0.9,
                  fontWeight: "400",
                  color: section.textColor || "#ffffff",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}