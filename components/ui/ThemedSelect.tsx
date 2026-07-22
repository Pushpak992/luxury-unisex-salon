"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface ThemedSelectProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly SelectOption[] | SelectOption[];
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  icon?: "clock" | "chevron";
}

/** Dark + gold dropdown — portals above clipped parents. */
export function ThemedSelect({
  value,
  onChange,
  onBlur,
  options,
  name,
  id,
  className,
  placeholder = "Select",
  icon = "chevron",
}: ThemedSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 280, placeAbove: false });

  const selected = options.find((o) => o.value === value);

  useEffect(() => setMounted(true), []);

  const updatePosition = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const panelH = Math.min(256, options.length * 48 + 16);
    const gap = 8;
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeAbove = spaceBelow < panelH && rect.top > spaceBelow;
    const width = Math.max(rect.width, 220);
    let left = rect.left;
    if (left + width > window.innerWidth - 12) {
      left = window.innerWidth - width - 12;
    }
    left = Math.max(12, left);

    setPos({
      top: placeAbove ? rect.top - gap : rect.bottom + gap,
      left,
      width,
      placeAbove,
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const onScroll = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, options.length]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
      onBlur?.();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onBlur]);

  const pick = (next: string) => {
    onChange(next);
    setOpen(false);
    onBlur?.();
  };

  const panel = open && mounted && (
    <ul
      ref={panelRef}
      id={listId}
      role="listbox"
      aria-label={placeholder}
      data-lenis-prevent
      data-lenis-prevent-wheel
      onWheel={(e) => {
        // Keep wheel scrolling inside the list; don't let Lenis steal it
        e.stopPropagation();
      }}
      style={{
        position: "fixed",
        top: pos.placeAbove ? undefined : pos.top,
        bottom: pos.placeAbove ? window.innerHeight - pos.top : undefined,
        left: pos.left,
        width: pos.width,
        zIndex: 9998,
        overscrollBehavior: "contain",
      }}
      className="max-h-64 overflow-y-auto overscroll-contain rounded-2xl border border-primary/25 bg-[#12100e] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl [scrollbar-color:rgba(201,166,107,0.45)_transparent] [scrollbar-width:thin]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,_rgba(201,166,107,0.08),_transparent_55%)]" />
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <li key={opt.value} className="relative">
            <button
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => pick(opt.value)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors",
                active
                  ? "bg-primary/15 text-primary"
                  : "text-white/75 hover:bg-white/5 hover:text-primary"
              )}
            >
              <span>{opt.label}</span>
              {active && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <input type="hidden" name={name} value={value} readOnly />

      <button
        ref={buttonRef}
        type="button"
        id={id}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm outline-none transition-colors",
          "hover:border-primary/35 focus:border-primary/50",
          open && "border-primary/50"
        )}
      >
        <span className={cn("truncate", selected ? "text-foreground" : "text-white/30")}>
          {selected?.label ?? placeholder}
        </span>
        {icon === "clock" ? (
          <Clock className="h-4 w-4 shrink-0 text-primary" />
        ) : (
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-primary transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        )}
      </button>

      {mounted && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}
