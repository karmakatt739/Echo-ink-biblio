import React from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying }) => {
  return (
    <div className="flex items-center justify-center gap-3 h-80">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className={`w-[2px] rounded-full transition-all duration-[1000ms] ${
            isPlaying ? 'bg-stone-800' : 'bg-stone-200 h-8'
          }`}
          style={{
            height: isPlaying ? `${Math.random() * 90 + 10}%` : '32px',
            animation: isPlaying ? `inkWave 2.5s ease-in-out infinite` : 'none',
            animationDelay: `${i * 0.05}s`,
            opacity: isPlaying ? 0.2 + (i % 5) * 0.15 : 0.1
          }}
        />
      ))}
      <style>{`
        @keyframes inkWave {
          0%, 100% { transform: scaleY(0.6); opacity: 0.3; filter: blur(1px); }
          50% { transform: scaleY(1.4); opacity: 0.8; filter: blur(0px); }
        }
      `}</style>
    </div>
  );
};

export default AudioVisualizer;