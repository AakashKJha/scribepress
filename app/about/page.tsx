import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'About',
  description: 'A markdown-to-PDF converter that respects your document and your privacy.',
};

export default function AboutPage() {
  return (
    <LegalLayout title="About">
      <p className="lead">
        ScribePress is a markdown-to-PDF converter that takes typography seriously and
        privacy as a non-negotiable.
      </p>

      <h2>The problem</h2>
      <p>
        Most people who want to turn markdown into a PDF reach for the browser&apos;s
        Print menu. The result is rarely what anyone wants. Code blocks split across
        pages mid-line. Tables shrink to illegibility. Images crash through page
        breaks. The output looks like a printed webpage, because that is what it is.
      </p>
      <p>
        The alternatives — installing Pandoc, learning LaTeX, paying for Typora,
        uploading your document to an online converter — are each fine for someone.
        For most people most of the time, they are too much.
      </p>

      <h2>The approach</h2>
      <p>
        ScribePress uses the CSS Paged Media specification, polyfilled by the
        Paged.js library, to lay out your document on real, sized pages before your
        browser&apos;s native print engine produces the PDF. The output is selectable
        text, with running headers, page numbers, and the kind of pagination
        controls (orphan and widow control, break-inside-avoid for code and tables)
        that real typesetters care about.
      </p>
      <p>
        The whole pipeline is a single web page that runs locally in your browser.
        There is no upload, no account, no server. Drafts are autosaved to your
        browser local storage; closing the tab is safe.
      </p>

      <h2>What is next</h2>
      <p>
        ScribePress is the first tool in a planned set of small, focused utilities
        for the kind of writing that increasingly comes out of AI tools and needs
        to land somewhere serious. A markdown-to-Word converter is next. After that:
        a tool to clean conversational artifacts ({'"Sure, here\'s..."'}, {'"Let me know if..."'})
        out of AI-generated text, and a markdown-to-slides converter for presentations.
      </p>
      <p>
        Each tool will be private by default, browser-only, free, and built with the
        same attention to typography and pagination as ScribePress.
      </p>
    </LegalLayout>
  );
}
