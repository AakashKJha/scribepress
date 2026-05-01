'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { renderMarkdown, type PipelineOptions } from '@/lib/markdown/pipeline';
import type { ThemeId } from '@/lib/state/store';

interface PreviewProps {
  source: string;
  themeId: ThemeId;
  options: PipelineOptions;
}

export function Preview({ source, themeId, options }: PreviewProps) {
  const [debounced] = useDebounce(source, 250);
  const [html, setHtml] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    renderMarkdown(debounced, options)
      .then((result) => {
        if (!cancelled) {
          setHtml(result);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [debounced, options]);

  return (
    <div className="h-full overflow-auto" data-theme={themeId}>
      <div className="px-12 py-12 max-w-[72ch] mx-auto">
        {error ? (
          <div className="text-accent font-mono text-sm">{error}</div>
        ) : (
          <article
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}
