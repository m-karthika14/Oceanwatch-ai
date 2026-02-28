import React from 'react';
// {Waves} icon removed per design request

interface HomePageProps {
  onStartMonitoring: () => void;
  onHowToUse: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartMonitoring, onHowToUse }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative z-10 text-center max-w-2xl px-8">
  {/* waves icon removed */}
        <h1
          className="font-orbitron font-black text-5xl md:text-7xl text-ocean-text mb-6 tracking-wider uppercase whitespace-nowrap"
          style={{ transform: 'translateX(-1cm)' }}
        >
          OceanWatch&nbsp;<span className="text-ocean-teal">AI</span>
        </h1>

        <p className="font-inter text-lg md:text-xl text-ocean-text/80 mb-12 leading-relaxed">
          Real-time marine life protection powered by AI
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={onStartMonitoring}
            className="px-8 py-4 bg-ocean-teal hover:bg-ocean-teal/90 text-ocean-command font-orbitron font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-glow hover:scale-105 uppercase tracking-wider"
          >
            Start Live Monitoring
          </button>

          <button
            onClick={onHowToUse}
            className="px-8 py-4 border-2 border-ocean-teal text-ocean-teal hover:bg-ocean-teal/10 font-inter font-semibold text-lg rounded-lg transition-all duration-300 hover:shadow-glow uppercase tracking-wider"
          >
            How To Use
          </button>
        </div>

        {/* Removed the status line: COMMAND SYSTEM ONLINE */}
      </div>
    </div>
  );
};
