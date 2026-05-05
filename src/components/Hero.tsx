"use client";
import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const svgRef     = useRef<HTMLDivElement>(null);
  const hlRef      = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  /* ── Entry animations (IntersectionObserver) ── */
  const observe = useCallback((el: Element | null, cb: () => void) => {
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { cb(); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const cleanups = [
      observe(svgRef.current, () => svgRef.current?.classList.add("hero-svg-in")),
      observe(hlRef.current,  () => hlRef.current?.classList.add("hero-hl-in")),
    ];
    return () => cleanups.forEach((c) => c?.());
  }, [observe]);

  /* ── Parallax scroll effect ── */
  useEffect(() => {
    let raf: number;
    const el = contentRef.current;
    if (!el) return;

    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const y   = window.scrollY;
        const vh  = window.innerHeight;
        if (y > vh) return; // stop computing past the hero

        // Content drifts up at 42% of scroll speed
        const drift   = y * 0.42;
        // Fade out: fully gone by 60% of viewport height scrolled
        const opacity = Math.max(0, 1 - y / (vh * 0.6));

        el.style.transform = `translateY(${drift}px)`;
        el.style.opacity   = String(opacity);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero-section">

      {/* ── Background video ── */}
      <video autoPlay muted loop playsInline preload="none" className="hero-video" aria-hidden="true">
        <source src={`${process.env.NEXT_PUBLIC_BASE_PATH}/videos/hero-bg.webm`} type="video/webm" />
      </video>

      <div className="hero-overlay" />
      <div className="hero-grid" />
      <div className="hero-glow-right" />
      <div className="hero-glow-left" />
      <div className="hero-glow-center" />


      {/* ── Diagonal data streams ── */}
      <svg className="hero-data-svg" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <filter id="hgb" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="hgg" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Faint stream lines */}
        <path id="ds1" d="M380,0 L120,900"  fill="none" stroke="rgba(27,154,214,0.09)"  strokeWidth="1"/>
        <path id="ds2" d="M860,0 L600,900"  fill="none" stroke="rgba(192,244,60,0.07)"  strokeWidth="1"/>
        <path id="ds3" d="M1260,0 L1000,900" fill="none" stroke="rgba(167,139,250,0.08)" strokeWidth="1"/>
        {/* Traveling pulses */}
        <circle r="3" fill="#1b9ad6" fillOpacity="0.75" filter="url(#hgb)">
          <animateMotion dur="7s" repeatCount="indefinite" begin="0s"><mpath href="#ds1"/></animateMotion>
        </circle>
        <circle r="2.5" fill="#1b9ad6" fillOpacity="0.4">
          <animateMotion dur="7s" repeatCount="indefinite" begin="3.5s"><mpath href="#ds1"/></animateMotion>
        </circle>
        <circle r="2.5" fill="#c0f43c" fillOpacity="0.75" filter="url(#hgg)">
          <animateMotion dur="10s" repeatCount="indefinite" begin="2s"><mpath href="#ds2"/></animateMotion>
        </circle>
        <circle r="2" fill="#a78bfa" fillOpacity="0.65" filter="url(#hgb)">
          <animateMotion dur="9s" repeatCount="indefinite" begin="4.5s"><mpath href="#ds3"/></animateMotion>
        </circle>
      </svg>

      {/* Floating particles */}
      {[
        { left:"12%", delay:"0s",   dur:"9s",  size:3, color:"#1b9ad6" },
        { left:"25%", delay:"1.5s", dur:"12s", size:2, color:"#c0f43c" },
        { left:"38%", delay:"3s",   dur:"10s", size:4, color:"#1b9ad6" },
        { left:"52%", delay:"0.8s", dur:"14s", size:2, color:"#a78bfa" },
        { left:"65%", delay:"2.2s", dur:"11s", size:3, color:"#c0f43c" },
        { left:"78%", delay:"4s",   dur:"9s",  size:2, color:"#1b9ad6" },
        { left:"88%", delay:"1s",   dur:"13s", size:3, color:"#a78bfa" },
      ].map((p, i) => (
        <div key={i} className="hero-particle" style={{
          left: p.left, width: `${p.size}px`, height: `${p.size}px`,
          animationDelay: p.delay, animationDuration: p.dur, background: p.color,
          boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
        }} />
      ))}

      {/* ── Parallax content ── */}
      <div ref={contentRef} className="hero-content">

        {/* Edition labels row */}
        <div className="hero-edition-wrap">
          <span className="hero-edition-label">
            <span className="hero-edition-bar" />
            <span className="hero-edition-num">47<sup>th</sup></span>
            <span className="hero-edition-divider" />
            <span className="hero-edition-text">Global Edition</span>
          </span>
        </div>

        {/* SVG logo — drops in from above */}
        <div ref={svgRef} className="hero-svg-wrap">
          <div className="hero-logo-runner">
          <div className="hero-logo-glass">
            <Image
              src="/images/top-logo.svg"
              alt="World AI Show Indonesia"
              width={900}
              height={170}
              style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 1 }}
              priority
            />
            {/* Transparent clickable overlay on the Finance 2045 right half */}
            <a
              href="https://www.finance2045.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-svg-finance-link"
              aria-label="Visit Finance 2045"
            />
          </div>
          </div>
        </div>

        {/* Date + venue meta */}
        <div className="hero-meta-wrap">
          <div className="hero-meta-inner">
            <span className="hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="3" stroke="#1b9ad6" strokeWidth="1.8"/>
                <path d="M3 9h18" stroke="#1b9ad6" strokeWidth="1.8"/>
                <path d="M8 2v4M16 2v4" stroke="#1b9ad6" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              7–8 July 2026
            </span>
            <span className="hero-meta-dot" />
            <span className="hero-meta-item">
              <svg width="12" height="14" viewBox="0 0 20 24" fill="none" aria-hidden="true">
                <path d="M10 1C6.13 1 3 4.13 3 8c0 5.25 7 15 7 15s7-9.75 7-15c0-3.87-3.13-7-7-7Z" stroke="#1b9ad6" strokeWidth="1.8"/>
                <circle cx="10" cy="8" r="2.5" stroke="#1b9ad6" strokeWidth="1.8"/>
              </svg>
              Sheraton Grand Jakarta, Indonesia
            </span>
          </div>
        </div>

        {/* Tagline — rises from below */}
        <div ref={hlRef} className="hero-hl-wrap">
          <span className="hero-hl-line" />
          <p className="hero-hl">
            Architecting Indonesia&apos;s<br />
            <span className="hero-hl-grad">Sovereign &amp; Scalable AI Future</span>
          </p>
          <span className="hero-hl-line" />
        </div>

        {/* CTAs */}
        <div className="hero-cta-row">
          <a href="https://www.youtube.com/watch?v=-ZnPXlSqUbQ" className="hero-cta hero-cta--primary" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 3l14 9-14 9V3z" fill="#060b24"/>
            </svg>
            Watch 2025 Aftermovie
          </a>
          <Link href="/enquire" className="hero-cta hero-cta--outline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2v13M7 11l5 5 5-5M3 19h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Post-Event Report
          </Link>
          <Link href="/register" className="hero-cta hero-cta--outline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Register for 2026
          </Link>
        </div>

      </div>

      {/* Gradient bridge */}
      <div className="hero-fade-bridge" />

      {/* Scroll-cue arrow */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 11l6 6 6-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <style>{`
        /* ── Shell ── */
        .hero-section {
          position: relative;
          min-height: 100vh;
          background: #050c2a;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }

        /* ── Video ── */
        .hero-video {
          position: absolute; inset: 0; z-index: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          filter: brightness(1.35) saturate(1.15);
        }

        /* ── Overlays ── */
        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(
              to bottom,
              rgba(4,8,36,0.22) 0%,
              rgba(4,8,36,0.30) 50%,
              rgba(4,8,30,0.92) 100%
            );
        }
        .hero-grid {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image:
            linear-gradient(rgba(27,154,214,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,154,214,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 40%, black 40%, transparent 100%);
        }
        .hero-glow-right {
          position: absolute; top: 0%; right: -8%; z-index: 3; pointer-events: none;
          width: 850px; height: 850px;
          background: radial-gradient(circle, rgba(27,154,214,0.22) 0%, transparent 65%);
          animation: hero-pulse-r 6s ease-in-out infinite;
        }
        .hero-glow-left {
          position: absolute; bottom: 15%; left: -8%; z-index: 3; pointer-events: none;
          width: 650px; height: 650px;
          background: radial-gradient(circle, rgba(192,244,60,0.13) 0%, transparent 65%);
          animation: hero-pulse-l 8s ease-in-out infinite;
        }
        .hero-glow-center {
          position: absolute; top: 20%; left: 50%; transform: translateX(-50%);
          z-index: 3; pointer-events: none;
          width: 900px; height: 500px;
          background: radial-gradient(ellipse, rgba(27,154,214,0.08) 0%, transparent 70%);
        }
        @keyframes hero-pulse-r {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.65; transform: scale(1.08); }
        }
        @keyframes hero-pulse-l {
          0%,100% { opacity: 0.8; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.1); }
        }

        /* ── Data streams ── */
        .hero-data-svg {
          position: absolute; inset: 0; z-index: 4;
          width: 100%; height: 100%;
          pointer-events: none;
        }

        /* ── Particles ── */
        .hero-particle {
          position: absolute; bottom: 0; border-radius: 50%;
          z-index: 4; pointer-events: none; opacity: 0;
          animation: hero-rise linear infinite;
        }
        @keyframes hero-rise {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          8%   { opacity: 0.8; }
          85%  { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }

        /* ── Content — will-change for GPU compositing ── */
        .hero-content {
          position: relative; z-index: 10; width: 100%;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          padding: 100px 40px 72px;
          will-change: transform, opacity;
        }

        /* ── SVG entry: drops down ── */
        .hero-svg-wrap {
          width: 100%; max-width: 580px;
          margin-bottom: 22px;
          position: relative;
          opacity: 0;
          transform: translateY(-28px) scale(0.97);
          transition: opacity 1.1s cubic-bezier(0.16,1,0.3,1),
                      transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        /* ── Running border wrapper ── */
        .hero-logo-runner {
          position: relative;
          border-radius: 22px;
          padding: 2px;
          overflow: hidden;
        }
        .hero-logo-runner::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(0deg);
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            transparent 62%,
            rgba(27,154,214,0.55) 78%,
            rgba(192,244,60,0.38) 86%,
            rgba(27,154,214,0.30) 92%,
            transparent 100%
          );
          animation: logo-runner-spin 9s linear infinite;
        }
        @keyframes logo-runner-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .hero-logo-glass {
          position: relative;
          z-index: 1;
          background: rgba(4,10,36,0.55);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 20px;
          padding: 24px 36px;
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          box-shadow:
            0 0 48px rgba(27,154,214,0.22),
            0 12px 56px rgba(0,0,0,0.70),
            inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .hero-logo-glass img {
          filter: drop-shadow(0 0 20px rgba(27,154,214,0.45))
                  drop-shadow(0 4px 16px rgba(0,0,0,0.5));
        }
        .hero-svg-in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        .hero-svg-finance-link {
          position: absolute;
          top: 0; right: 0;
          width: 42%; height: 100%;
          cursor: pointer;
          z-index: 2;
        }

        /* ── Edition badge ── */
        .hero-edition-wrap {
          opacity: 0;
          animation: heroMetaFade 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
          margin-bottom: 10px;
          width: 100%; max-width: 580px;
          text-align: left;
        }
        .hero-edition-row {
          display: inline-flex; align-items: center; gap: 14px; flex-wrap: wrap;
        }
        .hero-edition-label {
          display: inline-flex; align-items: center; gap: 10px;
        }
        .hero-coloc-sep {
          width: 1px; height: 20px;
          background: rgba(255,255,255,0.18); flex-shrink: 0;
        }
        .hero-coloc-badge {
          display: inline-flex; align-items: center; gap: 7px;
          text-decoration: none;
          border: 1px solid rgba(167,139,250,0.4);
          background: rgba(167,139,250,0.1);
          padding: 5px 14px 5px 12px;
          border-radius: 100px;
          transition: background 0.2s, border-color 0.2s;
        }
        .hero-coloc-badge:hover {
          background: rgba(167,139,250,0.2);
          border-color: rgba(167,139,250,0.7);
        }
        .hero-coloc-name {
          font-family: var(--font-space); font-size: 12px; font-weight: 700;
          color: #a78bfa; letter-spacing: 0.04em;
        }
        .hero-coloc-badge svg { color: rgba(167,139,250,0.7); flex-shrink: 0; }
        .hero-edition-bar {
          width: 3px; height: 20px; border-radius: 2px;
          background: #c0f43c;
          flex-shrink: 0;
        }
        .hero-edition-num {
          font-family: var(--font-space);
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.01em;
          line-height: 1;
          text-shadow: 0 2px 12px rgba(0,0,0,0.6);
        }
        .hero-edition-num sup {
          font-size: 11px;
          font-weight: 700;
          vertical-align: super;
          color: #c0f43c;
        }
        .hero-edition-divider {
          width: 1px; height: 16px;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }
        .hero-edition-text {
          font-family: var(--font-space);
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.70);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── Date / venue meta ── */
        .hero-meta-wrap {
          opacity: 0;
          animation: heroMetaFade 0.9s 1.0s cubic-bezier(0.16,1,0.3,1) forwards;
          margin: 0 0 32px;
        }
        @keyframes heroMetaFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-meta-inner {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; flex-wrap: wrap;
        }
        .hero-meta-item {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--font-space);
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 600;
          color: rgba(255,255,255,0.92);
          letter-spacing: 0.04em;
          text-shadow: 0 1px 10px rgba(0,0,0,0.6);
        }
        .hero-meta-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(255,255,255,0.22); flex-shrink: 0;
        }

        /* ── Tagline entry: rises ── */
        .hero-hl-wrap {
          display: flex; align-items: center; gap: 20px;
          max-width: 900px; width: 100%;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s 0.3s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-hl-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .hero-hl-line { display: none; }
        .hero-hl {
          font-family: var(--font-space);
          font-size: clamp(20px, 3vw, 46px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1.15;
          white-space: normal;
          flex-shrink: 1;
          text-align: center;
          width: 100%;
          text-shadow: 0 2px 24px rgba(0,0,0,0.7), 0 0 48px rgba(27,154,214,0.18);
        }
        .hero-hl-grad {
          background: linear-gradient(100deg, #1b9ad6 0%, #c0f43c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── CTA row ── */
        .hero-cta-row {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; flex-wrap: wrap;
          margin-top: 28px;
          opacity: 0;
          animation: heroMetaFade 0.8s 1.4s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .hero-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-space);
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.04em;
          padding: 11px 22px;
          border-radius: 100px;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .hero-cta:hover { transform: translateY(-2px); }
        .hero-cta--primary {
          background: #c0f43c;
          color: #060b24;
          box-shadow: 0 4px 20px rgba(192,244,60,0.35);
        }
        .hero-cta--primary:hover { box-shadow: 0 0 20px rgba(192,244,60,0.65), 0 6px 28px rgba(192,244,60,0.35); }
        .hero-cta--outline {
          background: transparent;
          color: rgba(255,255,255,0.85);
          border: 1.5px solid rgba(255,255,255,0.22);
        }
        .hero-cta--outline:hover {
          border-color: rgba(255,255,255,0.55);
          color: #ffffff;
          box-shadow: 0 0 16px rgba(255,255,255,0.12);
        }

        /* ── Gradient bridge ── */
        .hero-fade-bridge {
          position: relative; z-index: 9;
          height: 80px;
          background: linear-gradient(to bottom, transparent 0%, #060b24 100%);
          pointer-events: none;
          margin-top: -80px;
        }

        /* ── Scroll cue ── */
        .hero-scroll-cue {
          position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
          z-index: 10;
          animation: scrollBounce 2.2s ease-in-out infinite;
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50%       { transform: translateX(-50%) translateY(7px); opacity: 1; }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-section { justify-content: center; }
          .hero-content { padding: 80px 32px 60px; }
          .hero-svg-wrap { max-width: 400px; }
        }
        @media (max-width: 560px) {
          .hero-section { justify-content: center; }
          .hero-content { padding: 72px 20px 48px; }
          .hero-edition-num { font-size: 17px; }
          .hero-edition-text { font-size: 10px; letter-spacing: 0.12em; }
          .hero-svg-wrap { max-width: 88%; margin-bottom: 16px; }
          .hero-meta-wrap { margin: 0 0 22px; }
          .hero-meta-item { font-size: 11.5px; }
          .hero-meta-inner { gap: 10px; }
          .hero-hl { font-size: 19px; }
          .hero-cta-row { flex-direction: column; align-items: center; gap: 10px; margin-top: 22px; }
          .hero-cta { width: 100%; max-width: 280px; justify-content: center; font-size: 12.5px; padding: 12px 20px; }
        }
      `}</style>
    </section>
  );
}
