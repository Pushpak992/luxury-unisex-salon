"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Team } from "@/components/sections/Team";
import { Pricing } from "@/components/sections/Pricing";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { FAQSection } from "@/components/sections/FAQ";

const Testimonials = dynamic(
  () =>
    import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { ssr: false }
);

const Gallery = dynamic(
  () => import("@/components/sections/Gallery").then((m) => m.Gallery),
  { ssr: false }
);

export function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <BeforeAfter />
      <Team />
      <Testimonials />
      <Gallery preview />
      <Pricing />
      <BookingCTA />
      <FAQSection preview />
    </main>
  );
}
