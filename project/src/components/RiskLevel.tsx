import { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

export default function RiskLevel() {
  const [currentRisk, setCurrentRisk] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRisk(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 10)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getRiskLevel = () => {
    if (currentRisk < 33) return { level: 'Safe', color: 'from-green-500 to-emerald-500', icon: ShieldCheck, textColor: 'text-green-300' };
    if (currentRisk < 66) return { level: 'Moderate', color: 'from-yellow-500 to-orange-500', icon: ShieldAlert, textColor: 'text-yellow-300' };
    return { level: 'High', color: 'from-red-500 to-rose-500', icon: ShieldX, textColor: 'text-red-300' };
  };

  const risk = getRiskLevel();
  const RiskIcon = risk.icon;

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4">
            Habitat Risk Assessment
          </h2>
          <p className="text-cyan-300/80">
            Real-time environmental threat analysis
          </p>
        </div>

        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-cyan-500/20 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${risk.color} opacity-10`}></div>

          <div className="relative">
            <div className="flex items-center justify-center mb-8">
              <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${risk.color} flex items-center justify-center shadow-2xl`}>
                <RiskIcon className="w-16 h-16 text-white" />
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className={`text-5xl font-bold ${risk.textColor} mb-2`}>
                {risk.level}
              </div>
              <div className="text-cyan-300/70">Current Threat Level</div>
            </div>

            <div className="relative h-8 bg-slate-800/50 rounded-full overflow-hidden mb-4">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-gradient-to-r from-green-500 to-green-400"></div>
                <div className="flex-1 bg-gradient-to-r from-green-400 via-yellow-500 to-orange-400"></div>
                <div className="flex-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
              </div>
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg shadow-white/50 transition-all duration-1000"
                style={{ left: `${currentRisk}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl"></div>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-green-400 font-medium">0% Safe</span>
              <span className="text-yellow-400 font-medium">50% Moderate</span>
              <span className="text-red-400 font-medium">100% Critical</span>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-green-400 mb-1">32%</div>
                <div className="text-cyan-300/60 text-xs">Safe Zones</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-yellow-400 mb-1">53%</div>
                <div className="text-cyan-300/60 text-xs">Moderate Risk</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-red-400 mb-1">15%</div>
                <div className="text-cyan-300/60 text-xs">High Risk</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
