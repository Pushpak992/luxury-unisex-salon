"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScissorsSvg } from "@/components/icons/ScissorsSvg";

gsap.registerPlugin(useGSAP);

/**
 * Cinematic salon loader — scissors cut a hair strand, then LUMINA reveals.
 * No spinner / percentage bar. ~2.5s.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const strandRef = useRef<HTMLDivElement>(null);
  const cutRef = useRef<HTMLDivElement>(null);
  const scissorsWrap = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const blades = scissorsWrap.current?.querySelectorAll("[data-blade]");
    const letters = logoRef.current?.querySelectorAll("[data-letter]");
    const particles = particlesRef.current?.querySelectorAll("[data-particle]");

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    // Light sweep
    tl.fromTo(
      sweepRef.current,
      { xPercent: -120, opacity: 0 },
      { xPercent: 120, opacity: 0.5, duration: 1.1, ease: "power2.inOut" }
    );

    // Strand appears
    tl.fromTo(
      strandRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.55, ease: "power3.out" },
      0.15
    );

    // Scissors enter
    tl.fromTo(
      scissorsWrap.current,
      { opacity: 0, y: 30, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
      0.25
    );

    // Open / close cutting motion
    if (blades?.length === 2) {
      tl.to(
        blades[0],
        { rotation: -20, duration: 0.28, ease: "power1.inOut", yoyo: true, repeat: 3 },
        0.55
      );
      tl.to(
        blades[1],
        { rotation: 20, duration: 0.28, ease: "power1.inOut", yoyo: true, repeat: 3 },
        0.55
      );
    }

    // Strand snaps / cut flash
    tl.to(
      cutRef.current,
      { opacity: 1, scale: 1.4, duration: 0.2, ease: "power2.out" },
      1.35
    );
    tl.to(
      strandRef.current,
      {
        clipPath: "inset(0 48% 0 48%)",
        opacity: 0.35,
        duration: 0.35,
        ease: "power2.in",
      },
      1.35
    );
    tl.to(cutRef.current, { opacity: 0, duration: 0.3 }, 1.5);

    // Gold particles
    if (particles?.length) {
      tl.fromTo(
        particles,
        { opacity: 0, y: 10, scale: 0 },
        {
          opacity: 0.75,
          y: -50,
          scale: 1,
          duration: 1,
          stagger: 0.03,
          ease: "power2.out",
        },
        1.2
      );
    }

    // Logo letter reveal
    tl.fromTo(
      letters || [],
      { y: 70, opacity: 0, rotateX: -40 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.045,
        ease: "power4.out",
      },
      1.55
    );

    tl.fromTo(
      "[data-loader-sub]",
      { opacity: 0, y: 14, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power3.out",
      },
      1.9
    );

    // Exit
    tl.to(
      stageRef.current,
      {
        opacity: 0,
        y: -20,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power2.in",
        onStart: () => {
          window.dispatchEvent(new CustomEvent("lumina:loaded"));
        },
      },
      2.35
    ).to(
      containerRef.current,
      {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.65,
        ease: "power4.inOut",
      },
      2.45
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  const word = "LUMINA";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[#0a0908]"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-busy="true"
      aria-label="Loading Lumina"
    >
      <div className="jali-pattern pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="noise-bg pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div
        ref={sweepRef}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,166,107,0.18), transparent)",
        }}
      />

      <div
        ref={particlesRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            data-particle
            className="absolute h-1 w-1 rounded-full bg-primary"
            style={{
              left: `${18 + ((i * 17) % 64)}%`,
              top: `${35 + ((i * 11) % 30)}%`,
              boxShadow: "0 0 10px rgba(201,166,107,0.55)",
              opacity: 0,
            }}
          />
        ))}
      </div>

      <div ref={stageRef} className="relative flex flex-col items-center">
        {/* Hair strand */}
        <div className="relative mb-2 flex h-10 w-56 items-center justify-center md:w-72">
          <div
            ref={strandRef}
            className="h-[2px] w-full origin-center rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #E8D9BC 15%, #C9A66B 50%, #E8D9BC 85%, transparent)",
              boxShadow: "0 0 12px rgba(201,166,107,0.45)",
            }}
          />
          <div
            ref={cutRef}
            className="absolute h-8 w-8 rounded-full opacity-0"
            style={{
              background:
                "radial-gradient(circle, rgba(240,226,196,0.7) 0%, transparent 70%)",
            }}
          />
        </div>

        <div ref={scissorsWrap} className="mb-10 h-20 w-20 opacity-0 md:h-24 md:w-24">
          <ScissorsSvg className="h-full w-full" finish="gold" />
        </div>

        <div ref={logoRef} className="text-center" style={{ perspective: "600px" }}>
          <p
            data-loader-sub
            className="mb-4 text-[10px] uppercase tracking-[0.5em] text-primary opacity-0 md:text-xs"
          >
            Est. 2010 · Mumbai
          </p>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl font-medium tracking-[0.22em] text-[#F7F3EC] md:text-7xl lg:text-8xl">
            {word.split("").map((char, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span
                  data-letter
                  className="inline-block will-change-transform"
                  style={{ opacity: 0 }}
                >
                  {char}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-loader-sub
            className="mt-5 text-sm tracking-[0.15em] text-muted-foreground opacity-0"
          >
            Modern Luxury. Indian Soul.
          </p>
        </div>
      </div>
    </div>
  );
}
