"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenisScrollTo } from "@/hooks/useLenis";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const scrollTo = useLenisScrollTo();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-6 z-50 md:right-10"
        >
          <MagneticButton
            onClick={() => scrollTo(0)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-[#090909]/80 text-primary backdrop-blur-md transition-colors hover:bg-primary hover:text-background"
            aria-label="Back to top"
            data-cursor="magnetic"
          >
            <ArrowUp className="h-5 w-5" />
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
