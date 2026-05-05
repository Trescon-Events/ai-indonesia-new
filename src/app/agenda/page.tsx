"use client";
import { useEffect, useRef, useState } from "react";

const days = [
  {
    label: "Day 1",
    date: "7 July 2026",
    sessions: [
      { time: "08:00", type: "Registration", title: "Registration & Networking",                                                                                speaker: "", duration: "60 min", desc: "" },
      { time: "09:00", type: "Keynote",      title: "Opening Remarks",                                                                                         speaker: "", duration: "15 min", desc: "" },
      { time: "09:15", type: "Keynote",      title: "Indonesia's AI Decade: From Digital Nation to AI Nation",                                                 speaker: "", duration: "20 min", desc: "Spotlighting AI's strategic role in Indonesia's economic growth, national planning and digital transformation — exploring public-private collaboration, digital infrastructure and AI-driven productivity to strengthen competitiveness and shape a future-ready economy." },
      { time: "09:35", type: "Panel",        title: "Can Regulation and Sovereignty Coexist in Indonesia's AI Ambition?",                                      speaker: "", duration: "45 min", desc: "Policymakers and industry leaders debate how regulation and data sovereignty can keep pace with innovation — covering accountability, sovereign cloud, auditability, cross-border data flows and home-grown LLMs." },
      { time: "10:20", type: "Keynote",      title: "The Pulse of the Archipelago: AI for Smart Government & Citizen Services",                                speaker: "", duration: "15 min", desc: "How sovereign AI, localized LLMs and predictive analytics are enabling faster disaster response, multilingual citizen engagement, and accessible healthcare and legal services across Indonesia's 17,000 islands." },
      { time: "10:35", type: "Fireside",     title: "Ethical AI: Building Trust, Transparency & Accountability in the Age of Intelligence",                   speaker: "", duration: "20 min", desc: "From bias and fairness to explainability and data privacy — industry leaders discuss practical frameworks for responsible AI deployment and aligning systems with regulatory and societal expectations." },
      { time: "11:00", type: "Break",        title: "Networking Break",                                                                                        speaker: "", duration: "20 min", desc: "" },
      { time: "11:20", type: "Panel",        title: "From Insight to Impact: How AI and Data Intelligence are Redefining Business Growth in Indonesia",        speaker: "", duration: "40 min", desc: "Leaders from banking, retail, telecom and manufacturing explore how organizations move beyond dashboards to embed AI into core strategies — transforming data into measurable business outcomes." },
      { time: "12:00", type: "Break",        title: "Networking Lunch",                                                                                        speaker: "", duration: "60 min", desc: "" },
      { time: "13:00", type: "Panel",        title: "AI at the Frontlines: Securing Indonesia's Digital Future in an Era of Intelligent Threats",              speaker: "", duration: "45 min", desc: "How ML, threat anomaly identification, threat intelligence and AI-driven incident response can protect critical infrastructure and build trust across Indonesia's public and private sectors." },
      { time: "13:45", type: "Fireside",     title: "From Data to Decisions: How Agentic AI Will Reshape Indonesia's Policy Playbook for Smarter Governance", speaker: "", duration: "15 min", desc: "Exploring how agentic AI can speed up policy research, detect risks earlier and deliver more accurate government insights — with focus on governance, safeguards and human oversight." },
      { time: "14:00", type: "Panel",        title: "Governing AI for Public Value: Trust, Inclusion and Economic Impact",                                     speaker: "", duration: "40 min", desc: "How policy, regulation and public–private collaboration can ensure AI drives economic value while remaining ethical, transparent and accessible to all citizens." },
      { time: "14:40", type: "Break",        title: "Networking Break",                                                                                        speaker: "", duration: "20 min", desc: "" },
      { time: "15:00", type: "Fireside",     title: "AI x IoT x Automation: The New Engine of Indonesia's Industry 4.0 Revolution",                          speaker: "", duration: "20 min", desc: "How smart sensors, digital twins, real-time analytics and AI-driven automation are driving efficiency and innovation across Indonesia's industrial ecosystem." },
      { time: "15:20", type: "Fireside",     title: "Scaling Indonesia's SME Revolution with Adaptive Learning and Conversational AI",                        speaker: "", duration: "20 min", desc: "How adaptive learning engines, multimodal chatbots and AI-driven knowledge delivery can close capability gaps and accelerate competitiveness for Indonesia's 65 million SMEs." },
      { time: "15:40", type: "Panel",        title: "AI Agents at Work: Are Autonomous Enterprises Closer Than We Think?",                                    speaker: "", duration: "40 min", desc: "From Copilots to autonomous teammates — how AI agents are transforming workflows across customer service, logistics, finance and operations, and what governance is needed." },
      { time: "16:20", type: "Keynote",      title: "Magnifying the Skills: Who Will Build Indonesia's AI Workforce?",                                        speaker: "", duration: "15 min", desc: "How governments, universities and enterprises can collaborate to upskill 100 million workers, create AI-ready graduates and future-proof jobs in the AI economy." },
      { time: "16:35", type: "Break",        title: "Closing Remarks",                                                                                        speaker: "", duration: "15 min", desc: "" },
    ],
  },
  {
    label: "Day 2",
    date: "8 July 2026",
    sessions: [
      { time: "08:00", type: "Registration", title: "Registration & Networking",                                                                                speaker: "", duration: "60 min", desc: "" },
      { time: "09:00", type: "Fireside",     title: "Responsible AI in Finance: Balancing Innovation, Risk & Regulation",                                      speaker: "", duration: "15 min", desc: "How banks and fintechs balance innovation with regulation — covering real-time fraud detection, AI credit scoring, conversational banking and predictive financial services." },
      { time: "09:15", type: "Panel",        title: "Generative AI: Moving Beyond the Hype to Real Business Impact",                                           speaker: "", duration: "45 min", desc: "How leading organizations are scaling GenAI beyond pilots into core business functions — driving efficiency, enhancing customer experience and unlocking new revenue streams." },
      { time: "10:00", type: "Fireside",     title: "Data Governance vs Data Innovation: Finding the Right Balance in the AI Era",                             speaker: "", duration: "20 min", desc: "How leaders establish modern governance frameworks that protect privacy, security and compliance without slowing AI experimentation and innovation." },
      { time: "10:20", type: "Panel",        title: "The Digital City Stack: AI, Connectivity and Cloud in Action",                                            speaker: "", duration: "40 min", desc: "How governments and technology leaders collaborate to build scalable smart cities powered by AI, 5G and cloud — from intelligent traffic systems to citizen services." },
      { time: "11:00", type: "Break",        title: "Networking Break",                                                                                        speaker: "", duration: "20 min", desc: "" },
      { time: "11:20", type: "Fireside",     title: "Towards Predictive Health Care: AI's Role in Modern Healthcare",                                         speaker: "", duration: "20 min", desc: "Healthcare leaders discuss how AI is improving diagnostics, patient monitoring and hospital operations while navigating ethics, data privacy and clinical trust." },
      { time: "11:40", type: "Keynote",      title: "AI for Oil & Gas: Building the Intelligent Energy Enterprise",                                            speaker: "", duration: "20 min", desc: "How energy companies use data, automation and advanced analytics across the oil and gas value chain — from exploration and drilling to refining, safety and predictive maintenance." },
      { time: "12:00", type: "Break",        title: "Networking Lunch Break",                                                                                  speaker: "", duration: "60 min", desc: "" },
      { time: "13:00", type: "Panel",        title: "Smart Investments in the Age of AI: Strategy, Talent, Adoption and Returns",                              speaker: "", duration: "45 min", desc: "Where capital is flowing across the AI value chain — from infrastructure and platforms to enterprise applications — and how talent and adoption drive sustainable returns." },
      { time: "13:45", type: "Panel",        title: "AI at Scale: From Pilot Projects to Real Business Impact",                                                speaker: "", duration: "45 min", desc: "How enterprises successfully scale AI from experimentation to enterprise-wide impact — building data foundations, overcoming deployment challenges and measuring real ROI." },
      { time: "14:30", type: "Keynote",      title: "Green Economy Powered by AI",                                                                             speaker: "", duration: "20 min", desc: "AI as a catalyst for tackling climate challenges — optimizing energy use, reducing emissions and enabling smarter cities while balancing environmental responsibility with long-term growth." },
      { time: "15:00", type: "Ceremony",     title: "WAIS Show Leadership Awards",                                                                             speaker: "", duration: "60 min", desc: "Recognising the most outstanding leaders, innovators and organisations driving Indonesia's AI transformation across technology, policy, enterprise and impact." },
    ],
  },
];

const typeConfig: Record<string, { dot: string; badge: string; badgeText: string; label: string }> = {
  Keynote:      { dot: "#c0f43c",  badge: "rgba(192,244,60,0.15)",    badgeText: "#c0f43c",  label: "Keynote"      },
  Panel:        { dot: "#1b9ad6",  badge: "rgba(27,154,214,0.15)",    badgeText: "#1b9ad6",  label: "Panel"        },
  Fireside:     { dot: "#fb923c",  badge: "rgba(251,146,60,0.15)",    badgeText: "#fb923c",  label: "Fireside Chat" },
  Talk:         { dot: "#a78bfa",  badge: "rgba(167,139,250,0.15)",   badgeText: "#a78bfa",  label: "Talk"         },
  Workshop:     { dot: "#a78bfa",  badge: "rgba(167,139,250,0.15)",   badgeText: "#a78bfa",  label: "Workshop"     },
  Break:        { dot: "#444",     badge: "rgba(255,255,255,0.05)",   badgeText: "#555",     label: "Break"        },
  Registration: { dot: "#444",     badge: "rgba(255,255,255,0.05)",   badgeText: "#555",     label: "Registration" },
  Ceremony:     { dot: "#c0f43c",  badge: "rgba(192,244,60,0.12)",    badgeText: "#c0f43c",  label: "Awards"       },
};

const streams = [
  { top: "20%", delay: 0,   dur: 8  },
  { top: "38%", delay: 1.6, dur: 10 },
  { top: "55%", delay: 0.8, dur: 7  },
  { top: "72%", delay: 2.3, dur: 9  },
];

export default function AgendaPage() {
  const [activeDay, setActiveDay] = useState(0);
  const [mounted, setMounted]     = useState(false);
  const timelineRef               = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("ag-in"); }),
      { threshold: 0.05 }
    );
    el.querySelectorAll(".ag-reveal").forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, [activeDay]);

  return (
    <div className="ag-page">

      {/* Background layers */}
      <div className="ag-grid-bg" />
      <div className="ag-glow-tr" />
      <div className="ag-glow-bl" />

      {/* Rising particles */}
      {[...Array(10)].map((_, i) => {
        const clr = ["#1b9ad6","#c0f43c","#a78bfa","#fb923c"][i % 4];
        return (
          <div key={i} className="ag-particle" style={{
            left: `${8 + i * 9}%`,
            width: 3, height: 3,
            background: clr,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${9 + (i % 4)}s`,
          }} />
        );
      })}

      {/* ── Hero ── */}
      <div className="ag-hero">

        {/* Flowing streams */}
        <div className="ag-streams" aria-hidden="true">
          {streams.map((s, i) => (
            <div key={i} className="ag-stream" style={{
              top: s.top,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }} />
          ))}
        </div>

        <div className="ag-hero-inner">
          <div className={`ag-eyebrow${mounted ? " ag-in" : ""}`}>
            <span className="ag-eye-dot" />
            Event Programme
          </div>
          <h1 className={`ag-h1${mounted ? " ag-in ag-delay-1" : ""}`}>
            Conference<br/>
            <span className="ag-grad">Agenda</span>
          </h1>
          <p className={`ag-sub${mounted ? " ag-in ag-delay-2" : ""}`}>
            Two days of keynotes, panels, workshops, and networking —<br/>
            designed for Indonesia&apos;s AI community.
          </p>

          {/* Stats strip */}
          <div className={`ag-stats${mounted ? " ag-in ag-delay-3" : ""}`}>
            {[
              { n: "2",    l: "Days"      },
              { n: "25+",  l: "Sessions"  },
              { n: "40+",  l: "Speakers"  },
              { n: "1K+",  l: "Attendees" },
            ].map((s, i) => (
              <div key={i} className="ag-stat">
                <span className="ag-stat-n">{s.n}</span>
                <span className="ag-stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ag-scroll-cue">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 11l6 6 6-6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="ag-content">
        <div className="ag-inner">

          {/* Day tabs */}
          <div className="ag-tabs">
            {days.map((day, i) => (
              <button
                key={i}
                className={`ag-tab${activeDay === i ? " ag-tab-active" : ""}`}
                onClick={() => setActiveDay(i)}
              >
                {day.label}
                <span className="ag-tab-date">{day.date}</span>
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="ag-timeline">

            {/* Vertical line with traveling light */}
            <div className="ag-line">
              <div className="ag-line-light" />
            </div>

            {days[activeDay].sessions.map((session, i) => {
              const cfg = typeConfig[session.type] ?? typeConfig.Break;
              const isUtil = session.type === "Break" || session.type === "Registration";
              return (
                <div key={i} className={`ag-row ag-reveal${isUtil ? " ag-row-util" : ""}`}
                  style={{ transitionDelay: `${i * 0.04}s` }}>

                  {/* Time column */}
                  <div className="ag-time-col">
                    <span className="ag-time">{session.time}</span>
                  </div>

                  {/* Node dot */}
                  <div className="ag-node-wrap">
                    <div className="ag-node" style={{ background: cfg.dot, boxShadow: `0 0 8px ${cfg.dot}66` }} />
                  </div>

                  {/* Session card */}
                  <div className={`ag-card${isUtil ? " ag-card-util" : ""}`}>
                    <div className="ag-card-left">
                      <span className="ag-badge" style={{ background: cfg.badge, color: cfg.badgeText }}>
                        {cfg.label}
                      </span>
                      <div className="ag-title" style={{ color: isUtil ? "rgba(255,255,255,0.4)" : "#fff" }}>
                        {session.title}
                      </div>
                      {session.speaker && (
                        <div className="ag-speaker">{session.speaker}</div>
                      )}
                      {!isUtil && session.desc && (
                        <div className="ag-desc">{session.desc}</div>
                      )}
                    </div>
                    <div className="ag-duration" style={{ alignSelf: "flex-start" }}>{session.duration}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        /* ── Page base ── */
        .ag-page {
          background: #060b24;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Background layers */
        .ag-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(rgba(27,154,214,0.10) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 40%, black 20%, transparent 100%);
        }
        .ag-glow-tr {
          position: fixed; top: -200px; right: -200px; width: 600px; height: 600px;
          border-radius: 50%; pointer-events: none; z-index: 0;
          background: radial-gradient(circle, rgba(27,154,214,0.12) 0%, transparent 70%);
        }
        .ag-glow-bl {
          position: fixed; bottom: -200px; left: -200px; width: 500px; height: 500px;
          border-radius: 50%; pointer-events: none; z-index: 0;
          background: radial-gradient(circle, rgba(192,244,60,0.07) 0%, transparent 70%);
        }

        /* Particles */
        .ag-particle {
          position: fixed; bottom: 0; border-radius: 50%; opacity: 0;
          animation: ag-rise linear infinite; pointer-events: none; z-index: 1;
        }
        @keyframes ag-rise {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.45; }
          88%  { opacity: 0.15; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        /* ── Hero ── */
        .ag-hero {
          position: relative; z-index: 2;
          padding: 110px 0 40px;
          overflow: hidden;
          text-align: center;
        }

        /* Flowing streams */
        .ag-streams {
          position: absolute; inset: 0; overflow: hidden; pointer-events: none;
        }
        .ag-stream {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(27,154,214,0.25) 30%,
            rgba(192,244,60,0.35) 60%, transparent 100%);
          animation: ag-flow linear infinite;
        }
        @keyframes ag-flow {
          from { transform: translateX(-100%); }
          to   { transform: translateX(200%); }
        }

        .ag-hero-inner {
          position: relative; z-index: 2;
          max-width: 760px; margin: 0 auto; padding: 0 48px;
        }

        /* Reveal base */
        .ag-eyebrow, .ag-h1, .ag-sub, .ag-stats {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ag-in { opacity: 1 !important; transform: none !important; }
        .ag-delay-1 { transition-delay: 0.15s !important; }
        .ag-delay-2 { transition-delay: 0.28s !important; }
        .ag-delay-3 { transition-delay: 0.42s !important; }

        .ag-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #1b9ad6;
          border: 1px solid rgba(27,154,214,0.3); padding: 6px 20px;
          border-radius: 100px; margin-bottom: 28px;
        }
        .ag-eye-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #1b9ad6; box-shadow: 0 0 8px #1b9ad6;
          animation: ag-blink 2s ease-in-out infinite;
        }
        @keyframes ag-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .ag-h1 {
          font-family: var(--font-space);
          font-size: clamp(40px, 5.5vw, 80px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.03em; line-height: 1.08;
          margin-bottom: 20px;
        }
        .ag-grad {
          background: linear-gradient(100deg, #1b9ad6 0%, #c0f43c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ag-sub {
          font-family: var(--font-inter); font-size: 17px; line-height: 1.75;
          color: rgba(255,255,255,0.5); margin-bottom: 32px;
        }

        /* Stats */
        .ag-stats {
          display: flex; justify-content: center; gap: 0;
          border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;
          background: rgba(255,255,255,0.03); overflow: hidden;
          max-width: 560px; margin: 0 auto;
        }
        .ag-stat {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          padding: 20px 16px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .ag-stat:last-child { border-right: none; }
        .ag-stat-n {
          font-family: var(--font-space); font-size: 26px; font-weight: 800;
          color: #c0f43c; letter-spacing: -0.02em; line-height: 1;
        }
        .ag-stat-l {
          font-family: var(--font-inter); font-size: 11px;
          color: rgba(255,255,255,0.4); margin-top: 5px; letter-spacing: 0.05em;
        }

        .ag-scroll-cue { display: none; }

        /* ── Content ── */
        .ag-content {
          position: relative; z-index: 2;
          background: #0a0f2a;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 40px 0 120px;
        }
        .ag-inner {
          max-width: 980px; margin: 0 auto; padding: 0 48px;
        }

        /* Day tabs */
        .ag-tabs {
          display: flex; gap: 10px; margin-bottom: 36px; justify-content: center;
          flex-wrap: wrap;
        }
        .ag-tab {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 13px; font-weight: 700;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 10px 28px; border-radius: 100px;
          cursor: pointer;
          transition: all 0.22s;
        }
        .ag-tab:hover { color: rgba(255,255,255,0.75); border-color: rgba(255,255,255,0.25); }
        .ag-tab-active {
          color: #c0f43c !important;
          border-color: rgba(192,244,60,0.5) !important;
          background: rgba(192,244,60,0.08) !important;
        }
        .ag-tab-date {
          font-family: var(--font-inter); font-size: 11px; font-weight: 400;
          color: rgba(255,255,255,0.3); letter-spacing: 0.03em;
        }
        .ag-tab-active .ag-tab-date { color: rgba(192,244,60,0.6); }

        /* ── Timeline ── */
        .ag-timeline {
          position: relative;
        }

        /* Vertical line */
        .ag-line {
          position: absolute;
          left: 145px;
          top: 0; bottom: 0;
          width: 2px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .ag-line-light {
          position: absolute;
          left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to bottom, transparent, #1b9ad6, #c0f43c, transparent);
          animation: ag-travel 4s linear infinite;
          top: -120px;
        }
        @keyframes ag-travel {
          0%   { top: -120px; }
          100% { top: 100%; }
        }

        /* Row */
        .ag-row {
          display: grid;
          grid-template-columns: 120px 26px 1fr;
          gap: 0 20px;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .ag-row-util { margin-bottom: 10px; }

        /* Reveal */
        .ag-reveal {
          opacity: 0; transform: translateX(-16px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }

        /* Time */
        .ag-time-col { text-align: right; padding-top: 22px; }
        .ag-time {
          font-family: var(--font-space); font-size: 16px; font-weight: 700;
          color: rgba(255,255,255,0.65); letter-spacing: 0.03em;
        }

        /* Node */
        .ag-node-wrap {
          display: flex; justify-content: center; padding-top: 26px;
          position: relative; z-index: 2;
        }
        .ag-node {
          width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0;
        }

        /* Card */
        .ag-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 18px;
          padding: 22px 28px;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .ag-card:hover {
          background: rgba(27,154,214,0.05);
          border-color: rgba(27,154,214,0.40);
          transform: translateX(4px);
          box-shadow: 0 0 0 1px rgba(27,154,214,0.12), 0 0 20px rgba(27,154,214,0.18), 0 8px 32px rgba(0,0,0,0.25);
        }
        .ag-card-util {
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(255,255,255,0.07);
          padding: 14px 28px;
        }
        .ag-card-util:hover { transform: none; border-color: rgba(255,255,255,0.12); }

        .ag-card-left { display: flex; flex-direction: column; gap: 8px; flex: 1; }

        .ag-badge {
          display: inline-block; align-self: flex-start;
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 100px;
        }

        .ag-title {
          font-family: var(--font-space); font-size: 17px; font-weight: 700;
          line-height: 1.4; letter-spacing: -0.01em;
        }

        .ag-speaker {
          font-family: var(--font-inter); font-size: 14px;
          color: #1b9ad6; font-weight: 500;
        }

        .ag-desc {
          font-family: var(--font-inter); font-size: 13px;
          color: rgba(255,255,255,0.45); line-height: 1.65;
          margin-top: 2px;
        }

        .ag-duration {
          font-family: var(--font-space); font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.35); flex-shrink: 0; white-space: nowrap;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .ag-inner { padding: 0 20px; }
          .ag-hero-inner { padding: 0 24px; }
          .ag-line { left: 91px; }
          .ag-row { grid-template-columns: 68px 22px 1fr; gap: 0 14px; }
          .ag-time { font-size: 13px; }
          .ag-title { font-size: 15px; }
          .ag-h1 { font-size: clamp(36px, 10vw, 52px); }
        }
      `}</style>
    </div>
  );
}
