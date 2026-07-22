"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, ArrowRight, Loader2 } from "lucide-react";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { SITE, FOOTER_LINKS } from "@/constants/data";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations";
import { FadeUp } from "@/components/animations/FadeUp";

export function Footer() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="theme-dark relative overflow-hidden border-t border-white/5 bg-[#070707]">
      <div className="section-hairline absolute inset-x-0 top-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,155,94,0.08),_transparent_55%)]" />

      <div className="section-padding relative z-10 py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <FadeUp className="lg:col-span-4">
            <Link
              href="/"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl tracking-[0.2em]"
              data-cursor="link"
            >
              {SITE.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-primary/80">
              {SITE.provenance} · {SITE.craftLine}
            </p>
            <div className="mt-8 flex gap-3">
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 social-bounce hover:border-primary hover:text-primary"
                  data-cursor="link"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-2">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
              Explore
            </p>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                    data-cursor="link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.15} className="lg:col-span-3">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
              Contact
            </p>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={SITE.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                  data-cursor="link"
                >
                  {SITE.address}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={SITE.phoneHref}
                  className="hover:text-white"
                  data-cursor="link"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-white"
                  data-cursor="link"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">{SITE.hours}</p>
          </FadeUp>

          <FadeUp delay={0.2} className="lg:col-span-3">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
              Newsletter
            </p>
            <p className="mb-4 text-sm text-white/60">
              Rituals, seasonal looks, and private invitations.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="relative" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                {...register("email")}
                placeholder="Your email"
                className="input-glow w-full rounded-full border border-white/10 bg-white/5 py-3.5 pl-5 pr-14 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-primary/50"
                aria-invalid={!!errors.email}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-background transition-transform hover:scale-105 disabled:opacity-70"
                aria-label="Subscribe to newsletter"
                data-cursor="magnetic"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>
            {errors.email && (
              <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>
            )}
            {status === "success" && (
              <p className="mt-3 text-xs text-primary" role="status">
                Welcome to the Lumina circle.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-xs text-red-400" role="alert">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Lumina Salon location map"
                src={SITE.mapEmbed}
                className="h-36 w-full grayscale invert opacity-70"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Lumina Salon. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white" data-cursor="link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white" data-cursor="link">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
