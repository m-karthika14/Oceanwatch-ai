import React from 'react';
import { Upload, Camera, AlertCircle, Activity } from 'lucide-react';

interface HowToUsePageProps {
  onBack: () => void;
}

export const HowToUsePage: React.FC<HowToUsePageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-ocean-command">
      <button
        onClick={onBack}
        className="fixed top-8 left-8 z-50 px-6 py-2 bg-ocean-teal/20 hover:bg-ocean-teal/40 border border-ocean-teal text-ocean-teal font-inter rounded-lg transition-all duration-300 uppercase text-sm tracking-wider"
      >
        Back
      </button>

      <div className="relative">
        <div className="h-screen relative overflow-hidden flex items-center justify-center">
          <img
            src="https://i.postimg.cc/sg7BQCK8/hiroko-yoshii-9y7y26C-l4Y-unsplash.jpg"
            alt="Ocean overview"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-command via-ocean-command/80 to-ocean-command"></div>

          <div className="relative z-10 text-center px-8">
            <h1 className="font-orbitron text-6xl md:text-7xl font-black text-ocean-text mb-6 uppercase tracking-wider">
              How OceanWatch
              <span className="block text-ocean-teal">AI Works</span>
            </h1>
            <p className="font-inter text-xl text-ocean-text/80 max-w-2xl mx-auto mb-8">
              Protecting marine ecosystems with advanced AI surveillance
            </p>

            {/* Vision Agents banner */}
            <div className="inline-flex flex-col items-center gap-3 px-8 py-5 rounded-2xl border border-blue-400/40 bg-gradient-to-r from-blue-900/60 via-blue-800/50 to-cyan-900/60 backdrop-blur-md shadow-lg max-w-xl mx-auto">
              <div className="flex items-center gap-2">
                <span className="text-blue-300 text-lg"></span>
                <span className="font-orbitron text-sm font-bold text-blue-200 uppercase tracking-widest">
                  Built with Vision Agents
                </span>
                <span className="text-blue-300 text-lg"></span>
              </div>
              <p className="font-inter text-sm text-blue-100/80 leading-relaxed text-center">
                OceanWatch AI would not be possible without{' '}
                <span className="font-bold text-blue-300">Vision Agents</span> — the AI framework powering
                real-time marine detection, audio analysis, and risk scoring at every frame.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-20 bg-ocean-command py-20 px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img
                src="https://i.postimg.cc/jS95RzmL/woman-bottom-professional-body-adult-(1).jpg"
                className="rounded-lg overflow-hidden border-2 border-ocean-teal/50 shadow-glow"
              />
            </div>
            <div>
              <div className="flex items-start gap-4 mb-8">
                <Upload className="w-8 h-8 text-ocean-teal flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-orbitron text-2xl font-bold text-ocean-text mb-3 uppercase">Step 1: Upload Video</h2>
                  <p className="font-inter text-ocean-text/80">
                    Choose an underwater video or live camera feed to analyze. Our system supports multiple formats and resolutions for comprehensive monitoring.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-20 bg-ocean-command py-20 px-8 -mx-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20 md:flex-row-reverse">
              <div className="md:order-2">
                <img
                  src="https://i.postimg.cc/YqvBMJH4/octopus-seen-its-underwater-natural-habitat.jpg"
                  alt="Marine life detection"
                  className="rounded-lg overflow-hidden border-2 border-ocean-teal/50 shadow-glow"
                />
              </div>
              <div className="md:order-1">
                <div className="flex items-start gap-4">
                  <Camera className="w-8 h-8 text-ocean-teal flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-orbitron text-2xl font-bold text-ocean-text mb-3 uppercase">Step 2: Live Detection</h2>
                    <p className="font-inter text-ocean-text/80">
                      Advanced AI algorithms analyze the footage in real-time, tracking movements, and detecting environmental threats instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img
                src="https://i.postimg.cc/3w7q4qsQ/ocean-pollution-plastics-jpg.webp"
                alt="Threat detection"
                className="rounded-lg overflow-hidden border-2 border-ocean-warning/50 shadow-yellow"
              />
            </div>
            <div>
              <div className="flex items-start gap-4 mb-8">
                <AlertCircle className="w-8 h-8 text-ocean-warning flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-orbitron text-2xl font-bold text-ocean-text mb-3 uppercase">Step 3: Threat Assessment</h2>
                  <p className="font-inter text-ocean-text/80">
                    Automatically detects threats including plastic waste, boat disturbances, and human presence that endanger marine life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-20 bg-ocean-command py-20 px-8 -mx-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <img
                  src="https://i.postimg.cc/TwKBfb8R/pexels-rompalliharish-1698618.jpg"
                  alt="Real-time alerts"
                  className="rounded-lg overflow-hidden border-2 border-ocean-danger/50 shadow-glow-red"
                />
              </div>
              <div className="md:order-1">
                <div className="flex items-start gap-4">
                  <Activity className="w-8 h-8 text-ocean-danger flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-orbitron text-2xl font-bold text-ocean-text mb-3 uppercase">Step 4: Real-Time Alerts</h2>
                    <p className="font-inter text-ocean-text/80">
                      Receive instant notifications and detailed reports. Take action immediately to protect marine life and preserve ocean ecosystems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-20 p-8 bg-ocean-panel border-2 border-ocean-teal rounded-lg">
            <h3 className="font-orbitron text-2xl font-bold text-ocean-text mb-4 uppercase">Ready to Protect the Ocean?</h3>
            <p className="font-inter text-ocean-text/80 mb-6">
              Start monitoring marine ecosystems today. Every detection helps us understand and protect our precious ocean resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
