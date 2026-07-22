"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Scissors,
  Sparkles,
  Palette,
  User,
  Wind,
  Heart,
  Crown,
  Gem,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES } from "@/constants/data";
import { SectionHeading } from "@/components/animations/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICONS = {
  Scissors,
  Sparkles,
  Palette,
  User,
  Wind,
  Heart,
  Crown,
  Gem,
} as const;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!section || !pin || !track) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", track);

      // Visible by default — intro is additive; never leave stuck opacity:0
      gsap.set(cards, { opacity: 1, y: 0 });

      const intro = gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: pin,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Safety: if ScrollTrigger races with fast scroll, force visible
      const safety = window.setTimeout(() => {
        gsap.set(cards, { opacity: 1, y: 0, clearProps: "transform" });
      }, 2500);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const getDistance = () =>
          Math.max(track.scrollWidth - window.innerWidth + 100, 1);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 0.5,
            invalidateOnRefresh: true,
            // Transform pin plays nicer with Lenis than fixed in nested wrappers
            pinType: "transform",
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        });

        // Refresh after images/fonts settle so end distance is correct
        const refresh = () => ScrollTrigger.refresh();
        const t1 = window.setTimeout(refresh, 200);
        const t2 = window.setTimeout(refresh, 800);
        window.addEventListener("load", refresh);

        return () => {
          window.clearTimeout(t1);
          window.clearTimeout(t2);
          window.removeEventListener("load", refresh);
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: "transform" });
        };
      });

      return () => {
        window.clearTimeout(safety);
        intro.scrollTrigger?.kill();
        intro.kill();
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-32">
      <div className="section-padding flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Services"
          title="Rituals of refinement"
          description="Eight signature experiences — each composed like a private performance."
        />
        <Link
          href="/services"
          className="mb-14 text-xs uppercase tracking-[0.25em] text-primary transition-colors hover:text-primary-light md:mb-20"
          data-cursor="link"
        >
          View all services →
        </Link>
      </div>

      <div
        ref={pinRef}
        data-horizontal
        className="relative lg:flex lg:h-[100svh] lg:items-center"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-5 px-[clamp(1.25rem,5vw,6rem)] will-change-transform lg:w-max lg:flex-row lg:items-center lg:gap-6"
        >
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                data-service-card
                data-cursor="discover"
                className="group premium-card relative w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors hover:border-primary/35 lg:w-[360px] lg:max-h-[min(72vh,640px)]"
              >
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-primary backdrop-blur-md">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="relative p-5 md:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl">
                        {service.title}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 text-primary opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <p className="mt-5 text-xs uppercase tracking-[0.25em] text-primary">
                      {service.price} · {service.duration}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
