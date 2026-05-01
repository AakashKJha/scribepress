/**
 * PDF export engine, built on Paged.js.
 *
 * Strategy:
 *   1. Compose a complete HTML document (markdown.css + print.css + theme + content).
 *   2. Open a new tab, write the document, let Paged.js paginate inside it.
 *   3. After Paged.js finishes, trigger window.print() in the new tab.
 *   4. User saves as PDF via OS print dialog.
 *
 * Why a new tab instead of in-page printing:
 *   - The user's editor view is preserved.
 *   - The user gets a real preview of the paginated output BEFORE they print.
 *     That kills the "I exported and it looked broken" support load.
 *   - Print-only CSS doesn't fight with Tailwind/app shell styles.
 */

export interface PageConfig {
  size: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margin: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}

export const defaultPageConfig: PageConfig = {
  size: 'A4',
  orientation: 'portrait',
  margin: { top: '1in', right: '1in', bottom: '1in', left: '1in' },
};

export interface DocumentMeta {
  title?: string;
  author?: string;
  date?: string;
  themeId?: string;
}

export interface ExportInput {
  html: string;             // rendered markdown HTML
  meta: DocumentMeta;
  pageConfig: PageConfig;
  markdownCss: string;      // contents of markdown.css
  printCss: string;         // contents of print.css
  themeCss?: string;        // optional theme overrides
}

/**
 * Triggers the export flow.
 * Returns once the print window has been opened; the actual print
 * dialog appears asynchronously after Paged.js paginates.
 */
export async function exportToPdf(input: ExportInput): Promise<void> {
  const printWindow = window.open('', '_blank', 'noopener,noreferrer');
  if (!printWindow) {
    throw new Error('Popup blocked. Please allow popups and try again.');
  }

  const doc = composeDocument(input);
  printWindow.document.open();
  printWindow.document.write(doc);
  printWindow.document.close();
}

function composeDocument(input: ExportInput): string {
  const { html, meta, pageConfig, markdownCss, printCss, themeCss } = input;
  const titleHtml = renderTitlePage(meta);
  const themeAttr = meta.themeId ? `data-theme="${escapeAttr(meta.themeId)}"` : '';

  return `<!DOCTYPE html>
<html lang="en" ${themeAttr}>
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(meta.title || 'Document')}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=JetBrains+Mono:wght@400;500&display=swap" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/styles/github.min.css" />
<style>
${buildPageRules(pageConfig)}
${markdownCss}
${printCss}
${themeCss ?? ''}
${themeTokens()}
</style>
</head>
<body>
${titleHtml}
<article class="markdown-body">${html}</article>
<script src="https://unpkg.com/pagedjs@0.4.3/dist/paged.polyfill.js"></script>
<script>
  // After Paged.js finishes, trigger print.
  window.PagedConfig = {
    after: () => {
      // Small delay so fonts and KaTeX have a frame to settle.
      setTimeout(() => window.print(), 400);
    },
  };
</script>
</body>
</html>`;
}

function buildPageRules(c: PageConfig): string {
  return `@page {
  size: ${c.size} ${c.orientation};
  margin: ${c.margin.top} ${c.margin.right} ${c.margin.bottom} ${c.margin.left};
}`;
}

function renderTitlePage(meta: DocumentMeta): string {
  if (!meta.title && !meta.author) return '';
  return `<section class="title-page">
  ${meta.title ? `<h1>${escapeHtml(meta.title)}</h1>` : ''}
  <div class="ornament">§</div>
  ${meta.author ? `<div class="author">${escapeHtml(meta.author)}</div>` : ''}
  ${meta.date ? `<div class="date">${escapeHtml(meta.date)}</div>` : ''}
</section>`;
}

/**
 * Inline copy of the theme tokens so the export window doesn't
 * depend on our app's globals.css being available.
 */
function themeTokens(): string {
  return `
:root {
  --md-color-text: #1A1614;
  --md-color-heading: #0F0C0A;
  --md-color-muted: #6B5D52;
  --md-color-accent: #A8321E;
  --md-color-bg: #FAF6EF;
  --md-color-code-bg: #F1EBDF;
  --md-color-rule: #D9CFC2;
  --md-font-body: 'Newsreader', Georgia, serif;
  --md-font-heading: 'Fraunces', 'Times New Roman', serif;
  --md-font-mono: 'JetBrains Mono', monospace;
  --md-size-base: 11pt;
  --md-leading: 1.65;
}
[data-theme='technical'] {
  --md-color-text: #E8E6E3;
  --md-color-heading: #FFFFFF;
  --md-color-muted: #A0998F;
  --md-color-accent: #FFB949;
  --md-color-bg: #1A1614;
  --md-color-code-bg: #0F0C0A;
  --md-color-rule: #3A332D;
  --md-font-body: 'JetBrains Mono', monospace;
  --md-font-heading: 'JetBrains Mono', monospace;
}
[data-theme='manuscript'] {
  --md-color-text: #2B2622;
  --md-color-heading: #1A1614;
  --md-color-accent: #1F4E5F;
  --md-color-bg: #FFFEF8;
  --md-color-code-bg: #F4EFE3;
}
body { background: var(--md-color-bg); }
`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  );
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}
