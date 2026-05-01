/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Paged.js touches window/document; we lazy-load it client-side
  // so SSR doesn't choke on it.
  experimental: {
    optimizePackageImports: ['highlight.js', '@codemirror/lang-markdown'],
  },
};

module.exports = nextConfig;
