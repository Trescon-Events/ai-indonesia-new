import { fetchSpeakers } from "@/lib/speakers";
import SpeakersClient from "./SpeakersClient";

export const dynamic = "force-dynamic";

export default async function SpeakersPage() {
  const speakers = await fetchSpeakers();
  return <SpeakersClient speakers={speakers} />;
}
