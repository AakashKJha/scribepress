import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How ScribePress handles your data — which is to say, almost not at all.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 2026">
      <h2>The short version</h2>
      <p>
        Your document never leaves your browser. ScribePress does not have a server
        that processes, stores, or sees your markdown content. Conversion happens
        entirely on your device.
      </p>

      <h2>What stays on your device</h2>
      <ul>
        <li>The markdown you type or paste into the editor.</li>
        <li>The PDF generated from that markdown.</li>
        <li>Your tool preferences (theme, page size, document metadata).</li>
        <li>An autosaved draft, kept in your browser&apos;s local storage so you can return to it later.</li>
      </ul>
      <p>
        Clearing your browser data deletes all of this. We have no copy.
      </p>

      <h2>What we collect</h2>
      <p>
        ScribePress does not run analytics scripts that profile you, build advertising
        graphs, or follow you across the web. We may run lightweight,
        privacy-respecting analytics to count page views and understand which features
        are used — these collect aggregate counts, not personal data.
      </p>
      <p>
        If we display advertisements in the future, those advertisements may be
        served by third parties (such as Google AdSense) that have their own privacy
        practices. Advertisements never see the contents of your documents. We will
        update this page and surface a consent prompt before any such advertising is
        introduced.
      </p>

      <h2>Cookies</h2>
      <p>
        ScribePress itself does not set tracking cookies. Browser local storage is
        used to remember your preferences and autosave drafts; you can clear it from
        your browser settings at any time.
      </p>

      <h2>Children</h2>
      <p>
        ScribePress is suitable for general audiences. We do not knowingly collect
        information from children under 13.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Email <a href="mailto:hello@scribepress.app">hello@scribepress.app</a>.
      </p>
    </LegalLayout>
  );
}
