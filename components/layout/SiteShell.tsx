"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { PageTransition } from "@/components/layout/PageTransition";
import { RouteTransition } from "@/components/layout/RouteTransition";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SoundProvider } from "@/components/providers/SoundProvider";
import { markHomeLoaderFinished, homeLoaderFinished } from "@/lib/session-flags";

const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const MouseFollower = dynamic(
  () =>
    import("@/components/layout/MouseFollower").then((m) => m.MouseFollower),
  { ssr: false }
);

const LoadingScreen = dynamic(
  () =>
    import("@/components/layout/LoadingScreen").then((m) => m.LoadingScreen),
  { ssr: false }
);

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    if (pathname === "/" && !homeLoaderFinished) {
      setShowLoader(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!showLoader) return;
    const done = () => {
      markHomeLoaderFinished();
      setShowLoader(false);
    };
    window.addEventListener("lumina:loaded", done);
    return () => window.removeEventListener("lumina:loaded", done);
  }, [showLoader]);

  return (
    <SmoothScrollProvider>
      <SoundProvider>
        {showLoader && <LoadingScreen />}
        <RouteTransition />
        <AmbientBackground />
        <MouseFollower />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <PageTransition>
          <div className="relative z-[2]">{children}</div>
          <Footer />
        </PageTransition>
        <BackToTop />
      </SoundProvider>
    </SmoothScrollProvider>
  );
}
