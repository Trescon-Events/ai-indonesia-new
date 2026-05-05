"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const passes = [
  {
    type: "Delegate",
    tag: "Most Popular",
    featured: false,
    price: "Contact Us",
    description: "Full access to all conference sessions, panels, and networking events.",
    features: [
      "All keynote sessions",
      "Panel discussions access",
      "Networking lunches",
      "Exhibition floor access",
      "Event materials & recordings",
    ],
  },
  {
    type: "VIP",
    tag: "Premium",
    featured: true,
    price: "Contact Us",
    description: "Exclusive access with priority seating, private roundtables, and VIP networking.",
    features: [
      "All Delegate benefits",
      "Priority front-row seating",
      "Private VIP roundtables",
      "1:1 speaker meetings",
      "VIP lounge access",
      "Post-event dinner invitation",
    ],
  },
  {
    type: "Sponsor",
    tag: "Partner",
    featured: false,
    price: "Custom",
    description: "Brand your presence at Indonesia's premier AI event with dedicated sponsorship packages.",
    features: [
      "Exhibition booth allocation",
      "Speaking opportunity",
      "Brand visibility across all channels",
      "Lead generation tools",
      "Delegate passes included",
    ],
  },
];

export default function PassesSection() {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="passes"
      ref={ref}
      style={{
        background: "#060b24",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Circuit pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(27,154,214,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(27,154,214,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(192,244,60,0.06) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
          <span
            style={{
              fontFamily: "var(--font-space)",
              fontSize: 12,
              fontWeight: 700,
              color: "#c0f43c",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 14,
            }}
          >
            Attend the Event
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space)",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Event Passes
          </h2>
        </div>

        {/* Passes grid */}
        <div className="passes-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            alignItems: "start",
          }}
        >
          {passes.map((pass, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                background: pass.featured ? "linear-gradient(145deg, #1b9ad6, #0e7ab5)" : "rgba(255,255,255,0.04)",
                border: pass.featured ? "1.5px solid rgba(27,154,214,0.6)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: "40px 36px",
                position: "relative",
                transform: pass.featured ? "scale(1.03)" : "scale(1)",
                boxShadow: pass.featured ? "0 24px 60px rgba(27,154,214,0.3)" : "none",
              }}
            >
              {/* Tag */}
              <div
                style={{
                  display: "inline-block",
                  background: pass.featured ? "rgba(192,244,60,0.2)" : "rgba(27,154,214,0.12)",
                  border: `1px solid ${pass.featured ? "rgba(192,244,60,0.5)" : "rgba(27,154,214,0.25)"}`,
                  borderRadius: 100,
                  padding: "5px 14px",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: pass.featured ? "#c0f43c" : "#1b9ad6",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {pass.tag}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: 8,
                }}
              >
                {pass.type}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 14,
                  color: pass.featured ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
                  lineHeight: 1.65,
                  marginBottom: 28,
                }}
              >
                {pass.description}
              </p>

              {/* Features */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 24,
                  paddingBottom: 20,
                  borderBottom: `1px solid ${pass.featured ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {pass.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke={pass.featured ? "#c0f43c" : "#1b9ad6"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: 14,
                        color: pass.featured ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/enquire"
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: "var(--font-space)",
                  fontSize: 15,
                  fontWeight: 700,
                  color: pass.featured ? "#1a1f4e" : "#ffffff",
                  background: pass.featured ? "#c0f43c" : "transparent",
                  border: pass.featured ? "none" : "1.5px solid rgba(255,255,255,0.25)",
                  borderRadius: 100,
                  padding: "14px 24px",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.2s",
                }}
              >
                {pass.type === "Sponsor" ? "Become a Partner" : "Register Now"}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .passes-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .passes-grid {
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
