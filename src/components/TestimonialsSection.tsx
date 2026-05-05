"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote: "We generated a lot of potential leads from the event so I am confident we will see a positive return here — hence why we will be sure to keep in touch with the Trescon team for upcoming events.",
    company: "Soroco",
    logo: "/images/testimonials/soroco.png",
    color: "#1b9ad6",
  },
  {
    quote: "The event was a smashing success. The hall was buzzing with delegates seeking to network, learn and attend all activities. We applaud you for your carefully selected guest list.",
    company: "Nybl",
    logo: "/images/testimonials/nybl.png",
    color: "#a78bfa",
  },
  {
    quote: "We find it was quite interesting and very well organized. I must congratulate the organisers — Trescon has done a great job in terms of organizing the show.",
    company: "EasyData",
    logo: "/images/testimonials/easydata.png",
    color: "#c0f43c",
  },
  {
    quote: "The event itself was very engaging and lots of prospects and customers were actually interested to learn more about what we do as well as the overall AI/ML space.",
    company: "Aerospike",
    logo: "/images/testimonials/aerospike.png",
    color: "#fb923c",
  },
  {
    quote: "We liked the event because it was very fun and we got lots of leads and got to meet up with lots of people in the industry.",
    company: "TigerGraph",
    logo: "/images/testimonials/tigergraph.png",
    color: "#c0f43c",
  },
  {
    quote: "We'd like to acknowledge Trescon for all the great efforts and structured organization with thorough follow ups and accommodation.",
    company: "Microsoft",
    logo: "/images/testimonials/microsoft.png",
    color: "#00a4ef",
  },
  {
    quote: "It's been exciting and interesting, and we think there is lots of opportunity here, which is great.",
    company: "Denodo",
    logo: "/images/testimonials/denodo.png",
    color: "#1b9ad6",
  },
  {
    quote: "Exchanging ideas at an event like this really opens up our thinking and helps us think about things differently. It was a great event.",
    company: "Snowflake",
    logo: "/images/testimonials/snowflake.png",
    color: "#29b5e8",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (idx === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 350);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % testimonials.length);
        setFading(false);
      }, 350);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Reset timer on manual click
  const handleDot = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(i);
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % testimonials.length);
        setFading(false);
      }, 350);
    }, 5000);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("tm-in"); }),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".tm-reveal").forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  const t = testimonials[active];

  return (
    <section className="tm-root" ref={ref}>
      <div className="tm-grid-bg" />

      {/* Header */}
      <div className="tm-header tm-reveal">
        <div className="tm-eyebrow">
          <span className="tm-eye-dot" />
          Trusted by Global Leaders
        </div>
        <h2 className="tm-h2">
          What Our Partners<br/>
          <span className="tm-grad">Say About Us</span>
        </h2>
      </div>

      {/* Spotlight quote */}
      <div className="tm-stage tm-reveal">

        {/* Large decorative quote mark */}
        <div className="tm-bigquote" style={{ color: t.color }}>&ldquo;</div>

        {/* Quote text */}
        <p className={`tm-quote${fading ? " tm-fade-out" : " tm-fade-in"}`}>
          {t.quote}
        </p>

        {/* Company logo + name */}
        <div className={`tm-company${fading ? " tm-fade-out" : " tm-fade-in"}`}>
          <div className="tm-logo-wrap" style={{ borderColor: t.color + "33" }}>
            <Image src={t.logo} alt={t.company} fill style={{ objectFit: "contain" }} />
          </div>
        </div>

        {/* Dot navigation */}
        <div className="tm-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`tm-dot${active === i ? " tm-dot-active" : ""}`}
              style={active === i ? { background: t.color } : {}}
              onClick={() => handleDot(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .tm-root {
          background: #080f2e;
          padding: 72px 0 80px;
          overflow: hidden;
          position: relative;
        }
        .tm-grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(27,154,214,0.09) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }

        /* Header */
        .tm-header {
          text-align: center; max-width: 560px;
          margin: 0 auto 56px; padding: 0 32px;
          position: relative; z-index: 1;
        }
        .tm-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #1b9ad6;
          border: 1px solid rgba(27,154,214,0.3); padding: 6px 20px;
          border-radius: 100px; margin-bottom: 24px;
        }
        .tm-eye-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #1b9ad6; box-shadow: 0 0 8px #1b9ad6;
          animation: tm-blink 2s ease-in-out infinite;
        }
        @keyframes tm-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .tm-h2 {
          font-family: var(--font-space);
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.03em; line-height: 1.12; margin: 0;
        }
        .tm-grad {
          background: linear-gradient(100deg, #1b9ad6, #c0f43c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Stage */
        .tm-stage {
          position: relative; z-index: 1;
          max-width: 800px; margin: 0 auto;
          padding: 0 48px;
          text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 28px;
        }

        /* Big quote mark */
        .tm-bigquote {
          font-family: Georgia, serif;
          font-size: 72px; line-height: 0.7;
          opacity: 0.35;
          user-select: none;
          transition: color 0.35s ease;
        }

        /* Quote text */
        .tm-quote {
          font-family: var(--font-inter);
          font-size: clamp(17px, 1.8vw, 22px);
          line-height: 1.75;
          color: rgba(255,255,255,0.85);
          font-style: italic;
          margin: 0;
        }

        /* Company logo */
        .tm-company {
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
        }
        .tm-logo-wrap {
          position: relative; width: 140px; height: 44px;
          background: rgba(255,255,255,0.06);
          border: 1px solid; border-radius: 10px;
          padding: 8px 16px;
        }

        /* Fade transitions */
        .tm-fade-in  { animation: tm-in  0.35s ease forwards; }
        .tm-fade-out { animation: tm-out 0.35s ease forwards; }
        @keyframes tm-in  { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tm-out { from { opacity: 1; transform: translateY(0);    } to { opacity: 0; transform: translateY(-8px); } }

        /* Dots */
        .tm-dots {
          display: flex; gap: 8px; align-items: center; margin-top: 8px;
        }
        .tm-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: none; cursor: pointer; padding: 0;
          transition: background 0.3s, transform 0.2s, width 0.3s;
        }
        .tm-dot:hover { background: rgba(255,255,255,0.45); transform: scale(1.2); }
        .tm-dot-active {
          width: 24px; border-radius: 4px;
          transform: none;
        }

        /* Reveal */
        .tm-reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .tm-in { opacity: 1; transform: none; }

        @media (max-width: 640px) {
          .tm-stage { padding: 0 24px; }
          .tm-bigquote { font-size: 80px; }
        }
      `}</style>
    </section>
  );
}
