import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FAQSection } from "@/components/sections/FAQ";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about booking, products, services, and visiting Lumina salon.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <main id="main-content">
        <PageHero
          eyebrow="FAQ"
          title="Answers, refined"
          description="Search our most common questions — or reach out if you need something specific."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
        />
        <div className="-mt-10 md:-mt-16">
          <FAQSection showSearch />
        </div>
    </main>
  );
}
