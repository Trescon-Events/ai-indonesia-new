"use client";
import { useEffect, useRef, useState } from "react";

/* ── Rolling digit slot-machine ── */
function RollingNumber({
  value, prefix = "", suffix = "", active, delay = 0, duration = 1400,
}: { value: number; prefix?: string; suffix?: string; active: boolean; delay?: number; duration?: number }) {
  const formatted = Math.round(value) >= 1000
    ? Math.round(value).toLocaleString("en-US")
    : Math.round(value).toString();
  const full = `${prefix}${formatted}${suffix}`;
  let dIdx = 0;
  return (
    <span className="ab-rn-wrap">
      {full.split("").map((ch, i) => {
        if (!/[0-9]/.test(ch)) return <span key={i} className="ab-rn-static">{ch}</span>;
        const target = parseInt(ch);
        const dl = delay + dIdx * 55;
        const dur = duration + dIdx * 90;
        dIdx++;
        const strip: number[] = [];
        for (let r = 0; r < 2; r++) for (let d = 0; d <= 9; d++) strip.push(d);
        strip.push(target);
        return (
          <span key={i} className="ab-rn-slot">
            <span
              className={`ab-rn-strip${active ? " ab-rn-go" : ""}`}
              style={{ "--n": strip.length, "--dl": `${dl}ms`, "--dur": `${dur}ms` } as React.CSSProperties}
            >
              {strip.map((d, j) => <span key={j} className="ab-rn-digit">{d}</span>)}
            </span>
          </span>
        );
      })}
    </span>
  );
}

function CardCircuit() {
  return (
    <svg className="ab-card-circuit" viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="#c0f43c" strokeOpacity="0.08" fill="none" strokeWidth="1">
        <polyline points="0,30 40,30 40,60 90,60"/>
        <polyline points="160,20 200,20 200,50 260,50"/>
        <polyline points="0,100 60,100 60,80 120,80 120,110 180,110"/>
        <polyline points="220,90 260,90"/>
        <polyline points="100,0 100,40 140,40"/>
        <polyline points="200,130 200,100 240,100"/>
      </g>
      <g fill="#c0f43c" fillOpacity="0.18">
        <circle cx="40"  cy="30"  r="2.5"/>
        <circle cx="90"  cy="60"  r="2.5"/>
        <circle cx="200" cy="20"  r="2.5"/>
        <circle cx="60"  cy="100" r="2.5"/>
        <circle cx="120" cy="80"  r="2.5"/>
        <circle cx="100" cy="40"  r="2.5"/>
        <circle cx="200" cy="100" r="2.5"/>
      </g>
      <g fill="#1b9ad6" fillOpacity="0.22">
        <circle cx="200" cy="50"  r="3"/>
        <circle cx="180" cy="110" r="3"/>
        <circle cx="140" cy="40"  r="3"/>
      </g>
    </svg>
  );
}

const AB_STATS = [
  { value: 1000, suffix: "+", label: "Business & Tech Leaders" },
  { value: 40,   suffix: "+", label: "Sponsors & Exhibitors" },
  { value: 40,   suffix: "+", label: "Speakers" },
  { value: 40,   suffix: "+", label: "Media & Association Partners" },
];


function AiBg() {
  /* 80 nodes scattered across 1440×620 — dense right, sparse left */
  const nodes: [number,number][] = [
    /* right cluster — main brain */
    [860,80],[940,55],[1020,90],[1110,60],[1190,100],[1280,70],[1360,110],[1420,80],
    [880,170],[970,145],[1060,175],[1150,145],[1240,170],[1330,145],[1400,180],
    [840,255],[930,230],[1020,265],[1110,235],[1200,265],[1290,235],[1370,260],[1430,240],
    [860,340],[950,320],[1040,350],[1130,325],[1220,350],[1310,325],[1390,345],
    [880,425],[970,405],[1060,435],[1150,415],[1240,435],[1330,415],[1400,435],
    [900,510],[990,490],[1080,515],[1170,495],[1260,515],[1350,490],[1420,510],
    [940,590],[1030,575],[1120,590],[1210,570],[1300,585],[1380,565],
    /* mid bridge */
    [680,120],[730,200],[700,295],[720,390],[690,475],[710,560],
    [760,155],[780,280],[750,400],[770,510],
    /* left — sparse, subtle */
    [60,100],[140,150],[240,110],[360,160],[480,120],[590,180],
    [80,250],[200,290],[320,250],[440,290],[560,260],[650,300],
    [100,390],[220,430],[340,390],[460,430],[580,400],
    [80,510],[200,550],[320,510],[440,550],[560,520],
  ];

  const edges: [number,number][] = [
    /* right horizontal rows */
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],
    [8,9],[9,10],[10,11],[11,12],[12,13],[13,14],
    [15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],
    [23,24],[24,25],[25,26],[26,27],[27,28],[28,29],
    [30,31],[31,32],[32,33],[33,34],[34,35],[35,36],
    [37,38],[38,39],[39,40],[40,41],[41,42],[42,43],
    [44,45],[45,46],[46,47],[47,48],[48,49],
    /* right vertical cols */
    [0,8],[1,9],[2,10],[3,11],[4,12],[5,13],[6,14],
    [8,15],[9,16],[10,17],[11,18],[12,19],[13,20],[14,21],
    [15,23],[16,24],[17,25],[18,26],[19,27],[20,28],[21,29],
    [23,30],[24,31],[25,32],[26,33],[27,34],[28,35],[29,36],
    [30,37],[31,38],[32,39],[33,40],[34,41],[35,42],[36,43],
    [37,44],[38,45],[39,46],[40,47],[41,48],[42,49],
    /* diagonals */
    [0,9],[1,10],[2,11],[3,12],[9,17],[10,18],[11,19],
    [16,25],[17,26],[18,27],[24,32],[25,33],[31,39],[32,40],
    [38,46],[39,47],[8,16],[15,24],[23,31],[30,38],[37,45],
    /* mid bridge */
    [50,51],[51,52],[52,53],[53,54],[54,55],
    [56,57],[57,58],[58,59],
    [50,8],[51,16],[52,24],[53,32],[54,40],[55,48],
    [56,9],[57,17],[58,26],[59,35],
    /* left sparse */
    [60,61],[61,62],[62,63],[63,64],[64,65],
    [66,67],[67,68],[68,69],[69,70],[70,71],
    [72,73],[73,74],[74,75],[75,76],
    [77,78],[78,79],[79,80],[80,81],
  ];

  /* chip centre */
  const cx = 1090, cy = 300;

  return (
    <svg viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
      <defs>
        <radialGradient id="abg-glow" cx="76%" cy="50%" r="52%">
          <stop offset="0%"  stopColor="#1b9ad6" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#060b24" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="abg-chip" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#1b9ad6" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#060b24" stopOpacity="0"/>
        </radialGradient>
        <filter id="abg-glow-f">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="abg-chip-f">
          <feGaussianBlur stdDeviation="7" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* glow wash */}
      <ellipse cx="1100" cy="310" rx="560" ry="380" fill="url(#abg-glow)"/>
      <ellipse cx={cx} cy={cy} rx="200" ry="200" fill="url(#abg-chip)"/>

      {/* edges */}
      {edges.map(([a,b],i) => {
        const n1=nodes[a], n2=nodes[b];
        if (!n1||!n2) return null;
        const isLeft = n1[0]<650 && n2[0]<650;
        return <line key={i} x1={n1[0]} y1={n1[1]} x2={n2[0]} y2={n2[1]}
          stroke="#1b9ad6" strokeWidth={isLeft?"0.4":"0.8"}
          strokeOpacity={isLeft?"0.1":"0.22"}/>;
      })}

      {/* nodes */}
      {nodes.map(([x,y],i) => {
        const isLeft = x<650;
        const highlight = !isLeft && [2,10,18,26,34,42].includes(i);
        return (
          <circle key={i} cx={x} cy={y}
            r={highlight?5.5: isLeft?1.8:3}
            fill="#1b9ad6"
            fillOpacity={isLeft?0.15: highlight?1:0.5}
            filter={highlight?"url(#abg-glow-f)":undefined}>
            {highlight && <animate attributeName="fill-opacity"
              values="1;0.4;1" dur={`${2+i*0.2}s`} repeatCount="indefinite"/>}
          </circle>
        );
      })}

      {/* circuit arms from chip */}
      <g stroke="#1b9ad6" strokeOpacity="0.4" fill="none" filter="url(#abg-glow-f)">
        <polyline points={`${cx},${cy-55} ${cx},${cy-110} ${cx+60},${cy-160} ${cx+140},${cy-170}`} strokeWidth="1.2"/>
        <polyline points={`${cx+55},${cy} ${cx+120},${cy} ${cx+180},${cy-50} ${cx+260},${cy-45}`} strokeWidth="1.2"/>
        <polyline points={`${cx},${cy+55} ${cx},${cy+110} ${cx-60},${cy+165} ${cx-140},${cy+165}`} strokeWidth="1.2"/>
        <polyline points={`${cx-55},${cy} ${cx-120},${cy} ${cx-180},${cy+40} ${cx-240},${cy+35}`} strokeWidth="1.2"/>
        <polyline points={`${cx+40},${cy-40} ${cx+90},${cy-100} ${cx+160},${cy-130}`} strokeWidth="0.9"/>
        <polyline points={`${cx+40},${cy+40} ${cx+100},${cy+100} ${cx+180},${cy+130}`} strokeWidth="0.9"/>
        <polyline points={`${cx-40},${cy-40} ${cx-100},${cy-100} ${cx-170},${cy-130}`} strokeWidth="0.9"/>
        {/* endpoint dots */}
        {[[cx+140,cy-170],[cx+260,cy-45],[cx-140,cy+165],[cx-240,cy+35],
          [cx+160,cy-130],[cx+180,cy+130],[cx-170,cy-130]].map(([ex,ey],i)=>(
          <circle key={i} cx={ex} cy={ey} r="3.5" fill="#1b9ad6" fillOpacity="0.8"/>
        ))}
      </g>

      {/* AI chip */}
      <g transform={`translate(${cx-52},${cy-52})`} filter="url(#abg-chip-f)">
        {/* glow halo */}
        <rect x="-16" y="-16" width="136" height="136" rx="16"
          fill="#1b9ad6" fillOpacity="0.07"/>
        {/* body */}
        <rect x="0" y="0" width="104" height="104" rx="10"
          fill="#07122e" stroke="#1b9ad6" strokeWidth="1.8"/>
        <rect x="10" y="10" width="84" height="84" rx="7"
          fill="#091a45" stroke="#1b9ad6" strokeWidth="1" strokeOpacity="0.6"/>
        {/* inner grid lines */}
        <line x1="10" y1="52" x2="94" y2="52" stroke="#1b9ad6" strokeWidth="0.5" strokeOpacity="0.3"/>
        <line x1="52" y1="10" x2="52" y2="94" stroke="#1b9ad6" strokeWidth="0.5" strokeOpacity="0.3"/>
        {/* label */}
        <text x="52" y="56" textAnchor="middle" dominantBaseline="middle"
          fontFamily="Arial,sans-serif" fontWeight="900" fontSize="28" fill="#1b9ad6">Ai</text>
        {/* pins */}
        {[14,30,52,70,86].map((v,i)=>[
          <rect key={`pt${i}`} x={v} y="-9" width="8" height="11" rx="2" fill="#1b9ad6" fillOpacity="0.65"/>,
          <rect key={`pb${i}`} x={v} y="102" width="8" height="11" rx="2" fill="#1b9ad6" fillOpacity="0.65"/>,
          <rect key={`pl${i}`} x="-9" y={v} width="11" height="8" rx="2" fill="#1b9ad6" fillOpacity="0.65"/>,
          <rect key={`pr${i}`} x="102" y={v} width="11" height="8" rx="2" fill="#1b9ad6" fillOpacity="0.65"/>,
        ])}
      </g>

      {/* pulse rings */}
      {[0,1,2].map(i=>(
        <circle key={i} cx={cx} cy={cy} r={90+i*40} fill="none"
          stroke="#1b9ad6" strokeWidth={1.2-i*0.3} strokeOpacity={0.35-i*0.1}>
          <animate attributeName="r" values={`${90+i*40};${140+i*50};${90+i*40}`}
            dur={`${3+i*0.8}s`} begin={`${i*0.9}s`} repeatCount="indefinite"/>
          <animate attributeName="stroke-opacity" values={`${0.35-i*0.1};0;${0.35-i*0.1}`}
            dur={`${3+i*0.8}s`} begin={`${i*0.9}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* lime data-flow dots */}
      {([[cx,cy-55,cx,cy-170],[cx+55,cy,cx+260,cy-45],[cx,cy+55,cx-140,cy+165],[cx-55,cy,cx-240,cy+35]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i)=>(
        <circle key={i} r="4" fill="#c0f43c" fillOpacity="0.9" filter="url(#abg-glow-f)">
          <animateMotion dur={`${2.2+i*0.5}s`} repeatCount="indefinite">
            <mpath xlinkHref={`#arm-path-${i}`}/>
          </animateMotion>
        </circle>
      ))}
      <path id="arm-path-0" d={`M${cx},${cy-55} L${cx},${cy-170}`} fill="none"/>
      <path id="arm-path-1" d={`M${cx+55},${cy} L${cx+260},${cy-45}`} fill="none"/>
      <path id="arm-path-2" d={`M${cx},${cy+55} L${cx-140},${cy+165}`} fill="none"/>
      <path id="arm-path-3" d={`M${cx-55},${cy} L${cx-240},${cy+35}`} fill="none"/>
    </svg>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsActive(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="ab-root">
      <AiBg />

      <div className="ab-inner">

        <h2 className="ab-h2 reveal">
          Indonesia&apos;s Premier<br/>
          Platform for Enterprise<br/>
          <span className="ab-accent">AI Architecture</span>
        </h2>

        <p className="ab-body reveal">
          World AI Show Indonesia convenes infrastructure leaders, enterprise technology
          decision-makers, policymakers and investors to architect Indonesia&apos;s sovereign,
          secure and scalable AI economy.
        </p>

        <div className="ab-stats-grid reveal" ref={statsRef}>
          {AB_STATS.map((s, i) => (
            <div key={i} className="ab-stat-card">
              <CardCircuit />
              <div className="ab-stat-num">
                <RollingNumber
                  value={s.value} suffix={s.suffix}
                  active={statsActive} delay={i * 120} duration={1300}
                />
              </div>
              <div className="ab-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .ab-root {
          background: #060b24;
          position: relative;
          overflow: hidden;
          padding: 72px 0;
        }
        .ab-inner {
          position: relative; z-index: 2;
          max-width: 560px;
          margin-left: clamp(40px, 6vw, 120px);
        }
        .ab-h2 {
          font-family: var(--font-space);
          font-size: clamp(32px, 4.2vw, 62px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.06;
          letter-spacing: -0.03em;
          margin-bottom: 22px;
        }
        .ab-accent { color: #1b9ad6; }
        .ab-body {
          font-family: var(--font-inter);
          font-size: clamp(15px, 1.25vw, 18px);
          color: rgba(255,255,255,0.82);
          line-height: 1.8;
          margin: 0;
        }

        /* ── Stats grid ── */
        .ab-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 28px;
          width: 100%;
        }
        .ab-stat-card {
          position: relative;
          overflow: hidden;
          background: rgba(192,244,60,0.04);
          border: 1.5px solid rgba(192,244,60,0.35);
          border-radius: 16px;
          padding: 28px 24px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
          min-height: 130px;
          box-shadow: 0 0 18px rgba(192,244,60,0.06), inset 0 0 24px rgba(192,244,60,0.03);
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .ab-stat-card:hover {
          border-color: rgba(192,244,60,0.70);
          box-shadow: 0 0 0 1px rgba(192,244,60,0.20), 0 0 32px rgba(192,244,60,0.28), 0 0 64px rgba(192,244,60,0.12), inset 0 0 24px rgba(192,244,60,0.06);
          transform: translateY(-3px);
        }
        .ab-card-circuit {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none; z-index: 0;
        }
        .ab-stat-num {
          font-family: var(--font-space);
          font-size: clamp(30px, 3.2vw, 44px);
          font-weight: 800;
          color: #c0f43c;
          line-height: 1;
          letter-spacing: -0.02em;
          position: relative; z-index: 1;
        }
        .ab-stat-lbl {
          font-family: var(--font-space);
          font-size: clamp(9px, 0.8vw, 11px);
          font-weight: 700;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          line-height: 1.4;
          position: relative; z-index: 1;
        }

        /* ── Rolling number ── */
        .ab-rn-wrap { display: inline-flex; align-items: baseline; }
        .ab-rn-static { display: inline-block; }
        .ab-rn-slot {
          display: inline-block; overflow: hidden;
          height: 1em; vertical-align: bottom;
        }
        .ab-rn-strip { display: block; will-change: transform; }
        .ab-rn-digit { display: block; height: 1em; line-height: 1; text-align: center; }
        .ab-rn-go {
          animation: ab-rn-roll var(--dur) var(--dl) cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes ab-rn-roll {
          from { transform: translateY(0); }
          to   { transform: translateY(calc((1 - var(--n)) * 1em)); }
        }

        @media (max-width: 860px) {
          .ab-inner { margin-left: 32px; max-width: calc(55% - 32px); }
        }
        @media (max-width: 640px) {
          .ab-root { padding: 64px 0; }
          .ab-inner { margin-left: 0; max-width: 100%; padding: 0 24px; }
          .ab-stat-card { padding: 22px 18px; min-height: 110px; }
          .ab-stat-num { font-size: 30px; }
        }
      `}</style>
    </section>
  );
}
