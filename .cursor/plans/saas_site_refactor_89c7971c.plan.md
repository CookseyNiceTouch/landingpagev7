---
name: SaaS Site Refactor
overview: Refactor the existing Nice Touch landing page from a single-page-style layout into a scalable SaaS site architecture, introducing Tailwind CSS, a shared layout system, extracted data layers, and reusable components -- all while keeping the site visually and functionally identical.
todos:
  - id: tailwind-setup
    content: Install Tailwind CSS v4 + Vite plugin, configure theme with existing design tokens
    status: completed
  - id: path-aliases
    content: Configure @/ path alias in tsconfig.app.json and vite.config.ts
    status: completed
  - id: layout-component
    content: Create Layout.tsx with Header + Outlet + Footer, move LiquidEther from App.tsx, fix viewport lock
    status: pending
  - id: footer-component
    content: Create minimal Footer.tsx with social links, copyright, and placeholder link groups
    status: pending
  - id: header-nav
    content: Update Header with NavLink navigation, mobile menu shell, move to layout/ folder
    status: pending
  - id: extract-data
    content: Extract pricing data, navigation config, and social links into src/data/ files
    status: completed
  - id: extract-releases-hook
    content: Move releases fetch from App.tsx into src/hooks/useReleases.ts, remove prop drilling
    status: completed
  - id: migrate-styles
    content: Convert all App.css styles to Tailwind utilities across every component and page
    status: pending
  - id: reusable-ui
    content: Create Button and Container reusable components
    status: completed
  - id: not-found-page
    content: Add NotFound.tsx page and catch-all route
    status: pending
  - id: cleanup-verify
    content: Delete App.css, run build + lint, verify all pages render correctly
    status: completed
isProject: false
---

# SaaS Site Refactor -- Phase 1: Structural Preparation

## Current State

The site is a React 19 + Vite 7 + TypeScript app with 4 pages (Home, Pricing, Download, Newsletter), a WebGL fluid background, and HubSpot form integrations. Key problems blocking expansion:

- **Monolithic CSS**: All ~1190 lines of component styles live in a single [App.css](src/App.css). No scoping, no utility system.
- **No layout system**: Every page manually renders `<Header />`. No shared layout, no footer, no nav.
- **Viewport-locked container**: `.landing-page` uses `height: 100vh; overflow: hidden`, preventing scrollable multi-section pages.
- **Data baked into UI**: Pricing plans, checkout links, and social URLs are hardcoded inside component files.
- **No path aliases**: Imports use relative paths (`../../components/Header`), which will get unwieldy.
- **No reusable primitives**: No shared Button, Container, or Section components.

## Target File Structure

```
src/
  App.tsx              -- simplified: just routes wrapped in Layout
  main.tsx             -- unchanged
  index.css            -- Tailwind directives + minimal global overrides
  
  assets/              -- unchanged
  backgrounds/         -- unchanged (LiquidEther stays as-is)
  
  components/
    layout/
      Layout.tsx       -- Header + Outlet + Footer + LiquidEther background
      Header.tsx       -- updated: nav links, responsive mobile menu shell
      Footer.tsx       -- new: minimal footer (social, legal, links)
    ui/
      Button.tsx       -- reusable button with variant props
      Container.tsx    -- max-width content wrapper
    GetAppModal.tsx    -- migrated to Tailwind
    DownloadCard.tsx   -- migrated to Tailwind
    NewsletterForm.tsx -- migrated to Tailwind

  data/
    pricing.ts         -- plan definitions, checkout links, formatPrice util
    navigation.ts      -- nav link config array
    social.ts          -- social media URLs and icons

  hooks/
    useReleases.ts     -- extracted releases fetch from App.tsx

  pages/
    Home.tsx           -- migrated to Tailwind
    Download.tsx       -- migrated to Tailwind
    Newsletter.tsx     -- migrated to Tailwind
    Pricing.tsx        -- migrated to Tailwind, imports from data/pricing.ts
    NotFound.tsx       -- new: simple 404 page
```

## Detailed Changes

### 1. Install and configure Tailwind CSS v4

- Install `tailwindcss` and `@tailwindcss/vite`
- Add the Vite plugin to [vite.config.ts](vite.config.ts)
- Replace [index.css](src/index.css) contents with Tailwind directives (`@import "tailwindcss"`) plus the existing CSS custom properties and global resets
- Preserve the current design tokens as Tailwind theme extensions (colors: `--color-pink`, `--color-cyan`, `--color-purple`, etc.)

### 2. Configure path aliases

- Add `paths: { "@/*": ["./src/*"] }` to [tsconfig.app.json](tsconfig.app.json)
- Add `resolve.alias` to [vite.config.ts](vite.config.ts)

### 3. Create shared Layout component

- New `src/components/layout/Layout.tsx`: renders LiquidEther background, Header, `<Outlet />`, and Footer
- Move the LiquidEther rendering out of [App.tsx](src/App.tsx) into the Layout
- Simplify [App.tsx](src/App.tsx) to just define `<Routes>` with a parent `<Route element={<Layout />}>` wrapping child routes
- **Critical**: Change the `.landing-page` container from `height: 100vh; overflow: hidden` to `min-height: 100vh` so pages can scroll when content exceeds the viewport

### 4. Create Footer component

- New `src/components/layout/Footer.tsx` with:
  - Social links (reusing existing icons from [Header.tsx](src/components/Header.tsx))
  - Copyright line
  - Placeholder link groups (Product, Company, Legal) -- just the structure, populated in later phases
- Style with Tailwind, dark theme matching current site aesthetic

### 5. Update Header with navigation

- Move [Header.tsx](src/components/Header.tsx) to `src/components/layout/Header.tsx`
- Add nav links: Home, Pricing, Download, Newsletter (sourced from `data/navigation.ts`)
- Use `<NavLink>` from react-router-dom for active-state styling
- Keep the existing social icons and contact link in the right section
- Add a mobile hamburger menu shell (just the toggle and slide-out structure, no complex behavior yet)

### 6. Extract data and constants

- `**src/data/pricing.ts`**: Move `PLANS`, `CHECKOUT_LINKS`, `Currency`, `Interval`, `Plan` types, `detectCurrency()`, and `formatPrice()` out of [Pricing.tsx](src/pages/Pricing.tsx)
- `**src/data/navigation.ts`**: Define nav links as a typed array (`{ label, href, external? }`)
- `**src/data/social.ts`**: Extract social media URLs and icon imports currently duplicated in Header

### 7. Extract releases fetch into a hook

- New `src/hooks/useReleases.ts`: move the `ReleasesData` interface and the `fetch` logic out of [App.tsx](src/App.tsx)
- The hook returns `{ releases, macDownloadUrl, winDownloadUrl, macVersion, winVersion }`
- Call the hook inside the Download page (or Layout), removing prop-drilling through App

### 8. Migrate all styles from App.css to Tailwind

Convert each component's styles from CSS classes to Tailwind utility classes, working through [App.css](src/App.css) section by section:

- Header styles (lines 21-109) -> Tailwind in Layout/Header.tsx
- Hero styles (lines 113-175) -> Tailwind in Home.tsx
- Download section (lines 178-204) -> Tailwind in DownloadCard.tsx
- Newsletter section (lines 208-264) -> Tailwind in NewsletterForm.tsx
- Pricing section (lines 268-515) -> Tailwind in Pricing.tsx
- Modal styles (lines 966-1189) -> Tailwind in GetAppModal.tsx
- Get App button (lines 942-962) -> Tailwind in Button.tsx
- Responsive breakpoints -> Tailwind responsive prefixes (`md:`, `lg:`, `xl:`)

After full migration, delete [App.css](src/App.css).

### 9. Create reusable UI components

- `**Button.tsx**`: Wraps the pink CTA button pattern used across Home, Pricing, Modal. Props: `variant` (primary/secondary/ghost), `size`, `as` (button/a), `href`, standard button props.
- `**Container.tsx**`: Max-width + horizontal padding wrapper. Replaces repeated `padding: 0 clamp(40px, 9.4vw, 181px)` patterns.

### 10. Add 404 page

- New `src/pages/NotFound.tsx`: simple "Page not found" with link back to home
- Add `<Route path="*" element={<NotFound />} />` to the router

## Verification Checklist

After Phase 1 is complete, verify:

- `npm run build` succeeds with no TypeScript errors
- `npm run lint` passes
- All 4 existing pages render identically to current state
- Navigation between pages works
- LiquidEther background still renders and responds to mouse
- HubSpot forms load on Newsletter and Get App modal
- Pricing toggle and Stripe checkout links work
- Download page shows correct platform buttons
- Responsive behavior matches current breakpoints
- 404 page renders for unknown routes

## Future Phases (outline only)

- **Phase 2 -- Branding Update**: New color palette, typography, logo treatment, design tokens
- **Phase 3 -- Homepage Expansion**: Hero refinement, features grid, "how it works", social proof/testimonials, CTA sections
- **Phase 4 -- Additional Pages**: Feature detail pages, testimonials page, about/team, blog/content
- **Phase 5 -- Polish**: Animations/transitions, performance optimization, SEO meta tags, analytics

