"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTriggerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    (window as Window & { __lenis?: typeof lenis }).__lenis = lenis;

    // Keep ScrollTrigger in sync with Lenis (critical for pin sections)
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.clearTimeout(t);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(ticker);
      delete (window as Window & { __lenis?: typeof lenis }).__lenis;
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 0.7,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -11 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.2,
        syncTouch: false,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
