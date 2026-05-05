import Link from "next/link";

const articles: Record<string, {
  tag: string;
  title: string;
  body: string[];
}> = {
  "indonesia-ai-revolution-2025": {
    tag: "AI & Policy",
    title: "Indonesia's AI Revolution: Wrapping Up 2024 and Launching Into 2025",
    body: [
      "If one can sum up one of the biggest tech trends of 2024 in a single phrase, AI is here to stay. Businesses and governments across the globe have recognised artificial intelligence's transformative potential, with generative AI tools fundamentally reshaping operations, decision-making, and customer engagement across enterprises of every size.",
      "Indonesia stood at the forefront of this wave. Across 2024, the country accelerated its adoption of AI-based solutions at a pace that surprised even the most optimistic observers. More than 92% of the Indonesian workforce reported implementing generative AI tools into their day-to-day business operations — a figure that places Indonesia among the leading nations for enterprise AI uptake globally.",
      "The year was defined not just by adoption, but by ambition. The government unveiled its first AI experience centre at Solo Technopark, committed to a national target of 100,000 AI-ready professionals by 2029, and positioned AI as a pillar of its long-term development plan through 2045.",
      "Looking ahead to 2025, Indonesia's AI momentum shows no signs of slowing. The World AI Show Indonesia — taking place in Jakarta on 7–8 July 2026 — will bring together the nation's most influential policymakers, enterprise leaders, and global AI innovators to shape what comes next. The agenda is clear: build sovereign AI capability, attract global investment, and lead Southeast Asia's digital transformation.",
      "From the corridors of Bappenas to the boardrooms of Jakarta's largest enterprises, the consensus is firm: Indonesia's AI inflection point has arrived. The question now is not whether to embrace AI, but how fast and how boldly.",
    ],
  },
  "ai-powered-smart-cities": {
    tag: "Smart Cities",
    title: "AI-Powered Smart Cities: Indonesia's Blueprint for a Sustainable Future",
    body: [
      "For too long, the consequences of climate change have been deferred to future generations. Rising sea levels, extreme weather events, and urban flooding have moved from distant warnings to present-day realities — nowhere more acutely than in Indonesia, a nation of 17,000 islands straddling the equator.",
      "Southeast Asia is now leading a counter-movement: sustainable urban development powered by artificial intelligence. Indonesia is at its centre. Cities from Jakarta to Surabaya are implementing AI-driven systems that monitor air and water quality in real time, predict flood risk, optimise traffic flow, and reduce energy consumption across public infrastructure.",
      "The Indonesian government's smart city initiative — encompassing more than 100 cities under the Gerakan Menuju 100 Smart Cities programme — has begun embedding AI at the planning layer. Machine learning models analyse population movement, resource utilisation, and environmental data to guide decisions that were once made on instinct or incomplete information.",
      "Private sector investment has followed. PT Telkom Indonesia, Gojek, and a growing cohort of startups are building the data layer that smart cities require: sensors, edge computing infrastructure, and real-time analytics platforms that turn urban environments into responsive, adaptive systems.",
      "The blueprint is being written in real time. As Indonesia prepares to move its capital from Jakarta to Nusantara — itself designed as a smart, sustainable city from the ground up — the ambition is clear: to build not just a new capital, but a living demonstration of what AI-powered governance can achieve at national scale.",
    ],
  },
  "indonesia-ai-revolution-sea": {
    tag: "AI Adoption",
    title: "Indonesia's AI Revolution: How It's Leading the Charge in Southeast Asia",
    body: [
      "When observers look for the next major AI market, they tend to look west. They should be looking east — and specifically, at Indonesia.",
      "With over 229 million digital users, a median age of 29, and a workforce that has embraced generative AI tools faster than almost any comparable economy, Indonesia has quietly become one of the most consequential AI adoption stories in the world.",
      "The transformation spans every major sector. In telecommunications, AI is enabling predictive network maintenance and personalised customer service at scale. In banking and financial services, machine learning models are powering credit decisioning for millions of unbanked Indonesians being brought into the formal economy for the first time. In education, adaptive learning platforms are reaching students across an archipelago where geography has long limited access to quality instruction.",
      "What makes Indonesia's story distinct is the speed of uptake. Enterprise adoption has not been limited to the largest conglomerates — it has penetrated Indonesia's vast SME sector, which accounts for more than 60% of GDP. AI tools for inventory management, marketing automation, and customer analytics are now standard equipment for businesses that, five years ago, had no digital presence at all.",
      "The World AI Show Indonesia will convene the leaders who are driving this transformation — and those who want to understand it — on one stage in Jakarta. The agenda is built around a simple premise: Indonesia's AI revolution is not coming. It is already here.",
    ],
  },
  "indonesia-tourism-ai": {
    tag: "Tourism & AI",
    title: "Indonesia's Tourism Ecosystem Gets Smarter with AI Integration",
    body: [
      "Tourism is one of Indonesia's largest economic engines — and one of its most complex. Coordinating experiences across 17,000 islands, dozens of languages, and hundreds of distinct cultural traditions requires a level of personalisation that traditional systems simply cannot deliver.",
      "Artificial intelligence is changing that. Indonesia's Ministry of Tourism has integrated AI recommendation technology into the official Indonesia.travel platform, creating a personalised trip-planning experience that draws on a traveller's stated preferences, search behaviour, and booking history to surface destinations, activities, and itineraries tailored to them specifically.",
      "The results have been striking. Engagement on the platform has increased significantly since AI-powered features were introduced, with users spending more time exploring destinations they had not previously considered and converting at higher rates from discovery to booking.",
      "Beyond the consumer-facing layer, AI is transforming how tourism operators manage their businesses. Dynamic pricing tools powered by machine learning allow hotels and tour operators to optimise rates in real time based on demand signals. Sentiment analysis of visitor reviews is helping regional governments identify friction points in the tourist experience and prioritise infrastructure investment accordingly.",
      "Indonesia's ambition extends beyond improving the current tourism product. The government is using AI to model the impact of tourism on fragile ecosystems — from Komodo National Park to the coral reefs of Raja Ampat — and to develop sustainable sustainable visitor management strategies that protect natural heritage while sustaining economic growth.",
    ],
  },
  "indonesia-ai-center": {
    tag: "Infrastructure",
    title: "Indonesia's AI Ambitions Take Shape with Launch of Groundbreaking AI Center",
    body: [
      "Indonesia's commitment to artificial intelligence moved from aspiration to infrastructure with the inauguration of the Digital Intelligence Operations Center — DIOC — at Solo Technopark in Central Java.",
      "The facility, developed through a partnership between PT. Indosat Tbk and Huawei, represents a first for the nation: a purpose-built, publicly accessible AI experience centre where businesses, government agencies, students, and citizens can engage directly with next-generation technology.",
      "At its core, DIOC is a demonstration of what AI-enabled infrastructure looks like in practice. The centre features live 5G connectivity, edge computing nodes, and an array of AI applications spanning smart city simulation, autonomous systems, generative art, and natural language processing in Bahasa Indonesia.",
      "The centre is designed not just as a showcase but as a talent development engine. Regular workshops, industry partnerships, and student exchange programmes are embedded into its operating model. The goal is to build the hands-on AI literacy that Indonesia's national talent target — 100,000 AI-ready professionals by 2029 — will require.",
      "For international technology companies considering Indonesia as a base of operations, DIOC sends a clear signal: the infrastructure is being built, the talent pipeline is being developed, and the government is an active partner in both. The age of Indonesian AI is not approaching — it has arrived.",
    ],
  },
  "india-indonesia-ai-collaboration": {
    tag: "Global Collaboration",
    title: "India and Indonesia Are Using AI to Reshape Global Digital Collaboration",
    body: [
      "Two of Asia's most consequential economies are building something together — and the world's AI community is taking notice.",
      "India and Indonesia, long partners in trade and diplomacy, have deepened their collaboration into the domain of artificial intelligence. The centrepiece of this partnership is AIonOS, a joint venture that combines the technical capabilities of India's leading AI engineering talent with the market depth and digital infrastructure of Indonesia's Indosat telecommunications ecosystem.",
      "The collaboration is a model for what productive South-South technology partnership can look like. Rather than relying on technology transfer from established Western or East Asian players, India and Indonesia are co-developing AI solutions that address the specific needs of large, complex, developing-world economies: diverse languages, variable connectivity, vast rural populations, and regulatory environments that require local expertise to navigate.",
      "AIonOS is building applications in natural language processing, agricultural AI, and enterprise automation — areas where both countries share structural similarities and where existing global products fall short of local requirements.",
      "The broader diplomatic dimension is equally significant. As the global AI landscape organises itself into competing blocs, India and Indonesia's collaboration signals that the developing world intends to be a creator — not merely a consumer — of artificial intelligence. The partnership is a template that other nations in the Global South are watching closely.",
    ],
  },
  "indonesia-digital-future": {
    tag: "National Strategy",
    title: "Indonesia's AI Ascent: A Nation Forging its Digital Future",
    body: [
      "For a nation as dynamic and geographically complex as Indonesia, the promise of artificial intelligence extends far beyond technological advancement. AI is, for Indonesia, a tool of national cohesion — a means of delivering public services, economic opportunity, and social mobility across an archipelago that has always been defined by its distances.",
      "Indonesia's 2020 National AI Strategy laid the formal foundation. Developed under the coordination of the National Research and Innovation Agency (BRIN) and involving ministries across government, the strategy identified five priority sectors for AI deployment: health, bureaucratic reform, education and research, food and agriculture, and mobility and smart cities.",
      "Progress across each sector has been uneven but real. In agriculture, AI-powered crop monitoring systems are helping smallholder farmers in Java and Sulawesi predict yield, manage irrigation, and access market pricing data in real time. In health, machine learning tools are extending diagnostic capability to district hospitals that lack specialist physicians. In education, AI tutoring systems are beginning to close the gap between urban and rural learning outcomes.",
      "The most ambitious dimension of Indonesia's AI agenda is its sovereign AI aspiration: the goal of developing, training, and governing large language models and foundational AI systems using Indonesian data, Indonesian talent, and Indonesian infrastructure. This is not merely a technical objective — it is a statement of national intent, a refusal to allow the country's digital future to be determined by external platforms.",
      "The World AI Show Indonesia is the convening moment for this ambition. It is where policymakers, enterprise leaders, international partners, and the next generation of Indonesian AI talent will come together to turn strategy into action.",
    ],
  },
};

const tagColor: Record<string, string> = {
  "AI & Policy":          "#1b9ad6",
  "Smart Cities":         "#a78bfa",
  "AI Adoption":          "#1b9ad6",
  "Tourism & AI":         "#fb923c",
  "Infrastructure":       "#c0f43c",
  "Global Collaboration": "#a78bfa",
  "National Strategy":    "#fb923c",
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return (
      <div className="art-404">
        <p>Article not found.</p>
        <Link href="/knowledge-hub">← Back to Knowledge Hub</Link>
      </div>
    );
  }

  const color = tagColor[article.tag] || "#1b9ad6";

  return (
    <div className="art-page">
      <div className="art-grid-bg" />
      <div className="art-glow" style={{ background: `radial-gradient(circle, ${color}12 0%, transparent 65%)` }} />

      <div className="art-wrap">

        {/* Back */}
        <Link href="/knowledge-hub" className="art-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Knowledge Hub
        </Link>

        {/* Header */}
        <div className="art-header">
          <span className="art-tag" style={{ color, borderColor: color + "44" }}>{article.tag}</span>
          <h1 className="art-title">{article.title}</h1>
          <div className="art-meta">
            <span className="art-source">World AI Show Indonesia · Editorial</span>
            <span className="art-dot-sep" />
            <span className="art-event">Jakarta · 7–8 July 2026</span>
          </div>
        </div>

        {/* Divider */}
        <div className="art-rule" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

        {/* Body */}
        <article className="art-body">
          {article.body.map((para, i) => (
            <p key={i} className="art-para">{para}</p>
          ))}
        </article>

        {/* Footer CTA */}
        <div className="art-footer">
          <div className="art-footer-text">
            <div className="art-footer-label">Join the conversation at</div>
            <div className="art-footer-event">World AI Show Indonesia 2026</div>
          </div>
          <Link href="/enquire" className="art-cta">Register Interest</Link>
        </div>

        {/* Back to hub */}
        <div className="art-back-footer">
          <Link href="/knowledge-hub" className="art-back-link">
            ← Back to Knowledge Hub
          </Link>
        </div>

      </div>

      <style>{`
        .art-page {
          background: #060b24; min-height: 100vh;
          position: relative; overflow: hidden;
        }
        .art-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(27,154,214,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,154,214,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .art-glow {
          position: fixed; top: -10%; right: -10%;
          width: 700px; height: 700px; pointer-events: none; z-index: 0;
        }
        .art-404 {
          background: #060b24; min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 16px; color: #fff; font-family: var(--font-inter);
        }
        .art-wrap {
          position: relative; z-index: 2;
          max-width: 820px; margin: 0 auto;
          padding: 120px 40px 80px;
        }
        .art-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-space); font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); text-decoration: none;
          margin-bottom: 48px;
          transition: color 0.2s;
        }
        .art-back:hover { color: rgba(255,255,255,0.7); }
        .art-tag {
          display: inline-block;
          font-family: var(--font-space); font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          border: 1px solid; padding: 4px 14px; border-radius: 100px;
          margin-bottom: 20px;
        }
        .art-title {
          font-family: var(--font-space);
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.03em; line-height: 1.15;
          margin-bottom: 24px;
        }
        .art-meta {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--font-inter); font-size: 13px;
          color: rgba(255,255,255,0.3);
        }
        .art-dot-sep {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }
        .art-rule {
          height: 2px; margin: 36px 0; border-radius: 2px;
        }
        .art-body { display: flex; flex-direction: column; gap: 24px; }
        .art-para {
          font-family: var(--font-inter);
          font-size: clamp(15px, 1.4vw, 17px);
          line-height: 1.85; color: rgba(255,255,255,0.72);
          margin: 0;
        }
        .art-footer {
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
          margin-top: 64px; padding: 28px 32px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px; flex-wrap: wrap;
        }
        .art-footer-label {
          font-family: var(--font-inter); font-size: 12px;
          color: rgba(255,255,255,0.35); margin-bottom: 4px;
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .art-footer-event {
          font-family: var(--font-space); font-size: 18px; font-weight: 800;
          color: #fff;
        }
        .art-cta {
          display: inline-flex; align-items: center;
          font-family: var(--font-space); font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none;
          color: #1a1f4e; background: #c0f43c;
          padding: 13px 26px; border-radius: 100px;
          transition: background 0.2s, transform 0.2s; white-space: nowrap;
        }
        .art-cta:hover { background: #d4ff5a; transform: translateY(-2px); }
        .art-back-footer {
          margin-top: 40px; padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .art-back-link {
          font-family: var(--font-inter); font-size: 14px;
          color: rgba(255,255,255,0.35); text-decoration: none;
          transition: color 0.2s;
        }
        .art-back-link:hover { color: rgba(255,255,255,0.7); }
        @media (max-width: 600px) {
          .art-wrap { padding: 110px 20px 60px; }
          .art-footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
