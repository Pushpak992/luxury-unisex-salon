"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";
import { TEAM } from "@/constants/data";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { MagneticButton } from "@/components/animations/MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TeamProps {
  showBook?: boolean;
}

export function Team({ showBook = true }: TeamProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll("[data-team-card]") || [],
        { y: 80, opacity: 0, filter: "blur(8px)", scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="team" className="relative py-24 md:py-32">
      <div className="section-padding">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The Atelier"
            title="Artists behind the light"
            description="A collective of masters who treat every client as a collaboration."
          />
          <Link
            href="/team"
            className="mb-14 text-xs uppercase tracking-[0.25em] text-primary md:mb-20"
            data-cursor="link"
          >
            Meet the team →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <article
              key={member.id}
              data-team-card
              data-cursor="meet"
              className="group premium-card relative overflow-hidden rounded-2xl border border-white/10 bg-card"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mb-4 flex gap-2">
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-bounce flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md hover:border-primary hover:text-primary"
                      aria-label={`${member.name} on Instagram`}
                      data-cursor="link"
                    >
                      <FaInstagram className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-bounce flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md hover:border-primary hover:text-primary"
                      aria-label={`${member.name} on Facebook`}
                      data-cursor="link"
                    >
                      <FaFacebookF className="h-4 w-4" />
                    </a>
                  </div>
                  {showBook && (
                    <MagneticButton
                      asChild
                      cursor="book"
                      className="w-full rounded-full bg-primary px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-background"
                    >
                      <Link
                        href={`/book?stylist=${encodeURIComponent(member.name)}`}
                      >
                        Book Now
                      </Link>
                    </MagneticButton>
                  )}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-primary">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {member.experience} · {member.specialization}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
