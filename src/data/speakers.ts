// ─────────────────────────────────────────────────────────────────────────────
// Internal speaker model.
// Source of truth is speakers-generated.json, written at build time by
// scripts/fetch-speakers.mjs (API → filter → transform).
// The JSON file is committed so builds succeed even when the API is unreachable.
// ─────────────────────────────────────────────────────────────────────────────

export type Speaker = {
  id: number;
  name: string;
  title: string;
  org: string;
  image: string;
  companyLogo?: string;
  description?: string;
  order: number;
  linkedin?: string;
  country?: string;
};

import raw from "./speakers-generated.json";

export const speakers: Speaker[] = raw as Speaker[];
