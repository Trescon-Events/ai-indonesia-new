"use client";
import { useEffect, useRef, useState } from "react";

function RollingNumber({
  value, prefix = "", suffix = "", decimals = 0,
  active, delay = 0, duration = 1500,
}: {
  value: number; prefix?: string; suffix?: string; decimals?: number;
  active: boolean; delay?: number; duration?: number;
}) {
  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  const full = `${prefix}${formatted}${suffix}`;
  let digitIdx = 0;

  return (
    <span className="rn-wrap">
      {full.split("").map((ch, i) => {
        if (!/[0-9]/.test(ch)) {
          return <span key={i} className="rn-static">{ch}</span>;
        }
        const target = parseInt(ch);
        const thisDelay = delay + digitIdx * 55;
        const thisDur   = duration + digitIdx * 90;
        digitIdx++;
        const strip: number[] = [];
        for (let r = 0; r < 2; r++) for (let d = 0; d <= 9; d++) strip.push(d);
        strip.push(target);
        return (
          <span key={i} className="rn-slot">
            <span
              className={`rn-strip${active ? " rn-go" : ""}`}
              style={{ "--n": strip.length, "--dl": `${thisDelay}ms`, "--dur": `${thisDur}ms` } as React.CSSProperties}
            >
              {strip.map((d, j) => <span key={j} className="rn-digit">{d}</span>)}
            </span>
          </span>
        );
      })}
    </span>
  );
}

const cards = [
  {
    eyebrow: "Market & Adoption",
    heading: "The Numbers\nDon't Lie",
    body: "Indonesia's AI market hits USD 10.9B by 2030. 92% of enterprises are already embedding AI into core operations. This isn't experimentation — it's transformation at scale.",
    tags: ["USD 10.9B market", "92% enterprise adoption"],
    accent: "#1b9ad6", accentRgb: "27,154,214",
    ghost: "10.9B",
    calloutValue: 10.9, calloutDecimals: 1, calloutPrefix: "USD ", calloutSuffix: "B",
    calloutLbl: "AI market by 2030",
    headGrad: "linear-gradient(130deg, #ffffff 0%, #1b9ad6 100%)",
    bg: "rgba(27,154,214,0.05)",
    tagBg: "rgba(27,154,214,0.12)", tagColor: "#1b9ad6",
    shadow: "0 0 0 1px rgba(27,154,214,0.3), 0 20px 50px rgba(27,154,214,0.1)",
    shadowHover: "0 0 0 1.5px rgba(27,154,214,0.6), 0 24px 60px rgba(27,154,214,0.2)",
  },
  {
    eyebrow: "Digital Scale",
    heading: "229M+\nDigital Citizens",
    body: "The world's 4th most populous nation is now one of its most connected — a vast, young, mobile-first workforce ready for AI-augmented productivity at a scale few markets can match.",
    tags: ["4th most populous", "40% of SEA digital economy"],
    accent: "#c0f43c", accentRgb: "192,244,60",
    ghost: "229M",
    calloutValue: 229, calloutDecimals: 0, calloutPrefix: "", calloutSuffix: "M+",
    calloutLbl: "Connected citizens",
    headGrad: "linear-gradient(130deg, #ffffff 0%, #c0f43c 100%)",
    bg: "rgba(192,244,60,0.04)",
    tagBg: "rgba(192,244,60,0.1)", tagColor: "#c0f43c",
    shadow: "0 0 0 1px rgba(192,244,60,0.25), 0 20px 50px rgba(192,244,60,0.08)",
    shadowHover: "0 0 0 1.5px rgba(192,244,60,0.5), 0 24px 60px rgba(192,244,60,0.18)",
  },
  {
    eyebrow: "Global Confidence",
    heading: "World's Biggest\nTech Players Are In",
    body: "When the world's AI titans pick their next frontier, they choose Indonesia. Microsoft committed $1.7B. NVIDIA brought $200M. Tencent pledged $500M.",
    tags: ["Microsoft $1.7B", "NVIDIA $200M", "Tencent $500M"],
    accent: "#a78bfa", accentRgb: "167,139,250",
    ghost: "$2.4B",
    calloutValue: 2.4, calloutDecimals: 1, calloutPrefix: "$", calloutSuffix: "B+",
    calloutLbl: "Combined commitment",
    headGrad: "linear-gradient(130deg, #ffffff 0%, #a78bfa 100%)",
    bg: "rgba(167,139,250,0.05)",
    tagBg: "rgba(167,139,250,0.1)", tagColor: "#a78bfa",
    shadow: "0 0 0 1px rgba(167,139,250,0.25), 0 20px 50px rgba(167,139,250,0.08)",
    shadowHover: "0 0 0 1.5px rgba(167,139,250,0.5), 0 24px 60px rgba(167,139,250,0.18)",
  },
  {
    eyebrow: "Sovereign AI",
    heading: "National Roadmap —\nNow Executing",
    body: "Indonesia's government isn't watching from the sidelines. With a national AI strategy and a 100K AI talent target by 2029, this is a sovereign AI build — not a dependency.",
    tags: ["100K AI talents by 2029", "National AI strategy"],
    accent: "#fb923c", accentRgb: "251,146,60",
    ghost: "100K",
    calloutValue: 100, calloutDecimals: 0, calloutPrefix: "", calloutSuffix: "K",
    calloutLbl: "AI talents targeted by 2029",
    headGrad: "linear-gradient(130deg, #ffffff 0%, #fb923c 100%)",
    bg: "rgba(251,146,60,0.05)",
    tagBg: "rgba(251,146,60,0.1)", tagColor: "#fb923c",
    shadow: "0 0 0 1px rgba(251,146,60,0.25), 0 20px 50px rgba(251,146,60,0.08)",
    shadowHover: "0 0 0 1.5px rgba(251,146,60,0.5), 0 24px 60px rgba(251,146,60,0.18)",
  },
];

function CircuitSVG({ color }: { color: string }) {
  return (
    <svg className="mk-circuit" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
      <g stroke={color} strokeOpacity="0.10" fill="none" strokeWidth="1.2">
        <polyline points="0,40 60,40 60,80 120,80 120,50"/>
        <polyline points="180,20 180,90 240,90 240,60 340,60"/>
        <polyline points="0,140 50,140 50,190 110,190 110,160 200,160"/>
        <polyline points="260,140 260,200 340,200 340,170"/>
        <polyline points="0,260 80,260 80,300 160,300"/>
        <polyline points="220,260 280,260 280,300 400,300"/>
        <polyline points="360,20 360,110"/>
      </g>
      <g fill={color} fillOpacity="0.16" stroke="none">
        <circle cx="60"  cy="40"  r="4"/><circle cx="120" cy="80"  r="4"/>
        <circle cx="180" cy="90"  r="4"/><circle cx="50"  cy="140" r="4"/>
        <circle cx="260" cy="200" r="4"/><circle cx="80"  cy="260" r="4"/>
      </g>
      <circle r="3" fill={color} fillOpacity="0.65">
        <animateMotion dur="3.2s" repeatCount="indefinite">
          <mpath href="#cp1"/>
        </animateMotion>
      </circle>
      <path id="cp1" d="M0,40 L60,40 L60,80 L120,80 L120,50" fill="none"/>
      <circle r="2.5" fill={color} fillOpacity="0.55">
        <animateMotion dur="4s" repeatCount="indefinite" begin="1.4s">
          <mpath href="#cp2"/>
        </animateMotion>
      </circle>
      <path id="cp2" d="M0,140 L50,140 L50,190 L110,190 L110,160 L200,160" fill="none"/>
    </svg>
  );
}

export default function MarketSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("mk-in"); }),
      { threshold: 0.07 }
    );
    el.querySelectorAll(".mk-reveal").forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="market" ref={ref} className="mk-root">


      <div className="mk-dotgrid" />

      <div className="mk-inner">

        {/* ── Section header ── */}
        <div className="mk-header mk-reveal">
          <div className="mk-section-eye">
            <span className="mk-eye-dot" />
            Why Indonesia. Why Now.
          </div>
          <h2 className="mk-h2">
            Indonesia&apos;s AI <span className="mk-h2-grad">Inflection Point</span>
          </h2>
          <p className="mk-sub">
            Infrastructure, intent, and investment — converging at once. This is the moment the world&apos;s next AI powerhouse goes sovereign.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="mk-grid">
          {cards.map((c, i) => (
            <div
              key={i}
              className="mk-card mk-reveal"
              style={{
                background: c.bg,
                boxShadow: c.shadow,
                "--shadow-hover": c.shadowHover,
                "--accent": c.accent,
                "--tag-bg": c.tagBg,
                "--tag-color": c.tagColor,
                transitionDelay: `${(i % 2) * 80}ms`,
              } as React.CSSProperties}
            >
              <CircuitSVG color={c.accent} />
              <div className="mk-bar" style={{ background: c.accent }} />
              <div className="mk-ghost" style={{ color: c.accent }}>{c.ghost}</div>
              <div className="mk-pulse" style={{ background: c.accent, boxShadow: `0 0 8px ${c.accent}` }} />

              <div className="mk-body">
                <span className="mk-card-eye" style={{ color: c.accent }}>{c.eyebrow}</span>
                <h3 className="mk-heading" style={{ backgroundImage: c.headGrad }}>{c.heading}</h3>
                <p className="mk-body-text">{c.body}</p>
                <div className="mk-tags">
                  {c.tags.map((t, j) => <span key={j} className="mk-tag">{t}</span>)}
                </div>
                <div className="mk-callout" style={{ borderTopColor: c.accent + "28" }}>
                  <span className="mk-callout-num" style={{ color: c.accent }}>
                    <RollingNumber
                      value={c.calloutValue} decimals={c.calloutDecimals}
                      prefix={c.calloutPrefix} suffix={c.calloutSuffix}
                      active={active} delay={i * 200} duration={1400}
                    />
                  </span>
                  <span className="mk-callout-lbl">{c.calloutLbl}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .mk-root {
          background: #080f2e;
          position: relative; overflow: hidden;
          padding: 72px 0;
        }

        /* ── Dot grid ── */
        .mk-dotgrid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(rgba(27,154,214,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
        }

        /* ── Inner ── */
        .mk-inner {
          max-width: 1300px; margin: 0 auto; padding: 0 48px;
          position: relative; z-index: 3;
        }

        /* ── Section header ── */
        .mk-header { text-align: center; margin-bottom: 56px; }
        .mk-section-eye {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #c0f43c;
          border: 1px solid rgba(192,244,60,0.3); padding: 6px 20px;
          border-radius: 100px; margin-bottom: 24px;
        }
        .mk-eye-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #c0f43c; box-shadow: 0 0 8px #c0f43c; flex-shrink: 0;
          animation: mk-blink 2s ease-in-out infinite;
        }
        @keyframes mk-blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        .mk-h2 {
          font-family: var(--font-space);
          font-size: clamp(32px, 4.5vw, 64px);
          font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 18px;
          letter-spacing: -0.03em;
        }
        .mk-h2-grad {
          background: linear-gradient(100deg, #1b9ad6 0%, #c0f43c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mk-sub {
          font-family: var(--font-inter); font-size: 16px; line-height: 1.7;
          color: rgba(255,255,255,0.80); max-width: 540px; margin: 0 auto;
        }

        /* ── Grid ── */
        .mk-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        /* ── Card ── */
        .mk-card {
          border-radius: 20px; overflow: hidden; position: relative;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .mk-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover) !important;
        }
        /* circuit bg */
        .mk-circuit {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 0;
        }

        .mk-bar { height: 5px; width: 100%; }

        .mk-ghost {
          position: absolute; bottom: 8px; right: 24px;
          font-family: var(--font-space);
          font-size: clamp(70px, 9vw, 130px);
          font-weight: 900; opacity: 0.08; line-height: 1;
          pointer-events: none; user-select: none; letter-spacing: -0.04em;
          transition: opacity 0.3s;
        }
        .mk-card:hover .mk-ghost { opacity: 0.16; }

        .mk-pulse {
          position: absolute; top: 22px; right: 22px;
          width: 10px; height: 10px; border-radius: 50%; z-index: 2;
        }
        .mk-pulse::after {
          content: '';
          position: absolute; inset: -8px; border-radius: 50%;
          border: 1.5px solid var(--accent);
          animation: mk-pulse-ring 2.4s ease-out infinite; opacity: 0;
        }
        @keyframes mk-pulse-ring {
          0%   { transform: scale(0.6); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }

        .mk-body { padding: 28px 36px 34px; position: relative; z-index: 1; }

        .mk-card-eye {
          display: inline-block;
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px; opacity: 0.9;
        }
        .mk-heading {
          font-family: var(--font-space);
          font-size: clamp(20px, 1.9vw, 28px);
          font-weight: 800; line-height: 1.18; margin-bottom: 16px;
          letter-spacing: -0.025em; white-space: pre-line;
          background-clip: text; -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
        }
        .mk-body-text {
          font-family: var(--font-inter);
          font-size: clamp(13px, 1.1vw, 14.5px);
          color: rgba(255,255,255,0.80); line-height: 1.72; margin-bottom: 22px;
        }

        .mk-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 26px; }
        .mk-tag {
          font-family: var(--font-inter); font-size: 11.5px; font-weight: 600;
          color: var(--tag-color); background: var(--tag-bg);
          border: 1.5px solid var(--accent); border-radius: 100px; padding: 5px 14px;
        }

        .mk-callout { display: flex; align-items: baseline; gap: 12px; padding-top: 20px; border-top: 1.5px solid; }
        .mk-callout-num {
          font-family: var(--font-space);
          font-size: clamp(22px, 2.2vw, 32px);
          font-weight: 800; letter-spacing: -0.02em; line-height: 1;
        }
        .mk-callout-lbl { font-family: var(--font-inter); font-size: 13px; color: rgba(255,255,255,0.75); }

        /* ── Rolling number ── */
        .rn-wrap  { display: inline-block; white-space: nowrap; vertical-align: bottom; }
        .rn-slot  { display: inline-block; overflow: hidden; height: 1em; line-height: 1; vertical-align: bottom; }
        .rn-strip { display: block; will-change: transform; }
        .rn-digit { display: block; height: 1em; line-height: 1; text-align: center; }
        .rn-static { display: inline-block; vertical-align: bottom; }
        .rn-go {
          animation: rn-roll var(--dur) var(--dl) cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes rn-roll {
          from { transform: translateY(0); }
          to   { transform: translateY(calc((1 - var(--n)) * 1em)); }
        }

        /* ── Reveal ── */
        .mk-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .mk-in     { opacity: 1; transform: none; }

        @media (max-width: 900px) {
          .mk-inner { padding: 0 24px; }
          .mk-grid  { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .mk-inner { padding: 0 18px; }
          .mk-body  { padding: 22px 20px 26px; }
        }
      `}</style>
    </section>
  );
}
