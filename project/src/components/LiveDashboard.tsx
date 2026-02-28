import { Activity, AlertTriangle, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LiveDashboard() {
  const [marineCount, setMarineCount] = useState(12);
  const [threatCount, setThreatCount] = useState(3);
  const [riskLevel, setRiskLevel] = useState('moderate');

  useEffect(() => {
    const interval = setInterval(() => {
      setMarineCount(prev => prev + Math.floor(Math.random() * 3) - 1);
      setThreatCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-blue-950 via-slate-900 to-cyan-950">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm font-medium">Live Monitoring Active</span>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4">
            Live Analysis Dashboard
          </h2>
        </div>

        <div className="mb-12">
          <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm"></div>
            <div className="relative aspect-video bg-slate-950/50 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-16 h-16 text-cyan-400/50 mx-auto mb-4" />
                <p className="text-cyan-300/70">Video Feed Display Area</p>
              </div>
            </div>
            <div className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-500/20 backdrop-blur-md border border-red-500/30">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-200 text-sm font-medium">REC</span>
            </div>
            <div className="absolute top-4 right-4 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-cyan-500/30">
              <span className="text-cyan-200 text-sm font-medium">00:12:45</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-cyan-400" />
                <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium">
                  Active
                </div>
              </div>
              <div className="text-4xl font-bold text-cyan-100 mb-2">{marineCount}</div>
              <div className="text-cyan-300/80 text-sm">Marine Life Detected</div>
              <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-md border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
                <div className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-medium">
                  Warning
                </div>
              </div>
              <div className="text-4xl font-bold text-orange-100 mb-2">{threatCount}</div>
              <div className="text-orange-300/80 text-sm">Threats Detected</div>
              <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 animate-pulse" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-8 h-8 text-yellow-400" />
                <div className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-medium uppercase">
                  {riskLevel}
                </div>
              </div>
              <div className="text-2xl font-bold text-yellow-100 mb-2">Habitat Risk</div>
              <div className="text-yellow-300/80 text-sm">Current Threat Level</div>
              <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Video({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
      <line x1="7" y1="2" x2="7" y2="22"></line>
      <line x1="17" y1="2" x2="17" y2="22"></line>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <line x1="2" y1="7" x2="7" y2="7"></line>
      <line x1="2" y1="17" x2="7" y2="17"></line>
      <line x1="17" y1="17" x2="22" y2="17"></line>
      <line x1="17" y1="7" x2="22" y2="7"></line>
    </svg>
  );
}
