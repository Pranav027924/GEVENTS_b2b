import React, { useState, useEffect } from "react";

const imgs = [
  "https://source.unsplash.com/random/400x300?event1",
  "https://source.unsplash.com/random/400x300?event2", 
  "https://source.unsplash.com/random/400x300?event3",
  "https://source.unsplash.com/random/400x300?event4",
  "https://source.unsplash.com/random/400x300?event5",
  "https://source.unsplash.com/random/400x300?event6",
  "https://source.unsplash.com/random/400x300?event7",
  "https://source.unsplash.com/random/400x300?event8",
  "https://source.unsplash.com/random/400x300?event9",
  "https://source.unsplash.com/random/400x300?event10",
  "https://source.unsplash.com/random/400x300?event11",
  "https://source.unsplash.com/random/400x300?event12",
  "https://source.unsplash.com/random/400x300?event13",
  "https://source.unsplash.com/random/400x300?event14",
  "https://source.unsplash.com/random/400x300?event15",
];

export const ScrollGallery: React.FC = () => {
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Split images into three columns
  const column1 = imgs.filter((_, i) => i % 3 === 0);
  const column2 = imgs.filter((_, i) => i % 3 === 1);
  const column3 = imgs.filter((_, i) => i % 3 === 2);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => prev + 0.5);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  const renderColumn = (columnImages: string[], columnIndex: number, speed: number) => {
    // Duplicate images for infinite scroll
    const duplicatedImages = [...columnImages, ...columnImages, ...columnImages];
    
    return (
      <div
        style={{
          flex: "1",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            transform: `translateY(-${(scrollPosition * speed) % (columnImages.length * 320)}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          {duplicatedImages.map((src, i) => {
            const originalIndex = imgs.indexOf(src);
            return (
              <div
                key={`${columnIndex}-${i}`}
                onMouseEnter={() => setHoveredIndex(originalIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: "100%",
                  height: "280px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transform: hoveredIndex === originalIndex 
                    ? "scale(1.05) translateY(-5px)" 
                    : "scale(1)",
                  boxShadow: hoveredIndex === originalIndex
                    ? "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)"
                    : "0 10px 25px rgba(0,0,0,0.2)",
                  filter: hoveredIndex === originalIndex 
                    ? "brightness(1.1) saturate(1.2)" 
                    : hoveredIndex !== null && hoveredIndex !== originalIndex
                    ? "brightness(0.9) saturate(0.9)"
                    : "brightness(1)",
                }}
                onClick={() => setModalImg(src)}
              >
                <img
                  src={src}
                  alt={`Gallery image ${originalIndex + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transform: hoveredIndex === originalIndex ? "scale(1.1)" : "scale(1)",
                  }}
                  loading="lazy"
                />
                
                {/* Overlay gradient */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: hoveredIndex === originalIndex 
                      ? "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)"
                      : "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 100%)",
                    transition: "all 0.3s ease",
                    pointerEvents: "none",
                  }}
                />

                {/* Hover indicator */}
                {hoveredIndex === originalIndex && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      color: "#333",
                      animation: "pulse 0.3s ease-out",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    🔍
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)",
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background pattern overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.02) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.01) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Enhanced title */}
      <div 
        style={{ 
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: "clamp(4rem, 12vw, 8rem)",
            letterSpacing: "0.2em",
            margin: 0,
            textShadow: "0 8px 32px rgba(0,0,0,0.8)",
            background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
          }}
        >
          GEVENTS
        </h1>
        <div
          style={{
            width: "200px",
            height: "4px",
            background: "linear-gradient(90deg, transparent, #fff, transparent)",
            margin: "20px auto 0",
            borderRadius: "2px",
            boxShadow: "0 2px 10px rgba(255,255,255,0.3)",
          }}
        />
      </div>

      {/* Three-column scrolling gallery */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "24px",
          padding: "40px",
          height: "100%",
          position: "relative",
        }}
      >
        {renderColumn(column1, 0, 1)}
        {renderColumn(column2, 1, 0.8)}
        {renderColumn(column3, 2, 1.2)}
      </div>

      {/* Enhanced modal */}
      {modalImg && (
        <div
          onClick={() => setModalImg(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
            cursor: "zoom-out",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <img
            src={modalImg}
            alt="Maximized"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "20px",
              boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
              animation: "zoomIn 0.3s ease-out",
            }}
          />
          
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setModalImg(null);
            }}
            style={{
              position: "absolute",
              top: "30px",
              right: "30px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Top and bottom gradient overlays */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0.8) 60%, transparent 100%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0.8) 60%, transparent 100%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes zoomIn {
          from { 
            opacity: 0; 
            transform: scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes pulse {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.8); 
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
          }
        }
      `}</style>
    </section>
  );
};

export default ScrollGallery;