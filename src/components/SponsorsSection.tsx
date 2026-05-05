"use client";
import Image from "next/image";
import { allSponsors } from "@/data/sponsors";

export default function SponsorsSection() {
  const doubled = [...allSponsors, ...allSponsors];

  return (
    <section id="sponsors" className="spn-root">

      {/* ── Header ── */}
      <div className="spn-header">
        <div className="spn-eyebrow">
          <span className="spn-eye-dot" />
          Partners &amp; Sponsors
        </div>
        <h2 className="spn-h2">
          The Brands Betting Big<br/>
          <span className="spn-grad">on Indonesia&apos;s AI Future</span>
        </h2>
      </div>

      {/* ── Single scrolling strip ── */}
      <div className="spn-marquee">
        <div className="spn-track">
          {doubled.map((s, i) => (
            <div
              key={i}
              className="spn-card"
              style={{
                height: s.cardH,
                borderTopColor: s.tierColor,
                "--tier-glow": s.tierColor,
              } as React.CSSProperties}
            >
              {/* Logo — centred, fills the card */}
              <div className="spn-logo-wrap" style={{ width: s.logoW, height: s.logoH }}>
                <Image src={s.logo} alt={s.name} fill style={{ objectFit: "contain" }} />
              </div>

              {/* Tier badge at bottom */}
              <span
                className="spn-tier-pill"
                style={{ color: s.tierColor, borderColor: s.tierColor + "99", background: s.tierColor + "22" }}
              >
                {s.tier}
              </span>
            </div>
          ))}
        </div>
      </div>


      <style>{`
        .spn-root {
          background: #f7f8fc;
          padding: 72px 0 80px;
          overflow: hidden;
        }

        /* ── Header ── */
        .spn-header {
          text-align: center;
          max-width: 600px; margin: 0 auto 72px;
          padding: 0 32px;
        }
        .spn-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #1b9ad6;
          border: 1px solid rgba(27,154,214,0.3); padding: 6px 20px;
          border-radius: 100px; margin-bottom: 24px;
        }
        .spn-eye-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #1b9ad6; box-shadow: 0 0 8px #1b9ad6;
          animation: spn-blink 2s ease-in-out infinite;
        }
        @keyframes spn-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .spn-h2 {
          font-family: var(--font-space);
          font-size: clamp(30px, 3.5vw, 52px);
          font-weight: 800; color: #1a1f4e;
          letter-spacing: -0.03em; line-height: 1.12;
        }
        .spn-grad {
          background: linear-gradient(100deg, #1b9ad6, #a78bfa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Marquee ── */
        .spn-marquee {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          padding: 14px 0;
        }
        .spn-track {
          display: flex; align-items: center; gap: 18px;
          width: max-content;
          animation: spn-scroll 52s linear infinite;
        }
        .spn-track:hover { animation-play-state: paused; }
        @keyframes spn-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Cards ── */
        .spn-card {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 14px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.07);
          border-top: 3px solid;
          border-radius: 18px;
          padding: 0 24px;
          min-width: 240px;
          flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: transform 0.25s, box-shadow 0.25s;
          cursor: default;
        }
        .spn-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 0 1px rgba(var(--tier-glow), 0.25), 0 0 20px rgba(var(--tier-glow), 0.18), 0 16px 40px rgba(0,0,0,0.15);
          border-color: rgba(var(--tier-glow), 0.4);
        }

        /* Logo wrapper */
        .spn-logo-wrap {
          position: relative;
          flex-shrink: 0;
        }

        /* Tier pill */
        .spn-tier-pill {
          font-family: var(--font-space); font-size: 10px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          border: 1.5px solid; padding: 5px 16px; border-radius: 100px;
          white-space: nowrap;
        }


        @media (max-width: 768px) {
          .spn-card { min-width: 180px; padding: 0 20px; }
          .spn-logo-wrap { max-width: 140px !important; height: 52px !important; }
        }
        @media (max-width: 480px) {
          .spn-card { min-width: 155px; padding: 0 16px; }
          .spn-logo-wrap { max-width: 110px !important; height: 40px !important; }
        }
      `}</style>
    </section>
  );
}
