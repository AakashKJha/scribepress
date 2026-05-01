import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms under which ScribePress is offered.',
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="May 2026">
      <h2>Acceptance</h2>
      <p>
        By using ScribePress, you accept these terms. If you do not accept them,
        please do not use the service.
      </p>

      <h2>The service</h2>
      <p>
        ScribePress is a free, browser-based tool for converting markdown to PDF.
        It is provided as-is, without warranty of any kind, express or implied.
      </p>

      <h2>Your content</h2>
      <p>
        You retain all rights to the content you process with ScribePress. We never
        receive or store your content; processing happens entirely in your browser.
        You are solely responsible for the content you produce.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to use ScribePress to:</p>
      <ul>
        <li>Produce or distribute illegal content.</li>
        <li>Infringe on the intellectual property rights of others.</li>
        <li>Attempt to disrupt or interfere with the operation of the service.</li>
      </ul>

      <h2>Limitation of liability</h2>
      <p>
        ScribePress is provided free of charge with no warranties. To the maximum
        extent permitted by law, we are not liable for any damages arising from
        your use of the service, including but not limited to loss of data,
        loss of profits, or any indirect or consequential damages.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms over time. Continued use of ScribePress after
        changes constitutes acceptance of the new terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href="mailto:hello@scribepress.app">hello@scribepress.app</a>.
      </p>
    </LegalLayout>
  );
}
