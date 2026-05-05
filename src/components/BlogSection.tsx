"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const posts = [
  {
    tag: "AI & Policy",
    title: "Indonesia's AI Revolution: Wrapping Up 2024 and Launching Into 2025",
    excerpt: "If one can sum up one of the biggest tech trends of 2024 in a single phrase — AI is here to stay. Businesses and governments have recognised AI's transformative potential, with generative AI tools reshaping operations and decision-making across enterprises globally.",
    href: "/knowledge-hub/indonesia-ai-revolution-2025",
  },
  {
    tag: "Smart Cities",
    title: "AI-Powered Smart Cities: Indonesia's Blueprint for a Sustainable Future",
    excerpt: "Southeast Asia is leading the charge on sustainable urban development, with AI technologies playing a vital role. Indonesia is building city infrastructure that responds, adapts, and optimises in real time — addressing rising water levels, extreme weather, and resource efficiency.",
    href: "/knowledge-hub/ai-powered-smart-cities",
  },
  {
    tag: "AI Adoption",
    title: "Indonesia's AI Revolution: How It's Leading the Charge in Southeast Asia",
    excerpt: "Over 92% of Indonesia's workforce is implementing generative AI tools to enhance business operations. The widespread integration is transforming traditional industries including telecommunications, education, and banking at an unprecedented pace.",
    href: "/knowledge-hub/indonesia-ai-revolution-sea",
  },
  {
    tag: "Tourism & AI",
    title: "Indonesia's Tourism Ecosystem Gets Smarter with AI Integration",
    excerpt: "Indonesia is implementing AI technologies on its Indonesia.travel platform to create personalised vacation experiences. The Ministry of Tourism's initiative represents a shift toward intelligent travel recommendations powered by deep data analysis.",
    href: "/knowledge-hub/indonesia-tourism-ai",
  },
  {
    tag: "Infrastructure",
    title: "Indonesia's AI Ambitions Take Shape with Launch of Groundbreaking AI Center",
    excerpt: "Indonesia has unveiled its first AI experience centre at Solo Technopark — the Digital Intelligence Operations Center (DIOC). The interactive hub features next-generation 5G infrastructure and AI applications ranging from smart city simulations to generative art.",
    href: "/knowledge-hub/indonesia-ai-center",
  },
  {
    tag: "Global Collaboration",
    title: "India and Indonesia Are Using AI to Reshape Global Digital Collaboration",
    excerpt: "India and Indonesia have partnered strategically on AI initiatives, with AIonOS serving as a joint venture combining India's technical capabilities with Indonesia's rapidly expanding digital market — a model for South-South tech collaboration.",
    href: "/knowledge-hub/india-indonesia-ai-collaboration",
  },
  {
    tag: "National Strategy",
    title: "Indonesia's AI Ascent: A Nation Forging its Digital Future",
    excerpt: "For a nation as dynamic and geographically complex as Indonesia, AI extends far beyond technological advancement. The nation's 2020 national AI strategy demonstrates its commitment to leveraging artificial intelligence across food security, social aid, and essential public services.",
    href: "/knowledge-hub/indonesia-digital-future",
  },
];

const tagColor: Record<string, string> = {
  "AI & Policy":          "#1b9ad6",
  "Smart Cities":         "#a78bfa",
  "AI Adoption":          "#1b9ad6",
  "Tourism & AI":         "#fb923c",
  "Infrastructure":       "#c0f43c",
  "Global Collaboration": "#a78bfa",
  "National Strategy":    "#fb923c",
};

export default function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("blg-in"); }),
      { threshold: 0.07 }
    );
    el.querySelectorAll(".blg-reveal").forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="knowledge-hub" ref={ref} className="blg-root">
      <div className="blg-inner">

        {/* Header */}
        <div className="blg-header blg-reveal">
          <div className="blg-eyebrow">
            <span className="blg-eye-dot" />
            Knowledge Hub
          </div>
          <h2 className="blg-h2">
            Indonesia&apos;s AI Story,<br/>
            <span className="blg-grad">Told in Numbers &amp; Narratives</span>
          </h2>
          <p className="blg-sub">
            Insights, research, and perspectives on Indonesia&apos;s AI transformation — curated from the World AI Show editorial team.
          </p>
        </div>

        {/* Grid */}
        <div className="blg-grid">
          {/* Featured post — first card spans 2 cols */}
          <Link
            href={posts[0].href}
            className="blg-card blg-card-featured blg-reveal"
          >
            <div className="blg-card-top">
              <span className="blg-tag" style={{ color: tagColor[posts[0].tag], borderColor: tagColor[posts[0].tag] + "44" }}>
                {posts[0].tag}
              </span>
            </div>
            <h3 className="blg-title blg-title-lg">{posts[0].title}</h3>
            <p className="blg-excerpt">{posts[0].excerpt}</p>
            <span className="blg-read">
              Read Article
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>

          {/* Remaining 6 posts */}
          {posts.slice(1).map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="blg-card blg-reveal"
              style={{ transitionDelay: `${(i + 1) * 0.07}s` }}
            >
              <div className="blg-card-top">
                <span className="blg-tag" style={{ color: tagColor[p.tag], borderColor: tagColor[p.tag] + "44" }}>
                  {p.tag}
                </span>
              </div>
              <h3 className="blg-title">{p.title}</h3>
              <p className="blg-excerpt">{p.excerpt}</p>
              <span className="blg-read">
                Read Article
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>

      </div>

      <style>{`
        .blg-root {
          background: #060b24;
          padding: 100px 0 110px;
          position: relative;
          overflow: hidden;
        }
        /* subtle dot grid */
        .blg-root::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(rgba(27,154,214,0.10) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }
        .blg-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 48px;
          position: relative; z-index: 1;
        }

        /* Header */
        .blg-header { text-align: center; margin-bottom: 64px; }
        .blg-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #1b9ad6;
          border: 1px solid rgba(27,154,214,0.3); padding: 6px 20px;
          border-radius: 100px; margin-bottom: 24px;
        }
        .blg-eye-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #1b9ad6; box-shadow: 0 0 8px #1b9ad6;
          animation: blg-blink 2s ease-in-out infinite;
        }
        @keyframes blg-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .blg-h2 {
          font-family: var(--font-space);
          font-size: clamp(28px, 3.5vw, 52px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.03em; line-height: 1.12; margin-bottom: 18px;
        }
        .blg-grad {
          background: linear-gradient(100deg, #1b9ad6, #c0f43c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .blg-sub {
          font-family: var(--font-inter); font-size: 16px; line-height: 1.7;
          color: rgba(255,255,255,0.78); max-width: 520px; margin: 0 auto;
        }

        /* Grid */
        .blg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* Cards */
        .blg-card {
          display: flex; flex-direction: column;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 28px;
          text-decoration: none;
          transition: border-color 0.25s, transform 0.25s, background 0.25s, box-shadow 0.25s;
          cursor: pointer;
        }
        .blg-card:hover {
          border-color: rgba(27,154,214,0.4);
          background: rgba(27,154,214,0.06);
          transform: translateY(-4px);
          box-shadow: 0 0 0 1px rgba(27,154,214,0.12), 0 0 24px rgba(27,154,214,0.22), 0 12px 40px rgba(0,0,0,0.3);
        }
        .blg-card-featured {
          grid-column: span 2;
          background: rgba(27,154,214,0.05);
          border-color: rgba(27,154,214,0.18);
        }
        .blg-card-featured:hover {
          border-color: rgba(27,154,214,0.5);
          background: rgba(27,154,214,0.09);
          box-shadow: 0 0 0 1px rgba(27,154,214,0.18), 0 0 32px rgba(27,154,214,0.28), 0 16px 48px rgba(0,0,0,0.3);
        }

        .blg-card-top { margin-bottom: 14px; }
        .blg-tag {
          display: inline-block;
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          border: 1px solid; padding: 4px 12px; border-radius: 100px;
        }
        .blg-title {
          font-family: var(--font-space); font-size: 15px; font-weight: 700;
          color: #fff; line-height: 1.4; letter-spacing: -0.01em;
          margin-bottom: 12px; flex: 1;
        }
        .blg-title-lg {
          font-size: clamp(18px, 1.8vw, 24px);
        }
        .blg-excerpt {
          font-family: var(--font-inter); font-size: 13px; line-height: 1.7;
          color: rgba(255,255,255,0.75); margin-bottom: 20px; flex: 1;
        }
        .blg-card-featured .blg-excerpt {
          font-size: 14px; color: rgba(255,255,255,0.78);
        }
        .blg-read {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #1b9ad6; margin-top: auto;
          transition: gap 0.2s;
        }
        .blg-card:hover .blg-read { gap: 10px; }

        /* Reveal */
        .blg-reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .blg-in { opacity: 1; transform: none; }

        @media (max-width: 900px) {
          .blg-inner { padding: 0 24px; }
          .blg-grid { grid-template-columns: 1fr 1fr; }
          .blg-card-featured { grid-column: span 2; }
        }
        @media (max-width: 600px) {
          .blg-grid { grid-template-columns: 1fr; }
          .blg-card-featured { grid-column: span 1; }
        }
      `}</style>
    </section>
  );
}
