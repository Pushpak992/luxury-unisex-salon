"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Award, Leaf, Users, ShieldCheck } from "lucide-react";
import { WHY_CHOOSE } from "@/constants/data";
import { SectionHeading } from "@/components/animations/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICONS = [Award, Leaf, Users, ShieldCheck];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const counters = sectionRef.current?.querySelectorAll("[data-counter]");
      counters?.forEach((el) => {
        const target = Number(el.getAttribute("data-value") || 0);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      });

      gsap.fromTo(
        sectionRef.current?.querySelectorAll("[data-why-card]") || [],
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
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
    <section
      ref={sectionRef}
      id="why-us"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(200,155,94,0.07),_transparent_50%)]" />

      <div className="section-padding relative z-10">
        <SectionHeading
          eyebrow="Why Lumina"
          title="Numbers that whisper excellence"
          description="Luxury is not loud. It is measured in consistency, craft, and care."
          align="center"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={item.label}
                data-why-card
                className="group glass relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:border-primary/30"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-5xl tracking-tight text-white md:text-6xl">
                  <span data-counter data-value={item.value}>
                    0
                  </span>
                  <span className="text-primary">{item.suffix}</span>
                </p>
                <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
