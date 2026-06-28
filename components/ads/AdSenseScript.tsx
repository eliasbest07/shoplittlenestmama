import Script from "next/script";

/**
 * Loads the Google AdSense library.
 *
 * Render this ONLY on pages that contain real publisher content
 * (home, products list, product detail, blog list, blog post).
 * Do NOT add it to error.tsx, not-found.tsx, or any low/no-content
 * screen — AdSense policy prohibits serving ads on screens without
 * publisher content. The shared `id` makes the script load once even
 * if it ends up rendered on multiple components during navigation.
 */
export default function AdSenseScript() {
  return (
    <Script
      id="google-adsense"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7506182169131280"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
