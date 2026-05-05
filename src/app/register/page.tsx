"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

declare global {
  interface Window {
    hbspt?: { forms: { create: (o: Record<string, unknown>) => void } };
  }
}

// ── SWAP THESE FORM IDs when HubSpot forms are ready ──────────────────────────
// Set hasHubspotForm: true and add formId to switch from native → HubSpot form
const PORTAL_ID = "2953901";
const FORMS: Record<string, { formId: string; title: string; sub: string; hasHubspotForm: boolean }> = {
  delegate: {
    formId: "DELEGATE_FORM_ID_HERE",
    hasHubspotForm: false,
    title: "Delegate",
    sub: "Full access to all sessions, workshops, and networking events.",
  },
  speaker: {
    formId: "SPEAKER_FORM_ID_HERE",
    hasHubspotForm: false,
    title: "Speaker",
    sub: "Apply to speak at World AI Show Jakarta 2026 and share your expertise.",
  },
  exhibitor: {
    formId: "EXHIBITOR_FORM_ID_HERE",
    hasHubspotForm: false,
    title: "Exhibitor",
    sub: "Showcase your products and solutions on the World AI Show exhibition floor.",
  },
};
// ─────────────────────────────────────────────────────────────────────────────

const passCards = [
  {
    key: "exhibitor",
    label: "EXHIBITOR",
    color: "#a78bfa",
    icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    desc: "Showcase your brand",
  },
  {
    key: "delegate",
    label: "DELEGATE",
    color: "#1b9ad6",
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z",
    desc: "Full conference access",
  },
  {
    key: "speaker",
    label: "SPEAKER",
    color: "#c0f43c",
    icon: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
    desc: "Apply to speak",
  },
];

const streams = [
  { top: "15%", delay: 0,   dur: 8  },
  { top: "40%", delay: 1.5, dur: 10 },
  { top: "65%", delay: 0.7, dur: 7  },
  { top: "85%", delay: 2.2, dur: 9  },
];

// ── Shared sub-components ────────────────────────────────────────────────────
function Field({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) {
  return (
    <div className="rg-field">
      <label>{label}{req && <span className="rg-req"> *</span>}</label>
      {children}
    </div>
  );
}

function CountrySelect({ value, onChange, countries }: { value: string; onChange: (v: string) => void; countries: string[] }) {
  return (
    <select required value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Select country</option>
      {countries.map(c => <option key={c}>{c}</option>)}
    </select>
  );
}

function SubmitBtn({ loading, label = "Confirm Registration" }: { loading: boolean; label?: string }) {
  return (
    <>
      <button type="submit" className="rg-submit" disabled={loading}>
        {loading ? <span className="rg-spinner" /> : label}
      </button>
      <p className="rg-privacy">By registering you agree to our privacy policy. Your details will only be used for event communication.</p>
    </>
  );
}

function SuccessMsg() {
  return (
    <div className="rg-success">
      <div className="rg-success-icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#c0f43c" strokeWidth="1.8"/>
          <path d="M8 12l3 3 5-5" stroke="#c0f43c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="rg-success-title">Registration Received!</h2>
      <p className="rg-success-sub">Thank you for registering. Our team will reach out shortly with your pass details.</p>
      <Link href="/" className="rg-success-btn">Back to Home</Link>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

type DelegateForm = { firstName: string; lastName: string; email: string; phone: string; company: string; jobTitle: string; country: string; };
type SpeakerForm = { firstName: string; lastName: string; email: string; phone: string; company: string; jobTitle: string; country: string; talkTitle: string; linkedin: string; };
type ExhibitorForm = { company: string; contactName: string; jobTitle: string; email: string; phone: string; website: string; };

export default function RegisterPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  const [delegateForm, setDelegateForm] = useState<DelegateForm>({ firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "", country: "" });
  const [speakerForm, setSpeakerForm] = useState<SpeakerForm>({ firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "", country: "", talkTitle: "", linkedin: "" });
  const [exhibitorForm, setExhibitorForm] = useState<ExhibitorForm>({ company: "", contactName: "", jobTitle: "", email: "", phone: "", website: "" });
  const PAYMENT_URL = "PAYMENT_GATEWAY_URL_HERE"; // swap in payment link when ready

  const formRef = useRef<HTMLDivElement>(null);
  const loadedForms = useRef<Set<string>>(new Set());
  const hsLoaded = useRef(false);

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

  // Load HubSpot form when pass type has one configured
  useEffect(() => {
    if (!selected) return;
    const formConfig = FORMS[selected];
    if (!formConfig.hasHubspotForm) return;
    const targetId = `hs-form-${selected}`;
    const tryCreate = () => {
      if (!window.hbspt) { setTimeout(tryCreate, 200); return; }
      if (loadedForms.current.has(selected)) return;
      loadedForms.current.add(selected);
      window.hbspt!.forms.create({ portalId: PORTAL_ID, formId: formConfig.formId, target: `#${targetId}`, cssRequired: "" });
    };
    tryCreate();
  }, [selected]);

  const handleSubmit = async (key: string, e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted((prev) => ({ ...prev, [key]: true }));
    setSubmitting(false);
  };

  const countries = ["Indonesia","Singapore","Malaysia","Thailand","Philippines","Vietnam","India","UAE","United Kingdom","United States","Other"];

  return (
    <div className="rg-page">

      <div className="rg-grid-bg" />
      <div className="rg-glow-tl" />
      <div className="rg-glow-br" />

      <div className="rg-streams" aria-hidden="true">
        {streams.map((s, i) => (
          <div key={i} className="rg-stream" style={{ top: s.top, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }} />
        ))}
      </div>

      {[...Array(8)].map((_, i) => {
        const clr = ["#1b9ad6","#c0f43c","#a78bfa","#fb923c"][i % 4];
        return <div key={i} className="rg-particle" style={{ left: `${10 + i * 11}%`, background: clr, animationDelay: `${i * 0.8}s`, animationDuration: `${8 + i}s` }} />;
      })}

      <div className="rg-wrap">

        {/* ── LEFT ── */}
        <div className="rg-left">
          <div className="rg-eyebrow">
            <span className="rg-dot" />
            World AI Show Indonesia 2026
          </div>

          <h1 className="rg-h1">
            Secure Your<br/>
            Seat at the<br/>
            <span className="rg-grad">Future of AI</span>
          </h1>

          <p className="rg-sub">
            Join 1,000+ business and technology leaders shaping Indonesia&apos;s AI future — 7–8 July 2026 at Sheraton Grand Jakarta.
          </p>

          <div className="rg-contacts">
            <div className="rg-info-row">
              <div className="rg-info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="3" stroke="#1b9ad6" strokeWidth="2"/>
                  <path d="M3 9h18M8 2v4M16 2v4" stroke="#1b9ad6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="rg-info-lbl">Date</div>
                <div className="rg-info-val">7–8 July 2026</div>
              </div>
            </div>
            <div className="rg-info-row">
              <div className="rg-info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#c0f43c" strokeWidth="2"/>
                  <circle cx="12" cy="9" r="2.5" stroke="#c0f43c" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <div className="rg-info-lbl">Venue</div>
                <div className="rg-info-val">Sheraton Grand Jakarta, Indonesia</div>
              </div>
            </div>
            <a href="mailto:info@worldaishow.com" className="rg-info-row rg-info-link">
              <div className="rg-info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#a78bfa" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="#a78bfa" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <div className="rg-info-lbl">Questions?</div>
                <div className="rg-info-val">info@worldaishow.com</div>
              </div>
            </a>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="rg-form-wrap">
          <div className="rg-form-glow" />
          <div className="rg-form-inner">

            {/* Step label */}
            <div className="rg-step-label">
              <span className="rg-step-num">1</span>
              Select your category
            </div>

            {/* Pass type cards */}
            <div className="rg-pass-grid">
              {passCards.map((card) => {
                const isActive = selected === card.key;
                return (
                  <button
                    key={card.key}
                    className={`rg-pass-card${isActive ? " rg-pass-card--active" : ""}`}
                    style={{
                      "--card-color": card.color,
                      borderColor: isActive ? card.color : "rgba(255,255,255,0.1)",
                      background: isActive ? card.color + "18" : "rgba(255,255,255,0.03)",
                    } as React.CSSProperties}
                    onClick={() => setSelected(card.key)}
                  >
                    <div className="rg-pass-icon" style={{ color: card.color }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d={card.icon}/>
                      </svg>
                    </div>
                    <div className="rg-pass-label">{card.label}</div>
                    <div className="rg-pass-desc">{card.desc}</div>
                    {isActive && (
                      <div className="rg-pass-check" style={{ background: card.color }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="#060b24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            {selected && (
              <div className="rg-divider">
                <div className="rg-divider-line" />
                <div className="rg-step-label" style={{ margin: 0 }}>
                  <span className="rg-step-num">2</span>
                  Complete your registration
                </div>
                <div className="rg-divider-line" />
              </div>
            )}

            {/* Form area */}
            <div ref={formRef} className="rg-forms-container">

              {/* ── DELEGATE ── */}
              {selected === "delegate" && (
                <div>
                  <div className="rg-form-head">
                    <div className="rg-form-title" style={{ color: "#1b9ad6" }}>Delegate</div>
                    <p className="rg-form-sub">Full access to all sessions, workshops, and networking events.</p>
                  </div>
                  <div className="rg-kh-card">
                    <div className="rg-kh-header" style={{ borderBottom: "1px solid rgba(27,154,214,0.2)" }}>
                      <div className="rg-kh-badge" style={{ background: "rgba(27,154,214,0.12)", border: "1px solid rgba(27,154,214,0.3)", color: "#1b9ad6" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
                        Delegate Registration
                      </div>
                      <div className="rg-kh-secure">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Secure checkout via KonfHub
                      </div>
                    </div>
                    <iframe
                      src="https://konfhub.com/widget/wais-f45-indonesia?desc=false&secondaryBg=F5F7FF&ticketBg=EEF2FF&borderCl=C7D2FE&bg=F8FAFF&fontColor=1e1f3a&ticketCl=1e1f3a&btnColor=1b9ad6&fontFamily=Hind&borderRadius=8&widget_type=standard&tickets=88864&ticketId=88864%7C1"
                      id="konfhub-widget"
                      title="Register for World AI Show — Delegate"
                      width="100%"
                      height="480"
                      style={{ border: "none", display: "block" }}
                    />
                  </div>
                </div>
              )}

              {/* ── SPEAKER ── */}
              {selected === "speaker" && (
                <div>
                  <div className="rg-form-head">
                    <div className="rg-form-title" style={{ color: "#c0f43c" }}>Speaker</div>
                    <p className="rg-form-sub">Apply to speak at World AI Show Jakarta 2026 and share your expertise.</p>
                  </div>
                  <div className="rg-kh-card">
                    <div className="rg-kh-header" style={{ borderBottom: "1px solid rgba(192,244,60,0.15)" }}>
                      <div className="rg-kh-badge" style={{ background: "rgba(192,244,60,0.1)", border: "1px solid rgba(192,244,60,0.3)", color: "#c0f43c" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        Speaker Application
                      </div>
                      <div className="rg-kh-secure">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Powered by HubSpot
                      </div>
                    </div>
                    <iframe
                      src="https://share.hsforms.com/1MFLdn_FOQoeyz8QnBr4rPg1rb8t"
                      title="Apply to Speak — World AI Show"
                      width="100%"
                      height="600"
                      style={{ border: "none", display: "block" }}
                    />
                  </div>
                </div>
              )}

              {/* ── EXHIBITOR ── */}
              {selected === "exhibitor" && (
                <div>
                  <div className="rg-form-head">
                    <div className="rg-form-title" style={{ color: "#a78bfa" }}>Exhibitor</div>
                    <p className="rg-form-sub">Showcase your products and solutions on the World AI Show exhibition floor.</p>
                  </div>
                  {FORMS.exhibitor.hasHubspotForm ? <div id="hs-form-exhibitor" /> : (
                    <div>
                        {/* Pricing card */}
                        <div className="rg-price-card" style={{ marginBottom: 24 }}>
                          <div className="rg-price-header">
                            <div className="rg-price-title">Price &amp; Benefits</div>
                            <div className="rg-price-amount">USD 2,500</div>
                          </div>
                          <div className="rg-price-divider" />
                          <ul className="rg-benefits">
                            {[
                              "2 × 2 raw space",
                              "2 conference passes",
                              "Logo branding on on-site materials",
                              "Name, logo & short description featured on event website",
                              "Logo branding on post-event report",
                              "Logo branding on info packs",
                            ].map((b) => (
                              <li key={b}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" fill="rgba(167,139,250,0.2)"/>
                                  <path d="M7 12l4 4 6-6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rg-kh-card">
                          <div className="rg-kh-header" style={{ borderBottom: "1px solid rgba(167,139,250,0.2)" }}>
                            <div className="rg-kh-badge" style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa" }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                              Exhibitor Booking
                            </div>
                            <div className="rg-kh-secure">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                              Secure checkout via KonfHub
                            </div>
                          </div>
                          <iframe
                            src="https://konfhub.com/widget/wais-f45-indonesia?desc=false&secondaryBg=F5F5FF&ticketBg=EEEEFF&borderCl=C4B5FD&bg=F8F7FF&fontColor=1e1f3a&ticketCl=1e1f3a&btnColor=7c3aed&fontFamily=Hind&borderRadius=8&widget_type=standard&tickets=98930&ticketId=98930%7C1"
                            id="konfhub-widget-exhibitor"
                            title="Register for World AI Show — Exhibitor"
                            width="100%"
                            height="480"
                            style={{ border: "none", display: "block" }}
                          />
                        </div>
                      </div>
                  )}
                </div>
              )}

              {/* Prompt when nothing selected */}
              {!selected && (
                <div className="rg-prompt">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                  </svg>
                  <p>Select a category above to load your registration form</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .rg-page {
          min-height: 100vh; background: #060b24;
          position: relative; overflow: hidden;
          display: flex; align-items: stretch;
        }
        .rg-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(rgba(27,154,214,0.09) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 100%);
        }
        .rg-glow-tl {
          position: fixed; top: -160px; left: -160px; width: 520px; height: 520px;
          border-radius: 50%; pointer-events: none; z-index: 0;
          background: radial-gradient(circle, rgba(192,244,60,0.12) 0%, transparent 70%);
        }
        .rg-glow-br {
          position: fixed; bottom: -160px; right: -160px; width: 480px; height: 480px;
          border-radius: 50%; pointer-events: none; z-index: 0;
          background: radial-gradient(circle, rgba(27,154,214,0.10) 0%, transparent 70%);
        }
        .rg-streams { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .rg-stream {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(27,154,214,0.18) 30%, rgba(192,244,60,0.25) 60%, transparent 100%);
          animation: rg-flow linear infinite;
        }
        @keyframes rg-flow { from { transform: translateX(-100%); } to { transform: translateX(200%); } }
        .rg-particle {
          position: fixed; bottom: 0; width: 3px; height: 3px; border-radius: 50%;
          opacity: 0; pointer-events: none; z-index: 0;
          animation: rg-rise linear infinite;
        }
        @keyframes rg-rise {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.45; }
          88%  { opacity: 0.12; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        /* Layout */
        .rg-wrap {
          position: relative; z-index: 2;
          width: 100%; max-width: 1320px; margin: 0 auto;
          padding: 100px 48px 80px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 56px; align-items: start;
          min-height: 100vh;
        }

        /* LEFT */
        .rg-left { display: flex; flex-direction: column; gap: 28px; padding-top: 24px; position: sticky; top: 100px; }
        .rg-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-space); font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.4); text-decoration: none; letter-spacing: 0.08em;
          transition: color 0.2s; width: fit-content;
        }
        .rg-back:hover { color: rgba(255,255,255,0.8); }
        .rg-eyebrow {
          display: inline-flex; align-items: center; gap: 10px; width: fit-content;
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #c0f43c;
          border: 1px solid rgba(192,244,60,0.3); padding: 5px 16px; border-radius: 100px;
        }
        .rg-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #c0f43c; box-shadow: 0 0 8px #c0f43c;
          animation: rg-blink 2s ease-in-out infinite; flex-shrink: 0;
        }
        @keyframes rg-blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        .rg-h1 {
          font-family: var(--font-space); font-size: clamp(40px, 5vw, 72px);
          font-weight: 800; color: #fff; letter-spacing: -0.04em; line-height: 1.05; margin: 0;
        }
        .rg-grad {
          background: linear-gradient(100deg, #c0f43c 0%, #1b9ad6 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .rg-sub {
          font-family: var(--font-inter); font-size: 15px; line-height: 1.75;
          color: rgba(255,255,255,0.5); margin: 0; max-width: 400px;
        }
.rg-contacts { display: flex; flex-direction: column; gap: 8px; }
        .rg-info-row {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; background: rgba(255,255,255,0.03);
        }
        .rg-info-link { text-decoration: none; transition: border-color 0.2s, background 0.2s; }
        .rg-info-link:hover { border-color: rgba(167,139,250,0.3); background: rgba(167,139,250,0.05); }
        .rg-info-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .rg-info-lbl { font-family: var(--font-space); font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 2px; }
        .rg-info-val { font-family: var(--font-inter); font-size: 13px; color: #fff; font-weight: 500; }

        /* RIGHT */
        .rg-form-wrap { position: relative; }
        .rg-form-glow {
          position: absolute; top: -60px; right: -60px;
          width: 300px; height: 300px; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(192,244,60,0.08) 0%, transparent 70%);
        }
        .rg-form-inner {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px; padding: 40px;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        /* Step label */
        .rg-step-label {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.14em;
          margin-bottom: 16px;
        }
        .rg-step-num {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(192,244,60,0.15); border: 1px solid rgba(192,244,60,0.35);
          color: #c0f43c; font-size: 11px; font-weight: 800;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        /* Pass type cards */
        .rg-pass-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
          margin-bottom: 28px;
        }
        .rg-pass-card {
          position: relative;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          gap: 8px; padding: 24px 16px;
          border: 1.5px solid; border-radius: 16px;
          background: rgba(255,255,255,0.03);
          cursor: pointer; transition: border-color 0.2s, background 0.2s, transform 0.15s;
        }
        .rg-pass-card:hover { transform: translateY(-3px); box-shadow: 0 0 20px rgba(27,154,214,0.25), 0 0 40px rgba(27,154,214,0.10); border-color: rgba(27,154,214,0.5) !important; }
        .rg-pass-icon { margin-bottom: 2px; }
        .rg-pass-label {
          font-family: var(--font-space); font-size: 15px; font-weight: 700;
          color: #fff; letter-spacing: 0.01em; line-height: 1.2;
        }
        .rg-pass-desc {
          font-family: var(--font-inter); font-size: 12px;
          color: rgba(255,255,255,0.45); line-height: 1.3;
        }
        .rg-pass-check {
          position: absolute; top: 8px; right: 8px;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        /* Divider */
        .rg-divider {
          display: flex; align-items: center; gap: 14px; margin-bottom: 24px;
        }
        .rg-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }

        /* Form head */
        .rg-form-head { margin-bottom: 20px; }
        .rg-form-title { font-family: var(--font-space); font-size: 22px; font-weight: 800; margin-bottom: 6px; letter-spacing: -0.02em; }
        .rg-form-sub { font-family: var(--font-inter); font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.5; margin: 0; }

        /* Prompt */
        .rg-prompt {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 36px 0; text-align: center;
        }
        .rg-prompt p {
          font-family: var(--font-inter); font-size: 14px;
          color: rgba(255,255,255,0.25); margin: 0; max-width: 240px; line-height: 1.6;
        }

        /* HubSpot overrides */
        .rg-forms-container .hs-form fieldset { max-width: 100% !important; border: none !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; }
        .rg-forms-container .hs-form { border: none !important; box-shadow: none !important; }
        .rg-forms-container .hs-form .hs-form-field label {
          font-family: var(--font-space) !important; font-size: 10px !important; font-weight: 700 !important;
          color: rgba(255,255,255,0.45) !important; text-transform: uppercase !important;
          letter-spacing: 0.12em !important; margin-bottom: 7px !important; display: block !important;
        }
        .rg-forms-container .hs-form input[type="text"],
        .rg-forms-container .hs-form input[type="email"],
        .rg-forms-container .hs-form input[type="tel"],
        .rg-forms-container .hs-form select,
        .rg-forms-container .hs-form textarea {
          width: 100% !important; background: rgba(255,255,255,0.05) !important;
          border: 1.5px solid rgba(255,255,255,0.1) !important; border-radius: 12px !important;
          padding: 13px 16px !important; font-family: var(--font-inter) !important;
          font-size: 14px !important; color: #fff !important;
          outline: none !important; box-shadow: none !important; transition: border-color 0.2s !important;
        }
        .rg-forms-container .hs-form input:focus,
        .rg-forms-container .hs-form select:focus,
        .rg-forms-container .hs-form textarea:focus { border-color: rgba(192,244,60,0.5) !important; }
        .rg-forms-container .hs-form select option { background: #0d1230; color: #fff; }
        .rg-forms-container .hs-form textarea { resize: vertical !important; min-height: 90px !important; }
        .rg-forms-container .hs-form .hs-form-field { margin-bottom: 14px !important; }
        .rg-forms-container .hs-form .hs-submit input[type="submit"],
        .rg-forms-container .hs-form .hs-button {
          width: 100% !important; background: #c0f43c !important; border: none !important;
          border-radius: 100px !important; padding: 15px !important;
          font-family: var(--font-space) !important; font-size: 15px !important;
          font-weight: 700 !important; color: #060b24 !important; cursor: pointer !important;
          letter-spacing: 0.03em !important; margin-top: 10px !important; transition: opacity 0.2s !important;
        }
        .rg-forms-container .hs-form .hs-button:hover { opacity: 0.88 !important; }
        .rg-forms-container .hs-form .hs-error-msgs label { color: #fb923c !important; font-size: 11px !important; text-transform: none !important; letter-spacing: 0 !important; }
        .rg-forms-container .inputs-list { list-style: none !important; padding: 0 !important; margin: 4px 0 0 !important; display: flex !important; flex-direction: column !important; gap: 10px !important; }
        .rg-forms-container .inputs-list label { display: flex !important; align-items: center !important; gap: 10px !important; font-family: var(--font-inter) !important; font-size: 14px !important; font-weight: 400 !important; color: rgba(255,255,255,0.8) !important; text-transform: none !important; letter-spacing: 0 !important; cursor: pointer !important; margin-bottom: 0 !important; }
        .rg-forms-container .inputs-list input[type="checkbox"],
        .rg-forms-container .inputs-list input[type="radio"] { width: 18px !important; height: 18px !important; accent-color: #c0f43c !important; flex-shrink: 0 !important; margin: 0 !important; }
        .rg-forms-container .submitted-message { font-family: var(--font-inter) !important; color: #c0f43c !important; font-size: 16px !important; text-align: center !important; padding: 32px 0 !important; }

        /* Native form fields */
        .rg-native-form { display: flex; flex-direction: column; gap: 14px; }
        .rg-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .rg-field { display: flex; flex-direction: column; gap: 6px; }
        .rg-field label { font-family: var(--font-space); font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.12em; }
        .rg-req { color: #c0f43c; }
        .rg-field input, .rg-field select {
          width: 100%; background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1); border-radius: 12px;
          padding: 13px 16px; font-family: var(--font-inter);
          font-size: 14px; color: #fff; outline: none; transition: border-color 0.2s;
          appearance: none; -webkit-appearance: none;
        }
        .rg-field input::placeholder { color: rgba(255,255,255,0.2); }
        .rg-field input:focus, .rg-field select:focus { border-color: rgba(192,244,60,0.5); }
        .rg-field select { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.35)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 40px; }
        .rg-field select option { background: #0d1230; color: #fff; }
        .rg-submit {
          width: 100%; background: linear-gradient(100deg, #1b9ad6 0%, #c0f43c 100%); border: none; border-radius: 100px; padding: 16px;
          font-family: var(--font-space); font-size: 15px; font-weight: 700; color: #060b24;
          cursor: pointer; letter-spacing: 0.03em; margin-top: 4px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(27,154,214,0.3);
        }
        .rg-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(27,154,214,0.45); }
        .rg-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .rg-spinner { width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(6,11,36,0.3); border-top-color: #060b24; animation: rg-spin 0.7s linear infinite; }
        @keyframes rg-spin { to { transform: rotate(360deg); } }
        .rg-privacy { font-family: var(--font-inter); font-size: 11px; color: rgba(255,255,255,0.25); text-align: center; line-height: 1.6; margin: 0; }
        /* KonfHub card wrapper */
        .rg-kh-card {
          border-radius: 16px;
          overflow: hidden;
          border: 1.5px solid rgba(255,255,255,0.1);
          box-shadow: 0 8px 40px rgba(0,0,0,0.35);
        }
        .rg-kh-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(8px);
        }
        .rg-kh-badge {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 100px;
        }
        .rg-kh-secure {
          display: flex; align-items: center; gap: 5px;
          font-family: var(--font-inter); font-size: 11px;
          color: rgba(255,255,255,0.3);
        }

        /* Price card */
        .rg-price-card {
          background: rgba(167,139,250,0.08);
          border: 1.5px solid rgba(167,139,250,0.3);
          border-radius: 14px; padding: 20px; margin-top: 4px;
        }
        .rg-price-header {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
        }
        .rg-price-title {
          font-family: var(--font-space); font-size: 13px; font-weight: 700;
          color: #fff; letter-spacing: 0.02em;
        }
        .rg-price-amount {
          font-family: var(--font-space); font-size: 22px; font-weight: 800;
          background: linear-gradient(100deg, #1b9ad6 0%, #c0f43c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          letter-spacing: -0.02em;
        }
        .rg-price-divider { height: 1px; background: rgba(167,139,250,0.2); margin-bottom: 14px; }
        .rg-benefits { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .rg-benefits li {
          display: flex; align-items: flex-start; gap: 9px;
          font-family: var(--font-inter); font-size: 13px;
          color: rgba(255,255,255,0.75); line-height: 1.4;
        }
        .rg-benefits li svg { flex-shrink: 0; margin-top: 1px; }

        .rg-success { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 24px 0; gap: 14px; }
        .rg-success-icon { width: 68px; height: 68px; border-radius: 50%; background: rgba(192,244,60,0.1); border: 1px solid rgba(192,244,60,0.25); display: flex; align-items: center; justify-content: center; }
        .rg-success-title { font-family: var(--font-space); font-size: 24px; font-weight: 800; color: #fff; margin: 0; }
        .rg-success-sub { font-family: var(--font-inter); font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.5); margin: 0; max-width: 300px; }
        .rg-success-btn { display: inline-flex; align-items: center; font-family: var(--font-space); font-size: 13px; font-weight: 700; color: #060b24; background: #c0f43c; padding: 12px 28px; border-radius: 100px; text-decoration: none; margin-top: 6px; transition: opacity 0.2s; }
        .rg-success-btn:hover { opacity: 0.88; }

        /* Responsive */
        @media (max-width: 1100px) {
          .rg-wrap { grid-template-columns: 1fr; gap: 48px; padding: 100px 40px 80px; min-height: unset; }
          .rg-left { position: static; }
          .rg-h1 { font-size: clamp(36px, 8vw, 60px); }
        }
        @media (max-width: 640px) {
          .rg-wrap { padding: 90px 20px 60px; }
          .rg-form-inner { padding: 28px 20px; }
          .rg-stat { padding: 12px 14px; }
        }
      `}</style>
    </div>
  );
}
