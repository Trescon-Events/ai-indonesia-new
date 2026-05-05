"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const socials = [
  {
    label: "X / Twitter",
    href: "https://x.com/WorldAIShow",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/world_ai_show?igsh=anRibHE4OHFlOHM=",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/showcase/world-ai-show/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCrJB-EsWzCNPk34FO_N8Qew/videos",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [atTop] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("ft-strip-visible"); }),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="ft-root">

      {/* ── Top separator ── */}
      <div className="ft-separator" />

      {/* ── Pre-footer animated dual CTA ── */}
      <div className="ft-strip" ref={stripRef}>

        {/* LEFT — Attend */}
        <div className="ft-panel ft-panel-lime">
          {/* Shimmer overlay */}
          <div className="ft-shimmer" />

          <div className="ft-panel-inner ft-slide-left">
            <div className="ft-panel-eye">Jakarta · 7–8 July 2026</div>

            {/* Stats row */}
            <div className="ft-panel-stats">
              <div className="ft-pstat">
                <span className="ft-pstat-n">1,000+</span>
                <span className="ft-pstat-l">Business &amp; Tech Leaders</span>
              </div>
              <div className="ft-pstat-div" />
              <div className="ft-pstat">
                <span className="ft-pstat-n">40+</span>
                <span className="ft-pstat-l">Sponsors &amp; Exhibitors</span>
              </div>
              <div className="ft-pstat-div" />
              <div className="ft-pstat">
                <span className="ft-pstat-n">40+</span>
                <span className="ft-pstat-l">Speakers</span>
              </div>
            </div>

            <h2 className="ft-panel-h2 ft-panel-h2-dark">
              Secure Your Seat Among<br/>Indonesia&apos;s AI Leaders
            </h2>
            <p className="ft-panel-sub ft-panel-sub-dark">
              Be part of Southeast Asia&apos;s most influential AI gathering — two days of keynotes, panels, and high-level networking.
            </p>
            <Link href="#passes" className="ft-panel-btn ft-panel-btn-dark">
              Attend the Show
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* RIGHT — Sponsor */}
        <div className="ft-panel ft-panel-dark">
          {/* Dot grid */}
          <div className="ft-dotgrid" />
          {/* Glow orb */}
          <div className="ft-orb" />
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <span key={i} className="ft-fp" style={{
              left: `${12 + i * 15}%`,
              width: 3 + (i % 2), height: 3 + (i % 2),
              background: ["#1b9ad6","#c0f43c","#a78bfa"][i % 3],
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${7 + i}s`,
            }} />
          ))}

          <div className="ft-panel-inner ft-slide-right">
            <div className="ft-panel-eye ft-panel-eye-pill">
              Sponsorship &amp; Partnerships
            </div>

            {/* Stats row */}
            <div className="ft-panel-stats">
              <div className="ft-pstat">
                <span className="ft-pstat-n" style={{ color: "#c0f43c" }}>40+</span>
                <span className="ft-pstat-l" style={{ color: "rgba(255,255,255,0.70)" }}>Sponsors &amp; Exhibitors</span>
              </div>
              <div className="ft-pstat-div" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="ft-pstat">
                <span className="ft-pstat-n" style={{ color: "#c0f43c" }}>$10.9B</span>
                <span className="ft-pstat-l" style={{ color: "rgba(255,255,255,0.70)" }}>AI Market by 2030</span>
              </div>
            </div>

            <h2 className="ft-panel-h2" style={{ color: "#fff" }}>
              Amplify Your Brand at<br/>Southeast Asia&apos;s Largest AI Event
            </h2>
            <p className="ft-panel-sub" style={{ color: "rgba(255,255,255,0.55)" }}>
              Explore sponsorship, exhibition, and partnership opportunities designed to put your brand in front of 1,000+ regional decision-makers.
            </p>
            <Link href="/enquire" className="ft-panel-btn ft-panel-btn-lime">
              Enquire Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

      </div>

      {/* ── Separator ── */}
      <div className="ft-separator" />

      {/* ── Main footer body ── */}
      <div className="ft-body">
        <div className="ft-container">

          {/* ══ Two-column main row ══ */}
          <div className="ft-main-row">

            {/* ── LEFT: Event logo + date below ── */}
            <div className="ft-left">
              <Image
                src="/images/top-logo.svg"
                alt="World AI Show Jakarta 2026"
                width={240}
                height={80}
                style={{ height: 72, width: "auto", display: "block", marginBottom: 20 }}
              />
              <div className="ft-date-block">
                <div className="ft-date-country">Indonesia</div>
                <div className="ft-date-dates">7-8 July 2026</div>
                <div className="ft-date-city">Jakarta</div>
              </div>
            </div>

            {/* ── RIGHT: Trescon + contact + socials ── */}
            <div className="ft-right">

              <div className="ft-event-by">Event by</div>

              {/* Trescon row */}
              <div className="ft-trescon-row">
                <Image
                  src="/images/trescon-logo.png"
                  alt="Trescon — 10 Years"
                  width={200}
                  height={68}
                  style={{ height: 60, width: "auto", display: "block" }}
                />
                <div className="ft-vdivider ft-vdivider-sm" />
                <p className="ft-trescon-tagline">Connecting businesses With<br />Opportunities</p>
              </div>

              {/* Address */}
              <p className="ft-address">
                806, 8th Floor, Liberty House, Dubai International Financial Center,<br />
                Dubai, United Arab Emirates
              </p>

              {/* Phone + email */}
              <div className="ft-contact-line">
                <span className="ft-contact-label">T:</span>
                <a href="tel:+97144385446" className="ft-contact-val">+971 44385446</a>
                <span className="ft-contact-sep">|</span>
                <span className="ft-contact-label">E:</span>
                <a href="mailto:info@worldaishow.com" className="ft-contact-val">info@worldaishow.com</a>
              </div>

              {/* Socials */}
              <div className="ft-socials">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="ft-social" target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="ft-bottom">
            <span className="ft-copy">
              Copyright &copy;2026 Trescon Events Organizing Ltd. All Rights Reserved.
            </span>
            <div className="ft-legal">
              <a href="#" className="ft-legal-link">Privacy Policy</a>
              <span className="ft-legal-sep">|</span>
              <a href="#" className="ft-legal-link">Terms &amp; Conditions</a>
              <span className="ft-legal-sep">|</span>
              <a href="#" className="ft-legal-link">Cookie Policy</a>
            </div>

            {/* Scroll to top */}
            <button onClick={scrollToTop} className="ft-totop" aria-label="Scroll to top">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      <style>{`
        .ft-root { font-family: var(--font-inter); }

        /* ── Animated dual CTA strip ── */
        .ft-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .ft-container { max-width: 1300px; margin: 0 auto; padding: 0 48px; }

        /* Panels */
        .ft-panel {
          position: relative; overflow: hidden;
          padding: 0;
        }
        .ft-panel-lime {
          background: linear-gradient(135deg, #c0f43c 0%, #b8e832 50%, #cdf54a 100%);
          background-size: 200% 200%;
          animation: ft-bg-shift 6s ease-in-out infinite;
        }
        @keyframes ft-bg-shift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .ft-panel-dark {
          background: #060b24;
        }

        /* Shimmer on lime panel */
        .ft-shimmer {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: ft-shimmer 3.5s ease-in-out infinite;
        }
        @keyframes ft-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Dot grid on dark panel */
        .ft-dotgrid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(27,154,214,0.12) 1px, transparent 1px);
          background-size: 24px 24px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }
        /* Glow orb */
        .ft-orb {
          position: absolute; top: -80px; right: -80px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(192,244,60,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        /* Floating particles */
        .ft-fp {
          position: absolute; bottom: 0; border-radius: 50%; opacity: 0;
          animation: ft-rise linear infinite; pointer-events: none;
        }
        @keyframes ft-rise {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.5; }
          88%  { opacity: 0.15; }
          100% { transform: translateY(-100%); opacity: 0; }
        }

        /* Panel inner content */
        .ft-panel-inner {
          position: relative; z-index: 2;
          padding: 80px 64px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 20px;
        }

        /* Slide-in reveal */
        .ft-slide-left  { opacity: 0; transform: translateX(-40px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .ft-slide-right { opacity: 0; transform: translateX( 40px); transition: opacity 0.8s ease, transform 0.8s ease; transition-delay: 0.12s; }
        .ft-strip-visible .ft-slide-left,
        .ft-strip-visible .ft-slide-right { opacity: 1; transform: translateX(0); }

        /* Eye / label */
        .ft-panel-eye {
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          color: rgba(26,31,78,0.55); letter-spacing: 0.2em; text-transform: uppercase;
        }
        .ft-panel-eye-pill {
          color: #1b9ad6;
          border: 1px solid rgba(27,154,214,0.35);
          background: rgba(27,154,214,0.1);
          padding: 5px 16px; border-radius: 100px;
          letter-spacing: 0.16em;
        }

        /* Stats strip */
        .ft-panel-stats {
          display: flex; align-items: center; gap: 20px;
          margin-bottom: 4px;
        }
        .ft-pstat { display: flex; flex-direction: column; gap: 3px; }
        .ft-pstat-n {
          font-family: var(--font-space); font-size: 28px; font-weight: 800;
          color: #1a1f4e; letter-spacing: -0.03em; line-height: 1;
        }
        .ft-pstat-l {
          font-family: var(--font-inter); font-size: 11px;
          color: rgba(26,31,78,0.5); letter-spacing: 0.05em;
        }
        .ft-pstat-div {
          width: 1px; height: 36px;
          background: rgba(26,31,78,0.15);
          flex-shrink: 0;
        }

        /* Heading */
        .ft-panel-h2 {
          font-family: var(--font-space);
          font-size: clamp(24px, 2.4vw, 38px);
          font-weight: 800; line-height: 1.15; letter-spacing: -0.02em;
          margin: 0;
        }
        .ft-panel-h2-dark { color: #1a1f4e; }

        /* Sub */
        .ft-panel-sub {
          font-family: var(--font-inter); font-size: 15px; line-height: 1.7;
          margin: 0; max-width: 400px;
        }
        .ft-panel-sub-dark { color: rgba(26,31,78,0.65); }

        /* Button */
        .ft-panel-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-space); font-size: 14px; font-weight: 700;
          padding: 14px 32px; border-radius: 100px;
          letter-spacing: 0.03em; margin-top: 4px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ft-panel-btn-dark:hover { transform: translateY(-3px); box-shadow: 0 0 20px rgba(192,244,60,0.35), 0 12px 32px rgba(0,0,0,0.25); }
        .ft-panel-btn-lime:hover { transform: translateY(-3px); box-shadow: 0 0 24px rgba(192,244,60,0.55), 0 12px 32px rgba(192,244,60,0.2); }
        .ft-panel-btn-dark { background: #1a1f4e; color: #c0f43c; }
        .ft-panel-btn-lime { background: #c0f43c; color: #1a1f4e; }

        /* ── Separator ── */
        .ft-separator {
          height: 2px;
          background: linear-gradient(to right, transparent 0%, #1b9ad6 30%, #c0f43c 70%, transparent 100%);
        }

        /* ── Footer body ── */
        .ft-body {
          background: #111827;
          padding: 64px 0 0;
        }

        /* ══ Main two-column row ══ */
        .ft-main-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: flex-start;
          padding-bottom: 52px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 0;
        }

        /* ── LEFT ── */
        .ft-vdivider-sm {
          width: 1px; height: 64px;
          background: rgba(255,255,255,0.18);
          flex-shrink: 0;
        }

        .ft-date-block { display: flex; flex-direction: column; gap: 4px; }
        .ft-date-country {
          font-family: var(--font-space); font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 800; color: #1b9ad6;
          letter-spacing: 0.02em; text-transform: uppercase; line-height: 1;
        }
        .ft-date-dates {
          font-family: var(--font-space); font-size: clamp(18px, 2.2vw, 28px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.01em; line-height: 1.1;
        }
        .ft-date-city {
          font-family: var(--font-space); font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700; color: #fff;
          letter-spacing: 0.04em; text-transform: uppercase; line-height: 1;
        }

        /* ── RIGHT ── */
        .ft-event-by {
          font-family: var(--font-inter); font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,0.72);
          letter-spacing: 0.08em;
          margin-bottom: 14px;
        }
        .ft-trescon-row {
          display: flex; align-items: center; gap: 20px;
          margin-bottom: 24px;
        }
        .ft-trescon-tagline {
          font-family: var(--font-space); font-size: clamp(14px, 1.4vw, 18px);
          font-weight: 700; color: #fff; line-height: 1.35;
        }
        .ft-address {
          font-size: 14px; color: rgba(255,255,255,0.72);
          line-height: 1.7; margin-bottom: 16px;
        }
        .ft-contact-line {
          display: flex; align-items: center; gap: 8px;
          flex-wrap: wrap; margin-bottom: 24px;
        }
        .ft-contact-label {
          font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.5);
        }
        .ft-contact-val {
          font-size: 14px; color: #1b9ad6; font-weight: 500;
          transition: color 0.18s;
        }
        .ft-contact-val:hover { color: #5ec5f5; }
        .ft-contact-sep {
          font-size: 14px; color: rgba(255,255,255,0.45); margin: 0 4px;
        }

        /* Socials */
        .ft-socials { display: flex; gap: 10px; }
        .ft-social {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.75);
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .ft-social:hover {
          background: rgba(27,154,214,0.2);
          border-color: rgba(27,154,214,0.6);
          color: #fff;
          box-shadow: 0 0 14px rgba(27,154,214,0.4);
        }

        /* ── Bottom bar ── */
        .ft-bottom {
          padding: 20px 0 28px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
          position: relative;
        }
        .ft-copy {
          font-size: 13px; color: rgba(255,255,255,0.72);
        }
        .ft-legal {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
        }
        .ft-legal-link {
          font-size: 13px; color: rgba(255,255,255,0.55);
          transition: color 0.18s;
        }
        .ft-legal-link:hover { color: #fff; }
        .ft-legal-sep {
          font-size: 13px; color: rgba(255,255,255,0.2);
        }

        /* Scroll to top */
        .ft-totop {
          width: 40px; height: 40px;
          background: #1b9ad6;
          border: none; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: background 0.18s, transform 0.18s;
        }
        .ft-totop:hover { background: #1588bf; transform: translateY(-2px); box-shadow: 0 0 16px rgba(27,154,214,0.5); }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .ft-main-row { grid-template-columns: 1fr; gap: 48px; }
          .ft-strip { grid-template-columns: 1fr; }
          .ft-panel-inner { padding: 60px 40px; }
        }
        @media (max-width: 640px) {
          .ft-container { padding: 0 20px; }
          .ft-panel-inner { padding: 48px 24px; gap: 16px; }
          .ft-panel-h2 { font-size: clamp(22px, 6vw, 30px); }
          .ft-pstat-n { font-size: 22px; }
          .ft-trescon-row { flex-wrap: wrap; }
          .ft-vdivider-sm { display: none; }
          .ft-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
          .ft-totop { position: absolute; top: 20px; right: 0; }
        }
      `}</style>
    </footer>
  );
}
