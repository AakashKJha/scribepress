'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { defaultPipelineOptions, type PipelineOptions } from '@/lib/markdown/pipeline';
import { defaultPageConfig, type PageConfig, type DocumentMeta } from '@/lib/pdf/paged-engine';

export type ThemeId = 'editorial' | 'manuscript' | 'technical';

interface MdToPdfState {
  source: string;
  themeId: ThemeId;
  pageConfig: PageConfig;
  pipelineOptions: PipelineOptions;
  meta: DocumentMeta;
  setSource: (s: string) => void;
  setTheme: (t: ThemeId) => void;
  setPageConfig: (c: Partial<PageConfig>) => void;
  setMeta: (m: Partial<DocumentMeta>) => void;
  setPipelineOption: <K extends keyof PipelineOptions>(k: K, v: PipelineOptions[K]) => void;
  reset: () => void;
}

const SAMPLE = `# A Quiet Manifesto

*by an unsigned hand*

> Markdown is a small alphabet. PDFs are a big silence. This tool makes the
> first cross the threshold of the second without ceremony.

## The shape of an idea

Most documents try too hard. They begin with a banner, end with a footer, and
fill the middle with bullet points borrowed from a slide deck. We have grown
suspicious of *paragraphs*.

A real paragraph turns. It does not stack.

### What this tool will do

- Render your markdown with **typography** that respects the page.
- Paginate without splitting your code, your tables, or your thoughts.
- Stay entirely in your browser, where it belongs.

### What it will not do

- Send your work anywhere.
- Ask you to sign in.
- Pretend that *speed* is the only virtue.

## A small example

Here is a code block, set with care:

\`\`\`python
def excerpt(text: str, n: int = 280) -> str:
    """Return the first n characters, trimmed at a word boundary."""
    if len(text) <= n:
        return text
    return text[:n].rsplit(' ', 1)[0] + '\u2026'
\`\`\`

And a table, because tables earn their keep:

| Element  | Behavior              | Default    |
|----------|-----------------------|------------|
| pre      | break-inside: avoid   | enforced   |
| table    | break-inside: avoid   | enforced   |
| h1       | break-before: page    | optional   |

And a piece of math, because mathematics is also writing:

$$E = mc^2$$

---

Make something. Print it. The page will hold.
`;

export const useStore = create<MdToPdfState>()(
  persist(
    (set) => ({
      source: SAMPLE,
      themeId: 'editorial',
      pageConfig: defaultPageConfig,
      pipelineOptions: defaultPipelineOptions,
      meta: { title: '', author: '', date: '' },

      setSource: (source) => set({ source }),
      setTheme: (themeId) => set({ themeId }),
      setPageConfig: (patch) => set((s) => ({ pageConfig: { ...s.pageConfig, ...patch } })),
      setMeta: (patch) => set((s) => ({ meta: { ...s.meta, ...patch } })),
      setPipelineOption: (k, v) =>
        set((s) => ({ pipelineOptions: { ...s.pipelineOptions, [k]: v } })),
      reset: () =>
        set({
          source: SAMPLE,
          themeId: 'editorial',
          pageConfig: defaultPageConfig,
          pipelineOptions: defaultPipelineOptions,
          meta: { title: '', author: '', date: '' },
        }),
    }),
    {
      name: 'scribepress:md-to-pdf',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
