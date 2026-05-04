import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { getWebsiteSchema, getOrganizationSchema } from "@/lib/structured-data";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LittleNestMama — Honest Baby Care Recommendations",
    template: "%s | LittleNestMama",
  },
  description:
    "Honest reviews, gentle recommendations, and trusted picks for your baby — by a mama who checks every label.",
  keywords: [
    "baby care",
    "baby products",
    "honest reviews",
    "baby wipes",
    "sensitive skin",
    "newborn essentials",
    "mama approved",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LittleNestMama",
  },
  verification: {
    other: {
      "p:domain_verify": "9e5fab18461128d3d281c844ca82e68c",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6503077569219292"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([getWebsiteSchema(), getOrganizationSchema()]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
