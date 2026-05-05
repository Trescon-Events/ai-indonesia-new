"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: Record<string, unknown>) => void;
      };
    };
  }
}

export default function EnquireSection() {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const hubspotLoaded = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hubspotLoaded.current) return;
    hubspotLoaded.current = true;

    const loadForm = () => {
      if (window.hbspt && formRef.current) {
        formRef.current.innerHTML = "";
        window.hbspt.forms.create({
          portalId: "2953901",
          formId: "a3ac7564-004b-4b6b-83e9-e73a45726fc9",
          target: "#hs-enquire-form",
          cssRequired: "",
        });
      }
    };

    if (window.hbspt) {
      loadForm();
    } else {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/v2.js";
      script.async = true;
      script.onload = loadForm;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section
      id="enquire"
      ref={ref}
      style={{
        background: "#F5F0EB",
        padding: "100px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Left */}
        <div>
          <div className="reveal" style={{ marginBottom: 20 }}>
            <span
              style={{
                fontFamily: "var(--font-space)",
                fontSize: 12,
                fontWeight: 700,
                color: "#1b9ad6",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Get in Touch
            </span>
          </div>
          <h2
            className="reveal"
            style={{
              fontFamily: "var(--font-space)",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 700,
              color: "#1a1f4e",
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              marginBottom: 24,
            }}
          >
            Enquire Now
          </h2>
          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 17,
              color: "#555",
              lineHeight: 1.75,
              marginBottom: 40,
            }}
          >
            Whether you&apos;re looking to attend, speak, sponsor, or partner — our team is ready to help you find the right opportunity at World AI Show Indonesia.
          </p>

          {/* Contact info blocks */}
          <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              {
                label: "General Enquiries",
                value: "info@worldaishow.com",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#1b9ad6" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="#1b9ad6" strokeWidth="2"/>
                  </svg>
                ),
              },
              {
                label: "Sponsorship",
                value: "sponsors@worldaishow.com",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#1b9ad6" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="#1b9ad6" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#1b9ad6" strokeWidth="2"/>
                  </svg>
                ),
              },
              {
                label: "Event Location",
                value: "Jakarta, Indonesia",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#1b9ad6" strokeWidth="2"/>
                    <circle cx="12" cy="9" r="2.5" stroke="#1b9ad6" strokeWidth="2"/>
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 14,
                  padding: "16px 20px",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(27,154,214,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 15, color: "#1a1f4e", fontWeight: 500 }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — HubSpot form */}
        <div
          className="reveal"
          style={{
            background: "#1a1f4e",
            borderRadius: 28,
            padding: "48px 44px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-space)", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
            Submit Your Interest
          </h3>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28, lineHeight: 1.5 }}>
            Kindly ensure correct spelling, capitalisation and spacing where necessary.
          </p>
          <div id="hs-enquire-form" ref={formRef} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section#enquire > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }

        /* ── HubSpot form overrides ── */
        #hs-enquire-form .hs-form fieldset { max-width: 100% !important; }
        #hs-enquire-form .hs-form .hs-form-field label {
          font-family: var(--font-space) !important;
          font-size: 11px !important; font-weight: 600 !important;
          color: rgba(255,255,255,0.5) !important;
          text-transform: uppercase !important; letter-spacing: 0.1em !important;
          margin-bottom: 6px !important; display: block !important;
        }
        #hs-enquire-form .hs-form input[type="text"],
        #hs-enquire-form .hs-form input[type="email"],
        #hs-enquire-form .hs-form input[type="tel"],
        #hs-enquire-form .hs-form select,
        #hs-enquire-form .hs-form textarea {
          width: 100% !important;
          background: rgba(255,255,255,0.06) !important;
          border: 1.5px solid rgba(255,255,255,0.12) !important;
          border-radius: 10px !important;
          padding: 13px 16px !important;
          font-family: var(--font-inter) !important;
          font-size: 14px !important; color: #fff !important;
          outline: none !important; box-shadow: none !important;
          transition: border-color 0.2s !important;
        }
        #hs-enquire-form .hs-form input:focus,
        #hs-enquire-form .hs-form select:focus,
        #hs-enquire-form .hs-form textarea:focus {
          border-color: rgba(27,154,214,0.6) !important;
        }
        #hs-enquire-form .hs-form select option { background: #1a1f4e; color: #fff; }
        #hs-enquire-form .hs-form textarea { resize: vertical !important; min-height: 100px !important; }
        #hs-enquire-form .hs-form .hs-form-field { margin-bottom: 16px !important; }
        #hs-enquire-form .hs-form .hs-submit input[type="submit"],
        #hs-enquire-form .hs-form .hs-button {
          width: 100% !important;
          background: #c0f43c !important; border: none !important;
          border-radius: 100px !important; padding: 15px !important;
          font-family: var(--font-space) !important;
          font-size: 15px !important; font-weight: 700 !important;
          color: #1a1f4e !important; cursor: pointer !important;
          letter-spacing: 0.03em !important; margin-top: 8px !important;
          transition: opacity 0.2s !important;
        }
        #hs-enquire-form .hs-form .hs-button:hover { opacity: 0.88 !important; }
        #hs-enquire-form .hs-form .hs-error-msgs { margin-top: 4px !important; }
        #hs-enquire-form .hs-form .hs-error-msgs label {
          color: #fb923c !important; font-size: 11px !important;
          text-transform: none !important; letter-spacing: 0 !important;
        }
        #hs-enquire-form .submitted-message {
          font-family: var(--font-inter) !important;
          color: #c0f43c !important; font-size: 16px !important;
          text-align: center !important; padding: 32px 0 !important;
        }
      `}</style>
    </section>
  );
}
