"use client";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, Play } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { SITE } from "@/constants/data";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const chars = headlineRef.current?.querySelectorAll(".hero-char");
      const tl = gsap.timeline({ delay: 2.55 });

      tl.fromTo(
        mediaRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
      )
        .fromTo(
          chars || [],
          { yPercent: 110, opacity: 0, rotateX: -35 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.035,
            ease: "power4.out",
          },
          "-=1"
        )
        .fromTo(
          "[data-hero-sub]",
          { y: 28, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.75, ease: "power3.out" },
          "-=0.45"
        )
        .fromTo(
          "[data-hero-cta]",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
          "-=0.35"
        )
        .fromTo(
          floatRef.current?.children || [],
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power2.out" },
          "-=0.8"
        );

      const onMove = (e: MouseEvent) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 30;
        const y = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to(mediaRef.current, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to(floatRef.current, {
          x: -x,
          y: -y,
          duration: 1.4,
          ease: "power2.out",
        });
      };

      section.addEventListener("mousemove", onMove);
      return () => section.removeEventListener("mousemove", onMove);
    },
    { scope: sectionRef }
  );

  const headline = "LUMINA";

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-0 md:pt-0"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div ref={mediaRef} className="absolute inset-[-8%] will-change-transform">
          <Image
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=85"
            alt="Luxury Lumina salon atmosphere"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/70 via-[#090909]/45 to-[#090909]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#090909_75%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,166,107,0.14),transparent_55%)]" />
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-woman-getting-her-hair-done-5633/1080p.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <div
        ref={floatRef}
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
      >
        <div className="animate-float absolute left-[8%] top-[22%] h-24 w-24 rounded-full border border-primary/25 bg-primary/5 shadow-[0_0_60px_rgba(201,166,107,0.12)] backdrop-blur-sm md:h-32 md:w-32" />
        <div
          className="animate-float absolute bottom-[28%] right-[10%] h-16 w-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="animate-float absolute right-[18%] top-[30%] h-3 w-3 rounded-full bg-primary shadow-[0_0_24px_#c9a66b]"
          style={{ animationDelay: "0.8s" }}
        />
        <div
          className="animate-float absolute left-[22%] bottom-[22%] h-2 w-2 rounded-full bg-[#E8D9BC]/80 shadow-[0_0_16px_rgba(232,217,188,0.6)]"
          style={{ animationDelay: "2.2s" }}
        />
        <div className="absolute left-1/2 top-[18%] h-px w-[min(40vw,280px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-70" />
      </div>

      <div className="section-padding relative z-10 w-full">
        <div className="max-w-5xl">
          <p
            data-hero-sub
            className="mb-6 text-xs uppercase tracking-[0.4em] text-primary opacity-0"
          >
            Unisex Luxury Hair Atelier · Mumbai
          </p>

          <h1
            ref={headlineRef}
            className="font-[family-name:var(--font-space-grotesk)] text-[18vw] font-medium leading-[0.85] tracking-[-0.04em] text-white md:text-[12vw] lg:text-[9.5rem]"
            style={{ perspective: "800px" }}
          >
            {headline.split("").map((char, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="hero-char inline-block will-change-transform">
                  {char}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mt-6 max-w-md text-base leading-relaxed text-white/70 opacity-0 md:text-lg"
          >
            {SITE.tagline}. {SITE.craftLine} Cinematic cuts, color, and care —
            crafted for those who demand the extraordinary.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              asChild
              cursor="book"
              data-hero-cta
              className="animate-pulse-glow rounded-full bg-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-background opacity-0"
            >
              <Link href="/book">Book Experience</Link>
            </MagneticButton>

            <MagneticButton
              asChild
              cursor="discover"
              data-hero-cta
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 text-sm uppercase tracking-[0.2em] text-white opacity-0 transition-colors hover:border-primary/50"
            >
              <Link href="/about">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Play className="h-3 w-3 fill-current" />
                </span>
                Discover
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>

      <Link
        href="/about"
        className="group absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50 md:flex"
        data-cursor="explore"
        data-hero-cta
        aria-label="Go to about page"
      >
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary to-transparent animate-[scroll-line_1.8s_ease-in-out_infinite]" />
        </span>
        <span className="transition-colors group-hover:text-primary">Scroll</span>
        <ArrowDown className="h-4 w-4 text-primary transition-transform group-hover:translate-y-1" />
      </Link>
    </section>
  );
}
