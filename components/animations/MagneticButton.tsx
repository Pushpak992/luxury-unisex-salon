"use client";

import { useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useSoundContext } from "@/components/providers/SoundProvider";

gsap.registerPlugin(useGSAP);

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  asChild?: boolean;
  cursor?: string;
  ripple?: boolean;
}

export function MagneticButton({
  children,
  strength = 0.35,
  className,
  asChild = false,
  cursor = "magnetic",
  ripple = true,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const sound = useSoundContext();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(pointer: coarse)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        xTo(x * strength);
        yTo(y * strength);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref }
  );

  const spawnRipple = (e: React.MouseEvent) => {
    if (!ripple) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const rippleEl = document.createElement("span");
    rippleEl.className = "lumina-ripple";
    rippleEl.style.width = `${size}px`;
    rippleEl.style.height = `${size}px`;
    rippleEl.style.left = `${e.clientX - rect.left - size / 2}px`;
    rippleEl.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(rippleEl);
    gsap.fromTo(
      rippleEl,
      { scale: 0, opacity: 0.45 },
      {
        scale: 1,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        onComplete: () => rippleEl.remove(),
      }
    );
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={cn(
        "relative inline-flex items-center justify-center text-center overflow-hidden will-change-transform",
        className
      )}
      data-cursor={cursor}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        spawnRipple(e);
        sound?.play("click");
        onClick?.(e as React.MouseEvent<HTMLButtonElement>);
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}
