import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Pricing } from "@/components/sections/Pricing";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description:
    "Lumina salon packages — Standard, Premium, and Luxury — with transparent comparison.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main id="main-content">
        <PageHero
          eyebrow="Investment"
          title="Packages of quiet luxury"
          description="Choose Standard, Premium, or Luxury — then book the ritual that fits."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Pricing" },
          ]}
        />
        <div className="-mt-10 md:-mt-16">
          <Pricing showComparison />
        </div>
    </main>
  );
}
