import { Waves } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-r from-slate-900/80 via-blue-900/80 to-cyan-900/80 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Waves className="w-8 h-8 text-cyan-400" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent whitespace-nowrap">
              OceanWatch&nbsp;AI
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-cyan-100 hover:text-cyan-300 transition-colors duration-300 font-medium">
              Home
            </a>
            <a href="#monitor" className="text-cyan-100 hover:text-cyan-300 transition-colors duration-300 font-medium">
              Monitor
            </a>
            <a href="#insights" className="text-cyan-100 hover:text-cyan-300 transition-colors duration-300 font-medium">
              Insights
            </a>
            <a href="#about" className="text-cyan-100 hover:text-cyan-300 transition-colors duration-300 font-medium">
              About
            </a>
          </div>

          <button className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold overflow-hidden group">
            <span className="relative z-10 flex items-center space-x-2">
              <Waves className="w-4 h-4" />
              <span>Start Monitoring</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </nav>
  );
}
