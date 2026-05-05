/**
 * © 2025 Trescon Global. All Rights Reserved.
 * Proprietary and confidential. Unauthorised copying, distribution,
 * or modification of this file is strictly prohibited.
 * Designed and developed by Durga Charan for Trescon Global.
 */
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://worldaishow.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "World AI Show Indonesia 2025 | Jakarta",
  description: "Architecting Indonesia's Sovereign & Scalable AI Future. The premier AI event in Southeast Asia — Jakarta, Indonesia.",
  keywords: "World AI Show, Indonesia, Jakarta, AI Conference, Artificial Intelligence, Southeast Asia",
  icons: {
    icon: `${BASE_PATH}/images/favicon.png`,
  },
  openGraph: {
    title: "World AI Show Indonesia 2025",
    description: "Architecting Indonesia's Sovereign & Scalable AI Future",
    type: "website",
    images: [
      {
        url: `${BASE_PATH}/images/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "World AI Show Indonesia 2025",
    description: "Architecting Indonesia's Sovereign & Scalable AI Future",
    images: [`${BASE_PATH}/images/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      {/* © 2025 Trescon Global. All Rights Reserved. Designed & developed by Durga Charan. Unauthorised copying or reproduction of this source code is strictly prohibited. */}
      <head>
        <meta name="copyright" content="© 2025 Trescon Global. All Rights Reserved." />
        <meta name="author" content="Durga Charan — designed and developed for Trescon Global" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
