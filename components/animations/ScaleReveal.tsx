"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScaleRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function ScaleReveal({ children, className }: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { scale: 0.85, opacity: 0, borderRadius: "2rem" },
        {
          scale: 1,
          opacity: 1,
          borderRadius: "0rem",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("overflow-hidden will-change-transform", className)}>
      {children}
    </div>
  );
}
