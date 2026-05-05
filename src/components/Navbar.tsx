"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home",          href: "/" },
  { label: "Agenda",        href: "/agenda" },
  { label: "Speakers",      href: "/speakers" },
  { label: "Partners",      href: "/partners" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled
            ? "rgba(6, 10, 36, 0.97)"
            : "rgba(4, 8, 28, 0.72)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "background 0.35s ease, border-color 0.35s ease",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        <div
          className="nav-inner"
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 24px",
            height: 68,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Logo ── */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ display: "inline-flex" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: "6px 14px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: "background 0.25s, border-color 0.25s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.10)";
                el.style.borderColor = "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.06)";
                el.style.borderColor = "rgba(255,255,255,0.12)";
              }}
              >
                <Image
                  src="/images/top-logo.svg"
                  alt="World AI Show Jakarta 2026"
                  width={200}
                  height={40}
                  style={{ height: 34, width: "auto", display: "block" }}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* ── CENTRE: Nav links ── */}
          <div className="nav-centre" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.88)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "8px 14px",
                  borderRadius: 8,
                  transition: "background 0.18s, color 0.18s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── RIGHT: CTAs + Hamburger ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
            {/* CTA buttons — hidden on small screens */}
            <div className="nav-ctas" style={{ display: "flex", gap: 8 }}>
              <Link
                href="/enquire"
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  background: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  padding: "8px 20px",
                  borderRadius: 100,
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.01em",
                  transition: "background 0.25s, border-color 0.25s, color 0.25s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "linear-gradient(100deg, #1b9ad6, #c0f43c)";
                  el.style.borderColor = "transparent";
                  el.style.color = "#1a1f4e";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.borderColor = "rgba(255,255,255,0.3)";
                  el.style.color = "#fff";
                }}
              >
                ENQUIRE
              </Link>
              <Link
                href="/register"
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1a1f4e",
                  background: "#c0f43c",
                  padding: "9px 20px",
                  borderRadius: 100,
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.01em",
                }}
              >
                REGISTER
              </Link>
            </div>

            {/* Hamburger — shown on small screens */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger"
              aria-label="Toggle menu"
              style={{
                display: "none",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                cursor: "pointer",
                padding: "8px 10px",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <span style={{
                display: "block", width: 22, height: 2,
                background: menuOpen ? "#c0f43c" : "#fff",
                borderRadius: 2,
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                transition: "transform 0.25s, background 0.2s",
              }} />
              <span style={{
                display: "block", width: 22, height: 2,
                background: "#fff", borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }} />
              <span style={{
                display: "block", width: 22, height: 2,
                background: menuOpen ? "#c0f43c" : "#fff",
                borderRadius: 2,
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                transition: "transform 0.25s, background 0.2s",
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile / Tablet drawer ── */}
      <div
        className="mobile-menu"
        style={{
          position: "fixed",
          top: 68,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "#0a0e2a",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          maxHeight: menuOpen ? 500 : 0,
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
          display: "none",
        }}
      >
        <div style={{ padding: "24px 24px 32px" }}>
          {/* Nav links stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 24 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.88)",
                  padding: "12px 16px",
                  borderRadius: 10,
                  display: "block",
                  transition: "background 0.18s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              href="/enquire"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-space)",
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.25)",
                padding: "12px 24px",
                borderRadius: 100,
                display: "inline-block",
                flex: 1,
                textAlign: "center",
              }}
            >
              ENQUIRE
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-space)",
                fontSize: 14,
                fontWeight: 700,
                color: "#1a1f4e",
                background: "#c0f43c",
                padding: "12px 24px",
                borderRadius: 100,
                display: "inline-block",
                flex: 1,
                textAlign: "center",
              }}
            >
              REGISTER
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        /* Tablet: hide centre nav, show hamburger, keep CTAs */
        @media (max-width: 1024px) {
          .nav-centre { display: none !important; }
          .hamburger  { display: flex !important; }
          .mobile-menu { display: block !important; }
        }
        /* Mobile: hide CTAs, switch to 2-col grid so hamburger sits at far right */
        @media (max-width: 640px) {
          .nav-ctas { display: none !important; }
          .nav-inner { grid-template-columns: auto 1fr !important; }
        }
      `}</style>
    </>
  );
}
