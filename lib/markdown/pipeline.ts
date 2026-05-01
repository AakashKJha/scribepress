import { unified, type Processor } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export interface PipelineOptions {
  renderMath: boolean;
  syntaxHighlight: boolean;
  allowRawHtml: boolean;
}

export const defaultPipelineOptions: PipelineOptions = {
  renderMath: true,
  syntaxHighlight: true,
  allowRawHtml: false,
};

/**
 * Build a unified processor configured by the given options.
 * The returned processor takes markdown string and produces HTML string.
 *
 * Plugin order is load-bearing:
 *   1. remarkParse:    text → MDAST
 *   2. remarkGfm:      tables, strikethrough, task lists
 *   3. remarkMath:     detect $...$ before HTML conversion
 *   4. remarkRehype:   MDAST → HAST (allowDangerousHtml if raw HTML enabled)
 *   5. rehypeRaw:      re-parse raw HTML (only if allowRawHtml)
 *   6. rehypeKatex:    render math nodes (must come after remarkRehype)
 *   7. rehypeHighlight: code syntax highlighting
 *   8. rehypeStringify: HAST → HTML
 */
export function buildPipeline(opts: PipelineOptions = defaultPipelineOptions): Processor {
  let p: any = unified().use(remarkParse).use(remarkGfm);

  if (opts.renderMath) p = p.use(remarkMath);

  p = p.use(remarkRehype, { allowDangerousHtml: opts.allowRawHtml });
  if (opts.allowRawHtml) p = p.use(rehypeRaw);
  if (opts.renderMath) p = p.use(rehypeKatex);
  if (opts.syntaxHighlight) p = p.use(rehypeHighlight, { detect: true, ignoreMissing: true });

  return p.use(rehypeStringify);
}

/**
 * Convenience wrapper: markdown string → HTML string.
 */
export async function renderMarkdown(
  source: string,
  opts: PipelineOptions = defaultPipelineOptions
): Promise<string> {
  const pipeline = buildPipeline(opts);
  const file = await pipeline.process(source);
  return String(file);
}
