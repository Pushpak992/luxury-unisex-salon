import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { SITE } from "@/constants/data";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Luxury Unisex Hair Salon`,
    template: `%s | ${SITE.name} Salon`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  keywords: [
    "luxury hair salon",
    "unisex salon Mumbai",
    "hair color India",
    "bridal hair",
    "keratin treatment",
    "Lumina salon",
  ],
  authors: [{ name: "Lumina Salon" }],
  openGraph: {
    title: `${SITE.name} — Luxury Unisex Hair Salon`,
    description: SITE.description,
    type: "website",
    locale: "en_US",
    siteName: `${SITE.name} Salon`,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Luxury Unisex Hair Salon`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} bg-background text-foreground antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
