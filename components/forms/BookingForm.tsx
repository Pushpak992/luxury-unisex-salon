"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { bookingSchema, type BookingFormValues } from "@/lib/validations";
import { SERVICES, TEAM, TIME_SLOTS } from "@/constants/data";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { DatePicker } from "@/components/ui/DatePicker";
import { ThemedSelect } from "@/components/ui/ThemedSelect";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-foreground outline-none transition-colors placeholder:text-white/30 focus:border-primary/50 [color-scheme:dark]";

const serviceOptions = SERVICES.map((s) => ({
  value: s.title,
  label: s.title,
}));

const stylistOptions = [
  { value: "No preference", label: "No preference" },
  ...TEAM.map((t) => ({
    value: t.name,
    label: `${t.name} — ${t.role}`,
  })),
];

const timeOptions = TIME_SLOTS.map((slot) => ({
  value: slot,
  label: slot,
}));


interface BookingFormProps {
  defaultService?: string;
  defaultStylist?: string;
  className?: string;
}

export function BookingForm({
  defaultService,
  defaultStylist,
  className,
}: BookingFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: (defaultService as BookingFormValues["service"]) || SERVICES[0].title,
      stylist:
        (defaultStylist as BookingFormValues["stylist"]) || "No preference",
      date: "",
      time: TIME_SLOTS[0],
      notes: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
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

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center rounded-2xl border border-primary/30 bg-primary/10 px-6 py-16 text-center"
            role="status"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            >
              <CheckCircle2 className="h-14 w-14 text-primary" />
            </motion.div>
            <h3 className="mt-6 font-[family-name:var(--font-space-grotesk)] text-3xl text-primary">
              Request received
            </h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              Our concierge will confirm your appointment within the hour during
              business hours.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 text-xs uppercase tracking-[0.25em] text-primary underline-offset-4 hover:underline"
            >
              Book another appointment
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-5 md:grid-cols-2"
            noValidate
          >
            <Field label="Full name" error={errors.name?.message}>
              <input
                {...register("name")}
                className={inputClass}
                placeholder="Alex Morgan"
                autoComplete="name"
              />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input
                {...register("phone")}
                type="tel"
                className={inputClass}
                placeholder="+1 (212) 555-0100"
                autoComplete="tel"
              />
            </Field>
            <Field label="Email" error={errors.email?.message} className="md:col-span-2">
              <input
                {...register("email")}
                type="email"
                className={inputClass}
                placeholder="alex@email.com"
                autoComplete="email"
              />
            </Field>
            <Field label="Service" error={errors.service?.message}>
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <ThemedSelect
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={serviceOptions}
                    name={field.name}
                    placeholder="Choose a service"
                  />
                )}
              />
            </Field>
            <Field label="Preferred stylist" error={errors.stylist?.message}>
              <Controller
                name="stylist"
                control={control}
                render={({ field }) => (
                  <ThemedSelect
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={stylistOptions}
                    name={field.name}
                    placeholder="Choose a stylist"
                  />
                )}
              />
            </Field>
            <Field label="Preferred date" error={errors.date?.message}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    min={minDate}
                    name={field.name}
                    placeholder="Choose your date"
                  />
                )}
              />
            </Field>
            <Field label="Preferred time" error={errors.time?.message}>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <ThemedSelect
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={timeOptions}
                    name={field.name}
                    placeholder="Choose a time"
                    icon="clock"
                  />
                )}
              />
            </Field>
            <Field
              label="Notes"
              error={errors.notes?.message}
              className="md:col-span-2"
            >
              <textarea
                {...register("notes")}
                rows={4}
                className={inputClass}
                placeholder="Anything we should know? Hair history, allergies, event date…"
              />
            </Field>

            {status === "error" && (
              <p className="md:col-span-2 text-sm text-red-400" role="alert">
                Unable to submit right now. Please try again or call us.
              </p>
            )}

            <div className="md:col-span-2">
              <MagneticButton
                type="submit"
                disabled={status === "loading"}
                cursor="book"
                strength={0}
                className="animate-pulse-glow flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-center text-sm uppercase tracking-[0.2em] text-background disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Confirm Booking Request"
                )}
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
