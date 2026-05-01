export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is ScribePress really free?',
    answer:
      'Yes. ScribePress runs entirely in your browser — there are no server costs to recover. No account, no signup, no usage limits.',
  },
  {
    question: 'Does my document leave my browser?',
    answer:
      'No. Your markdown is processed locally in your browser. The PDF is generated locally. Nothing is uploaded to a server. Drafts are saved to your browser local storage so you can pick up where you left off.',
  },
  {
    question: 'Will the PDF be selectable text or just an image?',
    answer:
      'Real, selectable, copy-pasteable text. ScribePress uses the CSS Paged Media specification (via the Paged.js library) plus your browser\'s native print engine. Unlike tools that screenshot the page, the result is searchable and accessible to screen readers.',
  },
  {
    question: 'What markdown features are supported?',
    answer:
      'Standard markdown plus GitHub-Flavored Markdown: tables, strikethrough, task lists, fenced code blocks. Math equations using LaTeX syntax (inline with $...$ and display with $$...$$). Code blocks are syntax-highlighted automatically.',
  },
  {
    question: 'How do I get a title page?',
    answer:
      'Click Options in the toolbar and fill in the Title, Author, and Date fields. The first page of your PDF will be a typeset title page; subsequent pages carry a running header with the title and a page number at the bottom.',
  },
  {
    question: 'Why do code blocks and tables sometimes get pushed to the next page?',
    answer:
      'That is intentional. ScribePress treats code blocks, tables, and quotations as units that should never be split across pages. If a unit does not fit on the current page, it is moved whole to the next.',
  },
  {
    question: 'Which browsers are supported?',
    answer:
      'Chromium-based browsers (Chrome, Edge, Brave, Arc) produce the best output and are the recommended choice. Firefox and Safari work but have minor differences in print rendering. We recommend Chrome or Edge for production documents.',
  },
  {
    question: 'Can I use this for confidential documents?',
    answer:
      'Yes. Because nothing leaves your browser, ScribePress is a sensible choice for confidential or sensitive content. We never see your document and have no way to retrieve it.',
  },
  {
    question: 'How do I save the PDF?',
    answer:
      'Click Export PDF. A new tab opens with the paginated document and your browser\'s print dialog appears. Choose "Save as PDF" as the destination, then save to your computer.',
  },
  {
    question: 'Is this a replacement for Pandoc or LaTeX?',
    answer:
      'No. Pandoc and LaTeX produce typographically superior output and are the right choice for academic publishing or book-length work. ScribePress is for the much more common case: you have a markdown document and you want a clean, professional PDF without installing anything.',
  },
];

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 border-t border-rule">
      <h2 className="font-display text-3xl font-medium text-ink mb-10 tracking-tight">
        Questions
      </h2>
      <div className="divide-y divide-rule">
        {items.map((it) => (
          <details key={it.question} className="py-5 group">
            <summary className="font-display text-lg text-ink cursor-pointer list-none flex justify-between items-start gap-4">
              <span>{it.question}</span>
              <span className="text-muted group-open:rotate-45 transition-transform shrink-0 mt-1">＋</span>
            </summary>
            <p className="font-body text-ink/75 leading-relaxed mt-3 pr-8">{it.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
