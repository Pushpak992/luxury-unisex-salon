import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Gallery } from "@/components/sections/Gallery";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description:
    "Browse Lumina’s gallery of haircuts, color, spa, bridal, and treatment work from our Mumbai atelier.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <main id="main-content">
        <PageHero
          eyebrow="Gallery"
          title="Moments in light"
          description="Filter by category and explore transformations from the Lumina floor."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Gallery" },
          ]}
        />
        <div className="-mt-10 md:-mt-16">
          <Gallery showFilters />
        </div>
    </main>
  );
}
