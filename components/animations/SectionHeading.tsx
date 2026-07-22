"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        el.querySelector("[data-eyebrow]"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          el.querySelector("[data-title]"),
          { y: 50, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          el.querySelector("[data-desc]"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`mb-14 max-w-3xl md:mb-20 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          data-eyebrow
          className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-primary"
        >
          {eyebrow}
        </p>
      )}
      <h2
        data-title
        className="font-[family-name:var(--font-space-grotesk)] text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
      >
        {title}
      </h2>
      {description && (
        <p
          data-desc
          className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {description}
        </p>
      )}
    </div>
  );
}
