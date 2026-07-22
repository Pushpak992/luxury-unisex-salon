"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FadeUp } from "@/components/animations/FadeUp";

gsap.registerPlugin(useGSAP);

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: { label: string; href?: string }[];
}

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current?.querySelectorAll("[data-hero-anim]") || [],
        { y: 40, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.35,
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/5 pb-16 pt-32 md:pb-24 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,155,94,0.1),_transparent_55%)]" />
      <div className="section-padding relative z-10">
        {crumbs && crumbs.length > 0 && (
          <nav
            data-hero-anim
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            {crumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-primary/50">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-primary"
                    data-cursor="link"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-primary">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p
            data-hero-anim
            className="mb-4 text-xs uppercase tracking-[0.35em] text-primary"
          >
            {eyebrow}
          </p>
        )}
        <h1
          data-hero-anim
          className="max-w-4xl font-[family-name:var(--font-space-grotesk)] text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
        >
          {title}
        </h1>
        {description && (
          <FadeUp className="mt-6 max-w-2xl">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
