"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSoundContext } from "@/components/providers/SoundProvider";
import { ScissorsSvg } from "@/components/icons/ScissorsSvg";

gsap.registerPlugin(useGSAP);

const LABEL_MAP: Record<string, string> = {
  view: "View",
  open: "View",
  meet: "Meet",
  book: "Book",
  discover: "Explore",
  explore: "Explore",
  magnetic: "Click",
  link: "Click",
  drag: "Drag",
};

/**
 * Luxury salon scissors cursor — original SVG, GSAP-driven, desktop only.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scissorsRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const isDesktop = useMediaQuery("(pointer: fine) and (min-width: 1024px)");
  const sound = useSoundContext();
  const lastHover = useRef<Element | null>(null);
  const prev = useRef({ x: 0, y: 0 });
  const openAmount = useRef(10);

  useGSAP(
    () => {
      if (!isDesktop) return;
      const root = rootRef.current;
      const scissors = scissorsRef.current;
      const trail = trailRef.current;
      const labelEl = labelRef.current;
      if (!root || !scissors || !trail || !labelEl) return;

      document.body.classList.add("cursor-active");

      const xRoot = gsap.quickTo(root, "x", { duration: 0.14, ease: "power3" });
      const yRoot = gsap.quickTo(root, "y", { duration: 0.14, ease: "power3" });
      const xTrail = gsap.quickTo(trail, "x", { duration: 0.5, ease: "power3" });
      const yTrail = gsap.quickTo(trail, "y", { duration: 0.5, ease: "power3" });
      const rotTo = gsap.quickTo(scissors, "rotation", {
        duration: 0.35,
        ease: "power2.out",
      });

      gsap.set([root, trail], { xPercent: -50, yPercent: -50 });
      gsap.set(labelEl, { scale: 0.6, opacity: 0 });

      const blades = scissors.querySelectorAll("[data-blade]");
      gsap.set(blades, { transformOrigin: "32px 34px", svgOrigin: "32 34" });
      const setBlades = (deg: number) => {
        openAmount.current = deg;
        if (blades[0])
          gsap.to(blades[0], {
            rotation: -deg,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        if (blades[1])
          gsap.to(blades[1], {
            rotation: deg,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
      };
      setBlades(10);

      const showLabel = (text: string) => {
        setLabel(text);
        gsap.to(labelEl, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.6)",
        });
      };

      const hideLabel = () => {
        setLabel("");
        gsap.to(labelEl, { scale: 0.6, opacity: 0, duration: 0.22 });
      };

      const onMove = (e: MouseEvent) => {
        xRoot(e.clientX);
        yRoot(e.clientY);
        xTrail(e.clientX);
        yTrail(e.clientY);

        const dx = e.clientX - prev.current.x;
        const dy = e.clientY - prev.current.y;
        prev.current = { x: e.clientX, y: e.clientY };
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (Math.hypot(dx, dy) > 1.5) {
          rotTo(angle * 0.15 + 25);
        }
      };

      const onOver = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest("[data-cursor]");
        if (target === lastHover.current) return;
        lastHover.current = target;

        if (!target) {
          hideLabel();
          setBlades(10);
          gsap.to(scissors, { scale: 1, duration: 0.3 });
          return;
        }

        const type = target.getAttribute("data-cursor") || "";
        const text = LABEL_MAP[type] ?? "Click";
        sound?.play("hover");

        if (type === "magnetic" || type === "link" || type === "book") {
          setBlades(22);
          showLabel(text);
          gsap.to(scissors, { scale: 1.08, duration: 0.3 });
        } else if (type === "view" || type === "open") {
          setBlades(18);
          showLabel(text);
          gsap.to(scissors, { scale: 1.12, rotation: "+=8", duration: 0.35 });
        } else if (type === "meet" || type === "discover" || type === "explore") {
          setBlades(16);
          showLabel(text);
          gsap.to(scissors, { scale: 1.06, duration: 0.3 });
        } else {
          setBlades(14);
          showLabel(text);
        }
      };

      const onDown = () => {
        sound?.play("click");
        setBlades(4);
        gsap.to(scissors, { scale: 0.92, duration: 0.12 });
      };

      const onUp = () => {
        setBlades(openAmount.current > 12 ? openAmount.current : 12);
        gsap.to(scissors, { scale: 1, duration: 0.2 });
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseover", onOver);
      document.addEventListener("mousedown", onDown);
      document.addEventListener("mouseup", onUp);

      return () => {
        document.body.classList.remove("cursor-active");
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
        document.removeEventListener("mousedown", onDown);
        document.removeEventListener("mouseup", onUp);
      };
    },
    { dependencies: [isDesktop, sound] }
  );

  useEffect(() => {
    if (!isDesktop) document.body.classList.remove("cursor-active");
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={trailRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-16 w-16 rounded-full opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(201,166,107,0.28) 0%, transparent 70%)",
          filter: "blur(12px)",
          willChange: "transform",
        }}
      />

      <div
        ref={rootRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex flex-col items-center"
        style={{ willChange: "transform" }}
      >
        <div
          ref={scissorsRef}
          className="h-11 w-11 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
          style={{ willChange: "transform" }}
        >
          <ScissorsSvg className="h-full w-full" finish="gold" />
        </div>

        <div
          ref={labelRef}
          className="mt-1 rounded-full border border-primary/50 bg-[#0a0908]/75 px-2.5 py-1 opacity-0 backdrop-blur-md"
        >
          {label && (
            <span className="whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.22em] text-primary">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
