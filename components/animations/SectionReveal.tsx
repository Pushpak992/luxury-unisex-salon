"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  /** clip | fade | scale */
  variant?: "clip" | "fade" | "scale";
}

/**
 * Soft entrance for section blocks — clip / blur / scale, never abrupt.
 */
export function SectionReveal({
  children,
  className,
  variant = "fade",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const from: gsap.TweenVars =
        variant === "clip"
          ? { clipPath: "inset(12% 8% 12% 8%)", opacity: 0.35, filter: "blur(8px)" }
          : variant === "scale"
            ? { scale: 0.96, opacity: 0, filter: "blur(6px)" }
            : { y: 56, opacity: 0, filter: "blur(8px)" };

      const to: gsap.TweenVars =
        variant === "clip"
          ? {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.15,
              ease: "power3.out",
            }
          : variant === "scale"
            ? {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
              }
            : {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
              };

      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [variant] }
  );

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={
        variant === "clip"
          ? { clipPath: "inset(12% 8% 12% 8%)" }
          : undefined
      }
    >
      {children}
    </div>
  );
}
