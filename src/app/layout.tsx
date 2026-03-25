import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import './globals.css';

const inter = localFont({
  src: [
    { path: '../fonts/Inter-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Inter-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Inter-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/Inter-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = localFont({
  src: [
    { path: '../fonts/PlayfairDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/PlayfairDisplay-Regular.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/PlayfairDisplay-Regular.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BANT Colon Hydrotherapy | Professional Colon Cleansing in Roodepoort',
    template: '%s | BANT Colon Hydrotherapy',
  },
  description:
    'Professional colon hydrotherapy in Little Falls, Roodepoort. Improve digestion, boost energy, and support detoxification in a calm, private environment. Book your session today.',
  keywords: [
    'colon hydrotherapy Johannesburg',
    'colon cleanse South Africa',
    'colonics near me',
    'detox colon therapy',
    'gut health treatment',
    'bloating relief treatment',
    'natural detox therapy',
    'colon hydrotherapy Roodepoort',
  ],
  openGraph: {
    title: 'BANT Colon Hydrotherapy | Gentle Colon Cleansing for Total Body Wellness',
    description:
      'Restore your digestive health, energy, and vitality in a calm, private, and professional environment.',
    type: 'website',
    locale: 'en_ZA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />

        {/* LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HealthAndBeautyBusiness',
              name: 'BANT Colon Hydrotherapy',
              description: 'Professional colon hydrotherapy in Roodepoort, South Africa.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Shop 7, Cascades Shopping Centre, 757 Victoria Avenue',
                addressLocality: 'Little Falls, Roodepoort',
                addressRegion: 'Gauteng',
                addressCountry: 'ZA',
              },
              telephone: '+27703097174',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '17:00',
                },
              ],
              priceRange: '$$',
            }),
          }}
        />
      </body>
    </html>
  );
}
