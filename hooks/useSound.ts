"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SoundType = "hover" | "click" | "load";

/**
 * Subtle Web Audio UI tones — no external assets.
 * Muted by default; toggle via setMuted / floating control.
 */
export function useSound(defaultMuted = true) {
  const ctxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(defaultMuted);

  useEffect(() => {
    const stored = sessionStorage.getItem("lumina-sound");
    if (stored === "on") setMuted(false);
  }, []);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (type: SoundType) => {
      if (muted) return;
      const ctx = ensureCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "hover") {
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.02, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === "click") {
        osc.frequency.value = 420;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.15);
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.35);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.52);
      }
    },
    [muted, ensureCtx]
  );

  const toggle = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      sessionStorage.setItem("lumina-sound", next ? "off" : "on");
      return next;
    });
  }, []);

  return { muted, setMuted, toggle, play };
}
