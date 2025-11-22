# Paper Lanterns Collections - Project Structure

## Root Directory
```
/home/bhuvanesh.r/AA/A main projects/Paper-lanterns-collections/paper-lanterns-swiss/
```

## File Tree

```
paper-lanterns-swiss/
├── public/
│   ├── robots.txt                    # Search engine directives
│   └── favicon.svg                   # Site favicon
│
├── src/
│   ├── content/
│   │   ├── letters/                  # Letter markdown files
│   │   │   └── (empty - ready for Tagore letters)
│   │   └── config.ts                 # Content collection schema definitions
│   │
│   ├── layouts/
│   │   └── Base.astro                # Main site layout (header, footer, SEO)
│   │
│   ├── pages/
│   │   ├── index.astro               # Homepage with hero, stats, collections grid
│   │   ├── search.astro              # Search page with filters sidebar
│   │   ├── about.astro               # About page
│   │   ├── rss.xml.ts                # RSS feed generator (API route)
│   │   ├── sitemap.xml.ts            # Sitemap generator (API route)
│   │   └── [collection]/
│   │       ├── index.astro           # Collection page (author archive)
│   │       └── [slug].astro          # Individual letter detail page
│   │
│   └── styles/
│       └── global.css                # Swiss design system CSS variables & utilities
│
├── astro.config.mjs                  # Astro configuration (Cloudflare adapter)
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── PROJECT-STRUCTURE.md              # This file
└── README.md                         # Project readme (if exists)
```

## Key Configuration Files

### astro.config.mjs
**Location**: `/home/bhuvanesh.r/AA/A main projects/Paper-lanterns-collections/paper-lanterns-swiss/astro.config.mjs`
- Astro 5.x configuration
- Cloudflare Workers adapter (@astrojs/cloudflare)
- Server output mode with selective prerendering
- Site URL: TBD (will be collections.paperlanterns.ink)

### package.json
**Location**: `/home/bhuvanesh.r/AA/A main projects/Paper-lanterns-collections/paper-lanterns-swiss/package.json`
- Scripts: `dev`, `build`, `preview`, `deploy`
- Dependencies: Astro 5.x, @astrojs/cloudflare, @astrojs/rss

### tsconfig.json
**Location**: `/home/bhuvanesh.r/AA/A main projects/Paper-lanterns-collections/paper-lanterns-swiss/tsconfig.json`
- TypeScript configuration for Astro
- Path aliases and module resolution

## Content Structure

### Letters Directory
**Location**: `/home/bhuvanesh.r/AA/A main projects/Paper-lanterns-collections/paper-lanterns-swiss/src/content/letters/`

**Naming Convention**: `{collection}-{number:3}-{slug}.md`

**Examples**:
- `tagore-001-letter-to-friend.md`
- `tagore-002-on-education.md`
- `vivekananda-001-to-swami-brahmananda.md`

**Frontmatter Schema**:
```yaml
---
title: "Letter Title"
author: "Author Name"
recipient: "Recipient Name"          # Optional
date: "Date String"                  # Optional (e.g., "January 15, 1895")
number: 1                            # Letter number in collection
collection: "collection-slug"        # URL-safe collection identifier
collectionTitle: "Full Collection Title"
period: "Historical Period"          # Optional (e.g., "1890-1900")
---
```

### Content Config
**Location**: `/home/bhuvanesh.r/AA/A main projects/Paper-lanterns-collections/paper-lanterns-swiss/src/content/config.ts`
- Defines letter collection schema using Zod
- Validates frontmatter fields
- Type safety for content

## Page Routes

### Static Routes
- `/` - Homepage (index.astro)
- `/search` - Search page (search.astro)
- `/about` - About page (about.astro)
- `/rss.xml` - RSS feed (rss.xml.ts)
- `/sitemap.xml` - Sitemap (sitemap.xml.ts)

### Dynamic Routes
- `/[collection]` - Collection archive page
  - Example: `/tagore`
  - File: `src/pages/[collection]/index.astro`

- `/[collection]/[slug]` - Individual letter
  - Example: `/tagore/tagore-001-letter-to-friend`
  - File: `src/pages/[collection]/[slug].astro`

## Layouts

### Base.astro
**Location**: `/home/bhuvanesh.r/AA/A main projects/Paper-lanterns-collections/paper-lanterns-swiss/src/layouts/Base.astro`

**Features**:
- HTML document structure
- SEO meta tags (title, description, OG, Twitter)
- RSS feed link
- Google Fonts (Spectral + Inter)
- Sticky header with navigation
- Footer with site links and "Visit Main Site" button
- Grid container wrapper

**Props**:
```typescript
interface Props {
  title: string;
  description?: string;
  image?: string;
  article?: boolean;
}
```

## Styles

### global.css
**Location**: `/home/bhuvanesh.r/AA/A main projects/Paper-lanterns-collections/paper-lanterns-swiss/src/styles/global.css`

**CSS Custom Properties**:
```css
/* Colors */
--color-text-primary: #1a1614
--color-text-secondary: #5a5350
--color-text-tertiary: #7a736d
--color-accent-start: #c96b6f
--color-accent-end: #d4a574

/* Typography */
--font-serif: 'Spectral', Georgia, serif
--font-sans: 'Inter', sans-serif

/* Font Sizes */
--text-hero: 88px
--text-title: 32px
--text-base: 16px
--text-small: 14px
--text-tiny: 13px

/* Spacing */
--space-sm: 12px
--space-md: 16px
--space-xl: 24px
--space-4xl: 40px
--space-6xl: 64px
--space-8xl: 120px

/* Grid */
--grid-columns: 12
--grid-gap: 24px
--grid-max-width: 1520px
--grid-padding: 64px

/* Transitions */
--transition-base: 0.35s cubic-bezier(0.4, 0, 0.2, 1)
```

## Page-Specific Styles

### Homepage (index.astro)
- Hero section with eyebrow, title, subtitle, stats
- Search bar container (grid-column: 3 / 11)
- Section header (centered)
- Collections grid (auto-fill, minmax(340px, 1fr))
- Card hover effects (translateY, box-shadow)

### Search (search.astro)
- Search layout (2-column: 280px sidebar + 1fr results)
- Filters sidebar (sticky positioning)
- Filter dropdowns (author, collection, period)
- Clear filters button
- Results list with metadata

### Collection Page ([collection]/index.astro)
- Breadcrumb navigation
- Author hero section
- Letters list (grid layout)
- Letter items with date, title, recipient, number
- Hover effects (translateX, accent line)

### Letter Detail ([collection]/[slug].astro)
- Breadcrumb navigation (Home / Author / Letter #)
- Metadata sidebar (sticky, grid-column: 1 / 4)
- Title section (grid-column: 4 / 13)
- Letter content (grid-column: 4 / 11, max-width: 75ch)
- Drop cap on first letter
- Letter navigation (prev/next/all letters)
- Responsive: stacks on mobile

## Design System Guidelines

### Typography
- **Headings**: Spectral, light weight (300-500)
- **Body**: Spectral, regular (400)
- **UI Elements**: Inter, various weights
- **Line Height**: 1.65-1.85 for readability
- **Letter Spacing**: -3px (tight) to 2.4px (widest)

### Colors
- **Primary Text**: #1a1614 (warm black)
- **Secondary Text**: #5a5350 (improved contrast)
- **Accent**: Gradient from #c96b6f to #d4a574
- **Background**: #ffffff
- **Borders**: #e8e3dc

### Spacing
- Use CSS custom properties (--space-*)
- Mobile: Reduce padding/margins by 1-2 steps
- Reading width: 75ch max for letter content

### Interactions
- **Hover**: Subtle color change, transform, box-shadow
- **Focus**: 2px accent outline, 3px offset
- **Transitions**: 0.35s cubic-bezier easing

### Responsive Breakpoints
```css
@media (max-width: 1100px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 480px)  { /* Small Mobile */ }
```

## Development

### Running Dev Server
```bash
cd "/home/bhuvanesh.r/AA/A main projects/Paper-lanterns-collections/paper-lanterns-swiss"
npm run dev
```
**URL**: http://localhost:4322/

### Building for Production
```bash
npm run build
```
Output: `dist/` directory (Cloudflare Workers format)

### Node Version
**Required**: Node 20
```bash
nvm use 20
```

## Deployment

### Target Platform
- **Cloudflare Workers** (NOT Pages)
- **Adapter**: @astrojs/cloudflare (directory mode)
- **Planned Domain**: collections.paperlanterns.ink

### Deployment Command
```bash
npm run deploy
```
(Requires Cloudflare Workers configuration)

## SEO & Metadata

### RSS Feed
**URL**: `/rss.xml`
**Location**: `src/pages/rss.xml.ts`
- Shows last 50 letters
- Sorted by date/number
- Includes collection and author info

### Sitemap
**URL**: `/sitemap.xml`
**Location**: `src/pages/sitemap.xml.ts`
- Static pages (home, search, about)
- All collection pages
- All letter pages
- Priorities and change frequencies set

### Robots.txt
**URL**: `/robots.txt`
**Location**: `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://collections.paperlanterns.ink/sitemap.xml
```

### Structured Data
- **Homepage**: WebSite schema with SearchAction
- **Letter Pages**: Article schema with author, publisher, license

## Current Status

### Implemented ✅
- All page templates
- Swiss design system
- Responsive layouts
- SEO (RSS, sitemap, robots.txt, structured data)
- Search with filters
- Breadcrumb navigation
- Letter navigation (prev/next/all)
- Focus states and accessibility
- Hover interactions

### TODO ⏳
- Add Tagore letters (user will provide)
- Replace client-side search with D1 FTS
- Deploy to Cloudflare Workers
- Test with many letters
- Performance optimization

### Removed 🗑️
- Dummy Seneca letters
- Dummy Pliny letters

## Quick Reference

### Adding a New Letter
1. Create file: `src/content/letters/{collection}-{number:3}-{slug}.md`
2. Add frontmatter with all required fields
3. Write letter content in markdown
4. Site automatically generates routes

### Testing Locally
1. Start dev server: `npm run dev`
2. Visit: http://localhost:4322/
3. Check homepage, collection page, letter detail
4. Test search and filters

### Common Paths
- **Letters**: `src/content/letters/`
- **Layouts**: `src/layouts/Base.astro`
- **Styles**: `src/styles/global.css`
- **Homepage**: `src/pages/index.astro`
- **Search**: `src/pages/search.astro`

---

**Last Updated**: 2025-11-22
**Project**: Paper Lanterns Collections
**Status**: Ready for content (Tagore letters)
