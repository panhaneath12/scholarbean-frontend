import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BuyMeACoffeeWidget } from '@/components/ui/BuyMeACoffeeWidget';

export const metadata: Metadata = {
  title: 'ScholarBean — Modern Scholarship Discovery Platform for ASEAN Students',
  description:
    'Discover, understand, save, and apply for fully funded global scholarships. Aggregating verified government and university opportunities worldwide for Southeast Asian students.',
  keywords: [
    'scholarships for ASEAN students',
    'fully funded scholarships 2026',
    'MEXT scholarship Japan',
    'Chevening scholarship UK',
    'Fulbright scholarship USA',
    'study abroad scholarships',
    'Southeast Asia higher education',
  ],
  openGraph: {
    title: 'ScholarBean — Modern Scholarship Discovery Platform',
    description:
      'Find fully funded scholarships worldwide with live countdowns, document checklists, and official links.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'ScholarBean',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 68px - 340px)' }}>{children}</main>
        <Footer />
        <BuyMeACoffeeWidget />
      </body>
    </html>
  );
}
