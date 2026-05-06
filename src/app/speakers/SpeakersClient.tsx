"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Speaker } from "@/lib/speakers";

function SpeakerCard({
  s,
  onSelect,
}: {
  s: Speaker;
  onSelect: (s: Speaker) => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="sc-wrap"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => onSelect(s)}
    >
      <div className={`sc-flipper${flipped ? " sc-flipped" : ""}`}>

        {/* FRONT */}
        <div className="sc-face sc-front">
          <div className="sc-photo">
            <Image
              src={s.image}
              alt={s.name}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1200px) 33vw, 300px"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
            <div className="sc-grad" />
            <div className="sc-foot">
              <div className="sc-name">{s.name}</div>
              <div className="sc-role">{s.title}</div>
              <div className="sc-org">{s.org}</div>
            </div>
          </div>
        </div>

        {/* BACK — desktop hover only */}
        <div className="sc-face sc-back">
          <div className="sc-accent" style={{ background: "#1b9ad6" }} />
          <div className="sc-back-body">
            <div className="sc-back-top">
              <div className="sc-av">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="52px"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
              <div>
                <div className="sc-bname">{s.name}</div>
                <div className="sc-brole" style={{ color: "#1b9ad6" }}>
                  {s.title}
                </div>
                <div className="sc-borg">{s.org}</div>
              </div>
            </div>
            <div className="sc-rule" />
            <div
              className="sc-bio"
              dangerouslySetInnerHTML={{ __html: s.description }}
            />
            <div className="sc-back-foot">
              <span
                className="sc-tag"
                style={{
                  background: "rgba(27,154,214,0.12)",
                  color: "#1b9ad6",
                }}
              >
                Speaker
              </span>
              <span className="sc-ctry">{s.country}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function SpeakerModal({
  s,
  onClose,
}: {
  s: Speaker | null;
  onClose: () => void;
}) {
  const accent = "#1b9ad6";

  useEffect(() => {
    if (s) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [s]);

  if (!s) return null;

  return (
    <div className="sm-overlay" onClick={onClose}>
      <div className="sm-modal" onClick={(e) => e.stopPropagation()}>

        {/* Sticky top bar */}
        <div className="sm-topbar">
          <div
            className="sm-accent-bar"
            style={{
              background: `linear-gradient(90deg, ${accent}, transparent)`,
            }}
          />
          <button className="sm-close" onClick={onClose} aria-label="Close">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Hero image */}
        <div className="sm-hero">
          <Image
            src={s.image}
            alt={s.name}
            fill
            sizes="(max-width:600px) 100vw, 480px"
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
          <div className="sm-hero-grad" />
        </div>

        {/* Content */}
        <div className="sm-body">
          <div className="sm-tag-row">
            <span
              className="sm-tag"
              style={{
                background: "rgba(27,154,214,0.12)",
                color: accent,
                border: `1px solid ${accent}40`,
              }}
            >
              Speaker
            </span>
            <span className="sm-ctry">{s.country}</span>
          </div>

          <h2 className="sm-name">{s.name}</h2>
          <div className="sm-title" style={{ color: accent }}>
            {s.title}
          </div>
          <div className="sm-org">{s.org}</div>

          <div className="sm-rule" />

          <div
            className="sm-bio"
            dangerouslySetInnerHTML={{ __html: s.description }}
          />

          {s.linkedin && (
            <a
              href={s.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="sm-linkedin"
              style={{ color: accent }}
            >
              LinkedIn →
            </a>
          )}
        </div>

      </div>
    </div>
  );
}

export default function SpeakersClient({ speakers }: { speakers: Speaker[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.05 }
    );
    el.querySelectorAll(".reveal").forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="sp-page">

      {/* Decorative elements */}
      <div className="sp-grid-bg" />
      <div className="sp-glow-tr" />
      <div className="sp-glow-bl" />

      <div className="sp-wrap">

        {/* ══ PAGE HEADER ══ */}
        <div className="sp-header">
          <div className="sp-header-left reveal">
            <div className="sp-eyebrow">
              <span className="sp-dot" />
              World AI Show Indonesia 2026 · Jakarta, 7–8 July
            </div>
            <h1 className="sp-h1">
              Confirmed<br />
              <span className="sp-h1-accent">Speakers</span>
            </h1>
            <p className="sp-sub">
              Policymakers, enterprise leaders &amp; AI innovators — live on
              stage, shaping Indonesia&apos;s sovereign AI agenda.
            </p>
          </div>

          <div className="sp-header-right reveal reveal-delay-2">
            <div className="sp-stats" style={{ display: "none" }}>
              {[
                { n: "9", l: "Confirmed" },
                { n: "2", l: "Keynotes" },
                { n: "2", l: "Days" },
                { n: "4", l: "Themes" },
              ].map((s, i) => (
                <div key={i} className="sp-stat">
                  <span className="sp-stat-n">{s.n}</span>
                  <span className="sp-stat-l">{s.l}</span>
                </div>
              ))}
            </div>
            <Link href="/register" className="sp-cta-btn">
              Apply to Speak
            </Link>
          </div>
        </div>

        <div className="sp-divider reveal" />

        {/* ══ GRID ══ */}
        <div className="sp-grid">
          {speakers.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.4)", gridColumn: "1/-1" }}>
              Speaker profiles coming soon.
            </p>
          ) : (
            speakers.map((s, i) => (
              <div
                key={s.id}
                className="reveal"
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <SpeakerCard s={s} onSelect={setActiveSpeaker} />
              </div>
            ))
          )}
        </div>

        {/* ══ FOOTER CTA ══ */}
        <div className="sp-footer reveal">
          <p className="sp-footer-text">
            More speakers to be announced.&nbsp;
            <Link href="/register" className="sp-footer-link">
              Register interest to speak →
            </Link>
          </p>
          <Link href="/agenda" className="sp-agenda-btn">
            View Full Agenda
          </Link>
        </div>

      </div>

      <SpeakerModal
        s={activeSpeaker}
        onClose={() => setActiveSpeaker(null)}
      />

      <style>{`
        /* ── Page shell ── */
        .sp-page {
          position: relative;
          background: #060b24;
          min-height: 100vh;
          overflow: hidden;
        }
        .sp-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(27,154,214,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,154,214,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .sp-glow-tr {
          position: absolute; top: -5%; right: -8%; pointer-events: none; z-index: 0;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(27,154,214,0.09) 0%, transparent 65%);
        }
        .sp-glow-bl {
          position: absolute; bottom: 10%; left: -5%; pointer-events: none; z-index: 0;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(192,244,60,0.05) 0%, transparent 65%);
        }

        /* ── Content wrapper ── */
        .sp-wrap {
          position: relative; z-index: 2;
          max-width: 1300px; margin: 0 auto;
          padding: 120px 40px 80px;
        }

        /* ══ Header ══ */
        .sp-header {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: flex-end;
          margin-bottom: 36px;
        }
        .sp-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-space); font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.3); letter-spacing: 0.14em; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .sp-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #c0f43c; flex-shrink: 0;
          animation: spDot 2.5s ease-in-out infinite;
        }
        @keyframes spDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.3; transform:scale(0.65); }
        }
        .sp-h1 {
          font-family: var(--font-space);
          font-size: clamp(44px, 6vw, 80px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.035em; line-height: 1.05;
          margin-bottom: 18px;
        }
        .sp-h1-accent {
          background: linear-gradient(100deg, #1b9ad6 0%, #c0f43c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sp-sub {
          font-family: var(--font-inter);
          font-size: clamp(14px, 1.3vw, 16px);
          color: rgba(255,255,255,0.42); line-height: 1.7;
          max-width: 440px;
        }
        .sp-header-right {
          display: flex; flex-direction: column; align-items: flex-end; gap: 20px;
          padding-bottom: 4px;
        }
        .sp-stats {
          display: flex; gap: 0;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; overflow: hidden;
          background: rgba(255,255,255,0.03);
        }
        .sp-stat {
          display: flex; flex-direction: column; align-items: center;
          padding: 14px 22px; gap: 3px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .sp-stat:last-child { border-right: none; }
        .sp-stat-n {
          font-family: var(--font-space); font-size: 28px; font-weight: 800;
          color: #c0f43c; line-height: 1;
        }
        .sp-stat-l {
          font-family: var(--font-inter); font-size: 10px; font-weight: 500;
          color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.1em;
        }
        .sp-cta-btn {
          font-family: var(--font-space); font-size: 13px; font-weight: 700;
          color: #1a1f4e; background: #c0f43c;
          padding: 11px 24px; border-radius: 100px;
          display: inline-block; white-space: nowrap;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 4px 16px rgba(192,244,60,0.25);
        }
        .sp-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 20px rgba(192,244,60,0.55), 0 8px 24px rgba(192,244,60,0.3); }

        /* ── Divider ── */
        .sp-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(27,154,214,0.4), rgba(192,244,60,0.25), transparent);
          margin-bottom: 36px;
        }

        /* ══ Speaker grid ══ */
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 56px;
        }

        /* ── Flip card ── */
        .sc-wrap {
          perspective: 1100px;
          height: 390px;
          cursor: pointer;
          transition: filter 0.3s;
        }
        .sc-wrap:hover {
          filter: drop-shadow(0 0 16px rgba(27,154,214,0.45)) drop-shadow(0 0 32px rgba(27,154,214,0.18));
        }
        .sc-flipper {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
          border-radius: 16px;
        }
        .sc-flipped { transform: rotateY(180deg); }
        .sc-face {
          position: absolute; inset: 0; border-radius: 16px; overflow: hidden;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }

        /* Front */
        .sc-photo { position: relative; width: 100%; height: 100%; background: #0a1030; }
        .sc-grad {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to bottom, transparent 30%, rgba(3,7,26,0.55) 62%, rgba(3,7,26,0.97) 100%);
        }
        .sc-foot {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
          padding: 14px 16px 18px;
        }
        .sc-name {
          font-family: var(--font-space); font-size: 15px; font-weight: 700;
          color: #fff; line-height: 1.2; margin-bottom: 3px;
        }
        .sc-role {
          font-family: var(--font-inter); font-size: 11px;
          color: rgba(255,255,255,0.5); margin-bottom: 2px; line-height: 1.3;
        }
        .sc-org {
          font-family: var(--font-inter); font-size: 11px; font-weight: 600; color: #1b9ad6;
        }

        /* Back */
        .sc-back {
          background: #0c1236;
          border: 1px solid rgba(255,255,255,0.07);
          transform: rotateY(180deg);
          display: flex; flex-direction: column;
        }
        .sc-accent { height: 3px; flex-shrink: 0; }
        .sc-back-body {
          flex: 1; display: flex; flex-direction: column;
          padding: 18px 18px 16px; overflow: hidden;
        }
        .sc-back-top {
          display: flex; gap: 11px; align-items: flex-start; margin-bottom: 12px;
        }
        .sc-av {
          position: relative; width: 50px; height: 50px; flex-shrink: 0;
          border-radius: 10px; overflow: hidden;
          border: 1.5px solid rgba(255,255,255,0.1);
        }
        .sc-bname {
          font-family: var(--font-space); font-size: 13.5px; font-weight: 700;
          color: #fff; line-height: 1.2; margin-bottom: 2px;
        }
        .sc-brole {
          font-family: var(--font-inter); font-size: 11px; font-weight: 600;
          line-height: 1.3; margin-bottom: 1px;
        }
        .sc-borg {
          font-family: var(--font-inter); font-size: 10px;
          color: rgba(255,255,255,0.3); line-height: 1.3;
        }
        .sc-rule { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 10px; flex-shrink: 0; }
        .sc-bio {
          font-family: var(--font-inter); font-size: 11.5px; color: rgba(255,255,255,0.48);
          line-height: 1.7; flex: 1;
          overflow: hidden;
          display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical;
        }
        .sc-bio p { margin: 0 0 6px; }
        .sc-back-foot {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 10px; flex-shrink: 0;
        }
        .sc-tag {
          font-family: var(--font-space); font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          border-radius: 100px; padding: 3px 10px;
        }
        .sc-ctry {
          font-family: var(--font-inter); font-size: 9.5px;
          color: rgba(255,255,255,0.18); letter-spacing: 0.06em;
        }

        /* ── Footer ── */
        .sp-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap; gap: 20px;
        }
        .sp-footer-text {
          font-family: var(--font-inter); font-size: 14px;
          color: rgba(255,255,255,0.32);
        }
        .sp-footer-link {
          color: #c0f43c; font-weight: 600;
          transition: opacity 0.18s;
        }
        .sp-footer-link:hover { opacity: 0.75; }
        .sp-agenda-btn {
          font-family: var(--font-space); font-size: 13px; font-weight: 600;
          color: #fff; border: 1.5px solid rgba(255,255,255,0.18);
          padding: 10px 24px; border-radius: 100px;
          display: inline-block; white-space: nowrap;
          transition: border-color 0.18s;
        }
        .sp-agenda-btn:hover { border-color: rgba(255,255,255,0.55); box-shadow: 0 0 16px rgba(255,255,255,0.10); }

        /* ── Speaker modal ── */
        .sm-overlay {
          position: fixed; inset: 0; z-index: 1100;
          background: rgba(4,8,28,0.88);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: sm-fade-in 0.25s ease both;
        }
        @keyframes sm-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .sm-modal {
          position: relative;
          background: #0c1236;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          width: 100%; max-width: 480px;
          max-height: 92vh;
          overflow-y: auto;
          animation: sm-slide-up 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }
        @media (max-width: 480px) {
          .sm-overlay { padding: 0; align-items: flex-end; }
          .sm-modal { max-width: 100%; max-height: 95vh; border-radius: 20px 20px 0 0; }
          .sm-topbar { border-radius: 20px 20px 0 0; }
          .sm-accent-bar { border-radius: 20px 20px 0 0; }
          .sm-close { width: 46px; height: 46px; }
        }
        @keyframes sm-slide-up {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: none; }
        }
        .sm-topbar {
          position: sticky; top: 0; z-index: 10;
          display: flex; flex-direction: row;
          align-items: center; justify-content: flex-end;
          background: #0c1236;
          border-radius: 24px 24px 0 0;
          padding: 14px 14px 10px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          min-height: 56px;
        }
        .sm-accent-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 4px; border-radius: 24px 24px 0 0; flex-shrink: 0;
        }
        .sm-close {
          background: rgba(255,255,255,0.18); border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 50%; width: 42px; height: 42px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          flex-shrink: 0;
        }
        .sm-close:hover { background: rgba(255,255,255,0.32); transform: scale(1.08); }
        .sm-hero {
          position: relative; width: 100%; height: 340px;
          background: #0a1030; overflow: hidden;
        }
        .sm-hero-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(12,18,54,0.1) 0%, transparent 25%, transparent 55%, #0c1236 100%);
          z-index: 1;
        }
        @media (max-width: 480px) { .sm-hero { height: 55vw; min-height: 260px; } }
        .sm-body { padding: 0 24px 32px; }
        .sm-tag-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .sm-tag {
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; border-radius: 100px; padding: 4px 12px;
        }
        .sm-ctry { font-family: var(--font-inter); font-size: 11px; color: rgba(255,255,255,0.25); }
        .sm-name { font-family: var(--font-space); font-size: 24px; font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 6px; }
        .sm-title { font-family: var(--font-inter); font-size: 13px; font-weight: 600; margin-bottom: 4px; line-height: 1.4; }
        .sm-org { font-family: var(--font-inter); font-size: 12px; color: rgba(255,255,255,0.35); margin-bottom: 20px; }
        .sm-rule { height: 1px; background: rgba(255,255,255,0.07); margin-bottom: 16px; }
        .sm-bio {
          font-family: var(--font-inter); font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.8;
        }
        .sm-bio p { margin: 0 0 12px; }
        .sm-bio p:last-child { margin-bottom: 0; }
        .sm-linkedin {
          display: inline-block; margin-top: 16px;
          font-family: var(--font-space); font-size: 12px; font-weight: 700;
          letter-spacing: 0.06em; text-decoration: none;
          transition: opacity 0.18s;
        }
        .sm-linkedin:hover { opacity: 0.7; }

        /* Disable flip on mobile — tap opens modal */
        @media (max-width: 900px) {
          .sc-flipper { transition: none !important; }
          .sc-flipped { transform: none !important; }
          .sc-back { display: none; }
          .sc-wrap { cursor: pointer; }
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) { .sp-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px) {
          .sp-wrap { padding: 110px 28px 64px; }
          .sp-header { grid-template-columns: 1fr; gap: 28px; }
          .sp-header-right { align-items: flex-start; }
          .sp-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .sc-wrap { height: 360px; }
        }
        @media (max-width: 560px) {
          .sp-wrap { padding: 100px 16px 56px; }
          .sp-h1 { font-size: 42px; }
          .sp-stats { flex-wrap: wrap; }
          .sp-grid { gap: 10px; }
          .sc-wrap { height: 330px; }
          .sc-name { font-size: 13px; }
          .sp-footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
