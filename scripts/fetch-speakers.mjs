/**
 * Pre-build script: fetches speakers from KonfHub API, filters to the correct
 * category, transforms to the internal model, and writes the result to
 * src/data/speakers-generated.json.
 *
 * Run automatically via "prebuild" in package.json.
 * On failure the existing JSON is left untouched so builds always succeed.
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, "../src/data/speakers-generated.json");

const API_URL =
  "https://api.konfhub.com/event/public/wais-f45-indonesia/speakers";
const TARGET_CATEGORY = "World AI Show - Indonesia || Speakers 2026";

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function transform(s) {
  return {
    id: s.speaker_id ?? 0,
    name: s.name ?? "",
    title: s.designation ?? "",
    org: s.organisation ?? "",
    image: s.image_url ?? "",
    companyLogo: s.organisation_logo_url || undefined,
    description: stripHtml(s.about),
    order: s.speaker_order ?? 0,
    linkedin: s.linkedin_url || undefined,
    country: s.location || undefined,
  };
}

async function run() {
  try {
    console.log(`[speakers] Fetching ${API_URL} …`);
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const data = await res.json();

    if (!Array.isArray(data?.categorized)) {
      throw new Error("Unexpected API shape: missing 'categorized' array");
    }

    const category = data.categorized.find(
      (c) => c.category_name === TARGET_CATEGORY
    );
    if (!category) {
      throw new Error(
        `Category "${TARGET_CATEGORY}" not found in API response`
      );
    }

    const speakers = (category.speakers ?? [])
      .map(transform)
      .sort((a, b) => a.order - b.order);

    writeFileSync(OUTPUT, JSON.stringify(speakers, null, 2));
    console.log(
      `[speakers] Wrote ${speakers.length} speakers → ${OUTPUT}`
    );
  } catch (err) {
    console.warn(
      `[speakers] Fetch failed (${err.message}). Keeping existing speakers-generated.json.`
    );
  }
}

run();
