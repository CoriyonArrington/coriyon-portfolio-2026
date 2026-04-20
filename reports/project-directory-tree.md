# Project Directory Structure

```
.//
├── .DS_Store
├── .env
├── .env.local
├── .flox/
│   ├── .gitattributes
│   ├── .gitignore
│   ├── cache/
│   │   ├── .zcompdump
│   │   ├── upgrade-checks.json
│   │   └── upgrade-checks.lock
│   ├── env/
│   │   ├── manifest.lock
│   │   └── manifest.toml
│   ├── env.json
│   ├── log/
│   └── run/
│       ├── aarch64-darwin.coriyon-studio.dev -> /nix/store/vrcdhp0xqqb6w6gv29w2fzasdsxqci17-environment-develop/
│       └── aarch64-darwin.coriyon-studio.run -> /nix/store/kqlj6hnsrrcpx648cyh4m6k66sp5r68y-environment-runtime/
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public/
│   ├── .DS_Store
│   ├── Coriyon-Studio-Design-Process.pdf
│   └── sounds/
│       ├── click.mp3
│       ├── hover.mp3
│       ├── soundtoggle.mp3
│       ├── success.mp3
│       ├── switch.mp3
│       └── whoosh.mp3
├── reports/
│   └── project-directory-tree.md
├── scripts/
│   ├── generate-database-schema.sh*
│   ├── generate-directory-structure.sh*
│   ├── update-supabase-types.sh*
│   └── verify-schema-types.sh*
├── src/
│   ├── .DS_Store
│   ├── app/
│   │   ├── .DS_Store
│   │   ├── [locale]/
│   │   │   ├── (explore)/
│   │   │   ├── (legal)/
│   │   │   ├── (main)/
│   │   │   ├── .DS_Store
│   │   │   ├── layout.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── page.tsx
│   │   ├── actions/
│   │   │   └── unlock-project.ts
│   │   ├── favicon.ico
│   │   ├── fonts.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── opengraph-image.png
│   │   ├── robots.txt
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── .DS_Store
│   │   ├── blocks/
│   │   │   ├── .DS_Store
│   │   │   ├── about/
│   │   │   ├── ai/
│   │   │   ├── contacts/
│   │   │   ├── cta/
│   │   │   ├── docs-toc/
│   │   │   ├── faqs/
│   │   │   ├── features/
│   │   │   ├── footers/
│   │   │   ├── heroes/
│   │   │   ├── marketing-navbars/
│   │   │   ├── pricing/
│   │   │   ├── process/
│   │   │   ├── product-categories/
│   │   │   ├── services/
│   │   │   ├── stats/
│   │   │   └── testimonials/
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── calendly-popup.tsx
│   │       ├── clarity.tsx
│   │       ├── color-mode.tsx
│   │       ├── color-palette-toggle.tsx
│   │       ├── download-trigger.tsx
│   │       ├── error-lottie.tsx
│   │       ├── fade-in.tsx
│   │       ├── floating-contact.tsx
│   │       ├── interactive-spline.tsx
│   │       ├── language-switcher.tsx
│   │       ├── markdown-renderer.tsx
│   │       ├── password-gate.tsx
│   │       ├── provider.tsx
│   │       ├── sound-toggle.tsx
│   │       └── theme.ts
│   ├── fonts/
│   │   ├── Montserrat/
│   │   │   ├── Montserrat-Italic-VariableFont_wght.ttf
│   │   │   ├── Montserrat-VariableFont_wght.ttf
│   │   │   ├── OFL.txt
│   │   │   └── README.txt
│   │   └── Nunito-Sans/
│   │       ├── NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf
│   │       ├── NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf
│   │       ├── OFL.txt
│   │       └── README.txt
│   ├── hooks/
│   │   └── use-ui-sounds.ts
│   ├── i18n.ts
│   ├── lib/
│   │   ├── nav-utils.ts
│   │   └── supabase.ts
│   ├── proxy.ts
│   └── types.d.ts
├── tsconfig.json
└── tsconfig.tsbuildinfo
```
