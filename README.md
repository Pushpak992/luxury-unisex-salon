# LUMINA — Luxury Unisex Hair Salon

Production-ready multi-page salon website built with Next.js 15, TypeScript, Tailwind CSS, GSAP, Framer Motion, Lenis, React Hook Form, and Zod.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About |
| `/services` | Services index |
| `/services/[slug]` | Service detail (8 services) |
| `/gallery` | Filtered gallery + lightbox |
| `/pricing` | Packages + comparison |
| `/team` | Stylists |
| `/testimonials` | Client reviews |
| `/faq` | Searchable FAQ |
| `/contact` | Contact form + map |
| `/book` | Booking form |
| `/privacy` | Privacy Policy |
| `/terms` | Terms & Conditions |

## API Routes

- `POST /api/booking` — validated booking payload
- `POST /api/contact` — validated contact payload
- `POST /api/newsletter` — newsletter signup

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm start` — start production server
- `npm run lint` — ESLint

Last updated: 2026-07-22
