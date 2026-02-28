import React from 'react';
import { Upload, Camera } from 'lucide-react';

interface ModeSelectionScreenProps {
  onSelectMode: (mode: 'upload' | 'live') => void;
}

export const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-8">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-teal rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ocean-warning rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-center text-ocean-text mb-16 uppercase tracking-wider">
          Select Monitoring Mode
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => onSelectMode('upload')}
            className="group p-8 bg-ocean-panel border-2 border-ocean-teal hover:border-ocean-teal/60 rounded-lg transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <Upload className="w-16 h-16 text-ocean-teal mb-6 group-hover:animate-scan-pulse" />
              <h3 className="font-orbitron text-2xl font-bold text-ocean-text uppercase mb-3 tracking-wider">Upload Video</h3>
              <p className="font-inter text-ocean-text/70 text-center">
                Analyze pre-recorded underwater footage with advanced AI detection
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectMode('live')}
            className="group p-8 bg-ocean-panel border-2 border-ocean-teal hover:border-ocean-teal/60 rounded-lg transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <Camera className="w-16 h-16 text-ocean-teal mb-6 group-hover:animate-scan-pulse" />
              <h3 className="font-orbitron text-2xl font-bold text-ocean-text uppercase mb-3 tracking-wider">Live Camera</h3>
              <p className="font-inter text-ocean-text/70 text-center">
                Monitor live camera feeds for real-time marine activity tracking
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
