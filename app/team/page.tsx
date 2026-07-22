import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Team } from "@/components/sections/Team";
import { FadeUp } from "@/components/animations/FadeUp";
import { TEAM } from "@/constants/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Team",
  description:
    "Meet Lumina’s stylists — creative directors, master colorists, bridal specialists, and grooming experts.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <main id="main-content">
        <PageHero
          eyebrow="The Atelier"
          title="Artists behind the light"
          description="Every stylist brings a distinct specialty. Book the artist who matches your vision."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Team" },
          ]}
        />

        <section className="section-padding pb-10">
          <div className="grid gap-6 md:grid-cols-2">
            {TEAM.map((member, i) => (
              <FadeUp key={member.id} delay={i * 0.06}>
                <div className="glass rounded-2xl p-6 md:p-8">
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-primary">
                    {member.role} · {member.experience}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                  <p className="mt-3 text-sm text-white/70">
                    Specializes in {member.specialization}.
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        <Team />
    </main>
  );
}
