import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Marquee } from "@/components/animations/Marquee";
import { FadeUp } from "@/components/animations/FadeUp";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { MARQUEE_WORDS, SITE } from "@/constants/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: `Discover the story of ${SITE.name} — a Mumbai luxury unisex hair atelier crafting cinematic transformations since 2010.`,
  path: "/about",
});

export default function AboutPage() {
  return (
      <main id="main-content">
        <PageHero
          eyebrow="Our Story"
          title="Crafted light. Defined beauty."
          description="Lumina was born from a simple belief — hair is architecture for the self. Modern luxury with an Indian soul: patience, precision, and hospitality."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "About" },
          ]}
        />

        <div className="border-y border-white/5 py-6">
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

        <section className="section-padding py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeUp>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1400&q=85"
                  alt="Lumina salon interior in Mumbai"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl">
                Every chair is a stage.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed md:text-lg">
                Inside our Mumbai atelier, light pours across brushed brass, soft
                stone, and quiet geometry inspired by craft traditions. Stylists
                work like editors — listening first, then shaping silhouettes that
                feel inevitable.
              </p>
              <p className="mt-5 text-muted-foreground leading-relaxed md:text-lg">
                Unisex by design. Inclusive by instinct. Obsessively refined in
                every ritual from consultation to final reveal. Founded in 2010,
                Lumina has become a destination for clients who expect both
                international craft and Indian hospitality. {SITE.craftLine}
              </p>
              <MagneticButton asChild className="mt-8">
                <Link
                  href="/book"
                  className="rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-background"
                >
                  Book a Visit
                </Link>
              </MagneticButton>
            </FadeUp>
          </div>
        </section>

        <WhyChooseUs />
        <BeforeAfter />
      </main>
  );
}
