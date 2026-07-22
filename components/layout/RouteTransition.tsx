"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Short luxury transition on every route change.
 * Gold curtain + LUMINA mark — ~0.85s, never blocks forever.
 */
export function RouteTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // First paint of home uses the full LoadingScreen — skip this overlay once
    if (first.current) {
      first.current = false;
      if (pathname === "/") return;
    }

    setActive(true);

    // Reset scroll for the new page (Lenis-aware)
    const lenis = (window as Window & { __lenis?: { scrollTo: (v: number, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname]);

  useGSAP(
    () => {
      if (!active) return;
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const mark = markRef.current;
      const line = lineRef.current;
      if (!overlay || !panel || !mark || !line) return;

      const tl = gsap.timeline({
        onComplete: () => setActive(false),
      });

      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(panel, { yPercent: 0 });
      gsap.set(mark, { opacity: 0, y: 16, filter: "blur(8px)" });
      gsap.set(line, { scaleX: 0 });

      tl.to(mark, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.35,
        ease: "power3.out",
      })
        .to(
          line,
          { scaleX: 1, duration: 0.4, ease: "power3.inOut" },
          "-=0.15"
        )
        .to(mark, { opacity: 0, y: -10, duration: 0.25, ease: "power2.in" }, "+=0.12")
        .to(
          panel,
          { yPercent: -100, duration: 0.55, ease: "power4.inOut" },
          "-=0.05"
        )
        .set(overlay, { autoAlpha: 0 });
    },
    { dependencies: [active, pathname] }
  );

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[9995]"
      aria-hidden
    >
      <div
        ref={panelRef}
        className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0908]"
      >
        <div className="jali-pattern pointer-events-none absolute inset-0 opacity-[0.04]" />
        <p
          ref={markRef}
          className="font-[family-name:var(--font-space-grotesk)] text-sm tracking-[0.55em] text-primary md:text-base"
        >
          LUMINA
        </p>
        <div
          ref={lineRef}
          className="mt-5 h-px w-24 origin-left bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>
    </div>
  );
}
