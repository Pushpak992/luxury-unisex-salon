"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseISODate(value: string) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return startOfDay(new Date(y, m - 1, d));
}

function formatDisplay(value: string) {
  const d = parseISODate(value);
  if (!d) return "";
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  min?: string;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
}

/** Luxury dark/gold calendar — portals above clipped parents. */
export function DatePicker({
  value,
  onChange,
  onBlur,
  min,
  name,
  id,
  className,
  placeholder = "Select a date",
}: DatePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 320, placeAbove: false });

  const selected = parseISODate(value);
  const minDate = parseISODate(min || "") || startOfDay(new Date());

  const [view, setView] = useState(() => {
    const base = selected || minDate;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  useEffect(() => setMounted(true), []);

  const updatePosition = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const panelH = 360;
    const gap = 8;
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeAbove = spaceBelow < panelH && rect.top > spaceBelow;
    const width = Math.min(320, Math.max(rect.width, 280));
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
  }, [open]);

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

  useEffect(() => {
    if (selected) {
      setView(new Date(selected.getFullYear(), selected.getMonth(), 1));
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const days = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstDow = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [view]);

  const monthLabel = view.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const canPrev =
    new Date(view.getFullYear(), view.getMonth(), 1) >
    new Date(minDate.getFullYear(), minDate.getMonth(), 1);

  const pick = (d: Date) => {
    if (startOfDay(d) < minDate) return;
    onChange(toISODate(d));
    setOpen(false);
    onBlur?.();
  };

  const panel = open && mounted && (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Choose date"
      data-lenis-prevent
      data-lenis-prevent-wheel
      onWheel={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        top: pos.placeAbove ? undefined : pos.top,
        bottom: pos.placeAbove ? window.innerHeight - pos.top : undefined,
        left: pos.left,
        width: pos.width,
        zIndex: 9998,
        overscrollBehavior: "contain",
      }}
      className="overflow-hidden rounded-2xl border border-primary/25 bg-[#12100e] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,166,107,0.1),_transparent_55%)]" />

      <div className="relative mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() =>
            setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
          }
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-[family-name:var(--font-space-grotesk)] text-sm tracking-wide text-[#F7F3EC]">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() =>
            setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
          }
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="relative mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <span
            key={d}
            className="py-1 text-center text-[10px] uppercase tracking-[0.15em] text-primary/70"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="relative grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          if (!d) {
            return <span key={`e-${i}`} className="h-9" />;
          }
          const iso = toISODate(d);
          const disabled = startOfDay(d) < minDate;
          const isSelected = value === iso;
          const isToday = toISODate(startOfDay(new Date())) === iso;

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => pick(d)}
              className={cn(
                "flex h-9 items-center justify-center rounded-lg text-sm transition-all",
                disabled && "cursor-not-allowed text-white/20",
                !disabled &&
                  !isSelected &&
                  "text-white/75 hover:bg-primary/15 hover:text-primary",
                isSelected &&
                  "bg-primary font-medium text-background shadow-[0_0_20px_rgba(201,166,107,0.35)]",
                isToday &&
                  !isSelected &&
                  !disabled &&
                  "border border-primary/40 text-primary"
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={() => {
            const today = startOfDay(new Date());
            const pickDate = today < minDate ? minDate : today;
            pick(pickDate);
          }}
          className="text-[10px] uppercase tracking-[0.2em] text-primary transition-colors hover:text-primary-light"
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => {
            onChange("");
            setOpen(false);
            onBlur?.();
          }}
          className="text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/70"
        >
          Clear
        </button>
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <input type="hidden" name={name} value={value} readOnly />

      <button
        ref={buttonRef}
        type="button"
        id={id}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm outline-none transition-colors",
          "hover:border-primary/35 focus:border-primary/50",
          open && "border-primary/50"
        )}
      >
        <span className={cn(value ? "text-foreground" : "text-white/30")}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
      </button>

      {mounted && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}
