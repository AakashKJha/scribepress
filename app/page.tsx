import type { Metadata } from 'next';
import { Converter } from '@/components/Converter';
import { FaqSection, FAQ_ITEMS } from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Markdown to PDF · Set in type, in your browser',
  description:
    'Paste markdown, get a beautifully paginated PDF. Entirely client-side. Built for the kind of writing that comes out of AI tools and deserves better than a screenshot.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      {/* The tool sits above the fold. */}
      <main className="h-screen flex flex-col">
        <Converter />
      </main>

      {/* Below the fold: the SEO content. Full landing page typography. */}
      <section className="bg-paper border-t-2 border-ink">
        <Hero />
        <How />
        <Why />
        <FaqSection items={FAQ_ITEMS} />
        <Footer />
      </section>

      {/* FAQ JSON-LD for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((q) => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: { '@type': 'Answer', text: q.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'ScribePress',
            applicationCategory: 'UtilityApplication',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            operatingSystem: 'All',
          }),
        }}
      />
    </>
  );
}

function Hero() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
      <p className="font-body italic text-muted text-sm tracking-wide mb-4">№ 01 — A converter for the patient writer</p>
      <h1 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight text-ink mb-6">
        Markdown,{' '}
        <span className="italic text-accent">set in type.</span>
      </h1>
      <p className="font-body text-xl leading-relaxed text-ink/80 mb-4">
        ScribePress turns markdown into a properly paginated PDF — with running headers,
        page numbers, hyphenated paragraphs, and code blocks that don't split mid-line.
      </p>
      <p className="font-body text-lg leading-relaxed text-muted">
        It runs entirely in your browser. Your document never leaves your device.
      </p>
    </div>
  );
}

function How() {
  const steps = [
    { n: '01', t: 'Paste', d: 'Drop markdown into the editor — from ChatGPT, Claude, your notes, anywhere.' },
    { n: '02', t: 'Compose', d: 'Pick a theme, set a title, choose page size and margins.' },
    { n: '03', t: 'Print', d: 'Click Export. A new tab opens with the paginated document. Save as PDF.' },
  ];
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 border-t border-rule">
      <h2 className="font-display text-3xl font-medium text-ink mb-12 tracking-tight">
        How it works
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((s) => (
          <div key={s.n}>
            <div className="font-display text-accent text-sm tracking-widest mb-3">{s.n}</div>
            <h3 className="font-display text-2xl text-ink mb-2">{s.t}</h3>
            <p className="font-body text-ink/75 leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Why() {
  const items = [
    {
      t: 'Real, selectable text',
      d: 'Most browser tools render PDFs as flattened images — unsearchable, large, broken for accessibility. ScribePress produces real, copy-pasteable text using the CSS Paged Media spec.',
    },
    {
      t: 'Smart pagination',
      d: 'Code blocks, tables, and images stay whole. Headings stay with their paragraphs. Orphan and widow control prevents single lines stranded at the top or bottom of pages.',
    },
    {
      t: 'Typography that respects the page',
      d: 'Justified paragraphs with hyphenation. A title page when you want one. Running headers with the document title. Page numbers in their proper place.',
    },
    {
      t: 'Your document, your machine',
      d: 'No server. No upload. No account. Drafts are autosaved to your browser. Close the tab and come back — it will all be there.',
    },
  ];
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 border-t border-rule">
      <h2 className="font-display text-3xl font-medium text-ink mb-12 tracking-tight">
        Why this exists
      </h2>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
        {items.map((it) => (
          <div key={it.t}>
            <h3 className="font-display text-xl text-ink mb-2">{it.t}</h3>
            <p className="font-body text-ink/75 leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-4 text-sm font-body text-muted">
        <div>
          <div className="font-display text-ink font-medium mb-1">
            Scribe<span className="text-accent">Press</span>
          </div>
          <div className="italic">Markdown, set in type.</div>
        </div>
        <nav className="flex gap-6">
          <a href="/about" className="hover:text-ink">About</a>
          <a href="/privacy" className="hover:text-ink">Privacy</a>
          <a href="/terms" className="hover:text-ink">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
