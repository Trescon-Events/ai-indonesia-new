import type { NextConfig } from "next";

const BASE_PATH = "/indonesia"; //live
// const BASE_PATH = ""; //local

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://worldaishow.com",
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
    ],
  },
  // Note: headers() is not supported with output: "export".
  // Apply security headers (CSP, HSTS, X-Frame-Options, etc.) at the
  // CDN / AWS CloudFront / server level instead.
};

export default nextConfig;
