import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { FadeUp } from "@/components/animations/FadeUp";
import { SITE } from "@/constants/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name} Salon — how we collect, use, and protect your information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main-content">
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description="Last updated July 22, 2026. We respect your privacy and handle personal data with care."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
        />

        <section className="section-padding mx-auto max-w-3xl space-y-8 pb-24 text-muted-foreground leading-relaxed md:pb-32">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl text-white">
              Information we collect
            </h2>
            <p className="mt-3">
              When you book an appointment, contact us, or subscribe to our
              newsletter, we collect details you provide such as name, email,
              phone number, preferred services, and message content.
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl text-white">
              How we use information
            </h2>
            <p className="mt-3">
              We use your information to confirm appointments, respond to
              inquiries, improve our services, and — with your consent — send
              occasional updates about Lumina. We do not sell your personal data.
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl text-white">
              Data retention & security
            </h2>
            <p className="mt-3">
              Booking and contact records are retained as needed for operations
              and legal requirements. We apply reasonable administrative and
              technical safeguards to protect your information.
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl text-white">
              Your choices
            </h2>
            <p className="mt-3">
              You may request access, correction, or deletion of your personal
              information by emailing{" "}
              <a href={`mailto:${SITE.email}`} className="text-primary">
                {SITE.email}
              </a>
              . Newsletter subscribers can unsubscribe at any time.
            </p>
          </FadeUp>
          <FadeUp>
            <p>
              Questions? Visit our{" "}
              <Link href="/contact" className="text-primary">
                contact page
              </Link>{" "}
              or call {SITE.phone}.
            </p>
          </FadeUp>
        </section>
    </main>
  );
}
