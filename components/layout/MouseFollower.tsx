"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP);

/** Soft champagne trail — lag behind scissors cursor. */
export function MouseFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(pointer: fine) and (min-width: 1024px)");

  useGSAP(
    () => {
      if (!isDesktop) return;
      const el = ref.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.65, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.65, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    },
    { dependencies: [isDesktop] }
  );

  if (!isDesktop) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9990] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(201,166,107,0.2) 0%, rgba(201,166,107,0.05) 40%, transparent 70%)",
        filter: "blur(16px)",
        willChange: "transform",
      }}
    />
  );
}
