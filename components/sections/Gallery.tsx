"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  GALLERY,
  GALLERY_CATEGORIES,
  type GalleryCategory,
} from "@/constants/data";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { Marquee } from "@/components/animations/Marquee";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface GalleryProps {
  preview?: boolean;
  showFilters?: boolean;
}

export function Gallery({ preview = false, showFilters = !preview }: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [category, setCategory] = useState<GalleryCategory>("all");

  const items = useMemo(() => {
    const filtered =
      category === "all"
        ? [...GALLERY]
        : GALLERY.filter((g) => g.category === category);
    return preview ? filtered.slice(0, 8) : filtered;
  }, [category, preview]);

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll("[data-gallery-item]") || [],
        { y: 48, opacity: 0, scale: 0.94, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector("[data-masonry]"),
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [items] }
  );

  return (
    <section ref={sectionRef} id="gallery" className="relative py-24 md:py-32">
      <div className="section-padding flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments in light"
          description="A living archive of cuts, color, and atmosphere from the Lumina atelier."
        />
        {preview && (
          <Link
            href="/gallery"
            className="mb-14 text-xs uppercase tracking-[0.25em] text-primary md:mb-20"
            data-cursor="link"
          >
            Open full gallery →
          </Link>
        )}
      </div>

      {preview && (
        <div className="mb-12 overflow-hidden border-y border-white/5 py-4">
          <Marquee speed={50} reverse>
            {GALLERY.map((item) => (
              <div
                key={`strip-${item.id}`}
                className="relative h-28 w-44 shrink-0 overflow-hidden rounded-lg md:h-36 md:w-56"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            ))}
          </Marquee>
        </div>
      )}

      {showFilters && (
        <div className="section-padding mb-10 flex flex-wrap gap-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-all",
                category === cat.id
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-white/10 text-white/60 hover:border-primary/40 hover:text-white"
              )}
              data-cursor="magnetic"
              aria-pressed={category === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="section-padding">
        <div data-masonry className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <button
              key={item.id}
              data-gallery-item
              type="button"
              onClick={() => setActive(i)}
              onMouseMove={(e) => {
                if (window.matchMedia("(pointer: coarse)").matches) return;
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                el.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(900px) rotateY(0deg) rotateX(0deg)";
              }}
              className={cn(
                "group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10 transition-transform duration-500 ease-out",
                item.span === "tall" && "min-h-[420px]",
                item.span === "wide" && "min-h-[280px]",
                item.span === "normal" && "min-h-[320px]"
              )}
              data-cursor="open"
              aria-label={`Open ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                className="img-tilt object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/35" />
              <div className="absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-xs uppercase tracking-[0.25em] text-white">
                  {item.alt}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && items[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
          >
            <button
              type="button"
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white"
              onClick={() => setActive(null)}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[active].src}
                alt={items[active].alt}
                fill
                className="object-cover"
                sizes="90vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
