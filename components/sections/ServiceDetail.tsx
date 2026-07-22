"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/layout/PageHero";
import { FadeUp } from "@/components/animations/FadeUp";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { getServiceBySlug, type ServiceSlug } from "@/constants/data";

export function ServiceDetail({ slug }: { slug: ServiceSlug }) {
  const service = getServiceBySlug(slug);
  if (!service) return null;

  return (
    <>
      <PageHero
        eyebrow={service.duration}
        title={service.title}
        description={service.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <section className="section-padding py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              {service.price}
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl">
              The experience
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {service.longDescription}
            </p>
            <MagneticButton
              asChild
              cursor="book"
              className="mt-8 rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-background"
            >
              <Link href={`/book?service=${encodeURIComponent(service.title)}`}>
                Book {service.title}
              </Link>
            </MagneticButton>
          </FadeUp>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0c0c0c] py-20 md:py-28">
        <div className="section-padding">
          <FadeUp>
            <h2 className="mb-10 font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl">
              Benefits
            </h2>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit, i) => (
              <FadeUp key={benefit} delay={i * 0.05}>
                <div className="glass rounded-2xl p-6">
                  <p className="text-sm leading-relaxed text-white/80">{benefit}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding py-20 md:py-28">
        <FadeUp>
          <h2 className="mb-12 font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl">
            The process
          </h2>
        </FadeUp>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <FadeUp key={step.step} delay={i * 0.08}>
              <div className="border-t border-primary/40 pt-6">
                <p className="text-xs tracking-[0.3em] text-primary">{step.step}</p>
                <h3 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{step.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0c0c0c] py-20 md:py-28">
        <div className="section-padding">
          <FadeUp>
            <h2 className="mb-10 font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl">
              Pricing
            </h2>
          </FadeUp>
          <div className="grid gap-4 md:grid-cols-3">
            {service.pricingOptions.map((opt, i) => (
              <FadeUp key={opt.name} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-primary/30">
                  <p className="font-[family-name:var(--font-space-grotesk)] text-xl">
                    {opt.name}
                  </p>
                  <p className="mt-2 text-2xl text-primary">{opt.price}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{opt.note}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding py-20 md:py-28">
        <FadeUp>
          <h2 className="mb-10 font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl">
            Gallery
          </h2>
        </FadeUp>
        <div className="grid gap-4 sm:grid-cols-3">
          {service.gallery.map((src, i) => (
            <FadeUp key={src} delay={i * 0.06}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={src}
                  alt={`${service.title} gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 py-20 md:py-28">
        <div className="section-padding mx-auto max-w-3xl">
          <FadeUp>
            <h2 className="mb-8 text-center font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl">
              FAQs
            </h2>
          </FadeUp>
          <Accordion type="single" collapsible>
            {service.faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-padding pb-24 md:pb-32">
        <FadeUp>
          <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 to-transparent px-8 py-16 text-center md:px-16">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl">
              Ready for {service.title}?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Reserve your chair and let our artists craft your next look.
            </p>
            <MagneticButton
              asChild
              cursor="book"
              className="mt-8 rounded-full bg-primary px-10 py-4 text-xs uppercase tracking-[0.25em] text-background"
            >
              <Link href={`/book?service=${encodeURIComponent(service.title)}`}>
                Book Now
              </Link>
            </MagneticButton>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
