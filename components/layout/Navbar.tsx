"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/constants/data";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(pathname !== "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setRevealed(true);
      return;
    }
    const onLoaded = () => setRevealed(true);
    window.addEventListener("lumina:loaded", onLoaded);
    // Fallback if loader already finished
    const t = window.setTimeout(() => setRevealed(true), 3200);
    return () => {
      window.removeEventListener("lumina:loaded", onLoaded);
      window.clearTimeout(t);
    };
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <motion.header
        initial={pathname === "/" ? { y: -28, opacity: 0 } : false}
        animate={
          revealed
            ? { y: 0, opacity: 1 }
            : { y: -28, opacity: 0 }
        }
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "site-nav fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "glass-strong scrolled py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
            : "bg-transparent py-5"
        )}
      >
        <div className="section-padding flex items-center justify-between">
          <Link
            href="/"
            className="nav-brand font-[family-name:var(--font-space-grotesk)] text-xl font-medium tracking-[0.25em] text-white"
            data-cursor="link"
            aria-label={`${SITE.name} home`}
          >
            {SITE.name}
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link-hover nav-link-item relative px-3 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-white/65 hover:text-white"
                )}
                data-cursor="explore"
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <MagneticButton
              asChild
              cursor="book"
              className="hidden animate-float animate-pulse-glow rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-background md:inline-flex [animation-duration:5s]"
            >
              <Link href="/book">Book Appointment</Link>
            </MagneticButton>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 xl:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              data-cursor="magnetic"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-[#090909]/98 backdrop-blur-xl xl:hidden"
          >
            <div className="section-padding flex h-full flex-col pt-24">
              <nav
                className="flex flex-1 flex-col justify-center gap-4"
                aria-label="Mobile"
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.45 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "font-[family-name:var(--font-space-grotesk)] text-3xl font-medium tracking-tight sm:text-4xl",
                        isActive(link.href) ? "text-primary" : "text-white"
                      )}
                      data-cursor="explore"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="mb-10 flex w-full items-center justify-center rounded-full bg-primary px-5 py-4 text-center text-sm uppercase tracking-[0.2em] text-background"
                data-cursor="book"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
