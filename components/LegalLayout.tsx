import Link from 'next/link';

interface LegalLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-rule px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-medium tracking-tight text-ink">
            Scribe<span className="text-accent">Press</span>
          </Link>
          <Link href="/" className="font-body text-sm text-muted hover:text-ink">
            ← Back to converter
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-5xl font-medium tracking-tight text-ink mb-2">
          {title}
        </h1>
        {lastUpdated && (
          <p className="font-body italic text-muted text-sm mb-12">
            Last updated: {lastUpdated}
          </p>
        )}
        <div className="prose-content font-body text-ink/85 leading-relaxed">
          {children}
        </div>
      </article>

      <footer className="border-t border-rule mt-20">
        <div className="max-w-3xl mx-auto px-6 py-8 flex justify-between text-sm font-body text-muted">
          <span>
            <span className="font-display text-ink">Scribe<span className="text-accent">Press</span></span>
            <span className="italic"> — Markdown, set in type.</span>
          </span>
          <nav className="flex gap-6">
            <Link href="/about" className="hover:text-ink">About</Link>
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/terms" className="hover:text-ink">Terms</Link>
          </nav>
        </div>
      </footer>

      <style>{`
        .prose-content h2 {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 500;
          color: #1A1614;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }
        .prose-content p { margin-bottom: 1rem; font-size: 1.05rem; }
        .prose-content .lead {
          font-size: 1.25rem;
          font-style: italic;
          color: #6B5D52;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .prose-content ul {
          padding-left: 1.5rem;
          margin: 1rem 0;
          list-style-type: disc;
        }
        .prose-content li { margin: 0.4rem 0; }
        .prose-content ul li::marker { color: #A8321E; }
        .prose-content a {
          color: #A8321E;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose-content a:hover { color: #1A1614; }
      `}</style>
    </div>
  );
}
