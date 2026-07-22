"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/constants/data";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { Search } from "lucide-react";

interface FAQSectionProps {
  preview?: boolean;
  showSearch?: boolean;
}

export function FAQSection({
  preview = false,
  showSearch = !preview,
}: FAQSectionProps) {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const list = preview ? FAQ.slice(0, 5) : FAQ;
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, preview]);

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="section-padding">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers, refined"
            description="Everything you need to know before your first visit."
            align="center"
          />

          {showSearch && (
            <FadeUp className="relative mb-8">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <label htmlFor="faq-search" className="sr-only">
                Search FAQs
              </label>
              <input
                id="faq-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions…"
                className="w-full rounded-full border border-white/10 bg-white/5 py-3.5 pl-11 pr-5 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-primary/50"
              />
            </FadeUp>
          )}

          <FadeUp>
            {items.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">
                No matching questions. Try another search or{" "}
                <Link href="/contact" className="text-primary">
                  contact us
                </Link>
                .
              </p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {items.map((item, i) => (
                  <AccordionItem key={item.question} value={`item-${i}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </FadeUp>

          {preview && (
            <div className="mt-10 text-center">
              <Link
                href="/faq"
                className="text-xs uppercase tracking-[0.25em] text-primary"
                data-cursor="link"
              >
                View all FAQs →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
