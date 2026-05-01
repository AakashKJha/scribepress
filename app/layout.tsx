import type { Metadata } from 'next';
import './globals.css';
import '@/styles/markdown.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scribepress.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ScribePress — Markdown to PDF, set in type',
    template: '%s · ScribePress',
  },
  description:
    'Convert markdown to a typographically refined PDF, entirely in your browser. Built for AI-generated drafts, technical writing, and anything that deserves better than a screenshot.',
  keywords: [
    'markdown to pdf',
    'md to pdf',
    'chatgpt to pdf',
    'claude to pdf',
    'ai output to pdf',
    'markdown converter',
    'private markdown editor',
  ],
  authors: [{ name: 'ScribePress' }],
  openGraph: {
    type: 'website',
    title: 'ScribePress — Markdown to PDF, set in type',
    description:
      'A typographically refined markdown-to-PDF converter that runs entirely in your browser.',
    url: SITE_URL,
    siteName: 'ScribePress',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScribePress — Markdown to PDF, set in type',
    description:
      'A typographically refined markdown-to-PDF converter that runs entirely in your browser.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
