"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { speakers } from "@/data/speakers";

const total = speakers.length;

export default function SpeakersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState<"next"|"prev">("next");
  const timerRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  const getIdx = (offset: number) => (current + offset + total) % total;

  const go = useCallback((direction: "next"|"prev") => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(c => direction === "next" ? (c + 1) % total : (c - 1 + total) % total);
      setAnimating(false);
    }, 420);
  }, [animating]);

  /* auto-advance */
  useEffect(() => {
    timerRef.current = setTimeout(() => go("next"), 4500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, go]);

  /* reveal */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".sp-reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("sp-visible"); }),
      { threshold: 0.08 }
    );
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  /* positions: prev=-1, center=0, next=+1 */
  const positions = [-1, 0, 1];

  return (
    <section id="speakers" ref={ref} className="sp-root">
      <div className="sp-fade-top" />
      <div className="sp-fade-bottom" />

      <div className="sp-inner">

        {/* header */}
        <div className="sp-header sp-reveal">
          <span className="sp-eyebrow">
            <span className="sp-eye-dot" />
            Confirmed Speakers
          </span>
          <h2 className="sp-h2">The Minds <span className="sp-h2-grad">On Stage</span></h2>
          <p className="sp-sub">World-class leaders, policymakers and innovators shaping Indonesia&apos;s AI future.</p>
        </div>

        {/* carousel */}
        <div className="sp-carousel sp-reveal">

          {/* prev arrow */}
          <button className="sp-arrow sp-arrow-left" onClick={() => go("prev")} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* track */}
          <div className="sp-track">
            {positions.map((offset) => {
              const idx = getIdx(offset);
              const s = speakers[idx];
              const isCenter = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              return (
                <div
                  key={`${idx}-${offset}`}
                  className={`sp-card ${isCenter ? "sp-card-center" : "sp-card-side"} ${isPrev ? "sp-card-left" : ""} ${isNext ? "sp-card-right" : ""} ${animating ? (dir === "next" ? "sp-anim-next" : "sp-anim-prev") : ""}`}
                  onClick={() => !isCenter && go(isPrev ? "prev" : "next")}
                >
                  {/* photo */}
                  <div className="sp-photo">
                    <Image
                      src={s.img}
                      alt={s.name}
                      fill
                      sizes="320px"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                    {/* gradient overlay */}
                    <div className="sp-photo-grad" />

                    {/* keynote badge */}
                    {s.keynote && <span className="sp-keynote">Keynote</span>}

                    {/* center card glow ring */}
                    {isCenter && <div className="sp-glow-ring" />}
                  </div>

                  {/* info */}
                  <div className="sp-info">
                    <div className="sp-name">{s.name}</div>
                    <div className="sp-title">{s.title}</div>
                    <div className="sp-org">{s.org}</div>
                    {isCenter && (
                      <Link href="/speakers" className="sp-profile-btn">
                        View Profile
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* next arrow */}
          <button className="sp-arrow sp-arrow-right" onClick={() => go("next")} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* dots */}
        <div className="sp-dots sp-reveal">
          {speakers.map((_, i) => (
            <button key={i} className={`sp-dot${i === current ? " sp-dot-active" : ""}`}
              onClick={() => { setDir(i > current ? "next" : "prev"); setCurrent(i); }} />
          ))}
        </div>

        {/* view all */}
        <div className="sp-footer sp-reveal">
          <Link href="/speakers" className="sp-all-btn">
            View All Speaker Profiles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* ── Take The Stage ── */}
        <div className="sp-stage sp-reveal">
          {/* left accent panel */}
          <div className="sp-stage-accent">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="11" rx="3" stroke="#1a1f4e" strokeWidth="1.8"/>
              <path d="M5 10a7 7 0 0 0 14 0" stroke="#1a1f4e" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke="#1a1f4e" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="9" y1="21" x2="15" y2="21" stroke="#1a1f4e" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          {/* right content */}
          <div className="sp-stage-body">
            <div className="sp-stage-text">
              <div className="sp-stage-title">Take The Stage</div>
              <div className="sp-stage-sub">Interested to speak as a keynote speaker or panelist at World AI Show Indonesia?</div>
            </div>
            <Link href="/register" className="sp-stage-btn">
              Apply to Speak
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        .sp-root {
          background: #080f2e;
          padding: 72px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .sp-fade-top {
          position: absolute; top: 0; left: 0; right: 0; height: 120px;
          background: linear-gradient(to bottom, #060b24, transparent);
          pointer-events: none; z-index: 1;
        }
        .sp-fade-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 120px;
          background: linear-gradient(to top, #060b24, transparent);
          pointer-events: none; z-index: 1;
        }
        .sp-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative; z-index: 2;
        }

        /* header */
        .sp-header { text-align: center; margin-bottom: 64px; }
        .sp-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #c0f43c;
          border: 1px solid rgba(192,244,60,0.3); padding: 6px 20px;
          border-radius: 100px; margin-bottom: 22px;
        }
        .sp-eye-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #c0f43c; box-shadow: 0 0 8px #c0f43c;
        }
        .sp-h2 {
          font-family: var(--font-space);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.025em; line-height: 1.1; margin-bottom: 16px;
        }
        .sp-h2-grad {
          background: linear-gradient(100deg, #1b9ad6, #c0f43c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sp-sub {
          font-family: var(--font-inter); font-size: 16px;
          color: rgba(255,255,255,0.70); max-width: 480px; margin: 0 auto;
        }

        /* carousel wrapper */
        .sp-carousel {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          position: relative;
          margin-bottom: 40px;
        }

        /* arrows */
        .sp-arrow {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
          z-index: 10;
        }
        .sp-arrow:hover {
          background: rgba(27,154,214,0.18);
          border-color: #1b9ad6;
          color: #fff;
          transform: scale(1.08);
        }
        .sp-arrow-left { margin-right: 28px; }
        .sp-arrow-right { margin-left: 28px; }

        /* track */
        .sp-track {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          perspective: 1200px;
        }

        /* cards */
        .sp-card {
          border-radius: 24px;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.42s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.42s ease,
                      box-shadow 0.42s ease,
                      filter 0.42s ease;
          position: relative;
        }

        /* center card */
        .sp-card-center {
          width: 300px;
          transform: scale(1) translateZ(0);
          opacity: 1;
          z-index: 3;
          box-shadow:
            0 0 0 1.5px rgba(27,154,214,0.5),
            0 0 40px rgba(27,154,214,0.2),
            0 30px 60px rgba(0,0,0,0.5);
          filter: none;
          cursor: default;
        }

        /* side cards */
        .sp-card-side {
          width: 240px;
          opacity: 0.55;
          z-index: 2;
          filter: brightness(0.7);
          cursor: pointer;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .sp-card-left  { transform: scale(0.88) translateX(20px) rotateY(8deg); }
        .sp-card-right { transform: scale(0.88) translateX(-20px) rotateY(-8deg); }
        .sp-card-side:hover { opacity: 0.8; filter: brightness(0.85); }

        /* photo */
        .sp-photo {
          position: relative;
          height: 380px;
          background: #0a1030;
          overflow: hidden;
        }
        .sp-card-side .sp-photo { height: 320px; }

        .sp-photo-grad {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to bottom,
            transparent 35%,
            rgba(4,8,28,0.6) 65%,
            rgba(4,8,28,0.95) 100%
          );
        }

        .sp-keynote {
          position: absolute; top: 14px; right: 14px; z-index: 3;
          font-family: var(--font-space); font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          background: #c0f43c; color: #1a1f4e;
          padding: 4px 10px; border-radius: 100px;
        }

        .sp-glow-ring {
          position: absolute; inset: 0; z-index: 2;
          border-radius: 0;
          box-shadow: inset 0 0 30px rgba(27,154,214,0.15);
          pointer-events: none;
        }

        /* info */
        .sp-info {
          background: linear-gradient(180deg, #060e30 0%, #040820 100%);
          padding: 20px 22px 24px;
          position: relative; z-index: 2;
        }
        .sp-name {
          font-family: var(--font-space); font-size: 16px; font-weight: 700;
          color: #fff; margin-bottom: 4px;
        }
        .sp-card-side .sp-name { font-size: 13px; }
        .sp-title {
          font-family: var(--font-inter); font-size: 12px;
          color: rgba(255,255,255,0.70); margin-bottom: 3px; line-height: 1.4;
        }
        .sp-org {
          font-family: var(--font-inter); font-size: 12px; font-weight: 600;
          color: #1b9ad6; margin-bottom: 16px;
        }
        .sp-card-side .sp-org { margin-bottom: 0; }

        .sp-profile-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #c0f43c;
          border: 1px solid rgba(192,244,60,0.35);
          padding: 7px 16px; border-radius: 100px;
          transition: background 0.18s, border-color 0.18s;
        }
        .sp-profile-btn:hover {
          background: rgba(192,244,60,0.12);
          border-color: #c0f43c;
          box-shadow: 0 0 14px rgba(192,244,60,0.35);
        }

        /* dots */
        .sp-dots {
          display: flex; justify-content: center; gap: 8px; margin-bottom: 40px;
        }
        .sp-dot {
          width: 24px; height: 4px; border-radius: 100px;
          background: rgba(255,255,255,0.15);
          border: none; cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }
        .sp-dot-active {
          width: 40px;
          background: #1b9ad6;
        }

        /* view all */
        .sp-footer { text-align: center; }
        .sp-all-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-space); font-size: 13px; font-weight: 700;
          color: rgba(255,255,255,0.6);
          border: 1.5px solid rgba(255,255,255,0.15);
          padding: 13px 32px; border-radius: 100px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .sp-all-btn:hover {
          color: #fff; border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 0 20px rgba(255,255,255,0.08);
        }

        /* ── Take The Stage ── */
        .sp-stage {
          display: flex; align-items: stretch;
          margin-top: 32px;
          border-radius: 20px; overflow: hidden;
          border: 1px solid rgba(192,244,60,0.25);
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .sp-stage:hover {
          border-color: rgba(192,244,60,0.45);
          box-shadow: 0 0 0 1px rgba(192,244,60,0.12), 0 0 32px rgba(192,244,60,0.20), 0 8px 40px rgba(0,0,0,0.3);
        }
        .sp-stage-accent {
          background: linear-gradient(160deg, #1b9ad6 0%, #4fc89a 60%, #c0f43c 100%);
          display: flex; align-items: center; justify-content: center;
          padding: 0 32px; flex-shrink: 0;
        }
        .sp-stage-body {
          flex: 1;
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
          background: rgba(192,244,60,0.06);
          padding: 28px 36px;
        }
        .sp-stage-text { display: flex; flex-direction: column; gap: 5px; }
        .sp-stage-title {
          font-family: var(--font-space); font-size: 18px; font-weight: 800;
          color: #fff; letter-spacing: -0.01em;
        }
        .sp-stage-sub {
          font-family: var(--font-inter); font-size: 13.5px; line-height: 1.5;
          color: rgba(255,255,255,0.78);
        }
        .sp-stage-btn {
          display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0;
          font-family: var(--font-space); font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none;
          color: #1a1f4e; background: #c0f43c;
          padding: 13px 26px; border-radius: 100px;
          transition: background 0.2s, transform 0.2s;
        }
        .sp-stage-btn:hover { background: #d4ff5a; transform: translateY(-2px); box-shadow: 0 0 20px rgba(192,244,60,0.5), 0 8px 24px rgba(192,244,60,0.25); }
        @media (max-width: 700px) {
          .sp-stage { flex-direction: column; }
          .sp-stage-accent { padding: 18px 24px; justify-content: flex-start; }
          .sp-stage-body { flex-direction: column; align-items: flex-start; padding: 24px; gap: 16px; }
          .sp-stage-btn { width: 100%; justify-content: center; }
        }

        /* reveal */
        .sp-reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .sp-visible { opacity: 1; transform: none; }
        .sp-reveal:nth-child(2) { transition-delay: 0.1s; }
        .sp-reveal:nth-child(3) { transition-delay: 0.18s; }
        .sp-reveal:nth-child(4) { transition-delay: 0.24s; }

        /* responsive */
        @media (max-width: 860px) {
          .sp-card-side { display: none; }
          .sp-card-center { width: 280px; }
          .sp-arrow-left { margin-right: 16px; }
          .sp-arrow-right { margin-left: 16px; }
        }
        @media (max-width: 480px) {
          .sp-inner { padding: 0 16px; }
          .sp-card-center { width: 240px; }
          .sp-photo { height: 300px; }
          .sp-arrow { width: 40px; height: 40px; }
          .sp-arrow-left { margin-right: 10px; }
          .sp-arrow-right { margin-left: 10px; }
        }
        @media (max-width: 360px) {
          .sp-card-center { width: 200px; }
          .sp-arrow { width: 36px; height: 36px; }
          .sp-arrow-left { margin-right: 6px; }
          .sp-arrow-right { margin-left: 6px; }
        }
      `}</style>
    </section>
  );
}
