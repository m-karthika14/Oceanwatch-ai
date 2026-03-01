import React, { useEffect, useRef, useState } from 'react';

interface LearningImpactPageProps {
  onBack: () => void;
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

const FadeIn: React.FC<{ children: React.ReactNode; delay?: string; className?: string }> = ({
  children, delay = '0ms', className = ''
}) => {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.9s ease ${delay}, transform 0.9s ease ${delay}`,
      }}
    >
      {children}
    </div>
  );
};

export const LearningImpactPage: React.FC<LearningImpactPageProps> = ({ onBack }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-ocean-text">

      {/* ── Back button ── */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 z-50 px-6 py-2 bg-ocean-teal/20 hover:bg-ocean-teal/40 border border-ocean-teal text-ocean-teal font-orbitron rounded-lg transition-all duration-300 uppercase text-sm tracking-wider"
      >
        Back
      </button>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — TITLE HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Slow-zoom background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://i.postimg.cc/sg7BQCK8/hiroko-yoshii-9y7y26C-l4Y-unsplash.jpg)',
            animation: 'slowZoom 20s ease-in-out infinite alternate',
            opacity: 0.35,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-command/60 via-ocean-command/40 to-ocean-command" />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">
          <FadeIn delay="0ms">
            <p className="font-orbitron text-xs uppercase tracking-[0.4em] text-ocean-teal/70 mb-2">
              OceanWatch AI
            </p>
          </FadeIn>

          <FadeIn delay="150ms">
            <h1 className="font-orbitron font-black text-6xl md:text-8xl uppercase tracking-wider leading-none">
              <span className="text-ocean-text">Learning</span>
              <span className="block text-ocean-teal">&amp; Impact</span>
            </h1>
          </FadeIn>

          <FadeIn delay="300ms">
            <div className="flex items-center gap-3 mt-2">
              <div className="h-px w-12 bg-ocean-teal/40" />
              <span className="font-orbitron text-sm text-ocean-teal/80 uppercase tracking-widest">
                Powered by Vision Agents
              </span>
              <div className="h-px w-12 bg-ocean-teal/40" />
            </div>
          </FadeIn>

          <FadeIn delay="500ms">
            <div className="mt-8 w-6 h-10 border-2 border-ocean-teal/40 rounded-full flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-ocean-teal/60 rounded-full animate-bounce" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — MAIN IMPACT (split screen)
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-command via-ocean-command/95 to-ocean-command/90" />

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* Left — ocean visual */}
          <FadeIn delay="0ms" className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-ocean-teal/20 shadow-2xl">
              <img
                src="https://i.postimg.cc/jS95RzmL/woman-bottom-professional-body-adult-(1).jpg"
                alt="Marine monitoring"
                className="w-full h-[480px] object-cover"
                style={{ filter: 'brightness(0.75) saturate(1.2)' }}
              />
              {/* Scan overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-command/80 via-transparent to-transparent" />
              <div
                className="absolute inset-0 border-t-2 border-ocean-teal/30"
                style={{ animation: 'scanLine 4s linear infinite' }}
              />
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-ocean-teal/70" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-ocean-teal/70" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-ocean-teal/70" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-ocean-teal/70" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-ocean-teal rounded-full animate-pulse" />
                  <span className="font-orbitron text-xs text-ocean-teal/80 uppercase tracking-widest">
                    Live Analysis Active
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right — text blocks */}
          <div className="flex flex-col gap-12">
            {/* Text Block 1 */}
            <FadeIn delay="100ms">
              <div className="relative pl-6 border-l-2 border-ocean-teal/50">
                <p className="font-orbitron text-xs text-ocean-teal/60 uppercase tracking-widest mb-3">
                  Core Capability
                </p>
                <p className="font-orbitron text-2xl md:text-3xl font-bold text-ocean-text leading-snug">
                  Vision Agents enabled{' '}
                  <span className="text-ocean-teal">real-time environmental intelligence.</span>
                </p>
              </div>
            </FadeIn>

            {/* Text Block 2 */}
            <FadeIn delay="250ms">
              <div className="relative pl-6 border-l-2 border-ocean-teal/20">
                <p className="font-orbitron text-xs text-ocean-teal/60 uppercase tracking-widest mb-3">
                  What We Learned
                </p>
                <p className="font-inter text-lg text-ocean-text/75 leading-relaxed">
                  Through live video and audio streaming,
                  OceanWatch learned to move beyond detection
                  into <span className="text-ocean-text font-semibold">ecosystem understanding.</span>
                </p>
              </div>
            </FadeIn>

            {/* Text Block 3 */}
            <FadeIn delay="400ms">
              <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl bg-ocean-teal/10 border border-ocean-teal/30">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-ocean-teal animate-pulse" />
                    <span className="font-orbitron text-sm text-ocean-teal font-bold uppercase tracking-wider">
                      Live Signals
                    </span>
                  </div>
                  <div className="ml-5 flex items-center gap-2">
                    <div className="h-px w-16 bg-gradient-to-r from-ocean-teal/60 to-transparent" />
                    <span className="font-orbitron text-xs text-ocean-text/40">→</span>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-ocean-teal/60" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <span className="font-orbitron text-sm text-green-400 font-bold uppercase tracking-wider">
                      Actionable Insights
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — KEY TAKEAWAY card
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-command/90 to-ocean-command" />

        {/* Glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-ocean-teal/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeIn delay="0ms">
            <p className="text-center font-orbitron text-xs text-ocean-teal/60 uppercase tracking-[0.4em] mb-12">
              Key Takeaway
            </p>
          </FadeIn>

          <FadeIn delay="150ms">
            <div className="relative p-10 md:p-14 rounded-3xl border border-ocean-teal/30 bg-gradient-to-br from-ocean-panel/60 to-ocean-command/80 backdrop-blur-md overflow-hidden shadow-2xl">
              {/* Animated glow border */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-ocean-teal/0 via-ocean-teal/40 to-ocean-teal/0 opacity-50 blur-sm animate-pulse pointer-events-none" />

              {/* Corner accents */}
              <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-ocean-teal/60" />
              <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-ocean-teal/60" />
              <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-ocean-teal/60" />
              <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-ocean-teal/60" />

              <div className="relative text-center space-y-3">
                <p className="font-inter text-ocean-text/60 text-base leading-relaxed">
                  Vision Agents allowed OceanWatch to process
                </p>
                <p className="font-orbitron text-2xl md:text-3xl font-bold text-ocean-teal leading-snug">
                  live environmental signals
                </p>
                <p className="font-inter text-ocean-text/60 text-base leading-relaxed">
                  and translate them into
                </p>
                <p className="font-orbitron text-2xl md:text-3xl font-bold text-ocean-text leading-snug">
                  meaningful habitat insights.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — FINAL IMPACT big statement
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-40 px-6 overflow-hidden">
        {/* Slow-zoom second ocean bg */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://i.postimg.cc/sg7BQCK8/hiroko-yoshii-9y7y26C-l4Y-unsplash.jpg)',
            animation: 'slowZoom 25s ease-in-out infinite alternate-reverse',
            opacity: 0.2,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-command via-ocean-command/70 to-ocean-command" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn delay="0ms">
            <h2 className="font-orbitron font-black text-5xl md:text-7xl uppercase leading-tight tracking-wide">
              <span className="text-ocean-text/60 text-2xl md:text-3xl font-bold tracking-widest block mb-4">
                Protecting marine ecosystems
              </span>
              <span className="text-ocean-text">before damage</span>
              <span className="block text-ocean-teal">occurs —</span>
            </h2>
          </FadeIn>

          <FadeIn delay="280ms">
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-ocean-teal/50" />
              <p className="font-orbitron text-lg md:text-2xl font-bold text-ocean-teal/80 uppercase tracking-widest">
                Vision Agents made this possible.
              </p>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-ocean-teal/50" />
            </div>
          </FadeIn>

          <FadeIn delay="420ms">
            <p className="mt-6 font-inter text-ocean-text/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Real-time streaming intelligence, turning raw ocean signals into
              protection before harm can take hold.
            </p>
          </FadeIn>

          <FadeIn delay="560ms">
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-ocean-teal"
                    style={{ animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER LINE
      ══════════════════════════════════════════════════════ */}
      <footer className="relative py-10 px-6 border-t border-ocean-teal/10">
        <div className="absolute inset-0 bg-ocean-command/95" />
        <FadeIn delay="0ms" className="relative z-10 flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-ocean-teal animate-pulse" />
          <p className="font-orbitron text-xs text-ocean-teal/60 uppercase tracking-[0.3em]">
            Built using Vision Agents
          </p>
          <div className="w-2 h-2 rounded-full bg-ocean-teal animate-pulse" />
        </FadeIn>
      </footer>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1);   }
          to   { transform: scale(1.12); }
        }
        @keyframes scanLine {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(2400%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
