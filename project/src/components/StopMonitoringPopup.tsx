import React, { useState } from 'react';
import { X, AlertTriangle, TrendingUp, Zap as _Zap } from 'lucide-react';

interface StopMonitoringPopupProps {
  onClose: () => void;
  pollutionCount?: number;
  fishCount?: number;
  vesselCount?: number;
  waterTurbidity?: string;
  habitatRisk?: string;
  habitatCondition?: string;
  riskScore?: number;
  actionInsight?: string;
}

export const StopMonitoringPopup: React.FC<StopMonitoringPopupProps> = ({
  onClose,
  pollutionCount = 0,
  fishCount = 0,
  vesselCount = 0,
  waterTurbidity = '—',
  habitatRisk = 'Safe',
  habitatCondition = 'Stable',
  riskScore = 0,
  actionInsight = 'Marine conditions appear stable.',
}) => {
  const [activeTab, setActiveTab] = useState<'actions' | 'habitat'>('actions');

  // Habitat tab — 4 rows driven by AI data
  const habitatData = [
    { threat: 'Plastic Detected', count: pollutionCount,  severity: pollutionCount  > 0 ? 'high' : 'medium' },
    { threat: 'Fish Count',       count: fishCount,        severity: fishCount       > 0 ? 'high' : 'medium' },
    { threat: 'Boat Disturbance', count: vesselCount,      severity: vesselCount     > 0 ? 'high' : 'medium' },
    { threat: 'Water Turbidity',  count: waterTurbidity,   severity: waterTurbidity === 'Murky' ? 'high' : 'medium' },
  ];

  const insightColor =
    riskScore <= 10 ? 'text-ocean-teal' :
    riskScore <= 30 ? 'text-green-400' :
    riskScore <= 60 ? 'text-ocean-warning' :
    riskScore <= 90 ? 'text-orange-400' :
    'text-ocean-danger';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-lg">
        <div className="absolute -inset-1 bg-gradient-to-r from-ocean-teal via-ocean-warning to-ocean-teal rounded-lg blur opacity-75"></div>

        <div className="relative bg-ocean-command rounded-lg border-2 border-ocean-teal overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-ocean-teal/30 bg-ocean-panel">
            <h2 className="font-orbitron text-2xl font-bold text-ocean-text uppercase tracking-wider">
              Monitoring Report
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-ocean-teal/20 rounded-lg transition-all duration-300 text-ocean-teal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(80vh-100px)]">
            <div className="flex border-b border-ocean-teal/30">
              <button
                onClick={() => setActiveTab('actions')}
                className={`flex-1 px-6 py-4 font-orbitron font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'actions'
                    ? 'bg-ocean-teal/20 text-ocean-teal border-b-2 border-ocean-teal'
                    : 'text-ocean-text/60 hover:text-ocean-text'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                Actions
              </button>
              <button
                onClick={() => setActiveTab('habitat')}
                className={`flex-1 px-6 py-4 font-orbitron font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'habitat'
                    ? 'bg-ocean-teal/20 text-ocean-teal border-b-2 border-ocean-teal'
                    : 'text-ocean-text/60 hover:text-ocean-text'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
                Habitat Risk
              </button>
            </div>

            <div className="p-8">

              {/* ── ACTIONS TAB ── */}
              {activeTab === 'actions' && (
                <div className="flex flex-col items-center justify-center py-6 gap-8">
                  {/* Risk Score badge */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-orbitron text-xs text-ocean-text/40 uppercase tracking-widest">Risk Score</p>
                    <div className={`text-6xl font-orbitron font-bold ${insightColor}`}>
                      {riskScore}
                    </div>
                    <p className="font-orbitron text-xs text-ocean-text/40 uppercase tracking-widest">/ 100</p>
                  </div>

                  {/* Insight card */}
                  <div className={`w-full p-6 rounded-lg border-l-4 ${
                    riskScore <= 10 ? 'bg-ocean-teal/10 border-ocean-teal' :
                    riskScore <= 30 ? 'bg-green-500/10 border-green-400' :
                    riskScore <= 60 ? 'bg-ocean-warning/10 border-ocean-warning' :
                    riskScore <= 90 ? 'bg-orange-500/10 border-orange-400' :
                    'bg-ocean-danger/10 border-ocean-danger'
                  }`}>
                    <p className={`font-inter text-lg font-semibold leading-relaxed ${insightColor}`}>
                      {actionInsight}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'habitat' && (
                <div>
                  <h3 className="font-orbitron text-xl font-bold text-ocean-teal uppercase tracking-wider mb-6">
                    Real-Time Environmental Threat Analysis
                  </h3>
                  <div className="space-y-4 mb-8">
                    {habitatData.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
                          item.severity === 'high'
                            ? 'bg-ocean-danger/10 border-ocean-danger text-ocean-danger'
                            : 'bg-ocean-warning/10 border-ocean-warning text-ocean-warning'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5" />
                            <h4 className="font-inter font-semibold">{item.threat}</h4>
                          </div>
                          <span className="px-3 py-1 bg-current/20 rounded font-inter text-sm font-bold uppercase">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 bg-ocean-panel border border-ocean-teal/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-5 h-5 text-ocean-teal flex-shrink-0" />
                      <h4 className="font-orbitron font-bold text-ocean-text uppercase tracking-wider">Risk Assessment</h4>
                    </div>
                    {/* Semicircle Gauge */}
                    <div className="flex flex-col items-center mb-4">
                      <div className="relative w-full h-52">
                        {/* Coloured arc segments via SVG */}
                        <svg viewBox="-10 0 220 120" className="w-full h-full">
                          {/* Arc segments: 10 segments across 180°, each 18° */}
                          {[
                            '#2d8a2d','#3a9e2a','#52b526','#7ec820','#b0d41a',
                            '#e8c31a','#f0a020','#f07020','#e84020','#d01010',
                          ].map((color, i) => {
                            const startDeg = 180 + i * 18;
                            const endDeg = startDeg + 17;
                            const toRad = (d: number) => (d * Math.PI) / 180;
                            const r = 88, cx = 100, cy = 105;
                            const x1 = cx + r * Math.cos(toRad(startDeg));
                            const y1 = cy + r * Math.sin(toRad(startDeg));
                            const x2 = cx + r * Math.cos(toRad(endDeg));
                            const y2 = cy + r * Math.sin(toRad(endDeg));
                            const ri = 58, cx2 = 100, cy2 = 105;
                            const x3 = cx2 + ri * Math.cos(toRad(endDeg));
                            const y3 = cy2 + ri * Math.sin(toRad(endDeg));
                            const x4 = cx2 + ri * Math.cos(toRad(startDeg));
                            const y4 = cy2 + ri * Math.sin(toRad(startDeg));
                            return (
                              <path
                                key={i}
                                d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${ri} ${ri} 0 0 0 ${x4} ${y4} Z`}
                                fill={color}
                                opacity="0.92"
                              />
                            );
                          })}
                          {/* Tick labels */}
                          {[0,10,20,30,40,50,60,70,80,90,100].map((val, i) => {
                            const deg = 180 + i * 18;
                            const toRad = (d: number) => (d * Math.PI) / 180;
                            const r = 100, cx = 100, cy = 105;
                            const x = cx + r * Math.cos(toRad(deg));
                            const y = cy + r * Math.sin(toRad(deg));
                            return (
                              <text key={val} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                                fontSize="8.5" fill="#a0c4cc" fontFamily="monospace" fontWeight="600">
                                {val}
                              </text>
                            );
                          })}
                          {/* Needle — driven by exact riskScore (0–100) */}
                          {(() => {
                            const needleVal = riskScore;
                            const deg = 180 + needleVal * 1.8;
                            const toRad = (d: number) => (d * Math.PI) / 180;
                            const nx = 100 + 78 * Math.cos(toRad(deg));
                            const ny = 105 + 78 * Math.sin(toRad(deg));
                            return (
                              <>
                                <line x1="100" y1="105" x2={nx} y2={ny}
                                  stroke="#1a1a2e" strokeWidth="3.5" strokeLinecap="round" />
                                <circle cx="100" cy="105" r="7" fill="#e0e0e0" stroke="#888" strokeWidth="1.5" />
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                      <div className="mt-1 text-center">
                        <span className={`font-orbitron text-2xl font-bold ${habitatRisk === 'High' ? 'text-ocean-danger' : habitatRisk === 'Moderate' ? 'text-ocean-warning' : 'text-ocean-teal'}`}>
                          {riskScore} / 100
                        </span>
                        <p className={`font-orbitron text-sm mt-1 uppercase tracking-wider ${habitatRisk === 'High' ? 'text-ocean-danger' : habitatRisk === 'Moderate' ? 'text-ocean-warning' : 'text-ocean-teal'}`}>
                          {habitatCondition}
                        </p>
                      </div>
                    </div>
                    <p className="font-inter text-xs text-ocean-text/50 text-center">
                      Overall habitat condition:{' '}
                      <span className={`font-bold ${habitatRisk === 'High' ? 'text-ocean-danger' : habitatRisk === 'Moderate' ? 'text-ocean-warning' : 'text-ocean-teal'}`}>
                        {habitatCondition.toUpperCase()}
                      </span>.{' '}
                      {habitatRisk === 'High' ? 'Immediate action recommended to protect marine life.' : habitatRisk === 'Moderate' ? 'Monitor closely for further changes.' : 'Environment is stable.'}
                    </p>
                  </div>
                </div>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};
