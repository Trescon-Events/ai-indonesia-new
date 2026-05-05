"use client";
import { useEffect, useRef, useState } from "react";

const themes = [
  {
    id: 1,
    eyebrow: "Pillar 01",
    title: "Sovereign AI Infrastructure",
    description: "Building Indonesia's own AI compute stack — from national data centres to GPU clusters and edge-AI nodes that ensure data sovereignty and strategic independence.",
    bullets: ["National AI Compute Strategy", "Government Cloud & Data Sovereignty", "Sovereign LLM Development", "Cross-ministry AI Integration", "AI in Public Services"],
    accent: "#c0f43c",
    accentRgb: "192,244,60",
    ghost: "01",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="10" width="24" height="16" rx="3" stroke="#c0f43c" strokeWidth="1.8"/>
        <rect x="8" y="14" width="6" height="4" rx="1" fill="#c0f43c" fillOpacity="0.3" stroke="#c0f43c" strokeWidth="1"/>
        <rect x="18" y="14" width="6" height="4" rx="1" fill="#c0f43c" fillOpacity="0.3" stroke="#c0f43c" strokeWidth="1"/>
        <path d="M10 10V7M16 10V5M22 10V7" stroke="#c0f43c" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="16" cy="5" r="1.5" fill="#c0f43c"/>
        <path d="M4 22h24" stroke="#c0f43c" strokeWidth="1" strokeOpacity="0.3"/>
      </svg>
    ),
  },
  {
    id: 2,
    eyebrow: "Pillar 02",
    title: "Enterprise GenAI & Transformation",
    description: "How Indonesia's largest enterprises are deploying Generative AI to reshape operations, products, and customer experiences at scale.",
    bullets: ["GenAI in Financial Services", "AI-Powered Supply Chain", "Intelligent Customer Experience", "Workforce Augmentation Strategies", "ROI Measurement Frameworks"],
    accent: "#1b9ad6",
    accentRgb: "27,154,214",
    ghost: "02",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="#1b9ad6" strokeWidth="1.8"/>
        <path d="M10 16c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" stroke="#1b9ad6" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 10v6l4 2" stroke="#1b9ad6" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" fill="#1b9ad6"/>
        <path d="M4 16h4M24 16h4" stroke="#1b9ad6" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 3,
    eyebrow: "Pillar 03",
    title: "AI Security & Governance",
    description: "Frameworks, regulations, and technical safeguards ensuring Indonesia's AI ecosystem is trustworthy, safe, and aligned with national and international standards.",
    bullets: ["National AI Regulatory Framework", "Responsible AI Principles", "Deepfake & Misinformation Defence", "AI Audit & Compliance", "Ethical AI Deployment"],
    accent: "#a78bfa",
    accentRgb: "167,139,250",
    ghost: "03",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l10 4v8c0 5.5-4 10.4-10 12-6-1.6-10-6.5-10-12V8l10-4z" stroke="#a78bfa" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M11 16l3 3 7-7" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    eyebrow: "Pillar 04",
    title: "AI Implementation at Scale",
    description: "Practical case studies and execution blueprints from organisations that have moved beyond experimentation to full-scale AI deployment.",
    bullets: ["AI in Healthcare & Telemedicine", "AgriTech & Smart Farming AI", "Education & AI-Personalized Learning", "Smart City & Urban AI", "AI Talent Pipeline Development"],
    accent: "#fb923c",
    accentRgb: "251,146,60",
    ghost: "04",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 24l5-8 5 4 5-10 5 6" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="26" cy="8" r="3" stroke="#fb923c" strokeWidth="1.8"/>
        <path d="M6 28h20" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
      </svg>
    ),
  },
];

export default function ThemesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [detailKey, setDetailKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".th-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("th-visible"); }),
      { threshold: 0.06 }
    );
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActive(a => (a + 1) % themes.length);
      setDetailKey(k => k + 1);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const handleCardClick = (i: number) => {
    setActive(i);
    setDetailKey(k => k + 1);
    // On mobile, smooth-scroll to the detail panel
    if (window.innerWidth <= 1024) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 60);
    }
  };

  const t = themes[active];

  return (
    <section id="themes" ref={ref} className="th-root"
      style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/images/happenings-bg.webp')`, backgroundSize: "cover", backgroundPosition: "center 30%", backgroundAttachment: "fixed" }}>

      <div className="th-fade-top" />
      <div className="th-fade-bottom" />

      {/* floating particles */}
      {[...Array(14)].map((_, i) => (
        <div key={i} className="th-particle" style={{
          left: `${5 + i * 6.5}%`,
          width: i % 3 === 0 ? "3px" : "2px",
          height: i % 3 === 0 ? "3px" : "2px",
          animationDelay: `${i * 0.35}s`,
          animationDuration: `${5 + (i % 4)}s`,
          background: i % 2 === 0 ? "#1b9ad6" : "#c0f43c",
        }} />
      ))}

      <div className="th-inner">

        {/* header */}
        <div className="th-header th-reveal">
          <span className="th-eyebrow">
            <span className="th-eye-dot" />
            Conference Themes
          </span>
          <h2 className="th-h2">
            Four Thematic <span className="th-h2-grad">Pillars</span>
          </h2>
          <p className="th-sub">
            Every session, panel and keynote maps to one of four strategic pillars shaping Indonesia&apos;s AI future.
          </p>
        </div>

        {/* layout: cards left + detail right */}
        <div className="th-layout th-reveal" style={{ position: "relative" }}>

          {/* left: 2×2 card grid */}
          <div className="th-grid" style={{ position: "relative" }}>

            {/* connector SVG between the 4 cards */}
            <svg className="th-connector" viewBox="0 0 440 440" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }}>
              <defs>
                <filter id="th-glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              {/* cross connectors */}
              <path id="th-h" d="M210,110 C230,110 230,110 230,110" stroke="#1b9ad6" strokeWidth="1" fill="none" strokeOpacity="0.3"/>
              <path id="th-v" d="M110,210 C110,230 110,230 110,230" stroke="#c0f43c" strokeWidth="1" fill="none" strokeOpacity="0.3"/>
              <path id="th-h2" d="M210,330 C230,330 230,330 230,330" stroke="#a78bfa" strokeWidth="1" fill="none" strokeOpacity="0.3"/>
              <path id="th-v2" d="M330,210 C330,230 330,230 330,230" stroke="#fb923c" strokeWidth="1" fill="none" strokeOpacity="0.3"/>
              {/* center hub */}
              <circle cx="220" cy="220" r="5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
              <circle cx="220" cy="220" r="2" fill="rgba(255,255,255,0.2)"/>
              {/* particles */}
              {[
                { id: "th-h",  color: "#1b9ad6", dur: "1.6s" },
                { id: "th-v",  color: "#c0f43c", dur: "1.9s" },
                { id: "th-h2", color: "#a78bfa", dur: "1.4s" },
                { id: "th-v2", color: "#fb923c", dur: "2.1s" },
              ].map((p, i) => (
                <circle key={i} r="3" fill={p.color} filter="url(#th-glow)">
                  <animateMotion dur={p.dur} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                    <mpath href={`#${p.id}`}/>
                  </animateMotion>
                </circle>
              ))}
            </svg>

            {themes.map((theme, i) => (
              <button
                key={theme.id}
                onClick={() => handleCardClick(i)}
                className={`th-card${active === i ? " th-card-active" : ""}`}
                style={{
                  "--accent": theme.accent,
                  "--accent-rgb": theme.accentRgb,
                } as React.CSSProperties}
              >
                <div className="th-ghost">{theme.ghost}</div>
                <div className="th-card-bar" />
                <div className="th-card-content">
                  <div className="th-card-icon">{theme.icon}</div>
                  <div className="th-card-eyebrow">{theme.eyebrow}</div>
                  <div className="th-card-title">{theme.title}</div>
                  {active === i && (
                    <div className="th-progress-wrap">
                      <div className="th-progress-bar" style={{ background: theme.accent }} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* bridge connector */}
          <div className="th-bridge" style={{ "--accent": t.accent, "--rgb": t.accentRgb } as React.CSSProperties}>
            <div className="th-bridge-line" />
            <div className="th-bridge-dot" />
            <div className="th-bridge-dot th-bridge-dot-2" />
            <div className="th-bridge-node th-bridge-node-l" />
            <div className="th-bridge-node th-bridge-node-r" />
          </div>

          {/* right: detail panel */}
          <div ref={detailRef} className="th-detail"
            style={{
              "--accent": t.accent,
              "--accent-rgb": t.accentRgb,
            } as React.CSSProperties}
          >
            <div className="th-detail-glow" />
            <div key={detailKey} className="th-detail-content">
              <span className="th-detail-eye">{t.eyebrow}</span>
              <h3 className="th-detail-title">{t.title}</h3>
              <p className="th-detail-body">{t.description}</p>
              <div className="th-bullets">
                {t.bullets.map((b, i) => (
                  <div key={i} className="th-bullet" style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="th-bullet-dot" style={{ background: t.accent }} />
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="th-dots">
              {themes.map((_, i) => (
                <button key={i} onClick={() => handleCardClick(i)}
                  className={`th-dot${active === i ? " th-dot-active" : ""}`}
                  style={{ "--accent": themes[i].accent } as React.CSSProperties} />
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .th-root {
          background: #060b24;
          padding: 72px 0 80px;
          position: relative; overflow: hidden;
        }
        .th-root::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(155deg, rgba(26,15,60,0.88) 0%, rgba(14,26,92,0.84) 45%, rgba(10,18,48,0.88) 100%);
          z-index: 0; pointer-events: none;
        }
        .th-fade-top {
          position: absolute; top: 0; left: 0; right: 0; height: 140px;
          background: linear-gradient(to bottom, #060b24, transparent);
          pointer-events: none; z-index: 3;
        }
        .th-fade-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 140px;
          background: linear-gradient(to top, #060b24, transparent);
          pointer-events: none; z-index: 3;
        }

        /* particles */
        .th-particle {
          position: absolute; bottom: 0; border-radius: 50%;
          opacity: 0; pointer-events: none; z-index: 1;
          animation: th-float linear infinite;
        }
        @keyframes th-float {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        .th-inner {
          max-width: 1300px; margin: 0 auto; padding: 0 48px;
          position: relative; z-index: 4;
        }

        /* header */
        .th-header { text-align: center; margin-bottom: 64px; }
        .th-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #c0f43c;
          border: 1px solid rgba(192,244,60,0.3); padding: 6px 20px;
          border-radius: 100px; margin-bottom: 24px;
        }
        .th-eye-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #c0f43c; box-shadow: 0 0 8px #c0f43c;
          animation: th-blink 2s ease-in-out infinite;
        }
        @keyframes th-blink {
          0%,100% { opacity: 1; box-shadow: 0 0 8px #c0f43c; }
          50%      { opacity: 0.3; box-shadow: none; }
        }
        .th-h2 {
          font-family: var(--font-space);
          font-size: clamp(32px, 4vw, 58px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.025em; line-height: 1.1; margin-bottom: 18px;
        }
        .th-h2-grad {
          background: linear-gradient(100deg, #1b9ad6, #c0f43c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .th-sub {
          font-family: var(--font-inter); font-size: 16px;
          color: rgba(255,255,255,0.70); max-width: 520px;
          margin: 0 auto; line-height: 1.7;
        }

        /* layout */
        .th-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px; align-items: stretch;
        }
        .th-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* connector */
        .th-connector { overflow: visible; }

        /* card */
        .th-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 0; overflow: hidden;
          cursor: pointer; text-align: left;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          min-height: 240px;
        }
        .th-card:hover {
          border-color: rgba(var(--accent-rgb), 0.4);
          box-shadow: 0 0 0 1px rgba(var(--accent-rgb),0.2), 0 16px 40px rgba(var(--accent-rgb),0.12);
          transform: translateY(-3px);
        }
        .th-card-active {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 1px rgba(var(--accent-rgb),0.35),
                      0 20px 50px rgba(var(--accent-rgb),0.2) !important;
        }
        .th-card-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: var(--accent); opacity: 0; transition: opacity 0.3s;
        }
        .th-card:hover .th-card-bar,
        .th-card-active .th-card-bar { opacity: 1; }

        .th-ghost {
          position: absolute; bottom: -10px; right: 10px;
          font-family: var(--font-space); font-size: 90px; font-weight: 900;
          color: var(--accent); opacity: 0.05; line-height: 1;
          pointer-events: none; user-select: none; letter-spacing: -0.04em;
          transition: opacity 0.3s;
        }
        .th-card:hover .th-ghost,
        .th-card-active .th-ghost { opacity: 0.1; }

        .th-card-content {
          padding: 28px 26px 24px;
          position: relative; z-index: 1;
          display: flex; flex-direction: column; gap: 10px; height: 100%;
        }
        .th-card-icon {
          width: 52px; height: 52px; border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(var(--accent-rgb),0.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px; transition: background 0.3s, border-color 0.3s;
        }
        .th-card:hover .th-card-icon,
        .th-card-active .th-card-icon {
          background: rgba(var(--accent-rgb),0.1);
          border-color: rgba(var(--accent-rgb),0.4);
        }
        .th-card-eyebrow {
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--accent); opacity: 0.9;
        }
        .th-card-title {
          font-family: var(--font-space); font-size: clamp(16px, 1.5vw, 20px);
          font-weight: 800; color: #fff; line-height: 1.25;
        }
        .th-progress-wrap {
          height: 3px; background: rgba(255,255,255,0.08);
          border-radius: 100px; overflow: hidden; margin-top: 4px;
        }
        .th-progress-bar {
          height: 100%; border-radius: 100px;
          animation: th-progress 3.5s linear forwards;
        }
        @keyframes th-progress { from { width: 0%; } to { width: 100%; } }

        /* detail panel */
        .th-detail {
          background: linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(var(--accent-rgb), 0.3);
          border-radius: 24px; padding: 48px 44px;
          position: relative; overflow: hidden;
          box-shadow: 0 0 0 1px rgba(var(--accent-rgb),0.1), inset 0 1px 0 rgba(255,255,255,0.05);
          display: flex; flex-direction: column; gap: 0;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .th-detail-glow {
          position: absolute; top: -60px; right: -60px;
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--accent-rgb),0.15) 0%, transparent 70%);
          pointer-events: none; transition: background 0.4s;
        }
        .th-detail-eye {
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 16px; display: block;
        }
        .th-detail-title {
          font-family: var(--font-space);
          font-size: clamp(20px, 2vw, 30px);
          font-weight: 800; color: #fff;
          line-height: 1.2; margin-bottom: 20px; letter-spacing: -0.02em;
        }
        .th-detail-body {
          font-family: var(--font-inter); font-size: 15px;
          color: rgba(255,255,255,0.80); line-height: 1.75; margin-bottom: 32px;
        }
        .th-bullets { display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .th-bullet {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--font-inter); font-size: 14px;
          color: rgba(255,255,255,0.8);
          animation: th-bullet-in 0.4s ease both;
        }
        @keyframes th-bullet-in {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: none; }
        }
        .th-bullet-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
          box-shadow: 0 0 6px currentColor;
        }
        .th-dots { display: flex; gap: 8px; margin-top: 36px; }
        .th-dot {
          width: 28px; height: 4px; border-radius: 100px;
          background: rgba(255,255,255,0.15);
          border: none; cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }
        .th-dot-active { width: 48px; background: var(--accent); }

        /* bridge connector */
        .th-bridge {
          position: absolute;
          left: calc(50% - 14px);
          top: 0; bottom: 0;
          width: 28px;
          pointer-events: none;
          z-index: 5;
          display: flex; align-items: center; justify-content: center;
        }
        .th-bridge-line {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, rgba(var(--rgb),0.15), rgba(var(--rgb),0.6), rgba(var(--rgb),0.15));
          border-radius: 2px;
          top: 50%; transform: translateY(-50%);
        }
        /* left and right endpoint nodes */
        .th-bridge-node {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
          animation: th-node-pulse 2s ease-in-out infinite;
        }
        .th-bridge-node-l { left: -4px; }
        .th-bridge-node-r { right: -4px; animation-delay: 0.3s; }
        @keyframes th-node-pulse {
          0%,100% { transform: translateY(-50%) scale(1); opacity: 1; }
          50%      { transform: translateY(-50%) scale(1.4); opacity: 0.6; }
        }
        /* animated particles flowing across */
        .th-bridge-dot {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent), 0 0 16px var(--accent);
          animation: th-bridge-flow 1.6s ease-in-out infinite;
        }
        .th-bridge-dot-2 {
          animation: th-bridge-flow 1.6s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        @keyframes th-bridge-flow {
          0%   { left: -4px; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: calc(100% - 4px); opacity: 0; }
        }

        /* reveal */
        .th-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.75s ease, transform 0.75s ease; }
        .th-visible { opacity: 1; transform: none; }
        .th-reveal:nth-child(2) { transition-delay: 0.12s; }

        /* detail content fade-in on switch */
        .th-detail-content {
          display: flex; flex-direction: column; gap: 0; flex: 1;
          animation: th-detail-in 0.35s ease both;
        }
        @keyframes th-detail-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }

        /* responsive */
        @media (max-width: 1024px) {
          .th-layout { grid-template-columns: 1fr; gap: 20px; }
          .th-detail { position: static; scroll-margin-top: 80px; }
          .th-bridge { display: none; }
          /* Active card gets a strong highlight + down arrow on mobile */
          .th-card-active::after {
            content: '';
            position: absolute; bottom: -12px; left: 50%;
            transform: translateX(-50%);
            width: 0; height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid var(--accent);
            display: none;
          }
          .th-card { min-height: 180px; touch-action: manipulation; }
          .th-card:active { transform: scale(0.97); }
        }
        @media (max-width: 600px) {
          .th-inner { padding: 0 20px; }
          .th-root { padding: 72px 0 80px; }
          .th-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .th-card { min-height: 160px; border-radius: 14px; }
          .th-card-content { padding: 18px 16px 16px; gap: 7px; }
          .th-card-icon { width: 40px; height: 40px; border-radius: 10px; }
          .th-card-eyebrow { font-size: 9px; }
          .th-card-title { font-size: 13px; }
          .th-ghost { font-size: 60px; }
          .th-detail { padding: 28px 20px; border-radius: 18px; }
          .th-detail-title { font-size: 20px; }
          .th-detail-body { font-size: 14px; }
          .th-bullet { font-size: 13px; }
        }
      `}</style>
    </section>
  );
}
