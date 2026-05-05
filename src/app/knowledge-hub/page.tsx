"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const posts = [
  {
    tag: "AI & Policy",
    title: "Indonesia's AI Revolution: Wrapping Up 2024 and Launching Into 2025",
    excerpt: "If one can sum up one of the biggest tech trends of 2024 in a single phrase — AI is here to stay. Businesses and governments have recognised AI's transformative potential, with generative AI tools reshaping operations and decision-making across enterprises globally.",
    href: "/knowledge-hub/indonesia-ai-revolution-2025",
    featured: true,
  },
  {
    tag: "Smart Cities",
    title: "AI-Powered Smart Cities: Indonesia's Blueprint for a Sustainable Future",
    excerpt: "Southeast Asia is leading the charge on sustainable urban development, with AI technologies playing a vital role. Indonesia is building city infrastructure that responds, adapts, and optimises in real time — addressing rising water levels, extreme weather, and resource efficiency.",
    href: "/knowledge-hub/ai-powered-smart-cities",
    featured: false,
  },
  {
    tag: "AI Adoption",
    title: "Indonesia's AI Revolution: How It's Leading the Charge in Southeast Asia",
    excerpt: "Over 92% of Indonesia's workforce is implementing generative AI tools to enhance business operations. The widespread integration is transforming traditional industries including telecommunications, education, and banking at an unprecedented pace.",
    href: "/knowledge-hub/indonesia-ai-revolution-sea",
    featured: false,
  },
  {
    tag: "Tourism & AI",
    title: "Indonesia's Tourism Ecosystem Gets Smarter with AI Integration",
    excerpt: "Indonesia is implementing AI on its Indonesia.travel platform to create personalised vacation experiences. The Ministry of Tourism's initiative represents a shift toward intelligent travel recommendations powered by deep data analysis.",
    href: "/knowledge-hub/indonesia-tourism-ai",
    featured: false,
  },
  {
    tag: "Infrastructure",
    title: "Indonesia's AI Ambitions Take Shape with Launch of Groundbreaking AI Center",
    excerpt: "Indonesia has unveiled its first AI experience centre at Solo Technopark — the Digital Intelligence Operations Center (DIOC). The hub features next-generation 5G infrastructure and AI applications ranging from smart city simulations to generative art.",
    href: "/knowledge-hub/indonesia-ai-center",
    featured: false,
  },
  {
    tag: "Global Collaboration",
    title: "India and Indonesia Are Using AI to Reshape Global Digital Collaboration",
    excerpt: "India and Indonesia have partnered strategically on AI initiatives, with AIonOS as a joint venture combining India's technical capabilities with Indonesia's rapidly expanding digital market — a model for South-South tech collaboration.",
    href: "/knowledge-hub/india-indonesia-ai-collaboration",
    featured: false,
  },
  {
    tag: "National Strategy",
    title: "Indonesia's AI Ascent: A Nation Forging its Digital Future",
    excerpt: "For a nation as dynamic and geographically complex as Indonesia, AI extends far beyond technological advancement. The nation's 2020 national AI strategy demonstrates its commitment to leveraging AI across food security, social aid, and essential public services.",
    href: "/knowledge-hub/indonesia-digital-future",
    featured: false,
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

const allTags = ["All", ...Array.from(new Set(posts.map(p => p.tag)))];

const streams = [
  { top: "18%",  delay: 0,    dur: 7  },
  { top: "35%",  delay: 1.4,  dur: 9  },
  { top: "52%",  delay: 0.6,  dur: 8  },
  { top: "68%",  delay: 2.1,  dur: 6  },
  { top: "82%",  delay: 0.3,  dur: 10 },
];

export default function KnowledgeHubPage() {
  const pageRef   = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("All");
  const [mounted, setMounted] = useState(false);

  const filtered = active === "All" ? posts : posts.filter(p => p.tag === active);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("kh-in"); }),
      { threshold: 0.06 }
    );
    el.querySelectorAll(".kh-reveal").forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, [filtered]);

  return (
    <div ref={pageRef} className="kh-page">

      {/* ── Background layers ── */}
      <div className="kh-grid-bg" />
      <div className="kh-glow-tr" />
      <div className="kh-glow-bl" />

      {/* Rising particles */}
      {[...Array(10)].map((_, i) => {
        const clr = ["#1b9ad6","#c0f43c","#a78bfa","#fb923c"][i % 4];
        return (
          <div key={i} className="kh-particle" style={{
            left: `${8 + i * 9}%`,
            width: "3px", height: "3px",
            background: clr,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${9 + (i % 4)}s`,
          }} />
        );
      })}

      {/* ── Hero ── */}
      <div className="kh-hero">

        {/* Flowing knowledge streams */}
        <div className="kh-streams" aria-hidden="true">
          {streams.map((s, i) => (
            <div key={i} className="kh-stream" style={{
              top: s.top,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }} />
          ))}
        </div>

        <div className="kh-hero-inner">
          <div className={`kh-eyebrow${mounted ? " kh-in" : ""}`}>
            <span className="kh-eye-dot" />
            Knowledge Hub
          </div>
          <h1 className={`kh-h1${mounted ? " kh-in kh-delay-1" : ""}`}>
            Where Ideas<br/>
            <span className="kh-grad">Meet Intelligence</span>
          </h1>
          <p className={`kh-hero-sub${mounted ? " kh-in kh-delay-2" : ""}`}>
            Insights, research, and perspectives on Indonesia&apos;s AI transformation —<br/>
            curated from the World AI Show editorial team.
          </p>

          {/* Animated flowing stat line */}
          <div className={`kh-stat-strip${mounted ? " kh-in kh-delay-3" : ""}`}>
            {[
              { n: "7",     l: "Articles" },
              { n: "6",     l: "Topics"   },
              { n: "229M+", l: "Digital Users" },
              { n: "2030",  l: "AI Horizon" },
            ].map((s, i) => (
              <div key={i} className="kh-stat">
                <span className="kh-stat-n">{s.n}</span>
                <span className="kh-stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="kh-scroll-cue">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 11l6 6 6-6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="kh-content">
        <div className="kh-inner">

          {/* Category filters */}
          <div className="kh-filters">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`kh-filter${active === tag ? " kh-filter-active" : ""}`}
                onClick={() => setActive(tag)}
                style={active === tag && tag !== "All" ? {
                  color: tagColor[tag],
                  borderColor: tagColor[tag],
                  background: tagColor[tag] + "15",
                } : {}}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div ref={gridRef} className="kh-timeline">

            {/* The vertical line with traveling light */}
            <div className="kh-line">
              <div className="kh-light" />
            </div>

            {filtered.map((p, i) => (
              <div key={p.href} className="kh-row kh-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>

                {/* Node on the line */}
                <div className="kh-node-wrap">
                  <div className="kh-node" style={{ background: tagColor[p.tag], boxShadow: `0 0 12px ${tagColor[p.tag]}` }} />
                  <div className="kh-connector" style={{ borderColor: tagColor[p.tag] + "40" }} />
                </div>

                {/* Article card */}
                <Link href={p.href} className="kh-card">
                  <div className="kh-card-bar" style={{ background: tagColor[p.tag] }} />
                  <div className="kh-card-body">
                    <span className="kh-tag" style={{ color: tagColor[p.tag], borderColor: tagColor[p.tag] + "40" }}>
                      {p.tag}
                    </span>
                    <h2 className="kh-title">{p.title}</h2>
                    <p className="kh-excerpt">{p.excerpt}</p>
                    <span className="kh-read" style={{ color: tagColor[p.tag] }}>
                      Read Article
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>

              </div>
            ))}

          </div>

        </div>
      </div>

      <style>{`
        /* ── Page shell ── */
        .kh-page {
          background: #060b24;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .kh-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(27,154,214,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,154,214,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .kh-glow-tr {
          position: fixed; top: -5%; right: -8%; pointer-events: none; z-index: 0;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(27,154,214,0.09) 0%, transparent 65%);
        }
        .kh-glow-bl {
          position: fixed; bottom: 10%; left: -5%; pointer-events: none; z-index: 0;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(192,244,60,0.06) 0%, transparent 65%);
        }

        /* Rising particles */
        .kh-particle {
          position: fixed; bottom: 0; border-radius: 50%;
          opacity: 0; pointer-events: none; z-index: 1;
          animation: kh-rise linear infinite;
        }
        @keyframes kh-rise {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.35; }
          88%  { opacity: 0.12; }
          100% { transform: translateY(-105vh); opacity: 0; }
        }

        /* ── Hero ── */
        .kh-hero {
          position: relative; z-index: 2;
          min-height: 80vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 110px 0 72px;
          overflow: hidden;
        }

        /* Flowing streams */
        .kh-streams {
          position: absolute; inset: 0; pointer-events: none;
        }
        .kh-stream {
          position: absolute; left: -100%; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(27,154,214,0.5) 30%, rgba(192,244,60,0.3) 70%, transparent);
          animation: kh-flow linear infinite;
        }
        @keyframes kh-flow {
          0%   { transform: translateX(-100%); opacity: 0; }
          10%  { opacity: 1; }
          85%  { opacity: 0.6; }
          100% { transform: translateX(200%); opacity: 0; }
        }

        .kh-hero-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 48px;
          position: relative; z-index: 2;
        }

        .kh-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #1b9ad6;
          border: 1px solid rgba(27,154,214,0.3); padding: 6px 20px;
          border-radius: 100px; margin-bottom: 32px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .kh-eye-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #1b9ad6; box-shadow: 0 0 8px #1b9ad6;
          animation: kh-blink 2s ease-in-out infinite;
        }
        @keyframes kh-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .kh-h1 {
          font-family: var(--font-space);
          font-size: clamp(44px, 6.5vw, 96px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.04em; line-height: 1.0;
          margin-bottom: 28px;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .kh-grad {
          background: linear-gradient(110deg, #1b9ad6 0%, #a78bfa 50%, #c0f43c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .kh-hero-sub {
          font-family: var(--font-inter); font-size: clamp(14px, 1.4vw, 17px);
          color: rgba(255,255,255,0.52); line-height: 1.75; margin-bottom: 52px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        /* stat strip */
        .kh-stat-strip {
          display: inline-flex;
          border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;
          background: rgba(255,255,255,0.03); overflow: hidden;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .kh-stat {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          padding: 16px 32px;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .kh-stat:last-child { border-right: none; }
        .kh-stat-n {
          font-family: var(--font-space); font-size: 26px; font-weight: 800;
          color: #c0f43c; line-height: 1;
        }
        .kh-stat-l {
          font-family: var(--font-inter); font-size: 10px;
          color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.1em;
        }

        /* scroll cue */
        .kh-scroll-cue {
          position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
          z-index: 3;
          animation: kh-bounce 2.2s ease-in-out infinite;
        }
        @keyframes kh-bounce {
          0%,100% { transform: translateX(-50%) translateY(0); opacity: 0.4; }
          50%      { transform: translateX(-50%) translateY(8px); opacity: 1; }
        }

        /* ── Content ── */
        .kh-content {
          position: relative; z-index: 2;
          padding: 0 0 100px;
        }
        .kh-inner {
          max-width: 860px; margin: 0 auto; padding: 0 48px;
        }

        /* Filters */
        .kh-filters {
          display: flex; flex-wrap: wrap; gap: 10px;
          margin-bottom: 48px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .kh-filter {
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          padding: 8px 18px; border-radius: 100px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .kh-filter:hover {
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.3);
        }
        .kh-filter-active {
          color: #1b9ad6;
          border-color: rgba(27,154,214,0.5);
          background: rgba(27,154,214,0.1);
        }

        /* ── Timeline ── */
        .kh-timeline {
          position: relative;
          padding-left: 48px;
        }

        /* Vertical line */
        .kh-line {
          position: absolute;
          left: 10px; top: 0; bottom: 0;
          width: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
        }

        /* Traveling light on the line */
        .kh-light {
          position: absolute;
          left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(27,154,214,0.8) 30%,
            rgba(192,244,60,0.9) 60%,
            transparent 100%
          );
          border-radius: 2px;
          animation: kh-travel 4s ease-in-out infinite;
          filter: blur(1px);
        }
        @keyframes kh-travel {
          0%   { top: -120px; }
          100% { top: 100%; }
        }

        /* Each row */
        .kh-row {
          display: flex;
          align-items: flex-start;
          gap: 0;
          margin-bottom: 36px;
          position: relative;
        }
        .kh-row:last-child { margin-bottom: 0; }

        /* Node + connector */
        .kh-node-wrap {
          display: flex; align-items: center;
          flex-shrink: 0;
          position: relative;
          margin-left: -38px;
          margin-right: 0;
          padding-top: 28px;
        }
        .kh-node {
          width: 12px; height: 12px; border-radius: 50%;
          flex-shrink: 0; z-index: 2; position: relative;
        }
        .kh-connector {
          width: 36px; height: 1px;
          border-top: 1px dashed;
          flex-shrink: 0;
        }

        /* Card */
        .kh-card {
          flex: 1;
          display: flex; flex-direction: column;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; overflow: hidden;
          text-decoration: none;
          transition: border-color 0.25s, transform 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .kh-card:hover {
          transform: translateX(6px);
          border-color: rgba(27,154,214,0.45);
          background: rgba(27,154,214,0.05);
          box-shadow: 0 0 0 1px rgba(27,154,214,0.12), 0 0 24px rgba(27,154,214,0.22), 0 12px 40px rgba(0,0,0,0.3);
        }
        .kh-card-bar { height: 3px; width: 100%; flex-shrink: 0; }
        .kh-card-body {
          display: flex; flex-direction: column;
          padding: 24px 28px 26px;
        }
        .kh-tag {
          display: inline-block;
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          border: 1px solid; padding: 4px 12px; border-radius: 100px;
          margin-bottom: 14px; width: fit-content;
        }
        .kh-title {
          font-family: var(--font-space); font-size: clamp(16px, 1.6vw, 20px);
          font-weight: 700; color: #fff; line-height: 1.35;
          letter-spacing: -0.01em; margin-bottom: 12px;
        }
        .kh-excerpt {
          font-family: var(--font-inter); font-size: 14px; line-height: 1.72;
          color: rgba(255,255,255,0.48); margin-bottom: 20px;
        }
        .kh-read {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          transition: gap 0.2s;
        }
        .kh-card:hover .kh-read { gap: 10px; }

        /* Reveal */
        .kh-reveal {
          opacity: 0; transform: translateX(-20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .kh-in { opacity: 1 !important; transform: translateX(0) !important; }

        /* Hero delays */
        .kh-delay-1 { transition-delay: 0.15s !important; }
        .kh-delay-2 { transition-delay: 0.28s !important; }
        .kh-delay-3 { transition-delay: 0.42s !important; }

        /* Responsive */
        @media (max-width: 768px) {
          .kh-hero { min-height: 60vh; padding: 120px 0 60px; }
          .kh-hero-inner { padding: 0 24px; }
          .kh-inner { padding: 0 24px; }
          .kh-hero-sub br { display: none; }
          .kh-stat-strip { flex-wrap: wrap; }
          .kh-stat { padding: 12px 20px; }
          .kh-timeline { padding-left: 32px; }
          .kh-node-wrap { margin-left: -22px; }
          .kh-connector { width: 20px; }
        }
      `}</style>
    </div>
  );
}
