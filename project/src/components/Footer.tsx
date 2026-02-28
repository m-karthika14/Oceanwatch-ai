import { Waves, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-cyan-950 to-slate-950 border-t border-cyan-500/20">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Waves className="w-8 h-8 text-cyan-400" strokeWidth={2.5} />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent whitespace-nowrap">
                OceanWatch&nbsp;AI
              </span>
            </div>
            <p className="text-cyan-300/70 text-lg mb-6">
              Protecting Life Beneath the Surface
            </p>
            <p className="text-cyan-300/60 text-sm leading-relaxed">
              Advanced AI-powered monitoring system designed to protect marine ecosystems through real-time threat detection and environmental analysis.
            </p>
          </div>

          <div>
            <h4 className="text-cyan-100 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Monitor', 'Insights', 'About', 'Documentation'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-cyan-300/70 hover:text-cyan-300 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-100 font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {['API Access', 'Support', 'Privacy Policy', 'Terms of Service', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-cyan-300/70 hover:text-cyan-300 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-cyan-300/60 text-sm">
              © 2024 OceanWatch AI. All rights reserved.
            </p>

            <div className="flex items-center space-x-6">
              {[
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-white/10 hover:border-cyan-400/60 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    </footer>
  );
}
