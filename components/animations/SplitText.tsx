"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
  type?: "chars" | "words";
}

export function SplitText({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.03,
  type = "chars",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const parts =
        type === "words" ? children.split(" ") : children.split("");

      el.innerHTML = parts
        .map((part, i) => {
          const content = part === " " ? "&nbsp;" : part;
          const spacer = type === "words" && i < parts.length - 1 ? "&nbsp;" : "";
          return `<span class="split-char inline-block" style="opacity:0;transform:translateY(120%)">${content}</span>${spacer}`;
        })
        .join("");

      const chars = el.querySelectorAll(".split-char");

      gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { dependencies: [children, type] }
  );

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn("overflow-hidden", className)}
      aria-label={children}
    >
      {children}
    </Tag>
  );
}
