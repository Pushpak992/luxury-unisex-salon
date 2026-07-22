"use client";

import Link from "next/link";
import { BookingForm } from "@/components/forms/BookingForm";
import { SectionReveal } from "@/components/animations/SectionReveal";

export function BookingCTA() {
  return (
    <section
      id="booking"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,155,94,0.12),_transparent_60%)]" />
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      <div className="section-padding relative z-10">
        <SectionReveal variant="fade">
          <div className="mx-auto max-w-4xl overflow-visible rounded-3xl border border-primary/20 bg-[#0c0c0c]/80 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-12">
            <div className="mb-10 text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">
                Reserve Your Chair
              </p>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl">
                Begin your ritual
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Share a few details and our concierge will confirm your
                appointment. Prefer a dedicated page?{" "}
                <Link
                  href="/book"
                  className="text-primary underline-offset-4 hover:underline"
                  data-cursor="book"
                >
                  Open full booking
                </Link>
                .
              </p>
            </div>
            <BookingForm />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
