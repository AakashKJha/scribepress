# ScribePress

> Markdown, set in type.

A typographically-refined markdown-to-PDF converter that runs entirely in the browser. Real text-selectable PDFs, smart pagination, autosaved drafts, three editorial themes.

This is the first tool in a planned toolkit for AI-era writing. Architecture is set up to add more tools (markdown-to-docx, AI output cleanup, markdown-to-slides, etc.) without rework.

## Stack

- **Next.js 15** (App Router, static-friendly routes)
- **TypeScript**
- **Tailwind CSS** (app shell only — markdown styles are plain CSS for theme-token portability)
- **Paged.js** (CSS Paged Media polyfill — the engine behind real PDF pagination)
- **unified / remark / rehype** (markdown pipeline)
- **Zustand** (state with localStorage persistence)
- **CodeMirror 6** (editor)
- **KaTeX** (math), **highlight.js** (code)

## Local development

```bash
# 1. Install dependencies
npm install
# or: pnpm install / yarn install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

The dev server auto-reloads. Edit any file in `app/`, `components/`, `lib/`, or `styles/` and the page updates.

## Project structure

```
app/                       Next.js App Router routes
├── layout.tsx             Root layout (SEO metadata, fonts)
├── page.tsx               Homepage = the converter + landing content
├── about/                 About page (AdSense prereq)
├── privacy/               Privacy policy (AdSense prereq)
├── terms/                 Terms (AdSense prereq)
├── sitemap.ts             Auto-generated sitemap
├── robots.ts              Auto-generated robots.txt
└── globals.css            Tailwind + theme tokens

components/
├── Converter.tsx          Toolbar + split-pane composition
├── Editor.tsx             CodeMirror wrapper
├── Preview.tsx            Live HTML preview (debounced)
├── Faq.tsx                FAQ + JSON-LD source data
└── LegalLayout.tsx        Shared layout for /privacy, /terms, /about

lib/
├── markdown/pipeline.ts   unified processor factory
├── pdf/paged-engine.ts    Paged.js export pipeline
├── pdf/print-css.ts       Inlined CSS for the print window
└── state/store.ts         Zustand store + autosave

styles/
├── markdown.css           .markdown-body styles (preview + print share these)
└── print.css              @page rules, headers, page numbers
```

## Deployment to Vercel (production, today)

### Option A — via Vercel CLI (fastest, ~3 minutes)

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. From the project root, run:
vercel

# 3. Follow prompts:
#    - Sign in (GitHub/GitLab/email)
#    - "Set up and deploy?" → Y
#    - Which scope? → your account
#    - Link to existing project? → N
#    - Project name? → scribepress (or whatever you want)
#    - In which directory is your code located? → ./
#    - Override settings? → N (Vercel auto-detects Next.js)

# 4. Vercel deploys. You get a URL like:
#    https://scribepress-abc123.vercel.app
```

For the production URL:

```bash
vercel --prod
```

### Option B — via GitHub + Vercel dashboard (recommended for ongoing development)

```bash
# 1. Create a GitHub repo
gh repo create scribepress --public --source=. --remote=origin --push
# or do it via github.com manually

# 2. Visit https://vercel.com/new
# 3. Import your scribepress repo
# 4. Click Deploy. Vercel auto-detects Next.js.
# 5. Done — every push to main auto-deploys.
```

### Custom domain (optional, do it today if you bought one)

1. Buy a domain (Namecheap, Cloudflare Registrar, Porkbun — ~$10/yr for a `.app`)
2. In the Vercel dashboard → Project Settings → Domains → Add
3. Vercel gives you DNS records to add at your registrar
4. Wait 5-30 minutes for DNS propagation. SSL is automatic.

Then set `NEXT_PUBLIC_SITE_URL` in Vercel project settings to `https://yourdomain.app` so the sitemap and metadata use the right URL.

## After deploy — go-live checklist

- [ ] Verify the live URL loads and the converter works
- [ ] Click Export PDF → confirm a real PDF saves
- [ ] Open PDF and confirm text is selectable
- [ ] Test on mobile (read-only — converter is desktop-first)
- [ ] Submit sitemap to Google Search Console: `https://search.google.com/search-console`
- [ ] Submit to Bing Webmaster Tools
- [ ] Verify FAQ schema renders: paste the URL into https://search.google.com/test/rich-results
- [ ] Post on Reddit r/markdown, r/PDFtools, Hacker News (Show HN), Indie Hackers
- [ ] Submit to https://alternativeto.net under "Markdown to PDF converters"

## AdSense — wait, then apply

Don't apply on day 1. AdSense looks for:

- 30+ days of consistent traffic
- Real, original content beyond just a tool
- Clean privacy policy + terms (you have these)
- Unique value proposition (you have this)

**Plan**: 3-4 weeks after launch, write 3-5 blog posts (`app/blog/<slug>/page.tsx`) targeting keywords like "how to convert markdown to pdf", "best free markdown editor", "chatgpt output formatting tips". Then apply.

When approved, integrate the AdSense script in `app/layout.tsx` (one `<Script>` tag) and place ad slots:
- Sidebar of `/` (300x250)
- Below the fold in blog posts (728x90 + in-article)
- Post-export modal — but only if it doesn't ruin UX. Test carefully.

## Roadmap (week 2+)

- [ ] **AI output cleaner** — remark plugin that strips "Sure, here's...", "Let me know if...", "I hope this helps!" patterns. Toggle in toolbar.
- [ ] **Mermaid support** — `rehype-mermaid` for diagrams in code fences
- [ ] **Markdown to DOCX** — second tool, using `pandoc-wasm`
- [ ] **PDF to Markdown** — reverse direction, third tool
- [ ] **Tool registry pattern** — extract `Tool` interface, refactor homepage to compose from registry
- [ ] **Vercel Analytics or Plausible** — privacy-respecting page view tracking
- [ ] **Open Graph image generation** — `app/api/og/route.tsx` for shareable cards

## License

All rights reserved (for now). If you want to use this code, get in touch.
