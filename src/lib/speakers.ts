import { cache } from "react";

// ─── Internal model ────────────────────────────────────────────────────────────
export type Speaker = {
  id: number;
  name: string;
  title: string;
  org: string;
  image: string;        // verbatim image_url from API — never a local /images/ path
  companyLogo?: string;
  description: string;  // raw HTML from the API's `about` field
  order: number;
  linkedin?: string;
  country?: string;
};

// ─── API constants ─────────────────────────────────────────────────────────────
const API_URL =
  "https://api.konfhub.com/event/public/wais-f45-indonesia/speakers";
const TARGET_CATEGORY = "World AI Show - Indonesia || Speakers 2026";

// ─── Transform ─────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transform(s: any): Speaker {
  return {
    id:          s.speaker_id          ?? 0,
    name:        s.name                ?? "",
    title:       s.designation         ?? "",
    org:         s.organisation        ?? "",
    image:       s.image_url           ?? "",   // no local path substitution
    companyLogo: s.organisation_logo_url || undefined,
    description: s.about               ?? "",   // raw HTML — callers use dangerouslySetInnerHTML
    order:       s.speaker_order       ?? 0,
    linkedin:    s.linkedin_url        || undefined,
    country:     s.location            || undefined,
  };
}

// ─── Fetch ─────────────────────────────────────────────────────────────────────
// React.cache deduplicates calls within a single render pass (e.g. layout +
// page both calling fetchSpeakers() only triggers one network request).
export const fetchSpeakers = cache(async (): Promise<Speaker[]> => {
  try {
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 6000);
    let res: Response;
    try {
      res = await fetch(API_URL, { cache: "no-store", signal: abort.signal });
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const data = await res.json();

    if (!Array.isArray(data?.categorized)) {
      throw new Error("Unexpected API shape: missing 'categorized' array");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category = data.categorized.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (c: any) => c.category_name === TARGET_CATEGORY
    );

    if (!category) {
      console.warn(`[speakers] Category "${TARGET_CATEGORY}" not in API response`);
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (category.speakers ?? [])
      .map(transform)
      .sort((a: Speaker, b: Speaker) => a.order - b.order);
  } catch (err) {
    console.error("[speakers] API fetch failed:", err);
    return [];
  }
});
