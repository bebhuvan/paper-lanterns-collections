# Paper Lanterns Collections

A curated digital archive of historically significant letters from influential figures of the Indian independence movement and world literature. Built with Astro 5.x and deployed on Cloudflare Workers.

**Live Site:** [collections.paperlanterns.ink](https://collections.paperlanterns.ink)

## 📚 Collections

### Indian Independence Era

**[Gandhi Famous Letters](https://collections.paperlanterns.ink/letters/gandhi)** (25 letters, 1918-1947)
- Support for the Empire & The War Conference (1918)
- Non-Cooperation Movement letters
- Salt March Declaration (1930)
- Letters to world leaders (Chiang Kai-shek, America)
- Quit India Movement correspondence

**[Nehru Father-Daughter Letters](https://collections.paperlanterns.ink/letters/nehru)** (31 letters, 1920s-1930s)
- Personal letters from prison to his daughter Indira
- History, philosophy, and life lessons
- Chronicles of India's freedom struggle

### World Literature

**[Rabindranath Tagore - Letters from Abroad](https://collections.paperlanterns.ink/letters/tagore)** (79 letters, 1920-1921)
- Travel letters from Europe and America
- Cultural observations and reflections
- Published correspondence during world tours

**[Tagore - Macmillan Letters](https://collections.paperlanterns.ink/letters/tagore-macmillan)** (67 letters, 1880s-1920s)
- Correspondence with his British publisher
- Literary business and creative process
- Publishing history of his works

**[Dostoevsky - Letters and Reminiscences](https://collections.paperlanterns.ink/letters/dostoevsky)** (46 posts, 1849-1880)
- Death sentence letter from Peter and Paul Fortress (1849)
- Letters to Apollon Maikov from Geneva and Dresden (1867-1870)
- Anna Grigorevna Dostoevsky's reminiscences (1871-1872)
- Pushkin celebration letters from Moscow (1880)
- Letters to Konstantin Pobiedonoszev (1879-1880)
- Translation by S. S. Koteliansky and J. Middleton Murry (1923)
- Source: [Archive.org](https://archive.org/details/dostoevskyletter00dostuoft/mode/2up)

**Total: 247 letters across 5 collections**

## 🎨 Design

- **Swiss Design System**: Clean typography, generous whitespace, minimal interface
- **Performance First**: Inlined critical CSS, preloaded fonts, optimized builds
- **Mobile Responsive**: Mobile-first approach with elegant readability
- **SEO Optimized**: Structured data, social media cards, semantic HTML

## 🚀 Technology Stack

- **Framework**: [Astro 5.x](https://astro.build) - Static site generation
- **Content**: Markdown with YAML frontmatter, Zod schema validation
- **Hosting**: [Cloudflare Workers](https://workers.cloudflare.com/) - Edge deployment
- **Typography**: System fonts with Swiss design principles
- **Build**: Optimized for performance and accessibility

## 📁 Project Structure

```text
paper-lanterns-swiss/
├── src/
│   ├── content/
│   │   ├── letters/           # 247 letter markdown files
│   │   └── config.ts          # Zod schema for content validation
│   ├── layouts/
│   │   └── LetterLayout.astro # Letter page template
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   └── letters/
│   │       └── [slug].astro   # Dynamic letter routes
│   └── styles/
│       └── global.css         # Swiss design system styles
├── public/                    # Static assets
├── wrangler.toml             # Cloudflare Workers config
└── astro.config.mjs          # Astro configuration
```

## 🧞 Commands

All commands are run from the root of the project:

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run deploy` | Deploy to Cloudflare Workers |

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/bebhuvan/paper-lanterns-collections.git
cd paper-lanterns-swiss

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the site.

## 📝 Adding New Letters

Letters are stored as Markdown files in `src/content/letters/` with YAML frontmatter:

```yaml
---
title: "Letter Title"
author: "Author Name"
recipient: "Recipient Name"
date: "Date of Letter"
location: "Location"
number: 1
collection: "collection-slug"
collectionTitle: "Collection Display Name"
period: "Date Range"
translator: "Translator Name (if applicable)"
---

Letter content here...
```

The Zod schema in `src/content/config.ts` validates all letter metadata.

## 🌐 Deployment

The site is deployed to Cloudflare Workers for global edge distribution:

```bash
npm run deploy
```

Configuration in `wrangler.toml` handles routing and optimization.

## 📄 Sources

- Gandhi Letters: Various historical archives
- Nehru Letters: "Glimpses of World History" and personal archives
- Tagore Letters: Published collections and Macmillan archives
- Dostoevsky Letters: "Letters and Reminiscences" (Chatto & Windus, 1923)

## 🤝 Contributing

Contributions welcome! Please ensure:
- Letters are historically accurate with proper attribution
- Markdown formatting follows existing patterns
- Frontmatter includes all required fields
- Sources are properly documented

## 📜 License

Content sources are in the public domain or used with appropriate permissions. Code is open source.

---

Built with [Astro](https://astro.build) • Deployed on [Cloudflare Workers](https://workers.cloudflare.com/)
