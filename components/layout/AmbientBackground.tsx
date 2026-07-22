"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP);

/** Subtle ambient luxury — champagne light, craft lattice, sandstone wash. */
export function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useGSAP(
    () => {
      if (reduceMotion) return;
      const root = ref.current;
      if (!root) return;

      const blobs = root.querySelectorAll("[data-blob]");
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: i % 2 === 0 ? 36 : -44,
          y: i % 2 === 0 ? -24 : 32,
          duration: 14 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const dots = root.querySelectorAll("[data-dot]");
      gsap.to(dots, {
        y: -14,
        opacity: 0.45,
        duration: 4,
        stagger: { each: 0.4, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });
    },
    { scope: ref, dependencies: [reduceMotion] }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <div className="sandstone-wash absolute inset-0" />
      <div className="jali-pattern absolute inset-0 opacity-[0.028] mix-blend-soft-light" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay noise-bg" />

      <div
        data-blob
        className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/[0.06] blur-[100px]"
      />
      <div
        data-blob
        className="absolute -right-24 top-[55%] h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{ background: "rgba(212, 165, 116, 0.05)" }}
      />
      <div
        data-blob
        className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full blur-[90px]"
        style={{ background: "rgba(26, 58, 50, 0.04)" }}
      />

      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          data-dot
          className="absolute h-1 w-1 rounded-full bg-primary/35"
          style={{
            left: `${8 + ((i * 17) % 84)}%`,
            top: `${12 + ((i * 23) % 76)}%`,
            opacity: 0.15 + (i % 3) * 0.06,
          }}
        />
      ))}
    </div>
  );
}
