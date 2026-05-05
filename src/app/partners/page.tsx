"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { tiers, Sponsor } from "@/data/sponsors";

type ModalSponsor = Sponsor & { tierLabel: string; tierColor: string; tierColorRgb: string };

export default function PartnersPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<ModalSponsor | null>(null);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("pt-in"); }),
      { threshold: 0.06 }
    );
    el.querySelectorAll(".pt-reveal").forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="pt-page" ref={rootRef}>

      {/* Fixed background */}
      <div className="pt-grid-bg" />
      <div className="pt-glow-tl" />
      <div className="pt-glow-br" />
      {[...Array(10)].map((_, i) => {
        const clr = ["#1b9ad6","#a78bfa","#c0f43c","#f59e0b"][i % 4];
        return <div key={i} className="pt-particle" style={{ left: `${8 + i * 9}%`, background: clr, animationDelay: `${i * 0.7}s`, animationDuration: `${9 + (i % 4)}s` }} />;
      })}

      {/* ── Hero ── */}
      <div className="pt-hero">

        <div className="pt-eyebrow pt-reveal" style={{ transitionDelay: "0.08s" }}>
          <span className="pt-eye-dot" />
          Partners &amp; Sponsors
        </div>

        <h1 className="pt-h1 pt-reveal" style={{ transitionDelay: "0.16s" }}>
          The Brands Powering<br/>
          <span className="pt-grad">Indonesia&apos;s AI Future</span>
        </h1>

        <p className="pt-sub pt-reveal" style={{ transitionDelay: "0.26s" }}>
          World AI Show Indonesia 2026 is backed by global and regional technology leaders driving Southeast Asia's AI transformation.
        </p>

        <Link href="/enquire" className="pt-cta pt-reveal" style={{ transitionDelay: "0.34s" }}>
          Become a Sponsor
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* ── Tier sections ── */}
      <div className="pt-tiers">
        {tiers.map((tier, ti) => (
          <div
            key={tier.key}
            className={`pt-tier pt-tier-${tier.key} pt-reveal`}
            style={{ transitionDelay: `${ti * 0.08}s` }}
          >
            {/* Coloured ambient band */}
            <div className="pt-tier-band" style={{ background: `radial-gradient(ellipse 70% 100% at 0% 50%, rgba(${tier.colorRgb},0.12) 0%, transparent 70%)` }} />

            <div className="pt-tier-inner">
              {/* Left label column */}
              <div className="pt-tier-label">
                <div className="pt-tier-pill" style={{ color: tier.color, borderColor: `rgba(${tier.colorRgb},0.4)`, background: `rgba(${tier.colorRgb},0.1)` }}>
                  <span className="pt-tier-dot" style={{ background: tier.color, boxShadow: `0 0 10px ${tier.color}` }} />
                  {tier.label}
                </div>
                <p className="pt-tier-desc">{tier.description}</p>
                <div className="pt-tier-line" style={{ background: `linear-gradient(to bottom, ${tier.color}88, transparent)` }} />
              </div>

              {/* Right cards column */}
              <div className={`pt-cards pt-cards-${tier.key}`}>
                {tier.sponsors.length > 0 ? tier.sponsors.map((s) => (
                  <div
                    key={s.name}
                    className="pt-card"
                    style={{
                      borderColor: `rgba(${tier.colorRgb},0.25)`,
                      boxShadow: `0 0 0 0 rgba(${tier.colorRgb},0)`,
                      cursor: s.description ? "pointer" : "default",
                    }}
                    onClick={() => s.description && setModal({ ...s, tierLabel: tier.label, tierColor: tier.color, tierColorRgb: tier.colorRgb })}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px rgba(${tier.colorRgb},0.2), 0 0 0 1px rgba(${tier.colorRgb},0.35)`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 rgba(${tier.colorRgb},0)`; }}
                  >
                    <div className="pt-card-shine" style={{ background: `linear-gradient(135deg, rgba(${tier.colorRgb},0.08) 0%, transparent 60%)` }} />
                    <div className="pt-card-top-bar" style={{ background: `linear-gradient(90deg, ${tier.color}, rgba(${tier.colorRgb},0.3))` }} />
                    <div className="pt-logo-bg">
                      <div className="pt-logo-wrap" style={{ width: s.logoW, height: s.logoH }}>
                        <Image src={s.logo} alt={s.name} fill style={{ objectFit: "contain" }} />
                      </div>
                    </div>
                    {s.description && (
                      <div className="pt-card-hint" style={{ color: tier.color }}>
                        View Profile
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                )) : (
                  <Link href="/enquire" className="pt-available" style={{ borderColor: `rgba(${tier.colorRgb},0.3)`, background: `rgba(${tier.colorRgb},0.04)` }}>
                    <div className="pt-available-dot" style={{ background: tier.color, boxShadow: `0 0 12px ${tier.color}` }} />
                    <span className="pt-available-text" style={{ color: tier.color }}>Opportunities Available</span>
                    <span className="pt-available-sub">Enquire to secure this partnership</span>
                    <span className="pt-available-arrow" style={{ color: tier.color }}>
                      Enquire Now
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="pt-bottom pt-reveal">
        <div className="pt-bottom-glow" />
        <div className="pt-bottom-inner">
          <div className="pt-bottom-eye">
            <span className="pt-eye-dot" style={{ background: "#c0f43c", boxShadow: "0 0 8px #c0f43c" }} />
            Limited Opportunities Available
          </div>
          <h2 className="pt-bottom-h2">Ready to Partner With<br/><span className="pt-grad">World AI Show Indonesia?</span></h2>
          <p className="pt-bottom-sub">Join global technology leaders in reaching 3,000+ AI decision-makers across Southeast Asia.</p>
          <Link href="/enquire" className="pt-cta">
            Enquire About Sponsorship
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Sponsor modal ── */}
      {modal && (
        <div className="pt-modal-backdrop" onClick={() => setModal(null)}>
          <div className="pt-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pt-modal-close" onClick={() => setModal(null)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Top bar */}
            <div className="pt-modal-bar" style={{ background: modal.tierColor }} />

            {/* Logo */}
            <div className="pt-modal-logo-wrap">
              <div style={{ position: "relative", width: modal.logoW, height: modal.logoH, maxWidth: "100%" }}>
                <Image src={modal.logo} alt={modal.name} fill style={{ objectFit: "contain" }} />
              </div>
            </div>

            {/* Tier badge */}
            <div className="pt-modal-tier" style={{ color: modal.tierColor, borderColor: `rgba(${modal.tierColorRgb},0.4)`, background: `rgba(${modal.tierColorRgb},0.1)` }}>
              <span className="pt-modal-tier-dot" style={{ background: modal.tierColor }} />
              {modal.tierLabel}
            </div>

            {/* Name + tagline */}
            <h3 className="pt-modal-name">{modal.name}</h3>
            {modal.tagline && <p className="pt-modal-tagline" style={{ color: modal.tierColor }}>{modal.tagline}</p>}

            {/* Description */}
            <p className="pt-modal-desc">{modal.description}</p>

            {/* Website */}
            {modal.website && (
              <a href={modal.website} target="_blank" rel="noopener noreferrer" className="pt-modal-link" style={{ background: modal.tierColor }}>
                Visit Website
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      )}

      <style>{`
        .pt-page {
          background: #060b24;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Background */
        .pt-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(rgba(27,154,214,0.09) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 40%, black 20%, transparent 100%);
        }
        .pt-glow-tl {
          position: fixed; top: -160px; left: -160px; width: 600px; height: 600px;
          border-radius: 50%; pointer-events: none; z-index: 0;
          background: radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%);
        }
        .pt-glow-br {
          position: fixed; bottom: -160px; right: -160px; width: 560px; height: 560px;
          border-radius: 50%; pointer-events: none; z-index: 0;
          background: radial-gradient(circle, rgba(192,244,60,0.08) 0%, transparent 70%);
        }
        .pt-particle {
          position: fixed; bottom: 0; width: 3px; height: 3px; border-radius: 50%;
          opacity: 0; pointer-events: none; z-index: 0;
          animation: pt-rise linear infinite;
        }
        @keyframes pt-rise {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.4; }
          88%  { opacity: 0.1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        /* Reveal */
        .pt-reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .pt-in { opacity: 1 !important; transform: none !important; }

        /* ── Hero ── */
        .pt-hero {
          position: relative; z-index: 2;
          max-width: 860px; margin: 0 auto;
          padding: 120px 48px 72px;
          display: flex; flex-direction: column; gap: 22px;
        }
        .pt-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-space); font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.4); text-decoration: none; letter-spacing: 0.08em;
          width: fit-content; transition: color 0.2s;
        }
        .pt-back:hover { color: rgba(255,255,255,0.8); }
        .pt-eyebrow {
          display: inline-flex; align-items: center; gap: 10px; width: fit-content;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #1b9ad6;
          border: 1px solid rgba(27,154,214,0.35); padding: 6px 20px; border-radius: 100px;
          background: rgba(27,154,214,0.06);
        }
        .pt-eye-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
          animation: pt-blink 2s ease-in-out infinite;
        }
        @keyframes pt-blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        .pt-h1 {
          font-family: var(--font-space);
          font-size: clamp(38px, 5vw, 72px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.03em; line-height: 1.08; margin: 0;
        }
        .pt-grad {
          background: linear-gradient(100deg, #a78bfa 0%, #1b9ad6 50%, #c0f43c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pt-sub {
          font-family: var(--font-inter); font-size: 17px; line-height: 1.75;
          color: rgba(255,255,255,0.55); max-width: 600px; margin: 0;
        }
        .pt-cta {
          display: inline-flex; align-items: center; gap: 10px; width: fit-content;
          font-family: var(--font-space); font-size: 14px; font-weight: 700;
          background: #c0f43c; color: #1a1f4e; text-decoration: none;
          padding: 14px 30px; border-radius: 100px; letter-spacing: 0.03em;
          transition: opacity 0.2s, transform 0.2s;
        }
        .pt-cta:hover { opacity: 0.88; transform: translateY(-2px); }

        /* ── Tiers ── */
        .pt-tiers {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          padding: 0 48px 100px;
          display: flex; flex-direction: column; gap: 4px;
        }

        /* Tier row */
        .pt-tier {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          padding: 48px 52px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          margin-bottom: 20px;
          transition: border-color 0.3s;
        }
        .pt-tier:hover { border-color: rgba(255,255,255,0.12); }

        /* Lead tier gets special treatment */
        .pt-tier-lead {
          background: rgba(167,139,250,0.04);
          border-color: rgba(167,139,250,0.2) !important;
        }

        .pt-tier-band {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
        }

        .pt-tier-inner {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 48px;
          align-items: center;
        }

        /* Label column */
        .pt-tier-label {
          display: flex; flex-direction: column; gap: 14px;
        }
        .pt-tier-pill {
          display: inline-flex; align-items: center; gap: 8px; width: fit-content;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          border: 1px solid; padding: 7px 18px; border-radius: 100px;
        }
        .pt-tier-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .pt-tier-desc {
          font-family: var(--font-inter); font-size: 14px; line-height: 1.65;
          color: rgba(255,255,255,0.5); margin: 0;
        }
        .pt-tier-line {
          width: 2px; height: 40px; border-radius: 2px;
          align-self: flex-start;
        }

        /* Cards column */
        .pt-cards {
          display: flex; flex-wrap: wrap; gap: 20px; align-items: center;
        }
        .pt-cards-lead    { justify-content: center; }
        .pt-cards-gold    { justify-content: center; }
        .pt-cards-silver  { justify-content: center; }
        .pt-cards-exhibitor {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
        }
        .pt-cards-association { justify-content: flex-start; }

        /* Individual card */
        .pt-card {
          position: relative;
          border: 1px solid;
          border-radius: 18px;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          padding: 0;
          transition: transform 0.22s, box-shadow 0.22s;
          cursor: default;
        }
        .pt-card:hover { transform: translateY(-4px); box-shadow: 0 0 0 1px rgba(27,154,214,0.20), 0 0 20px rgba(27,154,214,0.20), 0 12px 36px rgba(0,0,0,0.2); }

        /* Lead card: prominently large */
        .pt-cards-lead .pt-card    { min-width: 400px; min-height: 180px; }
        .pt-cards-gold .pt-card    { min-width: 260px; min-height: 150px; }
        .pt-cards-silver .pt-card  { min-width: 260px; min-height: 140px; }
        .pt-cards-exhibitor .pt-card { min-height: 110px; }
        .pt-cards-association .pt-card { min-width: 260px; min-height: 140px; }

        .pt-card-shine {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
        }
        .pt-card-top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 2;
        }

        /* White logo panel */
        .pt-logo-bg {
          position: relative; z-index: 1;
          background: #fff;
          border-radius: 14px;
          padding: 18px 28px;
          display: flex; align-items: center; justify-content: center;
          margin: 16px;
        }
        .pt-cards-exhibitor .pt-logo-bg {
          padding: 12px 16px; margin: 12px;
        }
        .pt-cards-lead .pt-logo-bg {
          padding: 24px 40px; margin: 24px;
        }

        .pt-logo-wrap { position: relative; flex-shrink: 0; }

        /* Available placeholder */
        .pt-available {
          display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
          border: 1px dashed; border-radius: 18px;
          padding: 28px 32px; text-decoration: none;
          min-width: 260px; min-height: 130px; justify-content: center;
          transition: background 0.2s, transform 0.2s;
        }
        .pt-available:hover { transform: translateY(-3px); }
        .pt-available-dot {
          width: 10px; height: 10px; border-radius: 50%;
          animation: pt-blink 2s ease-in-out infinite;
        }
        .pt-available-text {
          font-family: var(--font-space); font-size: 13px; font-weight: 700;
          letter-spacing: 0.06em;
        }
        .pt-available-sub {
          font-family: var(--font-inter); font-size: 13px;
          color: rgba(255,255,255,0.4); line-height: 1.5;
        }
        .pt-available-arrow {
          display: inline-flex; align-items: center; gap: 6px; margin-top: 4px;
          font-family: var(--font-space); font-size: 12px; font-weight: 700;
          letter-spacing: 0.06em;
        }

        /* ── Bottom CTA ── */
        .pt-bottom {
          position: relative; z-index: 2; overflow: hidden;
          background: linear-gradient(135deg, rgba(167,139,250,0.06) 0%, rgba(192,244,60,0.04) 100%);
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 90px 48px 80px;
          text-align: center;
          margin: 0 48px 60px;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .pt-bottom-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(192,244,60,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .pt-bottom-inner {
          position: relative; z-index: 1;
          max-width: 640px; margin: 0 auto;
          display: flex; flex-direction: column; align-items: center; gap: 20px;
        }
        .pt-bottom-eye {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #c0f43c;
          border: 1px solid rgba(192,244,60,0.3); padding: 6px 20px; border-radius: 100px;
          background: rgba(192,244,60,0.06);
        }
        .pt-bottom-h2 {
          font-family: var(--font-space); font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.12; margin: 0;
        }
        .pt-bottom-sub {
          font-family: var(--font-inter); font-size: 16px; line-height: 1.7;
          color: rgba(255,255,255,0.55); margin: 0;
        }

        /* Card hint */
        .pt-card-hint {
          position: absolute; bottom: 12px; right: 16px;
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          opacity: 0; transition: opacity 0.2s;
          z-index: 3;
        }
        .pt-card:hover .pt-card-hint { opacity: 1; }

        /* ── Modal ── */
        .pt-modal-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(4,8,30,0.75);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: pt-fade-in 0.2s ease;
        }
        @keyframes pt-fade-in { from { opacity: 0; } to { opacity: 1; } }

        .pt-modal {
          position: relative;
          background: #0d1640;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          overflow: hidden;
          width: 100%; max-width: 520px;
          padding: 40px 40px 36px;
          display: flex; flex-direction: column; gap: 16px;
          animation: pt-slide-up 0.25s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }
        @keyframes pt-slide-up {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .pt-modal-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
        }
        .pt-modal-close {
          position: absolute; top: 16px; right: 16px;
          background: rgba(255,255,255,0.06); border: none;
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5); cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .pt-modal-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

        .pt-modal-logo-wrap {
          background: #fff; border-radius: 14px;
          padding: 20px 28px;
          display: flex; align-items: center; justify-content: center;
          align-self: flex-start;
        }
        .pt-modal-tier {
          display: inline-flex; align-items: center; gap: 8px; width: fit-content;
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          border: 1px solid; padding: 5px 14px; border-radius: 100px;
        }
        .pt-modal-tier-dot {
          width: 7px; height: 7px; border-radius: 50; flex-shrink: 0;
        }
        .pt-modal-name {
          font-family: var(--font-space); font-size: 26px; font-weight: 800;
          color: #fff; letter-spacing: -0.02em; margin: 0;
        }
        .pt-modal-tagline {
          font-family: var(--font-inter); font-size: 14px; font-weight: 600;
          font-style: italic; margin: 0;
        }
        .pt-modal-desc {
          font-family: var(--font-inter); font-size: 14.5px; line-height: 1.75;
          color: rgba(255,255,255,0.65); margin: 0;
        }
        .pt-modal-link {
          display: inline-flex; align-items: center; gap: 8px; width: fit-content;
          font-family: var(--font-space); font-size: 13px; font-weight: 700;
          color: #060b24; text-decoration: none;
          padding: 11px 24px; border-radius: 100px; margin-top: 4px;
          transition: opacity 0.2s, transform 0.2s;
        }
        .pt-modal-link:hover { opacity: 0.85; transform: translateY(-1px); }

        @media (max-width: 560px) {
          .pt-modal { padding: 32px 24px 28px; }
          .pt-modal-name { font-size: 22px; }
        }

        /* Responsive */
        @media (max-width: 900px) {
          .pt-tier-inner { grid-template-columns: 1fr; gap: 28px; }
          .pt-tier-line  { display: none; }
          .pt-tiers      { padding: 0 24px 80px; }
          .pt-tier       { padding: 36px 28px; }
          .pt-hero       { padding: 100px 24px 56px; }
          .pt-bottom     { margin: 0 24px 60px; padding: 60px 24px; }
          .pt-cards-lead .pt-card, .pt-cards-gold .pt-card,
          .pt-cards-silver .pt-card, .pt-cards-association .pt-card { min-width: unset; width: 100%; }
          .pt-cards-exhibitor { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
        }
        @media (max-width: 560px) {
          .pt-tier { padding: 28px 20px; }
          .pt-cards-lead .pt-logo-bg { padding: 16px 24px; margin: 16px; }
          .pt-cards-gold .pt-logo-bg,
          .pt-cards-silver .pt-logo-bg,
          .pt-cards-association .pt-logo-bg { padding: 14px 20px; margin: 14px; }
          .pt-cards-lead .pt-logo-wrap { width: 200px !important; height: 68px !important; }
          .pt-cards-gold .pt-logo-wrap,
          .pt-cards-silver .pt-logo-wrap,
          .pt-cards-cxo .pt-logo-wrap,
          .pt-cards-association .pt-logo-wrap { width: 150px !important; height: 54px !important; }
          .pt-cards-lead .pt-card { min-height: 120px; }
        }
      `}</style>
    </div>
  );
}
