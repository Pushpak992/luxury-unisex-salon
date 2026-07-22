import Link from "next/link";
import { MagneticButton } from "@/components/animations/MagneticButton";

export default function NotFound() {
  return (
      <main id="main-content" className="relative flex min-h-[80svh] flex-col items-center justify-center px-6 py-32 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,155,94,0.12),_transparent_55%)]" />
        <p className="relative text-xs uppercase tracking-[0.4em] text-primary">
          404
        </p>
        <h1 className="relative mt-4 font-[family-name:var(--font-space-grotesk)] text-5xl md:text-7xl">
          Page not found
        </h1>
        <p className="relative mt-5 max-w-md text-muted-foreground">
          The page you’re looking for has moved or never existed. Let’s get you
          back to the light.
        </p>
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton asChild>
            <Link
              href="/"
              className="rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-background"
            >
              Back Home
            </Link>
          </MagneticButton>
          <MagneticButton asChild>
            <Link
              href="/book"
              className="rounded-full border border-white/20 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white"
            >
              Book Appointment
            </Link>
          </MagneticButton>
        </div>
      </main>
  );
}
