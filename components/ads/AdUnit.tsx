"use client";

import { useEffect, useMemo } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdPlacement =
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
  "home-feature": process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_FEATURE,
  "home-catalog": process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_CATALOG,
  "home-journal": process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_JOURNAL,
  "products-top": process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRODUCTS_TOP,
  "products-grid": process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRODUCTS_GRID,
  "product-detail": process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRODUCT_DETAIL,
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
      // Ad blockers or delayed AdSense bootstrapping can throw; nothing to do.
    }
  }, [slot]);

  // Without a real AdSense slot there is no ad to show — render nothing
  // rather than a placeholder so the page never displays a fake ad unit.
  if (!slot) return null;

  return (
    <aside aria-label="Advertisement" className={frameClassName}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(31,122,117,0.1),transparent_35%),radial-gradient(circle_at_85%_18%,rgba(200,96,23,0.16),transparent_30%)]" />
      <div className="pointer-events-none absolute -right-12 bottom-[-70px] h-44 w-44 rounded-full border border-sage/15" />

      <ins
        className="adsbygoogle relative z-10 block min-h-[120px] w-full"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest={ADSENSE_TEST_MODE ? "on" : undefined}
      />
    </aside>
  );
}
