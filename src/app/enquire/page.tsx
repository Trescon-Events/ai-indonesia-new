"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    hbspt?: { forms: { create: (o: Record<string, unknown>) => void } };
  }
}

// ── SWAP FORM IDs when HubSpot forms are ready ────────────────────────────────
const PORTAL_ID = "2953901";
const CATEGORIES: Record<string, { formId: string; label: string; sub: string }> = {
  sponsor:      { formId: "a3ac7564-004b-4b6b-83e9-e73a45726fc9", label: "Sponsor",       sub: "Position your brand in front of 1,000+ regional decision-makers." },
  exhibit:      { formId: "EXHIBIT_FORM_ID_HERE",                  label: "Exhibit",        sub: "Showcase your products and solutions on the exhibition floor." },
  // speaker:      { formId: "SPEAKER_FORM_ID_HERE",                  label: "Speaker",        sub: "Share your expertise and thought leadership at the main stage." },
  // mediapartner: { formId: "MEDIA_FORM_ID_HERE",                    label: "Media / Partner", sub: "Collaborate with us as a media outlet or strategic partner." },
};
// ─────────────────────────────────────────────────────────────────────────────

const categoryCards = [
  { key: "sponsor",      label: "Sponsor",        color: "#a78bfa", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { key: "exhibit",      label: "Exhibit",         color: "#1b9ad6", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  // { key: "speaker",      label: "Speaker",         color: "#c0f43c", icon: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" },
  // { key: "mediapartner", label: "Media / Partner", color: "#fb923c", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M9 11a4 4 0 100-8 4 4 0 000 8zM16 3.13a4 4 0 010 7.75" },
];

const stats = [
  { n: "1,000+", l: "Attendees" },
  { n: "40+",    l: "Speakers"  },
  { n: "40+",    l: "Sponsors & Exhibitors" },
  { n: "2",      l: "Days"      },
];

const streams = [
  { top: "15%", delay: 0,   dur: 8  },
  { top: "40%", delay: 1.5, dur: 10 },
  { top: "65%", delay: 0.7, dur: 7  },
  { top: "85%", delay: 2.2, dur: 9  },
];

export default function EnquirePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const loadedForms = useRef<Set<string>>(new Set());
  const hsLoaded    = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Load HubSpot script once
  useEffect(() => {
    if (hsLoaded.current) return;
    hsLoaded.current = true;
    if (!window.hbspt) {
      const s = document.createElement("script");
      s.src = "https://js.hsforms.net/forms/v2.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  // Load correct form when category selected
  useEffect(() => {
    if (!selected) return;
    const targetId = `hs-eq-form-${selected}`;
    const tryCreate = () => {
      if (!window.hbspt) { setTimeout(tryCreate, 200); return; }
      if (loadedForms.current.has(selected)) return;
      loadedForms.current.add(selected);
      window.hbspt!.forms.create({
        portalId: PORTAL_ID,
        formId: CATEGORIES[selected].formId,
        target: `#${targetId}`,
        cssRequired: "",
      });
    };
    tryCreate();
  }, [selected]);

  return (
    <div className="eq-page">

      {/* Background layers */}
      <div className="eq-grid-bg" />
      <div className="eq-glow-tl" />
      <div className="eq-glow-br" />

      {/* Flowing streams */}
      <div className="eq-streams" aria-hidden="true">
        {streams.map((s, i) => (
          <div key={i} className="eq-stream" style={{ top: s.top, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }} />
        ))}
      </div>

      {/* Rising particles */}
      {[...Array(8)].map((_, i) => {
        const clr = ["#1b9ad6","#c0f43c","#a78bfa","#fb923c"][i % 4];
        return <div key={i} className="eq-particle" style={{ left: `${10 + i * 11}%`, background: clr, animationDelay: `${i * 0.8}s`, animationDuration: `${8 + i}s` }} />;
      })}

      {/* ── Main layout ── */}
      <div className="eq-wrap">

        {/* LEFT */}
        <div className="eq-left">

          <Link href="/" className={`eq-back${mounted ? " eq-in" : ""}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Home
          </Link>

          <div className={`eq-eyebrow${mounted ? " eq-in" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <span className="eq-dot" />
            World AI Show Indonesia 2026
          </div>

          <h1 className={`eq-h1${mounted ? " eq-in" : ""}`} style={{ transitionDelay: "0.18s" }}>
            Let&apos;s Build<br/>
            Something<br/>
            <span className="eq-grad">Together</span>
          </h1>

          <p className={`eq-sub${mounted ? " eq-in" : ""}`} style={{ transitionDelay: "0.28s" }}>
            Whether you&apos;re looking to attend, speak, sponsor, or partner — our team will find you the right opportunity.
          </p>

          {/* Contact */}
          <div className={`eq-contacts${mounted ? " eq-in" : ""}`} style={{ transitionDelay: "0.52s" }}>
            <a href="mailto:info@worldaishow.com" className="eq-contact">
              <div className="eq-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#1b9ad6" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="#1b9ad6" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <div className="eq-contact-lbl">General</div>
                <div className="eq-contact-val">info@worldaishow.com</div>
              </div>
            </a>
            <a href="mailto:sponsors@worldaishow.com" className="eq-contact">
              <div className="eq-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#a78bfa" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="#a78bfa" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <div className="eq-contact-lbl">Sponsorship</div>
                <div className="eq-contact-val">sponsors@worldaishow.com</div>
              </div>
            </a>
            <div className="eq-location">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#c0f43c" strokeWidth="2"/>
                <circle cx="12" cy="9" r="2.5" stroke="#c0f43c" strokeWidth="2"/>
              </svg>
              <span>Jakarta, Indonesia · 7–8 July 2026</span>
            </div>
          </div>

        </div>

        {/* RIGHT — form */}
        <div className={`eq-form-wrap${mounted ? " eq-in" : ""}`} style={{ transitionDelay: "0.12s" }}>
          <div className="eq-form-glow" />
          <div className="eq-form-inner">

            {/* Step label */}
            <div className="eq-step-label">
              <span className="eq-step-num">1</span>
              I am enquiring as a…
            </div>

            {/* Category selector */}
            <div className="eq-cat-grid">
              {categoryCards.map((card) => {
                const isActive = selected === card.key;
                return (
                  <button
                    key={card.key}
                    className={`eq-cat-card${isActive ? " eq-cat-card--active" : ""}`}
                    style={{
                      borderColor: isActive ? card.color : "rgba(255,255,255,0.1)",
                      background:  isActive ? card.color + "18" : "rgba(255,255,255,0.03)",
                    }}
                    onClick={() => setSelected(card.key)}
                  >
                    <div className="eq-cat-icon" style={{ color: card.color }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d={card.icon}/>
                      </svg>
                    </div>
                    <div className="eq-cat-label">{card.label}</div>
                    {isActive && (
                      <div className="eq-cat-check" style={{ background: card.color }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="#060b24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider + step 2 */}
            {selected && (
              <div className="eq-divider">
                <div className="eq-divider-line" />
                <div className="eq-step-label" style={{ margin: 0 }}>
                  <span className="eq-step-num">2</span>
                  Fill in your details
                </div>
                <div className="eq-divider-line" />
              </div>
            )}

            {/* Form area — one per category */}
            {selected ? (
              <div>
                <div className="eq-form-head" style={{ marginBottom: 20 }}>
                  <div className="eq-form-title">{CATEGORIES[selected].label}</div>
                  <p className="eq-form-sub">{CATEGORIES[selected].sub}</p>
                </div>
                <div id={`hs-eq-form-${selected}`} />
              </div>
            ) : (
              <div className="eq-prompt">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Select a category above to load your enquiry form</p>
              </div>
            )}

          </div>
        </div>

      </div>

      <style>{`
        .eq-page {
          min-height: 100vh;
          background: #060b24;
          position: relative; overflow: hidden;
          display: flex; align-items: stretch;
        }

        /* Background */
        .eq-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(rgba(27,154,214,0.09) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 100%);
        }
        .eq-glow-tl {
          position: fixed; top: -160px; left: -160px; width: 520px; height: 520px;
          border-radius: 50%; pointer-events: none; z-index: 0;
          background: radial-gradient(circle, rgba(27,154,214,0.14) 0%, transparent 70%);
        }
        .eq-glow-br {
          position: fixed; bottom: -160px; right: -160px; width: 480px; height: 480px;
          border-radius: 50%; pointer-events: none; z-index: 0;
          background: radial-gradient(circle, rgba(192,244,60,0.08) 0%, transparent 70%);
        }

        /* Streams */
        .eq-streams { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .eq-stream {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(27,154,214,0.2) 30%, rgba(192,244,60,0.28) 60%, transparent 100%);
          animation: eq-flow linear infinite;
        }
        @keyframes eq-flow { from { transform: translateX(-100%); } to { transform: translateX(200%); } }

        /* Particles */
        .eq-particle {
          position: fixed; bottom: 0; width: 3px; height: 3px; border-radius: 50%;
          opacity: 0; pointer-events: none; z-index: 0;
          animation: eq-rise linear infinite;
        }
        @keyframes eq-rise {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.45; }
          88%  { opacity: 0.12; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        /* ── Main wrap ── */
        .eq-wrap {
          position: relative; z-index: 2;
          width: 100%; max-width: 1320px; margin: 0 auto;
          padding: 100px 48px 80px;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 56px;
          align-items: center;
          min-height: 100vh;
        }

        /* ── LEFT ── */
        .eq-left {
          display: flex; flex-direction: column; gap: 28px;
          align-self: flex-start;
          padding-top: 24px;
        }

        /* Reveal */
        .eq-back, .eq-eyebrow, .eq-h1, .eq-sub, .eq-tags, .eq-stats, .eq-contacts, .eq-form-wrap {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .eq-in { opacity: 1 !important; transform: none !important; }

        .eq-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-space); font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.4); text-decoration: none; letter-spacing: 0.08em;
          transition: color 0.2s, opacity 0.7s ease, transform 0.7s ease !important;
          width: fit-content;
        }
        .eq-back:hover { color: rgba(255,255,255,0.8); }

        .eq-eyebrow {
          display: inline-flex; align-items: center; gap: 10px; width: fit-content;
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #1b9ad6;
          border: 1px solid rgba(27,154,214,0.3); padding: 5px 16px; border-radius: 100px;
        }
        .eq-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #1b9ad6; box-shadow: 0 0 8px #1b9ad6;
          animation: eq-blink 2s ease-in-out infinite; flex-shrink: 0;
        }
        @keyframes eq-blink { 0%,100%{opacity:1} 50%{opacity:0.25} }

        .eq-h1 {
          font-family: var(--font-space);
          font-size: clamp(44px, 5.5vw, 80px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.04em; line-height: 1.05; margin: 0;
        }
        .eq-grad {
          background: linear-gradient(100deg, #1b9ad6 0%, #c0f43c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .eq-sub {
          font-family: var(--font-inter); font-size: 16px; line-height: 1.75;
          color: rgba(255,255,255,0.5); margin: 0; max-width: 420px;
        }

        /* Tags */
        .eq-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .eq-tag {
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          border: 1px solid; padding: 6px 16px; border-radius: 100px;
        }

        /* Stats */
        .eq-stats {
          display: flex; gap: 0;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; overflow: hidden;
          background: rgba(255,255,255,0.03);
          width: fit-content;
        }
        .eq-stat {
          display: flex; flex-direction: column; align-items: center;
          padding: 16px 28px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .eq-stat:last-child { border-right: none; }
        .eq-stat-n {
          font-family: var(--font-space); font-size: 22px; font-weight: 800;
          color: #c0f43c; letter-spacing: -0.02em; line-height: 1;
        }
        .eq-stat-l {
          font-family: var(--font-inter); font-size: 11px;
          color: rgba(255,255,255,0.35); margin-top: 4px;
        }

        /* Contacts */
        .eq-contacts { display: flex; flex-direction: column; gap: 10px; }
        .eq-contact {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none;
          padding: 14px 18px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          transition: border-color 0.2s, background 0.2s;
        }
        .eq-contact:hover { border-color: rgba(27,154,214,0.3); background: rgba(27,154,214,0.05); }
        .eq-contact-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .eq-contact-lbl {
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 3px;
        }
        .eq-contact-val {
          font-family: var(--font-inter); font-size: 15px; color: #fff; font-weight: 500;
        }
        .eq-location {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 14px; font-weight: 600;
          color: rgba(255,255,255,0.7); letter-spacing: 0.05em;
          padding: 0 4px;
        }

        /* ── RIGHT — form ── */
        .eq-form-wrap {
          position: relative;
        }
        .eq-form-glow {
          position: absolute; top: -60px; right: -60px;
          width: 300px; height: 300px; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(192,244,60,0.08) 0%, transparent 70%);
        }
        .eq-form-inner {
          position: relative;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 28px;
          padding: 40px 44px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .eq-form-head { margin-bottom: 32px; }
        .eq-form-title {
          font-family: var(--font-space); font-size: 26px; font-weight: 800;
          color: #fff; margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .eq-form-sub {
          font-family: var(--font-inter); font-size: 13px;
          color: rgba(255,255,255,0.35); line-height: 1.5; margin: 0;
        }

        /* HubSpot overrides — applies to all category forms */
        .eq-form-inner .hs-form fieldset {
          max-width: 100% !important; border: none !important;
          padding: 0 !important; margin: 0 !important; box-shadow: none !important;
        }
        .eq-form-inner .hs-form { border: none !important; box-shadow: none !important; background: transparent !important; }
        .eq-form-inner .hs-form .hs-form-field label {
          font-family: var(--font-space) !important; font-size: 10px !important; font-weight: 700 !important;
          color: rgba(255,255,255,0.55) !important; text-transform: uppercase !important;
          letter-spacing: 0.12em !important; margin-bottom: 7px !important; display: block !important;
        }
        .eq-form-inner .hs-form input[type="text"],
        .eq-form-inner .hs-form input[type="email"],
        .eq-form-inner .hs-form input[type="tel"],
        .eq-form-inner .hs-form select,
        .eq-form-inner .hs-form textarea {
          width: 100% !important; background: rgba(255,255,255,0.08) !important;
          border: 1.5px solid rgba(255,255,255,0.15) !important; border-radius: 12px !important;
          padding: 13px 16px !important; font-family: var(--font-inter) !important;
          font-size: 14px !important; color: #fff !important;
          outline: none !important; box-shadow: none !important; transition: border-color 0.2s !important;
        }
        .eq-form-inner .hs-form input::placeholder { color: rgba(255,255,255,0.25) !important; }
        .eq-form-inner .hs-form input:focus,
        .eq-form-inner .hs-form select:focus,
        .eq-form-inner .hs-form textarea:focus { border-color: rgba(192,244,60,0.55) !important; background: rgba(255,255,255,0.11) !important; }
        .eq-form-inner .hs-form select option { background: #0d1230; color: #fff; }
        .eq-form-inner .hs-form textarea { resize: vertical !important; min-height: 90px !important; }
        .eq-form-inner .hs-form .hs-form-field { margin-bottom: 14px !important; }
        .eq-form-inner .hs-form .hs-submit input[type="submit"],
        .eq-form-inner .hs-form .hs-button {
          width: 100% !important;
          background: linear-gradient(100deg, #1b9ad6 0%, #c0f43c 100%) !important;
          border: none !important; border-radius: 100px !important; padding: 15px !important;
          font-family: var(--font-space) !important; font-size: 15px !important;
          font-weight: 700 !important; color: #060b24 !important; cursor: pointer !important;
          letter-spacing: 0.03em !important; margin-top: 10px !important;
          transition: opacity 0.2s, transform 0.2s !important;
          box-shadow: 0 4px 20px rgba(27,154,214,0.3) !important;
        }
        .eq-form-inner .hs-form .hs-button:hover { opacity: 0.88 !important; transform: translateY(-1px) !important; }
        .eq-form-inner .hs-form .hs-error-msgs { margin-top: 4px !important; }
        .eq-form-inner .hs-form .hs-error-msgs label {
          color: #fb923c !important; font-size: 11px !important;
          text-transform: none !important; letter-spacing: 0 !important;
        }

        /* Category selector */
        .eq-step-label {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.14em;
          margin-bottom: 14px;
        }
        .eq-step-num {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(192,244,60,0.15); border: 1px solid rgba(192,244,60,0.35);
          color: #c0f43c; font-size: 11px; font-weight: 800;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .eq-cat-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
          margin-bottom: 24px;
        }
        .eq-cat-card {
          position: relative;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          gap: 8px; padding: 18px 10px;
          border: 1.5px solid; border-radius: 14px;
          cursor: pointer; transition: border-color 0.2s, background 0.2s, transform 0.15s;
        }
        .eq-cat-card:hover { transform: translateY(-2px); }
        .eq-cat-label {
          font-family: var(--font-space); font-size: 12px; font-weight: 700;
          color: #fff; letter-spacing: 0.01em; line-height: 1.2;
        }
        .eq-cat-check {
          position: absolute; top: 7px; right: 7px;
          width: 17px; height: 17px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .eq-divider {
          display: flex; align-items: center; gap: 14px; margin-bottom: 22px;
        }
        .eq-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
        .eq-prompt {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          padding: 32px 0; text-align: center;
        }
        .eq-prompt p {
          font-family: var(--font-inter); font-size: 13px;
          color: rgba(255,255,255,0.22); margin: 0; max-width: 220px; line-height: 1.6;
        }

        /* Checkbox / radio groups */
        .eq-form-inner .hs-form .inputs-list {
          list-style: none !important; padding: 0 !important; margin: 4px 0 0 !important;
          display: flex !important; flex-direction: column !important; gap: 10px !important;
        }
        .eq-form-inner .hs-form .inputs-list li {
          display: flex !important; align-items: center !important; gap: 0 !important;
        }
        .eq-form-inner .hs-form .inputs-list label {
          display: flex !important; align-items: center !important; gap: 10px !important;
          font-family: var(--font-inter) !important; font-size: 14px !important; font-weight: 400 !important;
          color: rgba(255,255,255,0.85) !important; text-transform: none !important;
          letter-spacing: 0 !important; cursor: pointer !important; margin-bottom: 0 !important;
          line-height: 1.4 !important;
        }
        .eq-form-inner .hs-form .inputs-list input[type="checkbox"],
        .eq-form-inner .hs-form .inputs-list input[type="radio"] {
          width: 18px !important; height: 18px !important; min-width: 18px !important;
          background: rgba(255,255,255,0.07) !important;
          border: 1.5px solid rgba(255,255,255,0.2) !important;
          border-radius: 5px !important; cursor: pointer !important;
          accent-color: #c0f43c !important;
          flex-shrink: 0 !important; margin: 0 !important; padding: 0 !important;
        }
        .eq-form-inner .submitted-message {
          font-family: var(--font-inter) !important; color: #c0f43c !important;
          font-size: 16px !important; text-align: center !important; padding: 32px 0 !important;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .eq-wrap { grid-template-columns: 1fr; gap: 48px; padding: 100px 40px 80px; min-height: unset; }
          .eq-h1 { font-size: clamp(40px, 8vw, 64px); }
        }
        @media (max-width: 640px) {
          .eq-wrap { padding: 100px 24px 60px; }
          .eq-form-inner { padding: 32px 24px; }
          .eq-stat { padding: 14px 18px; }
        }
      `}</style>
    </div>
  );
}
