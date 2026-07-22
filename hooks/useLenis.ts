"use client";

import { useCallback, useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function useLenisScrollTo() {
  return useCallback((target: string | number, options?: { offset?: number }) => {
    const lenis = (window as Window & { __lenis?: { scrollTo: (t: string | number, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: options?.offset ?? -80, duration: 1.4 });
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
}
