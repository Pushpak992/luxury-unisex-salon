"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { FadeUp } from "@/components/animations/FadeUp";
import { Marquee } from "@/components/animations/Marquee";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { MARQUEE_WORDS } from "@/constants/data";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const lines = sectionRef.current?.querySelectorAll("[data-story-line]");
      if (!lines?.length) return;

      gsap.fromTo(
        lines,
        { y: 80, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <div className="mb-16 border-y border-white/5 py-6 md:mb-24">
        <Marquee speed={35}>
          {MARQUEE_WORDS.map((word) => (
            <span
              key={word}
              className="font-[family-name:var(--font-space-grotesk)] text-4xl font-medium tracking-[0.15em] text-white/15 md:text-6xl"
            >
              {word}
              <span className="mx-6 text-primary/40">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="section-padding">
        <SectionHeading
          eyebrow="Our Story"
          title="Crafted light. Defined beauty."
          description="Lumina was born from a simple belief — hair is architecture for the self. We sculpt identity with patience, precision, and a quiet kind of luxury."
        />

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeUp blur scale className="relative lg:col-span-7">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-sm md:aspect-[16/11] lg:aspect-[4/3]"
              data-cursor="view"
            >
              <ParallaxImage speed={18} className="h-full w-full">
                <Image
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1400&q=85"
                  alt="Lumina salon interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </ParallaxImage>
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/50 to-transparent" />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-48 overflow-hidden rounded-sm border border-white/10 md:block lg:-right-10 lg:w-56">
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80"
                  alt="Detail shot"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            </div>
          </FadeUp>

          <div className="lg:col-span-5 lg:pl-4">
            <p
              data-story-line
              className="font-[family-name:var(--font-space-grotesk)] text-2xl leading-snug text-white/90 md:text-3xl lg:text-4xl"
            >
              Every chair is a stage.
            </p>
            <p
              data-story-line
              className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Inside our Mumbai atelier, light pours across brushed brass, soft
              stone, and quiet geometry inspired by craft traditions. Stylists work
              like editors — listening first, then shaping silhouettes that feel
              inevitable.
            </p>
            <p
              data-story-line
              className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Unisex by design. Inclusive by instinct. Obsessively refined in
              every ritual from consultation to final reveal — international
              craftsmanship with Indian hospitality at its heart.
            </p>

            <div
              data-story-line
              className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8"
            >
              <div>
                <p className="text-3xl text-primary md:text-4xl">15+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Years
                </p>
              </div>
              <div>
                <p className="text-3xl text-primary md:text-4xl">Mumbai</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  India
                </p>
              </div>
            </div>

            <div data-story-line className="mt-8">
              <MagneticButton
                asChild
                className="rounded-full border border-primary/40 px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-background"
              >
                <Link href="/about">Read our story</Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
