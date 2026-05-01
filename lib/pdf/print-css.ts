/**
 * Print-target CSS, inlined as a string.
 *
 * This is the same content as styles/markdown.css and styles/print.css,
 * but exported as a string so the export engine can embed it into the
 * standalone print document.
 *
 * Why duplicate: the print window is a separate document and can't import
 * from our Next.js asset graph. Inlining is the simplest correct choice.
 *
 * If these get out of sync, run `pnpm sync:print-css` (TODO: add script).
 */

export const MARKDOWN_CSS = `
.markdown-body {
  font-family: var(--md-font-body);
  font-size: var(--md-size-base);
  line-height: var(--md-leading);
  color: var(--md-color-text);
  background: var(--md-color-bg);
  max-width: 100%;
  margin: 0 auto;
}
.markdown-body h1, .markdown-body h2, .markdown-body h3,
.markdown-body h4, .markdown-body h5, .markdown-body h6 {
  font-family: var(--md-font-heading);
  color: var(--md-color-heading);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin-top: 1.6em;
  margin-bottom: 0.5em;
  break-after: avoid;
}
.markdown-body h1 {
  font-size: 2.4em;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin-top: 0;
  break-before: page;
}
.markdown-body h1:first-child,
.markdown-body article > h1:first-child { break-before: auto; }
.markdown-body h2 {
  font-size: 1.6em;
  border-bottom: 1px solid var(--md-color-rule);
  padding-bottom: 0.2em;
}
.markdown-body h3 { font-size: 1.25em; }
.markdown-body h4 { font-size: 1.05em; font-style: italic; font-weight: 500; }
.markdown-body p { margin: 0 0 0.9em; text-align: justify; hyphens: auto; }
.markdown-body strong { font-weight: 600; }
.markdown-body em { font-style: italic; }
.markdown-body a {
  color: var(--md-color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
}
.markdown-body ul, .markdown-body ol { padding-left: 1.5em; margin: 0.6em 0 1em; }
.markdown-body li { margin: 0.25em 0; }
.markdown-body ul li::marker { color: var(--md-color-accent); }
.markdown-body code {
  font-family: var(--md-font-mono);
  font-size: 0.88em;
  background: var(--md-color-code-bg);
  padding: 0.15em 0.4em;
  border-radius: 3px;
}
.markdown-body pre {
  font-family: var(--md-font-mono);
  font-size: 0.82em;
  line-height: 1.5;
  background: var(--md-color-code-bg);
  padding: 1em 1.25em;
  border-left: 3px solid var(--md-color-accent);
  border-radius: 2px;
  overflow-x: auto;
  margin: 1.2em 0;
  break-inside: avoid;
}
.markdown-body pre code { background: transparent; padding: 0; font-size: inherit; }
.markdown-body blockquote {
  border-left: 3px solid var(--md-color-rule);
  padding-left: 1.25em;
  margin: 1.2em 0;
  font-style: italic;
  color: var(--md-color-muted);
  break-inside: avoid;
}
.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.2em 0;
  font-size: 0.92em;
  break-inside: avoid;
}
.markdown-body th, .markdown-body td {
  border-bottom: 1px solid var(--md-color-rule);
  padding: 0.5em 0.75em;
  text-align: left;
  vertical-align: top;
}
.markdown-body th {
  font-family: var(--md-font-heading);
  font-weight: 600;
  border-bottom: 2px solid var(--md-color-text);
}
.markdown-body hr { border: 0; text-align: center; margin: 2em 0; break-after: avoid; }
.markdown-body hr::before { content: '§'; color: var(--md-color-muted); font-size: 1.2em; }
.markdown-body img { max-width: 100%; height: auto; display: block; margin: 1em auto; break-inside: avoid; }
.markdown-body .katex { font-size: 1em; }
.markdown-body .katex-display { margin: 1em 0; break-inside: avoid; }
.markdown-body input[type='checkbox'] { margin-right: 0.4em; accent-color: var(--md-color-accent); }
`;

export const PRINT_CSS = `
@page {
  @bottom-center {
    content: counter(page);
    font-family: var(--md-font-body);
    font-size: 9pt;
    color: var(--md-color-muted);
  }
  @top-right {
    content: string(doc-title);
    font-family: var(--md-font-body);
    font-size: 9pt;
    font-style: italic;
    color: var(--md-color-muted);
  }
}
@page :first {
  @top-right { content: none; }
  @bottom-center { content: none; }
}
.markdown-body h1:first-of-type { string-set: doc-title content(); }
.markdown-body { orphans: 3; widows: 3; }
.title-page {
  text-align: center;
  page-break-after: always;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 9in;
}
.title-page h1 {
  font-family: var(--md-font-heading);
  font-size: 3em;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0 0 0.5em;
  border: none;
  break-before: auto;
  break-after: auto;
}
.title-page .author {
  font-family: var(--md-font-body);
  font-style: italic;
  color: var(--md-color-muted);
  font-size: 1.1em;
}
.title-page .date {
  font-family: var(--md-font-body);
  color: var(--md-color-muted);
  font-size: 0.95em;
  margin-top: 0.5em;
}
.title-page .ornament {
  margin: 1.5em 0;
  color: var(--md-color-accent);
  font-size: 1.5em;
}
`;
