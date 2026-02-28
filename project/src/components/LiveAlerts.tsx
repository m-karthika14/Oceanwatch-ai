import { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Waves } from 'lucide-react';

export default function LiveAlerts() {
  const [alerts, setAlerts] = useState([
    { id: 1, message: 'Plastic detected near marine life', severity: 'high', time: '2 min ago', icon: AlertCircle },
    { id: 2, message: 'Boat noise increasing in sector 3', severity: 'moderate', time: '5 min ago', icon: Waves },
    { id: 3, message: 'Coral reef showing signs of stress', severity: 'critical', time: '8 min ago', icon: TrendingUp },
    { id: 4, message: 'Multiple fish species detected', severity: 'info', time: '12 min ago', icon: AlertCircle },
  ]);

  useEffect(() => {
    const messages = [
      'New debris field detected',
      'Temperature anomaly in zone 2',
      'Predator activity increased',
      'Water clarity degrading',
      'Unusual marine behavior observed',
    ];

    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        message: messages[Math.floor(Math.random() * messages.length)],
        severity: ['info', 'moderate', 'high'][Math.floor(Math.random() * 3)],
        time: 'Just now',
        icon: AlertCircle,
      };
      setAlerts(prev => [newAlert, ...prev.slice(0, 5)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColors = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500/50 bg-red-500/10 text-red-300';
      case 'high':
        return 'border-orange-500/50 bg-orange-500/10 text-orange-300';
      case 'moderate':
        return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300';
      default:
        return 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300';
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 via-cyan-950 to-blue-950">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm mb-4">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-red-300 text-sm font-medium">Live Alert Stream</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4">
            Real-Time Notifications
          </h2>
          <p className="text-cyan-300/80">
            Instant alerts for environmental changes and threats
          </p>
        </div>

        <div className="relative rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-cyan-500/20 p-6 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-pulse"></div>

          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {alerts.map((alert, index) => {
              const AlertIcon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border ${getSeverityColors(alert.severity)} backdrop-blur-sm transform transition-all duration-500 hover:scale-102`}
                  style={{
                    animation: index === 0 ? 'slideIn 0.5s ease-out' : 'none'
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <AlertIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium mb-1">{alert.message}</p>
                      <div className="flex items-center space-x-2 text-xs opacity-70">
                        <span>{alert.time}</span>
                        <span>•</span>
                        <span className="uppercase">{alert.severity}</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300">
            View All Alerts
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </section>
  );
}
