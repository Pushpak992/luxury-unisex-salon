"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, X } from "lucide-react";
import { PRICING, PRICING_COMPARISON } from "@/constants/data";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PricingProps {
  showComparison?: boolean;
}

export function Pricing({ showComparison = false }: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll("[data-price-card]") || [],
        { y: 64, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="pricing" className="relative py-24 md:py-32">
      <div className="section-padding">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Investment"
            title="Packages of quiet luxury"
            description="Transparent pricing. Exceptional craft. Choose the ritual that fits your moment."
            align={showComparison ? "center" : "left"}
          />
          {!showComparison && (
            <Link
              href="/pricing"
              className="mb-14 text-xs uppercase tracking-[0.25em] text-primary md:mb-20"
              data-cursor="link"
            >
              Full pricing →
            </Link>
          )}
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {PRICING.map((pkg) => (
            <article
              key={pkg.name}
              data-price-card
              className={cn(
                "group relative flex flex-col rounded-2xl border p-8 premium-card",
                pkg.featured
                  ? "border-primary/50 bg-gradient-to-b from-primary/15 to-card shadow-[0_0_60px_rgba(200,155,94,0.12)] lg:-translate-y-4"
                  : "border-white/10 bg-card hover:border-primary/30"
              )}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] uppercase tracking-[0.25em] text-background">
                  Most Loved
                </span>
              )}

              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                {pkg.name}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-[family-name:var(--font-space-grotesk)] text-5xl">
                  ${pkg.price}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{pkg.description}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-white/75"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <MagneticButton
                asChild
                cursor="book"
                className={cn(
                  "mt-10 w-full rounded-full px-5 py-3.5 text-xs uppercase tracking-[0.2em] transition-all",
                  pkg.featured
                    ? "bg-primary text-background hover:bg-primary-light"
                    : "border border-white/15 hover:border-primary hover:text-primary"
                )}
              >
                <Link href={`/book?package=${encodeURIComponent(pkg.name)}`}>
                  Select Package
                </Link>
              </MagneticButton>
            </article>
          ))}
        </div>

        {showComparison && (
          <FadeUp className="mx-auto mt-20 max-w-5xl overflow-x-auto">
            <h3 className="mb-8 text-center font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl">
              Compare packages
            </h3>
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pr-4 font-medium text-muted-foreground">
                    Feature
                  </th>
                  <th className="px-4 py-4 text-center font-medium">Standard</th>
                  <th className="px-4 py-4 text-center font-medium text-primary">
                    Premium
                  </th>
                  <th className="px-4 py-4 text-center font-medium">Luxury</th>
                </tr>
              </thead>
              <tbody>
                {PRICING_COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5">
                    <td className="py-4 pr-4 text-white/80">{row.feature}</td>
                    {[row.standard, row.premium, row.luxury].map((val, i) => (
                      <td key={i} className="px-4 py-4 text-center">
                        {val ? (
                          <Check className="mx-auto h-4 w-4 text-primary" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-white/20" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
