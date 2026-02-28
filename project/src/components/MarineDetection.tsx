import { Fish, Shell, Flower2 } from 'lucide-react';

export default function MarineDetection() {
  const marineLife = [
    { name: 'Sea Turtle', icon: Shell, count: 2, color: 'from-emerald-500 to-teal-500', borderColor: 'border-emerald-500/30' },
    { name: 'Fish', icon: Fish, count: 8, color: 'from-cyan-500 to-blue-500', borderColor: 'border-cyan-500/30' },
    { name: 'Coral Reef', icon: Flower2, count: 15, color: 'from-pink-500 to-rose-500', borderColor: 'border-pink-500/30' },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-cyan-950 via-blue-950 to-slate-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-200 to-emerald-200 bg-clip-text text-transparent mb-4">
            Marine Life Detection
          </h2>
          <p className="text-cyan-300/80">
            AI-powered species identification and tracking
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {marineLife.map((species, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border ${species.borderColor} hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${species.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative">
                <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${species.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <species.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-cyan-100 mb-2">{species.name}</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-white">{species.count}</span>
                  <span className="text-cyan-300/60 text-sm">detected</span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyan-300/60">Confidence</span>
                    <span className="text-cyan-200 font-medium">98.5%</span>
                  </div>
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${species.color}`}>
                <div className="h-full bg-white/20 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
