"use client";
import { useEffect, useRef } from "react";

/* Neural-network SVG rendered purely in CSS/SVG — no external image needed */
function NeuralBg() {
  const nodes = [
    { cx: 80,  cy: 120, r: 5  },
    { cx: 220, cy: 60,  r: 8  },
    { cx: 380, cy: 200, r: 6  },
    { cx: 540, cy: 80,  r: 10 },
    { cx: 700, cy: 160, r: 5  },
    { cx: 850, cy: 50,  r: 7  },
    { cx: 980, cy: 210, r: 9  },
    { cx: 1120,cy: 100, r: 5  },
    { cx: 1260,cy: 180, r: 6  },
    { cx: 1380,cy: 70,  r: 8  },
    { cx: 160, cy: 320, r: 7  },
    { cx: 320, cy: 380, r: 5  },
    { cx: 480, cy: 310, r: 9  },
    { cx: 640, cy: 400, r: 6  },
    { cx: 800, cy: 340, r: 5  },
    { cx: 960, cy: 420, r: 8  },
    { cx: 1100,cy: 360, r: 6  },
    { cx: 1300,cy: 300, r: 7  },
    { cx: 100, cy: 500, r: 5  },
    { cx: 300, cy: 540, r: 8  },
    { cx: 500, cy: 490, r: 6  },
    { cx: 720, cy: 560, r: 9  },
    { cx: 900, cy: 510, r: 5  },
    { cx: 1050,cy: 580, r: 7  },
    { cx: 1200,cy: 520, r: 6  },
    { cx: 1400,cy: 490, r: 8  },
  ];

  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],
    [0,10],[1,10],[1,11],[2,12],[3,12],[3,13],[4,13],[4,14],
    [5,14],[5,15],[6,15],[6,16],[7,16],[7,17],[8,17],
    [10,18],[11,18],[11,19],[12,19],[12,20],[13,20],[13,21],
    [14,21],[14,22],[15,22],[15,23],[16,23],[16,24],[17,24],[17,25],
    [10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],
    [18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 640"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%"   stopColor="#e8f4ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff"  stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nodeGradBlue" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1b9ad6" />
          <stop offset="100%" stopColor="#0d6fa3" />
        </radialGradient>
        <radialGradient id="nodeGradLime" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#c0f43c" />
          <stop offset="100%" stopColor="#8cc228" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background wash */}
      <rect width="1440" height="640" fill="url(#bgGrad)" />

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="#1b9ad6" strokeWidth="1"
          strokeOpacity="0.12"
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const isLime = i % 5 === 0;
        return (
          <g key={i} filter="url(#glow)">
            <circle
              cx={n.cx} cy={n.cy} r={n.r + 4}
              fill={isLime ? "#c0f43c" : "#1b9ad6"}
              opacity="0.08"
            />
            <circle
              cx={n.cx} cy={n.cy} r={n.r}
              fill={isLime ? "url(#nodeGradLime)" : "url(#nodeGradBlue)"}
              opacity="0.25"
            />
          </g>
        );
      })}

      {/* Animated pulse rings on 3 key nodes */}
      {[nodes[3], nodes[9], nodes[21]].map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r}>
          <animate attributeName="r" values={`${n.r};${n.r + 18};${n.r}`} dur={`${3 + i}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0;0.2" dur={`${3 + i}s`} repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="1.5;0.5;1.5" dur={`${3 + i}s`} repeatCount="indefinite" />
          <animate attributeName="stroke" values="#1b9ad6;#1b9ad6;#1b9ad6" dur={`${3 + i}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

export default function InvestmentSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06 }
    );
    el.querySelectorAll(".reveal").forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="inv-section" ref={ref}>

      {/* AI neural network background */}
      <NeuralBg />

      {/* Top gradient fade from dark section above */}
      <div className="inv-fade-top" />
      {/* Bottom gradient fade to dark section below */}
      <div className="inv-fade-bottom" />

      <div className="inv-inner">

        {/* ── Section header ── */}
        <div className="inv-header reveal">
          <span className="inv-eyebrow">The World Is Betting on Indonesia</span>
          <h2 className="inv-h2">Global Capital Meets<br /><span className="inv-h2-blue">Sovereign Ambition</span></h2>
          <p className="inv-sub">
            The convergence of foreign investment and national strategy is creating an AI powerhouse unlike any seen in Southeast Asia.
          </p>
        </div>

        {/* ── Two feature panels ── */}
        <div className="inv-grid">

          {/* Panel 1 — Global Confidence */}
          <div className="inv-panel reveal">
            <div className="inv-panel-inner">
              {/* Top accent */}
              <div className="inv-panel-accent" style={{ background: "linear-gradient(90deg, #1b9ad6, transparent)" }} />

              <div className="inv-panel-tag" style={{ color: "#1b9ad6", borderColor: "rgba(27,154,214,0.25)" }}>
                Global Confidence
              </div>
              <h3 className="inv-panel-h3">World&apos;s Biggest<br />Tech Players Are In</h3>
              <p className="inv-panel-body">
                When the world&apos;s AI titans pick their next frontier, they choose Indonesia. The numbers are unambiguous.
              </p>

              {/* Investment rows */}
              <div className="inv-investments">
                {[
                  { co: "Microsoft", amount: "$1.7B", color: "#1b9ad6" },
                  { co: "NVIDIA",    amount: "$200M",  color: "#1b9ad6" },
                  { co: "Tencent",   amount: "$500M",  color: "#1b9ad6" },
                ].map(({ co, amount, color }) => (
                  <div key={co} className="inv-row">
                    <span className="inv-co">{co}</span>
                    <span className="inv-bar-track">
                      <span className="inv-bar-fill" style={{ background: color }} />
                    </span>
                    <span className="inv-amount" style={{ color }}>{amount}</span>
                  </div>
                ))}
              </div>

              <div className="inv-total">
                <span className="inv-total-label">Combined commitment</span>
                <span className="inv-total-val">$2.4B+</span>
              </div>
            </div>
          </div>

          {/* Panel 2 — Sovereign AI */}
          <div className="inv-panel reveal reveal-delay-2">
            <div className="inv-panel-inner">
              <div className="inv-panel-accent" style={{ background: "linear-gradient(90deg, #c0f43c, transparent)" }} />

              <div className="inv-panel-tag" style={{ color: "#3a8a1a", borderColor: "rgba(100,180,40,0.3)" }}>
                Sovereign AI
              </div>
              <h3 className="inv-panel-h3">National Roadmap —<br />Now Executing</h3>
              <p className="inv-panel-body">
                Indonesia&apos;s government isn&apos;t watching from the sidelines. This is a sovereign AI build — not a dependency.
              </p>

              {/* Milestone blocks */}
              <div className="inv-milestones">
                <div className="inv-milestone">
                  <div className="inv-ms-num">100K</div>
                  <div className="inv-ms-label">AI Talents targeted by 2029</div>
                  <div className="inv-ms-bar">
                    <div className="inv-ms-fill" style={{ width: "68%", background: "#c0f43c" }} />
                  </div>
                  <div className="inv-ms-sub">Currently at ~68K — accelerating fast</div>
                </div>
                <div className="inv-milestone">
                  <div className="inv-ms-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" fill="#c0f43c" opacity="0.9"/>
                    </svg>
                  </div>
                  <div className="inv-ms-title">National AI Strategy</div>
                  <div className="inv-ms-desc">Presidential mandate. Cross-ministry execution. Regulatory frameworks active.</div>
                </div>
                <div className="inv-milestone">
                  <div className="inv-ms-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#c0f43c" strokeWidth="1.5" opacity="0.6"/>
                      <path d="M12 6v6l4 2" stroke="#c0f43c" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="inv-ms-title">40% of SEA Digital Economy</div>
                  <div className="inv-ms-desc">Indonesia already anchors Southeast Asia&apos;s digital backbone — AI is next.</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* ── Section shell ── */
        .inv-section {
          position: relative;
          background: #ffffff;
          padding: 100px 40px 110px;
          overflow: hidden;
        }
        .inv-fade-top {
          position: absolute; top: 0; left: 0; right: 0; height: 80px;
          background: linear-gradient(to bottom, #060b24, transparent);
          pointer-events: none; z-index: 1;
        }
        .inv-fade-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 80px;
          background: linear-gradient(to top, #060b24, transparent);
          pointer-events: none; z-index: 1;
        }

        /* ── Inner ── */
        .inv-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 64px;
        }

        /* ── Header ── */
        .inv-header { text-align: center; }
        .inv-eyebrow {
          display: inline-block;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #1b9ad6;
          border: 1px solid rgba(27,154,214,0.3);
          padding: 6px 20px; border-radius: 100px;
          margin-bottom: 24px;
          background: rgba(27,154,214,0.05);
        }
        .inv-h2 {
          font-family: var(--font-space);
          font-size: clamp(34px, 4.5vw, 62px);
          font-weight: 800; color: #1a1f4e;
          line-height: 1.1; margin-bottom: 18px;
          letter-spacing: -0.03em;
        }
        .inv-h2-blue { color: #1b9ad6; }
        .inv-sub {
          font-family: var(--font-inter); font-size: 17px; line-height: 1.7;
          color: rgba(26,31,78,0.55); max-width: 560px; margin: 0 auto;
        }

        /* ── Grid ── */
        .inv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        /* ── Panel ── */
        .inv-panel {
          border-radius: 24px;
          overflow: hidden;
        }
        .inv-panel-inner {
          position: relative;
          background: #ffffff;
          border: 1.5px solid rgba(26,31,78,0.1);
          border-radius: 24px;
          padding: 40px;
          height: 100%;
          box-shadow: 0 4px 40px rgba(26,31,78,0.07), 0 1px 3px rgba(26,31,78,0.06);
          transition: box-shadow 0.3s, transform 0.3s;
          overflow: hidden;
        }
        .inv-panel-inner:hover {
          box-shadow: 0 0 0 1.5px rgba(27,154,214,0.25), 0 0 32px rgba(27,154,214,0.18), 0 12px 60px rgba(26,31,78,0.12);
          transform: translateY(-4px);
          border-color: rgba(27,154,214,0.25);
        }
        .inv-panel-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
        }
        .inv-panel-tag {
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          border: 1px solid; display: inline-block;
          padding: 4px 13px; border-radius: 100px; margin-bottom: 16px;
          background: rgba(27,154,214,0.04);
        }
        .inv-panel-h3 {
          font-family: var(--font-space);
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 800; color: #1a1f4e;
          line-height: 1.2; margin-bottom: 14px;
          letter-spacing: -0.02em;
        }
        .inv-panel-body {
          font-family: var(--font-inter); font-size: 14px; line-height: 1.75;
          color: rgba(26,31,78,0.55); margin-bottom: 32px;
        }

        /* Investment rows */
        .inv-investments { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
        .inv-row {
          display: flex; align-items: center; gap: 12px;
        }
        .inv-co {
          font-family: var(--font-space); font-size: 13px; font-weight: 700;
          color: #1a1f4e; min-width: 90px;
        }
        .inv-bar-track {
          flex: 1; height: 4px; background: rgba(27,154,214,0.1); border-radius: 100px;
          overflow: hidden;
        }
        .inv-bar-fill {
          display: block; height: 100%; border-radius: 100px;
          width: 100%;
          animation: invBarGrow 1.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes invBarGrow {
          from { width: 0%; } to { width: 100%; }
        }
        .inv-row:nth-child(2) .inv-bar-fill { animation-delay: 0.15s; width: 22%; }
        .inv-row:nth-child(3) .inv-bar-fill { animation-delay: 0.25s; width: 44%; }
        .inv-amount {
          font-family: var(--font-space); font-size: 15px; font-weight: 800;
          min-width: 58px; text-align: right;
        }

        /* Total */
        .inv-total {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px;
          background: rgba(27,154,214,0.06);
          border: 1px solid rgba(27,154,214,0.15);
          border-radius: 12px;
        }
        .inv-total-label {
          font-family: var(--font-inter); font-size: 12px; font-weight: 600;
          color: rgba(26,31,78,0.5); text-transform: uppercase; letter-spacing: 0.1em;
        }
        .inv-total-val {
          font-family: var(--font-space); font-size: 22px; font-weight: 800;
          color: #1b9ad6;
        }

        /* Milestones */
        .inv-milestones { display: flex; flex-direction: column; gap: 20px; }
        .inv-milestone {
          padding: 18px 20px;
          background: rgba(192,244,60,0.05);
          border: 1px solid rgba(192,244,60,0.2);
          border-radius: 14px;
        }
        .inv-ms-num {
          font-family: var(--font-space); font-size: 36px; font-weight: 900;
          color: #1a1f4e; line-height: 1; margin-bottom: 4px;
          letter-spacing: -0.03em;
        }
        .inv-ms-label {
          font-family: var(--font-inter); font-size: 13px; font-weight: 600;
          color: rgba(26,31,78,0.65); margin-bottom: 10px;
        }
        .inv-ms-bar {
          height: 4px; background: rgba(26,31,78,0.08);
          border-radius: 100px; overflow: hidden; margin-bottom: 6px;
        }
        .inv-ms-fill {
          height: 100%; border-radius: 100px;
          animation: invBarGrow 1.4s 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }
        .inv-ms-sub {
          font-family: var(--font-inter); font-size: 11px;
          color: rgba(26,31,78,0.4); font-style: italic;
        }
        .inv-ms-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(192,244,60,0.1);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
        }
        .inv-ms-title {
          font-family: var(--font-space); font-size: 15px; font-weight: 700;
          color: #1a1f4e; margin-bottom: 6px;
        }
        .inv-ms-desc {
          font-family: var(--font-inter); font-size: 13px; line-height: 1.6;
          color: rgba(26,31,78,0.55);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .inv-section { padding: 80px 24px 90px; }
          .inv-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .inv-section { padding: 60px 16px 70px; }
          .inv-panel-inner { padding: 28px 22px; }
        }
      `}</style>
    </section>
  );
}
