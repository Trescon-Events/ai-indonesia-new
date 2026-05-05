"use client";
import { useEffect, useRef } from "react";

const items = [
  {
    num: "01",
    title: "Insightful Sessions",
    accent: "#1b9ad6",
    rgb: "27,154,214",
    desc: "Global AI experts share best practices for digital transformation — innovative ways to achieve favourable business results from the world's leading solution providers.",
    tags: ["Keynotes", "Best Practices", "Strategy"],
    gridArea: "a",
  },
  {
    num: "02",
    title: "Technology Use-Cases",
    accent: "#c0f43c",
    rgb: "192,244,60",
    desc: "Successful early adopters and pioneers demonstrate real-world AI implementations across banking, healthcare and logistics.",
    tags: ["Live Demos", "Case Studies"],
    gridArea: "b",
  },
  {
    num: "03",
    title: "AI Exhibitions",
    accent: "#a78bfa",
    rgb: "167,139,250",
    desc: "Hundreds of cutting-edge technologies designed to help enterprises automate processes and significantly reduce operational costs.",
    tags: ["Products", "Platforms"],
    gridArea: "c",
  },
  {
    num: "04",
    title: "Panel Discussions",
    accent: "#fb923c",
    rgb: "251,146,60",
    desc: "Veteran technology leaders bridge AI concepts with real applications. Attendees generated 35+ business leads within the very first 90 minutes.",
    tags: ["Roundtables", "Policy", "Ethics"],
    gridArea: "d",
  },
  {
    num: "05",
    title: "Business Networking",
    accent: "#34d399",
    rgb: "52,211,153",
    desc: "Structured matchmaking sessions connecting investors, enterprise buyers, startups and government officials — purpose-built for Indonesia's AI ecosystem.",
    tags: ["Matchmaking", "Partnerships", "Investment"],
    gridArea: "e",
  },
];


function CircuitBg({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.09, pointerEvents: "none" }}>
      <path d="M0,110 H70 V60 H160 V110 H250 V45 H340 V110 H400" stroke={accent} strokeWidth="1.2" fill="none"/>
      <path d="M0,155 H50 V185 H140 V155 H230 V175 H320 V155 H400" stroke={accent} strokeWidth="0.8" fill="none"/>
      <path d="M0,70 H35 V30 H100 V70 H170 V55 H230 V70" stroke={accent} strokeWidth="0.5" fill="none" opacity="0.5"/>
      {[70,160,250,340].map((x,i) => <circle key={i} cx={x} cy={110} r={3.5} fill={accent}/>)}
      {[50,140,230,320].map((x,i) => <circle key={i} cx={x} cy={155} r={2.5} fill={accent} opacity="0.6"/>)}
      <rect x="152" y="52" width="16" height="16" rx="2" fill="none" stroke={accent} strokeWidth="1"/>
      <rect x="242" y="37" width="16" height="16" rx="2" fill="none" stroke={accent} strokeWidth="1"/>
      <rect x="332" y="102" width="16" height="16" rx="2" fill="none" stroke={accent} strokeWidth="1"/>
    </svg>
  );
}

function HapCard({ item }: { item: typeof items[0] }) {
  return (
    <div className={`hap-card hap-card-${item.gridArea}`}
      style={{ "--accent": item.accent, "--rgb": item.rgb } as React.CSSProperties}>
      <CircuitBg accent={item.accent} />
      <div className="hap-scanline" />
      {/* top accent bar */}
      <div className="hap-bar" />

      <div className="hap-card-inner">
        {/* top row: num badge + icon */}
        <div className="hap-card-top">
          <div className="hap-num-badge" style={{ color: item.accent, borderColor: `rgba(${item.rgb},0.3)`, background: `rgba(${item.rgb},0.09)` }}>
            {item.num}
          </div>
          <div className="hap-icon-wrap" style={{ borderColor: `rgba(${item.rgb},0.3)`, background: `rgba(${item.rgb},0.08)` }}>
            <div className="hap-orbit" style={{ borderColor: item.accent }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: item.accent, position: "relative", zIndex: 1 }}>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <h3 className="hap-card-title">{item.title}</h3>
        <p className="hap-card-desc">{item.desc}</p>

        {/* tags */}
        <div className="hap-tags">
          {item.tags.map((tag, j) => (
            <span key={j} className="hap-tag"
              style={{ color: item.accent, borderColor: `rgba(${item.rgb},0.25)`, background: `rgba(${item.rgb},0.07)` }}>
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

/* SVG connector overlay — flowing particles between cards */
function ConnectorOverlay() {
  return (
    <svg className="hap-connector" viewBox="0 0 1280 560" preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }}>
      <defs>
        <filter id="hc-glow">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* horizontal connectors row 1: A→B, B→C */}
      <path id="hc-ab" d="M853,140 C895,140 910,140 940,140" stroke="#1b9ad6" strokeWidth="1" fill="none" strokeOpacity="0.3"/>
      <path id="hc-bc" d="M1067,140 C1100,140 1112,140 1140,140" stroke="#c0f43c" strokeWidth="1" fill="none" strokeOpacity="0.3"/>
      {/* vertical connector A→D */}
      <path id="hc-ad" d="M430,280 C430,300 430,310 430,330" stroke="#1b9ad6" strokeWidth="1" fill="none" strokeOpacity="0.3"/>
      {/* horizontal connector D→E row 2 */}
      <path id="hc-de" d="M853,420 C910,420 950,420 980,420" stroke="#fb923c" strokeWidth="1" fill="none" strokeOpacity="0.3"/>

      {/* particles */}
      {["hc-ab","hc-bc","hc-ad","hc-de"].map((id, i) => (
        <circle key={i} r="3.5" fill={["#1b9ad6","#c0f43c","#1b9ad6","#fb923c"][i]}
          filter="url(#hc-glow)">
          <animateMotion dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}>
            <mpath href={`#${id}`}/>
          </animateMotion>
        </circle>
      ))}
    </svg>
  );
}

export default function HappeningsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("hap-vis"); }),
      { threshold: 0.06 }
    );
    el.querySelectorAll(".hap-reveal").forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="happenings" ref={ref} className="hap-root"
      style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/images/happenings-section-bg.webp')`, backgroundSize: "cover", backgroundPosition: "center 40%", backgroundAttachment: "fixed" }}>
      <div className="hap-fade-top" />
      <div className="hap-fade-bottom" />

      {/* bg particles */}
      {[...Array(14)].map((_, i) => (
        <div key={i} className="hap-particle" style={{
          left: `${5 + i * 6.5}%`,
          width: i % 3 === 0 ? "3px" : "2px",
          height: i % 3 === 0 ? "3px" : "2px",
          animationDelay: `${i * 0.35}s`,
          animationDuration: `${5 + (i % 4)}s`,
          background: i % 2 === 0 ? "#1b9ad6" : "#c0f43c",
        }} />
      ))}

      <div className="hap-inner">
        {/* header */}
        <div className="hap-header hap-reveal">
          <span className="hap-eyebrow">
            <span className="hap-eye-dot" />
            What&apos;s Happening
          </span>
          <h2 className="hap-h2">
            Five Ways to{" "}
            <span className="hap-h2-grad">Experience the Show</span>
          </h2>
          <p className="hap-sub">
            A packed programme designed to inform, inspire, and connect Indonesia&apos;s AI community.
          </p>
        </div>

        {/* bento grid */}
        <div className="hap-bento hap-reveal" style={{ position: "relative" }}>
          <ConnectorOverlay />
          {items.map((item, i) => (
            <HapCard key={i} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        .hap-root {
          background: #080f2e;
          padding: 72px 0 80px;
          position: relative; overflow: hidden;
        }
        .hap-root::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(155deg, rgba(26,15,60,0.88) 0%, rgba(14,26,92,0.84) 45%, rgba(10,18,48,0.88) 100%);
          z-index: 0; pointer-events: none;
        }
        .hap-fade-top {
          position: absolute; top: 0; left: 0; right: 0; height: 140px;
          background: linear-gradient(to bottom, #060b24 0%, transparent 100%);
          pointer-events: none; z-index: 1;
        }
        .hap-fade-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 160px;
          background: linear-gradient(to top, #060b24, transparent);
          pointer-events: none; z-index: 1;
        }

        /* particles */
        .hap-particle {
          position: absolute; bottom: 0; border-radius: 50%;
          opacity: 0; pointer-events: none; z-index: 0;
          animation: hap-float linear infinite;
        }
        @keyframes hap-float {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        .hap-inner {
          max-width: 1380px; margin: 0 auto; padding: 0 40px;
          position: relative; z-index: 4;
        }

        /* header */
        .hap-header { text-align: center; margin-bottom: 72px; }
        .hap-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #c0f43c;
          border: 1px solid rgba(192,244,60,0.3); padding: 6px 20px;
          border-radius: 100px; margin-bottom: 24px;
        }
        .hap-eye-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #c0f43c; box-shadow: 0 0 8px #c0f43c;
          animation: hap-blink 2s ease-in-out infinite;
        }
        @keyframes hap-blink {
          0%,100% { opacity: 1; box-shadow: 0 0 8px #c0f43c; }
          50%      { opacity: 0.3; box-shadow: none; }
        }
        .hap-h2 {
          font-family: var(--font-space);
          font-size: clamp(28px, 3.8vw, 52px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.025em; line-height: 1.1; margin-bottom: 18px;
        }
        .hap-h2-grad {
          background: linear-gradient(100deg, #1b9ad6, #c0f43c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hap-sub {
          font-family: var(--font-inter); font-size: 16px;
          color: rgba(255,255,255,0.70); max-width: 480px;
          margin: 0 auto; line-height: 1.7;
        }

        /* bento grid */
        .hap-bento {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-template-areas:
            "a a b b c c"
            "d d d e e e";
          gap: 20px;
        }
        .hap-card-a { grid-area: a; }
        .hap-card-b { grid-area: b; }
        .hap-card-c { grid-area: c; }
        .hap-card-d { grid-area: d; }
        .hap-card-e { grid-area: e; }

        /* card */
        .hap-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1.5px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease,
                      border-color 0.35s ease, background 0.35s ease;
          min-height: unset;
        }
        .hap-card:hover {
          transform: translateY(-6px);
          background: rgba(var(--rgb), 0.07);
          border-color: rgba(var(--rgb), 0.4);
          box-shadow: 0 24px 64px rgba(var(--rgb), 0.2),
                      0 0 0 1px rgba(var(--rgb), 0.15);
        }

        /* top bar */
        .hap-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--accent); opacity: 0; transition: opacity 0.3s;
        }
        .hap-card:hover .hap-bar { opacity: 1; }

        /* scanline sweep */
        .hap-scanline {
          position: absolute; top: -60%; left: 0; right: 0; height: 50%;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.025), transparent);
          pointer-events: none; z-index: 1;
          animation: hap-scan 5s ease-in-out infinite;
        }
        @keyframes hap-scan {
          0%   { top: -60%; }
          100% { top: 130%; }
        }

        .hap-card-inner {
          padding: 28px 28px 28px;
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          height: 100%;
          box-sizing: border-box;
        }

        .hap-card-top {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 20px;
        }
        .hap-num-badge {
          font-family: var(--font-space); font-size: 12px; font-weight: 800;
          letter-spacing: 0.12em;
          padding: 5px 14px; border-radius: 100px; border: 1px solid;
        }
        .hap-icon-wrap {
          width: 50px; height: 50px; border-radius: 50%;
          border: 1.5px solid;
          display: flex; align-items: center; justify-content: center;
          position: relative; transition: background 0.3s;
        }
        .hap-card:hover .hap-icon-wrap { background: rgba(var(--rgb), 0.15) !important; }
        .hap-orbit {
          position: absolute; inset: -10px;
          border-radius: 50%; border: 1px dashed; opacity: 0.25;
          animation: hap-orbit 8s linear infinite;
        }
        @keyframes hap-orbit { to { transform: rotate(360deg); } }

        .hap-card-title {
          font-family: var(--font-space);
          font-size: clamp(18px, 1.6vw, 24px);
          font-weight: 800; color: #fff;
          line-height: 1.2; margin-bottom: 12px; letter-spacing: -0.02em;
        }
        .hap-card-desc {
          font-family: var(--font-inter); font-size: clamp(14px, 1.1vw, 15.5px);
          color: rgba(255,255,255,0.82); line-height: 1.8;
          margin-bottom: 0; flex: 1;
        }

        .hap-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); }
        .hap-tag {
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 100px; border: 1px solid;
        }

        /* connector overlay */
        .hap-connector { overflow: visible; }

        /* reveal */
        .hap-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .hap-vis    { opacity: 1; transform: none; }
        .hap-reveal:nth-child(2) { transition-delay: 0.1s; }

        /* responsive */
        @media (max-width: 960px) {
          .hap-bento {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "a a"
              "b c"
              "d e";
          }
          .hap-connector { display: none; }
        }
        @media (max-width: 580px) {
          .hap-inner { padding: 0 16px; }
          .hap-bento {
            grid-template-columns: 1fr;
            grid-template-areas: "a" "b" "c" "d" "e";
          }
          .hap-card-inner { padding: 22px 18px 18px; }
        }
      `}</style>
    </section>
  );
}
