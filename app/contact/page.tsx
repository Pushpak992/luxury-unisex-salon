import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeUp } from "@/components/animations/FadeUp";
import { SITE } from "@/constants/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Contact Lumina salon in Mumbai — ${SITE.phone}, ${SITE.email}, ${SITE.address}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content">
        <PageHero
          eyebrow="Contact"
          title="We’re here"
          description="Reach the Lumina concierge for appointments, collaborations, and bridal inquiries."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />

        <section className="section-padding pb-24 md:pb-32">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeUp>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-primary">
                      Address
                    </p>
                    <a
                      href={SITE.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-white/80 hover:text-white"
                      data-cursor="link"
                    >
                      {SITE.address}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-primary">
                      Phone
                    </p>
                    <a
                      href={SITE.phoneHref}
                      className="mt-2 block text-white/80 hover:text-white"
                      data-cursor="link"
                    >
                      {SITE.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-primary">
                      Email
                    </p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-2 block text-white/80 hover:text-white"
                      data-cursor="link"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-primary">
                      Opening Hours
                    </p>
                    <ul className="mt-2 space-y-1 text-white/80">
                      {SITE.hoursDetailed.map((row) => (
                        <li key={row.day} className="flex justify-between gap-6 text-sm">
                          <span>{row.day}</span>
                          <span className="text-muted-foreground">{row.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {[
                    { Icon: FaInstagram, href: SITE.social.instagram, label: "Instagram" },
                    { Icon: FaFacebookF, href: SITE.social.facebook, label: "Facebook" },
                    { Icon: FaXTwitter, href: SITE.social.twitter, label: "X" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all hover:border-primary hover:text-primary"
                      aria-label={label}
                      data-cursor="link"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <iframe
                    title="Lumina Salon Google Map"
                    src={SITE.mapEmbed}
                    className="h-64 w-full grayscale invert opacity-80"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-card/80 p-6 backdrop-blur-xl md:p-8">
                <h2 className="mb-6 font-[family-name:var(--font-space-grotesk)] text-2xl">
                  Send a message
                </h2>
                <ContactForm />
              </div>
            </FadeUp>
          </div>
        </section>
    </main>
  );
}
