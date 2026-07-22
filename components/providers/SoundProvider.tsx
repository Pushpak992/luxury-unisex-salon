"use client";

import { createContext, useContext, useEffect } from "react";
import { useSound } from "@/hooks/useSound";

type SoundContextValue = ReturnType<typeof useSound>;

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSoundContext() {
  const ctx = useContext(SoundContext);
  return ctx;
}

/** Keeps optional UI sounds available to children — no mute toggle in the UI. */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const sound = useSound(true);

  useEffect(() => {
    const onLoaded = () => sound.play("load");
    window.addEventListener("lumina:loaded", onLoaded);
    return () => window.removeEventListener("lumina:loaded", onLoaded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sound.play]);

  return (
    <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>
  );
}
