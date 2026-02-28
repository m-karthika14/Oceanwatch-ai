import React from 'react';

/**
 * OceanBackground – self-contained ocean animation layer.
 * All styles live inside a <style> tag so they are never purged by Tailwind.
 * Mounted once in App.tsx as a fixed overlay (z-index 9999) above everything.
 */

const OCEAN_CSS = `
  @keyframes ob-bubble-rise {
    0%   { transform: translateY(0vh)    translateX(0px);   opacity: 0;    }
    8%   { opacity: 0.9; }
    45%  { transform: translateY(-45vh)  translateX(20px);  opacity: 0.85; }
    55%  { transform: translateY(-55vh)  translateX(-15px); opacity: 0.80; }
    92%  { opacity: 0.5; }
    100% { transform: translateY(-110vh) translateX(8px);   opacity: 0;    }
  }
  @keyframes ob-bubble-slow {
    0%   { transform: translateY(0vh)    translateX(0px);   opacity: 0;    }
    10%  { opacity: 0.85; }
    40%  { transform: translateY(-40vh)  translateX(-22px); opacity: 0.80; }
    65%  { transform: translateY(-65vh)  translateX(16px);  opacity: 0.70; }
    94%  { opacity: 0.4; }
    100% { transform: translateY(-110vh) translateX(-8px);  opacity: 0;    }
  }
  @keyframes ob-bubble-fast {
    0%   { transform: translateY(0vh)    translateX(0px);  opacity: 0;    }
    6%   { opacity: 0.95; }
    50%  { transform: translateY(-50vh)  translateX(12px); opacity: 0.85; }
    90%  { opacity: 0.45; }
    100% { transform: translateY(-110vh) translateX(-5px); opacity: 0;    }
  }
  @keyframes ob-wave1 {
    0%,100% { transform: translateX(0)   scaleY(1);    opacity: 0.70; }
    50%     { transform: translateX(-4%) scaleY(1.12); opacity: 0.90; }
  }
  @keyframes ob-wave2 {
    0%,100% { transform: translateX(0)  scaleY(1);    opacity: 0.55; }
    50%     { transform: translateX(4%) scaleY(1.08); opacity: 0.75; }
  }
  @keyframes ob-caustic {
    0%   { opacity: 0.8;  transform: scale(1)    translateX(0)   translateY(0);   }
    33%  { opacity: 1.0;  transform: scale(1.05) translateX(1%)  translateY(-1%); }
    66%  { opacity: 0.75; transform: scale(0.96) translateX(-1%) translateY(1%);  }
    100% { opacity: 0.8;  transform: scale(1)    translateX(0)   translateY(0);   }
  }

  .ob-root {
    position: fixed;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
  }

  .ob-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #021320 0%, #052b44 28%, #083d5e 58%, #0a4f72 82%, #0d6080 100%);
  }

  .ob-caustic {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 18% 22%, rgba(32,210,200,0.25) 0%, transparent 40%),
      radial-gradient(ellipse at 80% 70%, rgba(10,140,180,0.28) 0%, transparent 45%),
      radial-gradient(ellipse at 52% 92%, rgba(20,180,200,0.20) 0%, transparent 38%);
    animation: ob-caustic 14s ease-in-out infinite alternate;
  }

  .ob-wave1 {
    position: absolute;
    bottom: 0; left: -10%;
    width: 120%; height: 220px;
    border-radius: 50% 50% 0 0 / 40% 40% 0 0;
    background: radial-gradient(ellipse at 50% 100%, rgba(32,210,210,0.35) 0%, rgba(10,140,180,0.16) 40%, transparent 74%);
    animation: ob-wave1 10s ease-in-out infinite;
  }
  .ob-wave2 {
    position: absolute;
    bottom: 0; left: -15%;
    width: 130%; height: 160px;
    border-radius: 50% 50% 0 0 / 40% 40% 0 0;
    background: radial-gradient(ellipse at 50% 100%, rgba(100,230,240,0.28) 0%, rgba(20,160,200,0.14) 40%, transparent 70%);
    animation: ob-wave2 14s ease-in-out infinite;
  }

  /* Glass bubble – larger, more visible */
  .ob-bubble {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(
      circle at 33% 28%,
      rgba(255,255,255,0.75) 0%,
      rgba(190,238,255,0.40) 25%,
      rgba(80,205,238,0.20) 55%,
      rgba(20,160,220,0.08) 80%,
      transparent 100%
    );
    border: 2px solid rgba(255,255,255,0.55);
    box-shadow:
      inset 0 3px 6px rgba(255,255,255,0.70),
      inset 0 -2px 4px rgba(0,160,220,0.20),
      0 0 20px rgba(100,215,255,0.40),
      0 6px 16px rgba(0,80,145,0.22);
    overflow: visible;
  }
  .ob-bubble::after {
    content: '';
    position: absolute;
    top: 12%; left: 16%;
    width: 34%; height: 28%;
    border-radius: 50%;
    background: rgba(255,255,255,0.85);
    filter: blur(2px);
  }

  /* Per-bubble timing */
  .ob-b1  { animation: ob-bubble-rise 14s ease-in-out infinite 0s;   }
  .ob-b2  { animation: ob-bubble-slow 19s ease-in-out infinite 2s;   }
  .ob-b3  { animation: ob-bubble-fast 11s ease-in-out infinite 4s;   }
  .ob-b4  { animation: ob-bubble-rise 17s ease-in-out infinite 6s;   }
  .ob-b5  { animation: ob-bubble-slow 22s ease-in-out infinite 1s;   }
  .ob-b6  { animation: ob-bubble-fast 12s ease-in-out infinite 8s;   }
  .ob-b7  { animation: ob-bubble-rise 16s ease-in-out infinite 3s;   }
  .ob-b8  { animation: ob-bubble-slow 20s ease-in-out infinite 5s;   }
  .ob-b9  { animation: ob-bubble-fast 13s ease-in-out infinite 7s;   }
  .ob-b10 { animation: ob-bubble-rise 18s ease-in-out infinite 9s;   }
  .ob-b11 { animation: ob-bubble-slow 24s ease-in-out infinite 11s;  }
  .ob-b12 { animation: ob-bubble-fast 10s ease-in-out infinite 13s;  }
  .ob-b13 { animation: ob-bubble-rise 15s ease-in-out infinite 0.5s; }
  .ob-b14 { animation: ob-bubble-slow 21s ease-in-out infinite 3.5s; }
  .ob-b15 { animation: ob-bubble-fast  9s ease-in-out infinite 6.5s; }
  .ob-b16 { animation: ob-bubble-rise 13s ease-in-out infinite 1.5s; }
  .ob-b17 { animation: ob-bubble-slow 18s ease-in-out infinite 4.5s; }
  .ob-b18 { animation: ob-bubble-fast 16s ease-in-out infinite 7.5s; }
  .ob-b19 { animation: ob-bubble-rise 20s ease-in-out infinite 2.5s; }
  .ob-b20 { animation: ob-bubble-slow 23s ease-in-out infinite 9.5s; }
`;

interface BubbleDef {
  left: string;
  bottom: string;
  size: number;
  cls: string;
}

const BUBBLES: BubbleDef[] = [
  // bottom row – start near bottom
  { left: '4%',  bottom: '2%',  size: 18, cls: 'ob-b1'  },
  { left: '11%', bottom: '5%',  size: 28, cls: 'ob-b2'  },
  { left: '19%', bottom: '1%',  size: 14, cls: 'ob-b3'  },
  { left: '27%', bottom: '8%',  size: 34, cls: 'ob-b4'  },
  { left: '35%', bottom: '3%',  size: 20, cls: 'ob-b5'  },
  { left: '43%', bottom: '6%',  size: 12, cls: 'ob-b6'  },
  { left: '51%', bottom: '2%',  size: 30, cls: 'ob-b7'  },
  { left: '59%', bottom: '4%',  size: 22, cls: 'ob-b8'  },
  { left: '67%', bottom: '7%',  size: 16, cls: 'ob-b9'  },
  { left: '74%', bottom: '1%',  size: 38, cls: 'ob-b10' },
  { left: '81%', bottom: '5%',  size: 18, cls: 'ob-b11' },
  { left: '88%', bottom: '3%',  size: 26, cls: 'ob-b12' },
  // mid-screen – already partway up for instant visibility
  { left: '8%',  bottom: '35%', size: 10, cls: 'ob-b13' },
  { left: '22%', bottom: '50%', size: 22, cls: 'ob-b14' },
  { left: '38%', bottom: '42%', size: 15, cls: 'ob-b15' },
  { left: '55%', bottom: '60%', size: 32, cls: 'ob-b16' },
  { left: '70%', bottom: '38%', size: 12, cls: 'ob-b17' },
  { left: '85%', bottom: '55%', size: 20, cls: 'ob-b18' },
  // top area – gives impression of full-screen coverage
  { left: '15%', bottom: '72%', size: 8,  cls: 'ob-b19' },
  { left: '62%', bottom: '78%', size: 14, cls: 'ob-b20' },
];

export const OceanBackground: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: OCEAN_CSS }} />
      <div className="ob-root" aria-hidden="true">
        <div className="ob-bg" />
        <div className="ob-caustic" />
        <div className="ob-wave1" />
        <div className="ob-wave2" />
        {BUBBLES.map((b, i) => (
          <div
            key={i}
            className={`ob-bubble ${b.cls}`}
            style={{
              left:   b.left,
              bottom: b.bottom,
              width:  `${b.size}px`,
              height: `${b.size}px`,
            }}
          />
        ))}
      </div>
    </>
  );
};
