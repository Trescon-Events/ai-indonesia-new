"use client";
import { useEffect, useRef, useState, useCallback } from "react";

export default function WhyIndonesiaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const observe = useCallback((el: Element | null, cb: () => void, threshold = 0.08) => {
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { cb(); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    return observe(sectionRef.current, () => setVisible(true));
  }, [observe]);

  return (
    <section className="wi-section" ref={sectionRef}>
      <div className="wi-glow-tl" />
      <div className="wi-glow-br" />

      {/* Rising particles — same as MarketSection */}
      {[...Array(8)].map((_, i) => {
        const clr = ["#1b9ad6","#c0f43c","#a78bfa","#fb923c"][i % 4];
        return (
          <div key={i} className="wi-particle" style={{
            left: `${10 + i * 10}%`,
            width: "3px", height: "3px",
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${8 + (i % 4)}s`,
            background: clr,
          }} />
        );
      })}

      {/* Subtle dot grid */}
      <div className="wi-dotgrid" />


      <div className="wi-inner">

        {/* ── Header ── */}
        <div className={`wi-header${visible ? " wi-in" : ""}`}>
          <div className="wi-eyebrow">Why Indonesia. Why Now.</div>
          <h2 className="wi-h2">
            Indonesia&apos;s AI <span className="wi-h2-grad">Inflection Point</span>
          </h2>
          <p className="wi-sub">
            Infrastructure, intent, and investment — converging at once. This is the moment the world&apos;s next AI powerhouse goes sovereign.
          </p>
        </div>


      </div>

      <style>{`
        /* ── Section shell ── */
        .wi-section {
          position: relative;
          background: #060b24;
          padding: 72px 40px 64px;
          overflow: hidden;
        }
        .wi-dotgrid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(rgba(27,154,214,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }
        /* ── Rising particles ── */
        .wi-particle {
          position: absolute; bottom: 0; border-radius: 50%;
          opacity: 0; pointer-events: none; z-index: 1;
          animation: wi-rise linear infinite;
        }
        @keyframes wi-rise {
          0%   { transform: translateY(0);      opacity: 0; }
          10%  { opacity: 0.5; }
          88%  { opacity: 0.2; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }

        .wi-glow-tl {
          position: absolute; top: -15%; left: -5%; pointer-events: none; z-index: 0;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(27,154,214,0.09) 0%, transparent 65%);
        }
        .wi-glow-br {
          position: absolute; bottom: -10%; right: -5%; pointer-events: none; z-index: 0;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(192,244,60,0.07) 0%, transparent 65%);
        }

        /* ── Inner ── */
        .wi-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 72px;
        }

        /* ── Fade-in ── */
        .wi-header {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .wi-header.wi-in { opacity: 1; transform: translateY(0); }

        /* ── Header ── */
        .wi-header { text-align: center; }
        .wi-eyebrow {
          display: inline-block;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #c0f43c;
          border: 1px solid rgba(192,244,60,0.3); padding: 6px 20px;
          border-radius: 100px; margin-bottom: 28px;
        }
        .wi-h2 {
          font-family: var(--font-space);
          font-size: clamp(38px, 5vw, 72px);
          font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 22px;
        }
        .wi-sub {
          font-family: var(--font-inter); font-size: 17px; line-height: 1.7;
          color: rgba(255,255,255,0.72); max-width: 560px; margin: 0 auto;
        }
        .wi-h2-grad {
          background: linear-gradient(100deg, #1b9ad6 0%, #c0f43c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }


        /* ── Responsive ── */
        @media (max-width: 900px) {
          .wi-section { padding: 60px 24px; }
        }
        @media (max-width: 480px) {
          .wi-section { padding: 52px 16px; }
        }
      `}</style>
    </section>
  );
}
