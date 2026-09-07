# SEOVally MCP Server — Docs (Next.js)

A small Next.js 14 (App Router) app that renders the SEOVally MCP Server
documentation as a single page: sticky section nav, a quick-facts strip,
a score gauge, styled tables, and copyable code blocks.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Structure

```
app/
  layout.tsx        Root layout, fonts, metadata
  page.tsx           The documentation page content
  SectionNav.tsx      Sidebar + mobile nav (scroll-spy)
  useActiveSection.ts Shared scroll-spy hook
  CodeBlock.tsx       Code block with copy-to-clipboard
  sections.ts         Section id/label list used by both nav rails
  globals.css         All styling (CSS variables, layout, components)
```

Requires internet access on first build/dev run to fetch the Google Fonts
(Fraunces, IBM Plex Sans, IBM Plex Mono) via `next/font/google`.
