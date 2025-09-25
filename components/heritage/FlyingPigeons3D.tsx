'use client';

import { useEffect, useRef } from 'react';

interface AchievementData {
  year: string;
  title: string;
  achievements: {
    level: string;
    category: string;
    position: string;
    points: string;
    contests: string;
  }[];
}

interface FlyingPigeons3DProps {
  data: AchievementData;
}

export function FlyingPigeons3D({ data }: FlyingPigeons3DProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const glassPanelRef = useRef<HTMLDivElement>(null);
  const lightRaysRef = useRef<HTMLDivElement>(null);

  // Animation logic is now controlled by the parent component (HeritageFlyingPages.tsx)
  // This component is now purely for presentation.
  useEffect(() => {
    const lightRays = lightRaysRef.current;
    if (!lightRays) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      lightRays.style.transform = `rotate(${parallax * 0.1}deg)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flying-pigeons-container">
      <style jsx>{`
        .flying-pigeons-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          font-family: 'Georgia', 'Times New Roman', serif;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%);
          overflow: hidden;
          z-index: 10;
          pointer-events: none; /* Pass clicks through */
        }

        .scene-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 2000px;
          perspective-origin: center center;
        }

        .glass-panel {
          position: relative;
          width: 800px;
          min-height: 500px; /* Changed from height to min-height */
          padding-bottom: 20px; /* Add some padding at the bottom */
          background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.15));
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          box-shadow: 
            0 0 50px rgba(255, 255, 255, 0.9),
            0 0 100px rgba(255, 255, 255, 0.8),
            inset 0 1px 0 rgba(255,255,255,0.2);
          /* Initial state is now set by the parent's animation logic */
          opacity: 0; 
        }

        .glass-panel::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 18px; 
          pointer-events: none;
        }

        .glass-panel::after {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 16px;
          pointer-events: none;
        }

        .inner-frame-final {
          position: absolute;
          top: 6px;
          left: 6px;
          right: 6px;
          bottom: 6px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 14px;
          pointer-events: none;
        }

        .year-display {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 3rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5);
          z-index: 1;
        }

        .achievements-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          padding-top: 40px; /* Add padding to make space for the year */
          color: rgba(255,255,255,0.95);
          text-align: center;
          font-size: 18px;
          line-height: 1.8;
          font-weight: 500;
          text-shadow: none;
          letter-spacing: 0.5px;
        }

        .achievements-text strong {
          font-weight: 700;
          color: #ffffff;
          text-shadow: none;
        }

        .light-rays {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse 200% 100% at 50% 50%, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%),
            conic-gradient(from 0deg, transparent, rgba(255,255,255,0.05), transparent, rgba(255,255,255,0.05), transparent);
          opacity: 0.6;
          animation: raysRotate 60s linear infinite;
        }

        @keyframes raysRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1200px) {
          .glass-panel { 
            width: 90vw; 
            min-height: 60vh; /* Changed from height to min-height */
          }
          .achievements-text { font-size: 16px; }
        }

        @media (max-width: 768px) {
          .achievements-text { font-size: 14px; line-height: 1.6; }
        }
      `}</style>

      <div className="scene-container" ref={sceneRef}>
        <div className="light-rays" ref={lightRaysRef}></div>
        <div className="glass-panel" ref={glassPanelRef}>
          <div className="inner-frame-final"></div>
          <div className="year-display">{data.year}</div>
          <div className="achievements-text">
            {data.achievements.map((achievement, index) => (
              <div key={index}>
                <strong>{achievement.level} {achievement.category}</strong> - {achievement.position}
                {achievement.points && ` ${achievement.points} coeff`}
                {achievement.contests && ` ${achievement.contests} kon`}
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
