<div align="center">

# 🎬 CultureJeevan

### India's Studio Rental Marketplace

*Discover, book, and create — all in one place.*

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

---

</div>

## ✨ What is CultureJeevan?

CultureJeevan is a **studio rental marketplace** — think of it as a discovery and instant-booking platform for professional creative spaces across India. Whether you're a photographer, filmmaker, podcaster, or dancer, we connect you with the perfect studio in your city in minutes.

> No calls. No waiting. Walk in and create.

---

## 🖼️ Pages & Sections

| Section | Description |
|---|---|
| **Navbar** | Sticky navigation with responsive mobile hamburger menu |
| **Hero** | Split layout — search form on the left, big cameraman visual on the right |
| **How It Works** | 4-step process cards — Search → Pick Slot → Book → Create |
| **Featured Studios** | Category filter pills + studio cards with price, rating & tags |
| **Footer** | Dark warm-toned footer with link columns and social icons |

---

## 🗂️ Project Structure

```
culture-jeevan/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Only 3 lines: Tailwind + shadcn imports
│   ├── layout.tsx           # Fonts (Playfair Display + DM Sans) & metadata
│   └── page.tsx             # Assembles all sections
│
├── components/
│   ├── ui/                  # shadcn primitives (button, badge, input, etc.)
│   └── sections/            # Page sections
│       ├── navbar.tsx
│       ├── hero.tsx
│       ├── how-it-works.tsx
│       ├── featured-studios.tsx
│       ├── studio-card.tsx
│       └── footer.tsx
│
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib/
│   └── utils.ts
│
└── public/
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#FAF7F2` | Page background, cards |
| Foreground | `#1C1410` | Primary text, headings |
| Primary | `#C4703A` | CTAs, accents, highlights |
| Primary Dark | `#A85C2E` | Hover states |
| Muted Text | `#6B5240` | Body copy, descriptions |
| Subtle | `#9B7B60` | Labels, secondary info |
| Border | `#E8DED0` | Card borders, dividers |
| Surface | `#F5EFE7` | Section backgrounds |
| Dark | `#1C1410` | Footer background |

**Fonts:**
- **Display** — `Playfair Display` (headings, logo, serif elegance)
- **Body** — `DM Sans` (UI text, clean and readable)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm / bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/culture-jeevan.git
cd culture-jeevan

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework with App Router |
| [React 19](https://react.dev) | UI library |
| [TypeScript 5](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility styling |
| [shadcn/ui](https://ui.shadcn.com) | Accessible UI primitives |
| [Radix UI](https://www.radix-ui.com) | Headless components |
| [Lucide React](https://lucide.dev) | Icon library |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme management |
| [Vercel Analytics](https://vercel.com/analytics) | Usage analytics |
| [Google Fonts](https://fonts.google.com) | Playfair Display + DM Sans |

---

## 📦 Key Dependencies

```json
{
  "next": "16.2.1",
  "react": "19.2.4",
  "tailwindcss": "^4",
  "shadcn": "^4.1.0",
  "next-themes": "^0.4.6",
  "@vercel/analytics": "^2.0.1",
  "lucide-react": "^1.6.0"
}
```

---

## 🌍 Deployment

This project is deployed on **Vercel** with a custom domain via GoDaddy.

**DNS Configuration:**
```
A     @     76.76.21.21                          ← Vercel root domain
CNAME www   <hash>.vercel-dns-017.com            ← Vercel www subdomain
```

To deploy your own instance:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo directly at [vercel.com/new](https://vercel.com/new).

---

## 🗺️ Roadmap

- [ ] `/studios` — Search & filter results page
- [ ] `/studios/[id]` — Studio detail + availability calendar
- [ ] Booking flow with Razorpay payment integration
- [ ] Studio owner dashboard — list & manage spaces
- [ ] User authentication (Clerk / NextAuth)
- [ ] Supabase backend — studios, bookings, users
- [ ] WhatsApp & email booking confirmations
- [ ] City-based landing pages (Delhi, Mumbai, Bangalore...)
- [ ] Reviews & ratings system
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repo
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary. All rights reserved © 2026 CultureJeevan.

---

<div align="center">

Made with ❤️ in India

**[culturejeevan.com](https://culturejeevan.co.in)** · [Report Bug](https://github.com/yourusername/culture-jeevan/issues) · [Request Feature](https://github.com/yourusername/culture-jeevan/issues)

</div>