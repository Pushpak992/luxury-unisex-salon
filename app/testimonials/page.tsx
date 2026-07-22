import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Testimonials",
  description:
    "Read client stories and star ratings from Lumina’s Mumbai salon guests.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <main id="main-content">
        <PageHero
          eyebrow="Voices"
          title="Clients who felt the light"
          description="Honest words from editors, founders, and lifelong clients."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Testimonials" },
          ]}
        />
        <div className="-mt-10 md:-mt-16">
          <Testimonials showVideos />
        </div>
    </main>
  );
}
