"use client";

import { useEffect, useMemo } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdPlacement =
  | "flash"
  | "home-feature"
  | "home-catalog"
  | "home-journal"
  | "products-top"
  | "products-grid"
  | "product-detail";

interface AdUnitProps {
  placement: AdPlacement;
  className?: string;
  variant?: "banner" | "native" | "sidebar";
}

const ADSENSE_CLIENT = "ca-pub-7506182169131280";
const ADSENSE_TEST_MODE =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_ADSENSE_TEST_MODE === "on";

const AD_SLOTS: Record<AdPlacement, string | undefined> = {
  flash: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FLASH,
  "home-feature": process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_FEATURE,
  "home-catalog": process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_CATALOG,
  "home-journal": process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_JOURNAL,
  "products-top": process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRODUCTS_TOP,
  "products-grid": process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRODUCTS_GRID,
  "product-detail": process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRODUCT_DETAIL,
};

const AD_COPY: Record<
  AdPlacement,
  { eyebrow: string; title: string; body: string }
> = {
  flash: {
    eyebrow: "advertisements",
    title: "Sponsored picks loading here",
    body: "This flash-style placement is ready for your AdSense test unit.",
  },
  "home-feature": {
    eyebrow: "sponsored nest note",
    title: "Thoughtful finds for the next little routine",
    body: "A calm placement for brands and products that fit the LittleNestMama reader.",
  },
  "home-catalog": {
    eyebrow: "mama marketplace",
    title: "A useful pause between curated picks",
    body: "Built to feel native to the catalog without interrupting product browsing.",
  },
  "home-journal": {
    eyebrow: "journal sponsor",
    title: "Relevant support for practical baby-care reading",
    body: "An editorial-style unit for helpful recommendations beside story content.",
  },
  "products-top": {
    eyebrow: "featured partner",
    title: "A soft landing spot for seasonal baby essentials",
    body: "Responsive display inventory that keeps the shopping page clean and useful.",
  },
  "products-grid": {
    eyebrow: "sponsored pick",
    title: "A natural card inside the product library",
    body: "Designed to blend with the grid while remaining clearly labeled as advertising.",
  },
  "product-detail": {
    eyebrow: "partner spotlight",
    title: "More context before readers choose their next product",
    body: "A compact ad unit for product pages, buying guides, and high-intent traffic.",
  },
};

function getVariantClasses(variant: NonNullable<AdUnitProps["variant"]>) {
  if (variant === "native") {
    return "min-h-[360px] p-5";
  }

  if (variant === "sidebar") {
    return "min-h-[280px] p-6 md:p-8";
  }

  return "min-h-[180px] p-6 md:p-8";
}

export default function AdUnit({
  placement,
  className = "",
  variant = "banner",
}: AdUnitProps) {
  const slot = AD_SLOTS[placement];
  const copy = AD_COPY[placement];
  const frameClassName = useMemo(
    () =>
      [
        "relative isolate overflow-hidden rounded-[1.75rem] border border-[#ead8c4] bg-white/75 shadow-card",
        getVariantClasses(variant),
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [className, variant]
  );

  useEffect(() => {
    if (!slot) return;

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or delayed AdSense bootstrapping can throw; the frame remains stable.
    }
  }, [slot]);

  return (
    <aside aria-label="Advertisement" className={frameClassName}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(31,122,117,0.1),transparent_35%),radial-gradient(circle_at_85%_18%,rgba(200,96,23,0.16),transparent_30%)]" />
      <div className="pointer-events-none absolute -right-12 bottom-[-70px] h-44 w-44 rounded-full border border-sage/15" />

      {slot ? (
        <ins
          className="adsbygoogle relative z-10 block min-h-[120px] w-full"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          data-adtest={ADSENSE_TEST_MODE ? "on" : undefined}
        />
      ) : (
        <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">
              {copy.eyebrow}
            </p>
            <h3 className="mt-3 font-playfair text-2xl font-semibold leading-tight text-earth md:text-3xl">
              {copy.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
              {copy.body}
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#ead8c4] pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-earth/60">
              Advertisement
            </span>
            <span className="rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-sage">
              Ad-ready
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
