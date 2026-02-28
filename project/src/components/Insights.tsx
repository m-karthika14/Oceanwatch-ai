import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function Insights() {
  const stats = [
    {
      title: 'Marine Species Count',
      value: '847',
      change: '+12.5%',
      trend: 'up',
      description: 'Total species identified this month',
      icon: Activity,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Threat Detection Rate',
      value: '23',
      change: '-8.3%',
      trend: 'down',
      description: 'Environmental hazards detected',
      icon: TrendingDown,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Habitat Health Score',
      value: '78%',
      change: '+5.2%',
      trend: 'up',
      description: 'Overall ecosystem rating',
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-500'
    },
  ];

  return (
    <section id="insights" className="relative py-24 bg-gradient-to-b from-blue-950 via-slate-900 to-cyan-950">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4">
            Environmental Insights
          </h2>
          <p className="text-cyan-300/80 text-lg">
            Data-driven intelligence for ocean conservation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                      stat.trend === 'up' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                  </div>

                  <div className="text-5xl font-bold text-cyan-100 mb-2">
                    {stat.value}
                  </div>

                  <div className="text-lg font-semibold text-cyan-200/90 mb-2">
                    {stat.title}
                  </div>

                  <p className="text-cyan-300/60 text-sm">
                    {stat.description}
                  </p>

                  <div className="mt-6 h-2 bg-slate-800/50 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-cyan-500/20 overflow-hidden">
            <h3 className="text-2xl font-bold text-cyan-100 mb-6">Weekly Activity</h3>
            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const height = Math.random() * 60 + 40;
                return (
                  <div key={day} className="flex items-center space-x-4">
                    <span className="text-cyan-300/60 text-sm w-12">{day}</span>
                    <div className="flex-1 h-8 bg-slate-800/50 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg transition-all duration-1000"
                        style={{ width: `${height}%` }}
                      ></div>
                    </div>
                    <span className="text-cyan-100 text-sm font-medium w-12 text-right">{Math.round(height)}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-cyan-500/20 overflow-hidden">
            <h3 className="text-2xl font-bold text-cyan-100 mb-6">Top Threats</h3>
            <div className="space-y-4">
              {[
                { name: 'Plastic Pollution', percentage: 45, color: 'from-red-500 to-orange-500' },
                { name: 'Overfishing', percentage: 30, color: 'from-orange-500 to-yellow-500' },
                { name: 'Water Quality', percentage: 15, color: 'from-yellow-500 to-green-500' },
                { name: 'Noise Pollution', percentage: 10, color: 'from-green-500 to-teal-500' },
              ].map((threat, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-200 text-sm font-medium">{threat.name}</span>
                    <span className="text-cyan-300/60 text-sm">{threat.percentage}%</span>
                  </div>
                  <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${threat.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${threat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
