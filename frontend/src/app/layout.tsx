import type { Metadata } from 'next';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import '@/styles/globals.css';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Wedding Invitation',
  description: 'A paper-inspired wedding invitation with RSVP and wishes sections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${cormorantGaramond.variable}`}>
      <body>{children}</body>
    </html>
  );
}
