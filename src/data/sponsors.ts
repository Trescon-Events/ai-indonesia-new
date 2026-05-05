// ─────────────────────────────────────────────────────────────────────────────
// SPONSORS DATA
// To add a new sponsor:
//   1. Drop the logo file into /public/images/sponsors/
//   2. Add one entry to the correct tier array below
//   3. Save — the Partners page and the home-page marquee both update automatically
// ─────────────────────────────────────────────────────────────────────────────

export type Sponsor = {
  name:        string;
  logo:        string;   // path from /public  e.g. "/images/sponsors/acme.png"
  logoW:       number;   // display width  in px
  logoH:       number;   // display height in px
  tagline?:    string;
  description?: string;
  website?:    string;
};

export type Tier = {
  key:         string;
  label:       string;
  color:       string;   // hex
  colorRgb:    string;   // "r,g,b" — used in rgba() strings
  description: string;
  sponsors:    Sponsor[];
  // Marquee card dimensions (home page scroller)
  cardH:  number;
  marqW:  number;
  marqH:  number;
};

export const tiers: Tier[] = [
  {
    key:         "lead",
    label:       "Lead Sponsor",
    color:       "#a78bfa",
    colorRgb:    "167,139,250",
    description: "Our headline partner shaping the future of AI in Indonesia.",
    cardH: 160, marqW: 260, marqH: 100,
    sponsors: [
      { name: "Datadog", logo: "/images/sponsors/datadog.png", logoW: 340, logoH: 120,
        tagline: "Monitor, secure, and analyse your entire stack in one platform.",
        description: "Datadog is the essential monitoring and security platform for cloud applications. Used by thousands of enterprises globally, Datadog brings together full-stack observability — infrastructure metrics, distributed traces, logs, and security signals — into a unified view. At World AI Show Indonesia 2026, Datadog helps AI-driven organisations ensure their models and infrastructure run reliably at scale.",
        website: "https://www.datadoghq.com" },
    ],
  },
  {
    key:         "gold",
    label:       "Gold Sponsor",
    color:       "#f59e0b",
    colorRgb:    "245,158,11",
    description: "Premier partners driving Indonesia's AI transformation.",
    cardH: 148, marqW: 230, marqH: 86,
    sponsors: [
      { name: "Zoom", logo: "/images/sponsors/zoom.png", logoW: 240, logoH: 90,
        tagline: "One platform. Limitless human connection.",
        description: "Zoom is the global leader in unified communications, powering video meetings, team chat, phone, webinars, and AI-assisted collaboration for over 300,000 enterprise customers worldwide. At World AI Show Indonesia 2026, Zoom is enabling seamless virtual and hybrid engagement for speakers, delegates, and partners across the region.",
        website: "https://www.zoom.us" },
      { name: "UCloud Global", logo: "/images/sponsors/ucloud.png", logoW: 240, logoH: 90,
        tagline: "Enterprise cloud built for global ambition.",
        description: "UCloud Global is a leading cloud service provider offering high-performance infrastructure, big data, and AI computing solutions tailored for enterprises expanding across Asia and beyond. With a strong footprint in Southeast Asia, UCloud Global empowers businesses to build and deploy intelligent applications with speed, security, and scale.",
        website: "https://www.ucloud.cn/global" },
    ],
  },
  {
    key:         "silver",
    label:       "Silver Sponsor",
    color:       "#94a3b8",
    colorRgb:    "148,163,184",
    description: "Strategic sponsors supporting Southeast Asia's largest AI event.",
    cardH: 140, marqW: 210, marqH: 80,
    sponsors: [
      { name: "Data Labs", logo: "/images/sponsors/datalabs.svg", logoW: 230, logoH: 84,
        tagline: "Turning raw data into competitive intelligence.",
        description: "Data Labs is a specialist data and AI consultancy helping organisations in Southeast Asia unlock the full value of their data assets. From predictive analytics to machine learning pipelines, Data Labs delivers end-to-end solutions that translate complex data into clear, actionable business decisions." },
    ],
  },
  {
    key:         "exhibitor",
    label:       "Exhibitor",
    color:       "#1b9ad6",
    colorRgb:    "27,154,214",
    description: "Innovative companies showcasing their AI solutions on the expo floor.",
    cardH: 134, marqW: 200, marqH: 74,
    sponsors: [
      { name: "Fanruan", logo: "/images/sponsors/fanruan.png", logoW: 190, logoH: 70,
        tagline: "Business intelligence that speaks your data's language.",
        description: "Fanruan is one of Asia's leading business intelligence and data analytics platforms, trusted by over 30,000 enterprises across industries. Their suite — including FineReport and FineBI — helps organisations visualise complex data, build real-time dashboards, and make faster, smarter decisions." },
      { name: "Ingram Micro", logo: "/images/sponsors/ingram.png", logoW: 190, logoH: 70,
        tagline: "The world's largest technology distributor.",
        description: "Ingram Micro is a global technology distribution and services company connecting manufacturers with resellers and enterprises across 160+ countries. In Southeast Asia, Ingram Micro plays a pivotal role in delivering cloud, cybersecurity, and AI solutions to businesses at every stage of their digital journey.",
        website: "https://www.ingrammicro.com" },
      { name: "Kuventa", logo: "/images/sponsors/uventa.png", logoW: 190, logoH: 70,
        tagline: "Smart procurement. Smarter supply chains.",
        description: "Kuventa is an AI-powered procurement and vendor management platform designed for modern enterprises. By automating sourcing, contract lifecycle, and supplier intelligence, Kuventa helps procurement teams reduce costs and manage risk more effectively across complex supply chains." },
      { name: "TicTag", logo: "/images/sponsors/tictag.png", logoW: 190, logoH: 70,
        tagline: "Connecting brands to people, one moment at a time.",
        description: "TicTag is a digital engagement and loyalty platform that enables brands to create interactive, AI-driven experiences across web and mobile. From gamified campaigns to real-time audience analytics, TicTag helps companies in Southeast Asia build deeper connections with their customers." },
      { name: "Mekari", logo: "/images/sponsors/mekari.png", logoW: 190, logoH: 70,
        tagline: "Indonesia's leading cloud business software.",
        description: "Mekari is Indonesia's foremost integrated cloud software company, offering HR, payroll, accounting, and tax solutions through products like Talenta, Jurnal, and Klikpajak. Serving over 60,000 businesses, Mekari is at the forefront of Indonesia's digital business transformation.",
        website: "https://www.mekari.com" },
      { name: "Xtremax", logo: "/images/sponsors/xtremax.png", logoW: 190, logoH: 70,
        tagline: "Digital government and enterprise solutions across ASEAN.",
        description: "Xtremax is a leading digital transformation company with a strong track record in Singapore and Southeast Asia, delivering government and enterprise digital solutions across web, mobility, and analytics. Their work has shaped the digital services of multiple public agencies across the region.",
        website: "https://www.xtremax.com" },
      { name: "Primary Guard", logo: "/images/sponsors/primary-guard.png", logoW: 190, logoH: 70,
        tagline: "Protecting digital assets in an AI-first world.",
        description: "Primary Guard is a cybersecurity solutions provider focused on protecting enterprise infrastructure against evolving digital threats. With specialisations in threat intelligence, network security, and compliance, Primary Guard helps organisations across Southeast Asia safeguard their most critical systems." },
      { name: "IPINFRA IoT", logo: "/images/sponsors/ipinfra.svg", logoW: 190, logoH: 70,
        tagline: "Intelligent IoT infrastructure for connected enterprises.",
        description: "IPINFRA IoT designs and deploys intelligent IoT infrastructure solutions that connect physical assets to digital intelligence. From smart building management to industrial automation, IPINFRA IoT enables organisations to harness real-world data and drive operational efficiency at scale." },
    ],
  },
  {
    key:         "cxo",
    label:       "CXO Boardroom Partner",
    color:       "#4d7c0f",
    colorRgb:    "77,124,15",
    description: "Exclusive boardroom partners engaging C-suite leaders and AI decision-makers in closed-door sessions.",
    cardH: 148, marqW: 230, marqH: 86,
    sponsors: [
      { name: "Datadog", logo: "/images/sponsors/datadog.png", logoW: 230, logoH: 86,
        tagline: "Monitor, secure, and analyse your entire stack in one platform.",
        description: "Datadog is the essential monitoring and security platform for cloud applications. Used by thousands of enterprises globally, Datadog brings together full-stack observability — infrastructure metrics, distributed traces, logs, and security signals — into a unified view.",
        website: "https://www.datadoghq.com" },
      { name: "Zoom", logo: "/images/sponsors/zoom.png", logoW: 230, logoH: 86,
        tagline: "One platform. Limitless human connection.",
        description: "Zoom is the global leader in unified communications, powering video meetings, team chat, phone, webinars, and AI-assisted collaboration for over 300,000 enterprise customers worldwide.",
        website: "https://www.zoom.us" },
    ],
  },
  {
    key:         "technology",
    label:       "Technology Partner",
    color:       "#1a9a72",
    colorRgb:    "26,154,114",
    description: "Powering event networking, matchmaking, and ticketing with AI.",
    cardH: 148, marqW: 230, marqH: 82,
    sponsors: [
      { name: "Konfhub", logo: "/images/sponsors/konfhub.png", logoW: 230, logoH: 56,
        tagline: "AI-powered event networking and ticketing on WhatsApp.",
        description: "Konfhub is the technology platform powering networking and ticket management for World AI Show Indonesia 2026. Using AI-driven matchmaking over WhatsApp, Konfhub instantly connects attendees with the right people — scheduling meetings, swapping contacts, and providing live event updates without any downloads or learning curve. Their platform also handles frictionless badge scanning, contact consent, and post-event follow-through.",
        website: "https://www.konfhub.com" },
    ],
  },
  {
    key:         "association",
    label:       "Association Partner",
    color:       "#34d399",
    colorRgb:    "52,211,153",
    description: "Industry associations championing AI adoption across the region.",
    cardH: 148, marqW: 190, marqH: 70,
    sponsors: [
      { name: "Starfindo", logo: "/images/sponsors/starfindo.png", logoW: 230, logoH: 86,
        tagline: "Championing Indonesia's technology and startup ecosystem.",
        description: "Starfindo is a leading Indonesian technology association connecting startups, investors, and enterprise players across the archipelago. As an association partner of World AI Show Indonesia 2026, Starfindo amplifies the event's reach into Indonesia's thriving tech community and advocates for AI policy and innovation at the national level." },
    ],
  },
];

// Flat list used by the home-page marquee
export const allSponsors = tiers.flatMap((tier) =>
  tier.sponsors.map((s) => ({
    ...s,
    tier:      tier.label,
    tierColor: tier.color,
    cardH:     tier.cardH,
    logoW:     tier.marqW,
    logoH:     tier.marqH,
  }))
);
