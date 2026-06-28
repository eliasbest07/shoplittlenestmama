"use client";

import { useEffect, useState } from "react";
import AdUnit from "./AdUnit";

const STORAGE_KEY = "littlenestmama-flash-ad-dismissed";

interface AdSenseFlashPanelProps {
  className?: string;
}

export default function AdSenseFlashPanel({
  className = "",
}: AdSenseFlashPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") return;

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  function closeFlashAd() {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <section
      className={[
        "px-5 py-4 md:py-8",
        "motion-safe:animate-[flashAdIn_420ms_ease-out]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container-content">
        <div className="relative">
          <button
            type="button"
            onClick={closeFlashAd}
            aria-label="Close advertisement"
            className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ead8c4] bg-white/90 text-lg leading-none text-earth shadow-card transition-colors hover:bg-sage hover:text-white"
          >
            ×
          </button>
          <AdUnit placement="flash" className="pr-14" />
        </div>
      </div>
    </section>
  );
}
