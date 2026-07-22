"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { homeLoaderFinished } from "@/lib/session-flags";

/**
 * Soft page enter — opacity/y only.
 * Never use CSS filter here: it breaks GSAP pin layers (blank page).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(
    () => !(pathname === "/" && !homeLoaderFinished)
  );

  useEffect(() => {
    if (pathname === "/" && !homeLoaderFinished) {
      setReady(false);
      const onLoaded = () => setReady(true);
      window.addEventListener("lumina:loaded", onLoaded);
      const t = window.setTimeout(() => setReady(true), 3200);
      return () => {
        window.removeEventListener("lumina:loaded", onLoaded);
        window.clearTimeout(t);
      };
    }

    setReady(false);
    const t = window.setTimeout(() => setReady(true), 380);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
