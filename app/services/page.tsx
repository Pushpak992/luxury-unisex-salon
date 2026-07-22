import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
import { PageHero } from "@/components/layout/PageHero";
import { FadeUp } from "@/components/animations/FadeUp";
import { SERVICES } from "@/constants/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Explore Lumina’s signature services — haircuts, color, spa, keratin, beard styling, bridal packages, and more.",
  path: "/services",
});

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

export default function ServicesPage() {
  return (
    <main id="main-content">
        <PageHero
          eyebrow="Services"
          title="Rituals of refinement"
          description="Eight signature experiences — each composed like a private performance."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />

        <section className="section-padding pb-24 md:pb-32">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = ICONS[service.icon as keyof typeof ICONS];
              return (
                <FadeUp key={service.slug} delay={i * 0.05}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors hover:border-primary/30"
                    data-cursor="view"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-primary backdrop-blur-md">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl">
                          {service.title}
                        </h2>
                        <ArrowUpRight className="h-5 w-5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {service.description}
                      </p>
                      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-primary">
                        {service.price} · {service.duration}
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </section>
    </main>
  );
}
