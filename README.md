# 🏆 Coriyon’s Studio

Welcome to **Coriyon’s Studio** — A dynamic, bilingual (i18n) digital product design studio website powered by Next.js 15, Chakra UI v3, and Supabase.

This project serves as the primary marketing and portfolio platform for Coriyon's Studio, featuring:
* 🎨 **Digital Product Design Portfolio** — Dynamic case studies and service offerings powered by a headless Supabase CMS.
* ⚡️ **AI Integrations** — Native interactive Gemini AI chat widgets for automated prospect onboarding.
* 🌍 **Bilingual Architecture** — Fully server-rendered routing and content delivery in both English and Spanish.

---

## 🧭 Project Structure Overview

| Folder / File        | Purpose                                                            |
|----------------------|--------------------------------------------------------------------|
| `src/app/`           | Next.js App directory (React Server Components, Layouts, & i18n)   |
| `src/components/`    | Reusable Chakra v3 UI components and dynamic layout blocks         |
| `src/hooks/`         | Custom React hooks (e.g., global UI sounds, scroll tracking)       |
| `src/lib/`           | Core utilities, Supabase clients, and data fetching logic          |
| `public/`            | Static assets (images, global CSS, SVGs, Lottie files, sounds)     |
| `docs/`              | In-depth guides, developer reference, and architecture docs        |
| `.env.local`         | Local environment variables (Supabase keys)                        |
| `README.md`          | This file                                                          |

---

## 🛠 Tech Stack

| Tool                 | Category      | Description                                             |
|----------------------|---------------|---------------------------------------------------------|
| ⚡️ Next.js 15         | Frontend      | React Server Components & SSR-first architecture        |
| 🪄 Chakra UI v3       | UI Library    | Snippet-based component primitives with theming support |
| 🗄️ Supabase          | Backend       | PostgreSQL database and Storage for CMS functionality   |
| ✨ Framer Motion      | Animations    | Declarative animations and complex scroll transitions   |
| 🧠 Google Gemini      | AI            | Native API integration for intelligent chat interfaces  |
| 🚀 Vercel            | Deployment    | Hosting, Analytics, and Speed Insights                  |
| 🛡️ TypeScript        | Tooling       | Strict static type checking                             |

---

## 📦 Install & Start

This project uses `pnpm` as its primary package manager. 

```bash
# 1. Clone the repository
git clone git@github.com:CoriyonArrington/coriyon-studio.git
cd coriyon-studio

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
# Create a .env.local file with your Supabase URL and anon key.
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# 4. Launch development server
pnpm dev