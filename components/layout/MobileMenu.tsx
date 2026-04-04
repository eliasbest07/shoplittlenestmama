"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { CloseIcon } from "@/components/ui/Icons";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(244,229,225,0.18),transparent_30%),linear-gradient(180deg,#1f2333,#283452)]"
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-cream"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>

          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              >
                {link.href.startsWith("#") ? (
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="font-playfair text-[28px] text-cream transition-colors hover:text-warm"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-playfair text-[28px] text-cream transition-colors hover:text-warm"
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
