import { Trash2, Anchor, Ship, User } from 'lucide-react';

export default function ThreatDetection() {
  const threats = [
    { name: 'Plastic Waste', icon: Trash2, severity: 'high', count: 5 },
    { name: 'Fishing Nets', icon: Anchor, severity: 'critical', count: 2 },
    { name: 'Boat Disturbance', icon: Ship, severity: 'moderate', count: 1 },
    { name: 'Human Presence', icon: User, severity: 'low', count: 3 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { bg: 'from-red-500 to-rose-500', border: 'border-red-500/30', text: 'text-red-300', badge: 'bg-red-500/20' };
      case 'high':
        return { bg: 'from-orange-500 to-red-500', border: 'border-orange-500/30', text: 'text-orange-300', badge: 'bg-orange-500/20' };
      case 'moderate':
        return { bg: 'from-yellow-500 to-orange-500', border: 'border-yellow-500/30', text: 'text-yellow-300', badge: 'bg-yellow-500/20' };
      default:
        return { bg: 'from-blue-500 to-cyan-500', border: 'border-blue-500/30', text: 'text-blue-300', badge: 'bg-blue-500/20' };
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 via-red-950/20 to-slate-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-200 to-orange-200 bg-clip-text text-transparent mb-4">
            Threat Detection System
          </h2>
          <p className="text-cyan-300/80">
            Real-time identification of environmental hazards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {threats.map((threat, index) => {
            const colors = getSeverityColor(threat.severity);
            return (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border ${colors.border} hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <threat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`px-2 py-1 rounded-full ${colors.badge} ${colors.text} text-xs font-medium uppercase`}>
                      {threat.severity}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{threat.name}</h3>
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-bold ${colors.text}`}>{threat.count}</span>
                    <span className="text-cyan-300/60 text-xs">instances</span>
                  </div>

                  <div className="mt-4">
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${colors.bg} animate-pulse`}
                        style={{ width: `${threat.count * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
