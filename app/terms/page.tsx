import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { FadeUp } from "@/components/animations/FadeUp";
import { SITE } from "@/constants/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for booking and visiting ${SITE.name} Salon in Mumbai, India.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content">
        <PageHero
          eyebrow="Legal"
          title="Terms & Conditions"
          description="Please review these terms before booking or visiting Lumina Salon."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Terms & Conditions" },
          ]}
        />

        <section className="section-padding mx-auto max-w-3xl space-y-8 pb-24 text-muted-foreground leading-relaxed md:pb-32">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl text-white">
              Appointments
            </h2>
            <p className="mt-3">
              Booking requests submitted through our website are confirmed by our
              concierge. A confirmed appointment reserves your stylist’s time.
              Please arrive on time; late arrivals may shorten or forfeit the
              service at our discretion.
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl text-white">
              Cancellations
            </h2>
            <p className="mt-3">
              Cancel or reschedule at least 24 hours in advance. Late
              cancellations or no-shows may incur a fee of up to 50% of the
              reserved service value.
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl text-white">
              Pricing & payments
            </h2>
            <p className="mt-3">
              Prices listed online are starting guides and may vary based on
              length, density, and complexity. Final pricing is confirmed during
              consultation. Payment is due at the time of service unless
              otherwise arranged.
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl text-white">
              Health & safety
            </h2>
            <p className="mt-3">
              Please disclose allergies, scalp conditions, or recent chemical
              services before treatment. Lumina reserves the right to decline
              services that may compromise hair or scalp health.
            </p>
          </FadeUp>
          <FadeUp>
            <p>
              For questions about these terms,{" "}
              <Link href="/contact" className="text-primary">
                contact us
              </Link>{" "}
              or email {SITE.email}.
            </p>
          </FadeUp>
        </section>
    </main>
  );
}
