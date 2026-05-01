'use client';

import { useState } from 'react';
import { useStore, type ThemeId } from '@/lib/state/store';
import { renderMarkdown } from '@/lib/markdown/pipeline';
import { exportToPdf } from '@/lib/pdf/paged-engine';
import { MARKDOWN_CSS, PRINT_CSS } from '@/lib/pdf/print-css';
import { Editor } from './Editor';
import { Preview } from './Preview';

const THEMES: { id: ThemeId; label: string; description: string }[] = [
  { id: 'editorial', label: 'Editorial', description: 'Warm paper, refined serif' },
  { id: 'manuscript', label: 'Manuscript', description: 'Cream, indigo, classical' },
  { id: 'technical', label: 'Technical', description: 'Dark, monospace, terminal' },
];

export function Converter() {
  const {
    source,
    themeId,
    pageConfig,
    pipelineOptions,
    meta,
    setSource,
    setTheme,
    setPageConfig,
    setMeta,
  } = useStore();

  const [busy, setBusy] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    try {
      const html = await renderMarkdown(source, pipelineOptions);
      await exportToPdf({
        html,
        meta: { ...meta, themeId },
        pageConfig,
        markdownCss: MARKDOWN_CSS,
        printCss: PRINT_CSS,
      });
    } catch (e) {
      alert(`Export failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar */}
      <header className="border-b border-rule bg-paper px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <a href="/" className="font-display text-xl font-medium tracking-tight text-ink">
            Scribe<span className="text-accent">Press</span>
          </a>
          <span className="text-muted font-body italic text-sm hidden md:inline">
            — markdown, set in type
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Theme selector */}
          <div className="flex items-center gap-1 bg-rule/40 rounded-sm p-0.5">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={t.description}
                className={`px-3 py-1 text-xs font-body rounded-sm transition-colors ${
                  themeId === t.id
                    ? 'bg-paper text-ink shadow-sm'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowOptions(!showOptions)}
            className="px-3 py-1.5 text-xs font-body text-muted hover:text-ink"
          >
            {showOptions ? 'Hide' : 'Options'}
          </button>

          <button
            onClick={handleExport}
            disabled={busy || source.trim().length === 0}
            className="px-5 py-1.5 bg-ink text-paper font-body text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? 'Preparing…' : 'Export PDF →'}
          </button>
        </div>
      </header>

      {/* Options drawer */}
      {showOptions && (
        <div className="border-b border-rule bg-paper/80 px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-body">
          <div className="space-y-2">
            <h3 className="font-display text-xs uppercase tracking-widest text-muted">Title page</h3>
            <input
              type="text"
              placeholder="Document title"
              value={meta.title || ''}
              onChange={(e) => setMeta({ title: e.target.value })}
              className="w-full px-3 py-1.5 bg-paper border border-rule focus:border-accent outline-none"
            />
            <input
              type="text"
              placeholder="Author"
              value={meta.author || ''}
              onChange={(e) => setMeta({ author: e.target.value })}
              className="w-full px-3 py-1.5 bg-paper border border-rule focus:border-accent outline-none"
            />
            <input
              type="text"
              placeholder="Date (e.g. October 2026)"
              value={meta.date || ''}
              onChange={(e) => setMeta({ date: e.target.value })}
              className="w-full px-3 py-1.5 bg-paper border border-rule focus:border-accent outline-none"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-xs uppercase tracking-widest text-muted">Page</h3>
            <select
              value={pageConfig.size}
              onChange={(e) =>
                setPageConfig({ size: e.target.value as 'A4' | 'Letter' | 'Legal' })
              }
              className="w-full px-3 py-1.5 bg-paper border border-rule focus:border-accent outline-none"
            >
              <option value="A4">A4</option>
              <option value="Letter">Letter</option>
              <option value="Legal">Legal</option>
            </select>
            <select
              value={pageConfig.orientation}
              onChange={(e) =>
                setPageConfig({
                  orientation: e.target.value as 'portrait' | 'landscape',
                })
              }
              className="w-full px-3 py-1.5 bg-paper border border-rule focus:border-accent outline-none"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
            <select
              value={pageConfig.margin.top}
              onChange={(e) => {
                const m = e.target.value;
                setPageConfig({ margin: { top: m, right: m, bottom: m, left: m } });
              }}
              className="w-full px-3 py-1.5 bg-paper border border-rule focus:border-accent outline-none"
            >
              <option value="0.6in">Narrow margins (0.6 in)</option>
              <option value="1in">Normal margins (1 in)</option>
              <option value="1.25in">Wide margins (1.25 in)</option>
              <option value="1.5in">Generous margins (1.5 in)</option>
            </select>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-xs uppercase tracking-widest text-muted">Privacy</h3>
            <p className="text-muted text-xs leading-relaxed">
              Your document never leaves your browser. Drafts are autosaved to your
              device's local storage. Closing this tab is safe — your work will be
              here when you return.
            </p>
          </div>
        </div>
      )}

      {/* Split pane */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="border-r border-rule overflow-hidden">
          <Editor value={source} onChange={setSource} />
        </div>
        <div className="overflow-hidden bg-paper">
          <Preview source={source} themeId={themeId} options={pipelineOptions} />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-rule bg-paper px-6 py-2 flex items-center justify-between text-xs font-body text-muted">
        <span>
          {source.length.toLocaleString()} characters —{' '}
          {Math.max(1, Math.ceil(source.split(/\s+/).filter(Boolean).length / 250))} pages est.
        </span>
        <span className="hidden md:inline italic">
          Set in Fraunces &amp; Newsreader. Composed in your browser.
        </span>
      </footer>
    </div>
  );
}
