"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { MagneticButton } from "@/components/animations/MagneticButton";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-primary/50";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
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
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center rounded-2xl border border-primary/30 bg-primary/10 px-6 py-14 text-center"
          role="status"
        >
          <CheckCircle2 className="h-12 w-12 text-primary" />
          <h3 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-2xl text-primary">
            Message sent
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We’ll reply within one business day.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-xs uppercase tracking-[0.2em] text-primary"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-5"
          noValidate
        >
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Name
            </label>
            <input {...register("name")} className={inputClass} placeholder="Your name" />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className={inputClass}
                placeholder="you@email.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Phone (optional)
              </label>
              <input
                {...register("phone")}
                type="tel"
                className={inputClass}
                placeholder="+1 (212) 555-0100"
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Subject
            </label>
            <input
              {...register("subject")}
              className={inputClass}
              placeholder="How can we help?"
            />
            {errors.subject && (
              <p className="mt-1.5 text-xs text-red-400">{errors.subject.message}</p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Message
            </label>
            <textarea
              {...register("message")}
              rows={5}
              className={inputClass}
              placeholder="Tell us a little more…"
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
            )}
          </div>
          {status === "error" && (
            <p className="text-sm text-red-400" role="alert">
              Unable to send. Please try again or email us directly.
            </p>
          )}
          <MagneticButton
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm uppercase tracking-[0.25em] text-background disabled:opacity-70"
            data-cursor="magnetic"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Send Message"
            )}
          </MagneticButton>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
