"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";
import { NAV_LINKS } from "@/lib/constants";
import { HamburgerIcon } from "@/components/ui/Icons";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 100;

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-parchment/88 shadow-navbar backdrop-blur-md"
            : "bg-parchment/55 backdrop-blur-sm"
        }`}
        aria-label="Main navigation"
      >
        <div className="container-content flex h-[60px] items-center justify-between md:h-[72px]">
          <Link
            href="/"
            className="font-playfair text-xl font-bold tracking-[0.01em] text-earth transition-colors md:text-2xl"
          >
            LittleNestMama
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-earth/78 transition-colors hover:text-sage"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-earth/78 transition-colors hover:text-sage"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-earth/10 bg-white/70 text-earth shadow-card md:hidden"
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
