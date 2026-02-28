import { Video, Radio } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-cyan-950"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-6 inline-block">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 text-sm font-medium">AI-Powered Marine Protection</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-300 bg-clip-text text-transparent leading-tight whitespace-nowrap">
          OceanWatch&nbsp;AI
        </h1>

        <p className="text-2xl md:text-3xl text-cyan-100 mb-4 font-light">
          Protecting Marine Life in Real-Time
        </p>

        <p className="text-lg md:text-xl text-cyan-300/80 mb-12 max-w-2xl mx-auto">
          Turning underwater video into environmental intelligence
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50">
            <span className="relative z-10 flex items-center space-x-2">
              <Video className="w-5 h-5" />
              <span>Upload Video</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button className="group relative px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-md border-2 border-cyan-400/30 text-cyan-100 font-semibold overflow-hidden transform hover:scale-105 transition-all duration-300 hover:border-cyan-400/60">
            <span className="relative z-10 flex items-center space-x-2">
              <Radio className="w-5 h-5" />
              <span>Start Live Monitoring</span>
            </span>
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: '10K+', label: 'Marine Species Tracked' },
            { number: '99.8%', label: 'Detection Accuracy' },
            { number: '24/7', label: 'Real-Time Monitoring' },
          ].map((stat, index) => (
            <div key={index} className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-cyan-200/80 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
