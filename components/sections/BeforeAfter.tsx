"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { BEFORE_AFTER } from "@/constants/data";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";

/**
 * Same photo, two grades:
 * Before → cooler, flatter, muted
 * After  → warmer champagne glow, richer contrast
 */
export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(98, Math.max(2, x)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section id="before-after" className="relative py-24 md:py-32">
      <div className="section-padding">
        <SectionHeading
          eyebrow="Transformations"
          title="Before & After"
          description="Slide to reveal the quiet power of a Lumina transformation."
          align="center"
        />

        <FadeUp blur>
          <div
            ref={containerRef}
            className="relative mx-auto aspect-[16/10] max-w-5xl cursor-ew-resize overflow-hidden rounded-2xl border border-white/10 select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            data-cursor="drag"
            role="img"
            aria-label="Before and after comparison slider"
          >
            {/* After grade — warm, luminous */}
            <div className="absolute inset-0">
              <Image
                src={BEFORE_AFTER.src}
                alt={`${BEFORE_AFTER.alt} (after)`}
                fill
                className="object-cover"
                style={{
                  filter:
                    "saturate(1.25) contrast(1.08) brightness(1.06) sepia(0.12)",
                }}
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,166,107,0.14), transparent 55%)",
                  mixBlendMode: "soft-light",
                }}
              />
            </div>

            {/* Before grade — cooler, muted (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src={BEFORE_AFTER.src}
                alt={`${BEFORE_AFTER.alt} (before)`}
                fill
                className="object-cover"
                style={{
                  filter:
                    "grayscale(0.45) saturate(0.55) brightness(0.88) contrast(0.95) hue-rotate(190deg)",
                }}
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[#1a2230]/25"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>

            <div
              className="absolute inset-y-0 z-10 w-0.5 bg-primary"
              style={{ left: `${position}%` }}
            >
              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-[#090909] shadow-[0_0_30px_rgba(200,155,94,0.4)]">
                <div className="flex gap-0.5">
                  <span className="h-3 w-0.5 rotate-12 bg-primary" />
                  <span className="h-3 w-0.5 -rotate-12 bg-primary" />
                </div>
              </div>
            </div>

            <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
              Before
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[10px] uppercase tracking-widest text-background">
              After
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
