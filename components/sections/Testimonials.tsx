"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Play, Star } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TESTIMONIALS } from "@/constants/data";
import { SectionHeading } from "@/components/animations/SectionHeading";
import "swiper/css";
import "swiper/css/pagination";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

interface TestimonialsProps {
  showVideos?: boolean;
}

export function Testimonials({ showVideos = false }: TestimonialsProps) {
  return (
    <section id="testimonials" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,155,94,0.06),_transparent_55%)]" />

      <div className="section-padding relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Voices"
            title="Clients who felt the light"
            description="Words from those who trusted us with their most personal canvas."
            align="center"
          />
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="!pb-14"
        >
          {TESTIMONIALS.map((item) => (
            <SwiperSlide key={item.name} className="!h-auto">
              <TiltCard>
                <article className="glass flex h-full flex-col rounded-2xl p-8 transition-colors hover:border-primary/25">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    {showVideos && item.hasVideo && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                        <Play className="h-3 w-3" /> Video
                      </span>
                    )}
                  </div>
                  <blockquote className="flex-1 text-base leading-relaxed text-white/80 md:text-lg">
                    “{item.quote}”
                  </blockquote>
                  <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  {showVideos && item.hasVideo && (
                    <button
                      type="button"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] py-8 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      aria-label={`Play video testimonial from ${item.name}`}
                    >
                      <Play className="h-4 w-4" />
                      Video coming soon
                    </button>
                  )}
                </article>
              </TiltCard>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-4 text-center">
          <Link
            href="/testimonials"
            className="text-xs uppercase tracking-[0.25em] text-primary"
            data-cursor="link"
          >
            Read more stories →
          </Link>
        </div>
      </div>
    </section>
  );
}
