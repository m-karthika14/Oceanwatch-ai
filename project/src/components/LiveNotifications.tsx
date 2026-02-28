import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Info, AlertCircle, Zap, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'danger' | 'success';
  message: string;
  timestamp: string;
  icon: React.ReactNode;
}

interface AIResult {
  fish_count: number;
  pollution_count: number;
  vessel_count: number;
  human_count: number;
  water_turbidity: string;
  risk_score: number;
  habitat_condition: string;
}

interface LiveNotificationsProps {
  aiResult: AIResult | null;
}

export const LiveNotifications: React.FC<LiveNotificationsProps> = ({ aiResult }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'init',
      type: 'info',
      message: 'System initialized — monitoring active',
      timestamp: new Date().toLocaleTimeString(),
      icon: <Zap className="w-5 h-5" />,
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scanCountRef = useRef(0);
  // track last result by stringifying it so any field change triggers a push
  const prevResultRef = useRef<string>('');

  // Auto-scroll to top whenever notifications update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [notifications]);

  useEffect(() => {
    if (!aiResult) return;

    // Stringify to detect any change — risk_score, turbidity, insight all change each scan
    const key = JSON.stringify(aiResult);
    if (key === prevResultRef.current) return;
    prevResultRef.current = key;

    scanCountRef.current += 1;
    const timestamp = new Date().toLocaleTimeString();
    const newEntries: Notification[] = [];

    const { fish_count, pollution_count, vessel_count, human_count, water_turbidity, risk_score, habitat_condition } = aiResult;

    // Fish
    newEntries.push(fish_count > 0
      ? { id: `${Date.now()}-fish`, type: 'info',    message: `Marine life detected — ${fish_count} animal${fish_count > 1 ? 's' : ''} in frame`, timestamp, icon: <Info className="w-5 h-5" /> }
      : { id: `${Date.now()}-fish`, type: 'success', message: 'No fish detected in frame', timestamp, icon: <CheckCircle className="w-5 h-5" /> }
    );

    // Pollution
    newEntries.push(pollution_count > 0
      ? { id: `${Date.now()}-pol`, type: 'warning', message: `Plastic debris detected — ${pollution_count} item${pollution_count > 1 ? 's' : ''}`, timestamp, icon: <AlertCircle className="w-5 h-5" /> }
      : { id: `${Date.now()}-pol`, type: 'success', message: 'No pollution detected', timestamp, icon: <CheckCircle className="w-5 h-5" /> }
    );

    // Vessels
    newEntries.push(vessel_count > 0
      ? { id: `${Date.now()}-ves`, type: 'danger',  message: `Vessel detected in monitoring zone — ${vessel_count} boat${vessel_count > 1 ? 's' : ''}`, timestamp, icon: <AlertTriangle className="w-5 h-5" /> }
      : { id: `${Date.now()}-ves`, type: 'success', message: 'No vessels detected', timestamp, icon: <CheckCircle className="w-5 h-5" /> }
    );

    // Humans
    newEntries.push(human_count > 0
      ? { id: `${Date.now()}-hum`, type: 'warning', message: `Human presence detected — ${human_count} person${human_count > 1 ? 's' : ''}`, timestamp, icon: <AlertCircle className="w-5 h-5" /> }
      : { id: `${Date.now()}-hum`, type: 'success', message: 'No humans detected', timestamp, icon: <CheckCircle className="w-5 h-5" /> }
    );

    // Turbidity
    if (water_turbidity !== 'Clear')
      newEntries.push({ id: `${Date.now()}-turb`, type: 'warning', message: `Water turbidity: ${water_turbidity}`, timestamp, icon: <AlertCircle className="w-5 h-5" /> });

    // Risk summary
    newEntries.push({ id: `${Date.now()}-risk`, type: risk_score > 30 ? 'warning' : 'success', message: `Risk score: ${risk_score} — ${habitat_condition}`, timestamp, icon: risk_score > 30 ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" /> });

    setNotifications((prev) => [...newEntries, ...prev].slice(0, 100));
  }, [aiResult]);

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'danger':  return 'border-ocean-danger/50 bg-ocean-panel/50 text-ocean-danger';
      case 'warning': return 'border-ocean-warning/50 bg-ocean-panel/50 text-ocean-warning';
      case 'success': return 'border-green-500/50 bg-ocean-panel/50 text-green-400';
      default:        return 'border-ocean-teal/50 bg-ocean-panel/50 text-ocean-teal';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-ocean-panel to-ocean-command border-2 border-ocean-teal/30 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-ocean-teal/20 bg-ocean-panel/50 flex items-center justify-between">
        <h3 className="font-orbitron font-bold text-ocean-teal uppercase tracking-widest text-sm">Live Feed</h3>
        <span className="font-orbitron text-xs text-ocean-text/40">{scanCountRef.current} scans</span>
      </div>

      <div ref={scrollRef} className="overflow-y-auto space-y-2 p-4" style={{ maxHeight: '320px' }}>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3 rounded border-l-4 ${getColorClasses(notif.type)} transition-all duration-300`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">{notif.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-inter text-sm font-medium line-clamp-2">{notif.message}</p>
                <p className="font-inter text-xs opacity-60 mt-1">{notif.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-ocean-teal/20 bg-ocean-panel/30 text-center">
        <span className="inline-block w-2 h-2 bg-ocean-teal rounded-full animate-pulse mr-2"></span>
        <span className="font-inter text-xs text-ocean-text/60 uppercase">Live monitoring</span>
      </div>
    </div>
  );
};
