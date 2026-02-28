import React, { useState, useEffect } from 'react';
import { Trash2, AlertCircle, User, Fish } from 'lucide-react';

interface ThreatData {
  type: string;
  icon: React.ReactNode;
  count: number;
}

interface ThreatDetectionSystemProps {
  pollutionCount?: number;
  fishCount?: number;
  vesselCount?: number;
  humanCount?: number;
}

export const ThreatDetectionSystem: React.FC<ThreatDetectionSystemProps> = ({
  pollutionCount,
  fishCount,
  vesselCount,
  humanCount,
}) => {
  const aiDataReceived =
    pollutionCount !== undefined ||
    fishCount !== undefined ||
    vesselCount !== undefined ||
    humanCount !== undefined;

  const [threats, setThreats] = useState<ThreatData[]>([
    { type: 'Plastic Waste',   icon: <Trash2 className="w-6 h-6" />,       count: 3 },
    { type: 'Fish Count',      icon: <Fish className="w-6 h-6" />,          count: 1 },
    { type: 'Boat Disturbance',icon: <AlertCircle className="w-6 h-6" />,   count: 2 },
    { type: 'Human Presence',  icon: <User className="w-6 h-6" />,          count: 1 },
  ]);

  // When real AI counts arrive, replace with actual data
  useEffect(() => {
    if (!aiDataReceived) return;
    setThreats([
      { type: 'Plastic Waste',    icon: <Trash2 className="w-6 h-6" />,     count: pollutionCount ?? 0 },
      { type: 'Fish Count',       icon: <Fish className="w-6 h-6" />,        count: fishCount      ?? 0 },
      { type: 'Boat Disturbance', icon: <AlertCircle className="w-6 h-6" />, count: vesselCount    ?? 0 },
      { type: 'Human Presence',   icon: <User className="w-6 h-6" />,        count: humanCount     ?? 0 },
    ]);
  }, [pollutionCount, fishCount, vesselCount, humanCount, aiDataReceived]);

  // Only show cards where something was actually detected (count > 0)
  const detected = threats.filter((t) => t.count > 0);

  return (
    <div className="w-full bg-gradient-to-b from-ocean-panel to-ocean-command border-2 border-ocean-teal/30 rounded-lg p-8">
      <div className="mb-8">
        <h3 className="font-orbitron font-bold text-ocean-teal uppercase tracking-widest text-lg mb-2">Threat Detection</h3>
        <div className="h-1 w-24 bg-gradient-to-r from-ocean-teal to-transparent"></div>
      </div>

      {detected.length === 0 ? (
        <div className="flex items-center justify-center py-10 text-ocean-teal/40">
          <p className="font-orbitron text-sm uppercase tracking-widest">No threats detected</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {detected.map((threat, idx) => (
            <div
              key={idx}
              className="p-6 border-2 rounded-lg transition-all duration-300 bg-ocean-danger/20 border-ocean-danger/50 text-ocean-danger hover:shadow-glow cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{threat.icon}</div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{threat.count}</div>
                  <div className="text-xs font-orbitron font-bold uppercase tracking-wider mt-1">
                    DETECTED
                  </div>
                </div>
              </div>
              <p className="font-inter font-semibold text-sm">{threat.type}</p>
            </div>
          ))}
        </div>
      )}


    </div>
  );
};
