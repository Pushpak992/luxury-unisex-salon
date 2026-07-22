import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BookingForm } from "@/components/forms/BookingForm";
import { FadeUp } from "@/components/animations/FadeUp";
import { SERVICES, TEAM } from "@/constants/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Book Appointment",
  description:
    "Book your Lumina salon appointment — choose a service, stylist, date, and time.",
  path: "/book",
});

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; stylist?: string; package?: string }>;
}) {
  const params = await searchParams;

  const matchedService = SERVICES.find(
    (s) =>
      s.title.toLowerCase() === (params.service || "").toLowerCase()
  );

  const matchedStylist = TEAM.find(
    (t) => t.name.toLowerCase() === (params.stylist || "").toLowerCase()
  );

  return (
      <main id="main-content">
        <PageHero
          eyebrow="Reservations"
          title="Book your appointment"
          description="Complete the form below. Our concierge confirms within the hour during business hours."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Book Appointment" },
          ]}
        />

        <section className="section-padding pb-24 md:pb-32">
          <FadeUp>
            <div className="mx-auto max-w-3xl rounded-3xl border border-primary/20 bg-[#0c0c0c]/80 p-6 backdrop-blur-xl md:p-10">
              {(matchedService || matchedStylist || params.package) && (
                <p className="mb-6 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
                  {matchedService && <>Service: {matchedService.title}. </>}
                  {matchedStylist && <>Stylist: {matchedStylist.name}. </>}
                  {params.package && <>Package interest: {params.package}. </>}
                </p>
              )}
              <BookingForm
                defaultService={matchedService?.title}
                defaultStylist={matchedStylist?.name}
              />
            </div>
          </FadeUp>
        </section>
      </main>
  );
}
