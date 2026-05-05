/**
 * Pre-build script: fetches speakers from the KonfHub API, filters to the
 * correct event category, maps to the internal model, and writes
 * src/data/speakers-generated.json.
 *
 * Rules:
 *  - Only speakers in TARGET_CATEGORY are included.
 *  - All field values come 100% from the API response — no local paths,
 *    no fallback arrays, no merging with any other data source.
 *  - The file is written ONLY on a successful fetch. On any error the
 *    existing file is left untouched so the build can still proceed.
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, "../src/data/speakers-generated.json");

const API_URL =
  "https://api.konfhub.com/event/public/wais-f45-indonesia/speakers";
const TARGET_CATEGORY = "World AI Show - Indonesia || Speakers 2026";

/**
 * Maps one raw API speaker object to the internal model.
 * Every value is sourced exclusively from the API response.
 * image is taken verbatim from image_url — no local path substitution.
 * description keeps the raw HTML from about; JSON.stringify handles escaping.
 */
function transform(s) {
  return {
    id:          s.speaker_id          ?? 0,
    name:        s.name                ?? "",
    title:       s.designation         ?? "",
    org:         s.organisation        ?? "",
    image:       s.image_url           ?? "",   // absolute URL from API — never a local /images/ path
    companyLogo: s.organisation_logo_url || undefined,
    description: s.about               ?? "",   // raw HTML — JSON.stringify escapes it correctly
    order:       s.speaker_order       ?? 0,
    linkedin:    s.linkedin_url        || undefined,
    country:     s.location            || undefined,
  };
}

async function run() {
  console.log(`[speakers] Fetching ${API_URL} …`);

  let data;
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    data = await res.json();
  } catch (err) {
    console.error(
      `[speakers] Fetch failed (${err.message}). ` +
      `speakers-generated.json was NOT modified.`
    );
    return; // exit without touching the output file
  }

  if (!Array.isArray(data?.categorized)) {
    console.error(
      "[speakers] Unexpected API shape: 'categorized' is not an array. " +
      "speakers-generated.json was NOT modified."
    );
    return;
  }

  const category = data.categorized.find(
    (c) => c.category_name === TARGET_CATEGORY
  );

  if (!category) {
    console.error(
      `[speakers] Category "${TARGET_CATEGORY}" not found in API response. ` +
      `speakers-generated.json was NOT modified.`
    );
    return;
  }

  // Pure API data — no merging with local arrays or legacy files
  const speakers = (category.speakers ?? [])
    .map(transform)
    .sort((a, b) => a.order - b.order);

  writeFileSync(OUTPUT, JSON.stringify(speakers, null, 2));
  console.log(`[speakers] Wrote ${speakers.length} speakers → ${OUTPUT}`);
}

run();
