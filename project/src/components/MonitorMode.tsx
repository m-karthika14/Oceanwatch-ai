import { Upload, Video } from 'lucide-react';

export default function MonitorMode() {
  return (
    <section id="monitor" className="relative py-24 bg-gradient-to-b from-cyan-950 via-slate-900 to-blue-950">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4">
            Choose Monitoring Mode
          </h2>
          <p className="text-cyan-300/80 text-lg">
            Select how you want to analyze ocean environments
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-cyan-100 mb-3">
                Upload Underwater Video
              </h3>

              <p className="text-cyan-300/70 mb-6">
                Upload recorded underwater footage for comprehensive AI analysis of marine life and environmental threats
              </p>

              <div className="space-y-2 mb-6">
                {['MP4, MOV, AVI formats', 'Batch processing available', 'Detailed timeline analysis'].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2 text-cyan-200/60 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300">
                Select Files
              </button>
            </div>
          </div>

          <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-cyan-100 mb-3">
                Live Camera Feed
              </h3>

              <p className="text-cyan-300/70 mb-6">
                Connect a live underwater camera for real-time monitoring and instant threat detection alerts
              </p>

              <div className="space-y-2 mb-6">
                {['Real-time AI detection', 'Instant alerts & warnings', 'Continuous monitoring'].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2 text-cyan-200/60 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
                Connect Camera
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
