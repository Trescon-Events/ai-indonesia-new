// Custom image loader — prepends basePath so next/image works under a subpath.
// Next.js does not apply basePath to image src values automatically, so this
// loader handles it for all <Image> components across the site.
export default function imageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // Absolute URLs (external images like randomuser.me) pass through unchanged.
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${base}${src}`;
}
