import { z } from "zod";
import { SERVICES, TEAM, TIME_SLOTS } from "@/constants/data";

const serviceTitles = SERVICES.map((s) => s.title) as [string, ...string[]];
const stylistNames = [
  "No preference",
  ...TEAM.map((t) => t.name),
] as [string, ...string[]];
const timeSlots = [...TIME_SLOTS] as [string, ...string[]];

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[\d\s+\-().]+$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  service: z.enum(serviceTitles),
  stylist: z.enum(stylistNames),
  date: z.string().min(1, "Select a preferred date"),
  time: z.enum(timeSlots),
  notes: z.string().max(500, "Notes must be under 500 characters").optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .refine(
      (val) => val === "" || (val.length >= 10 && /^[\d\s+\-().]+$/.test(val)),
      "Enter a valid phone number"
    )
    .optional(),
  subject: z.string().min(3, "Please enter a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
