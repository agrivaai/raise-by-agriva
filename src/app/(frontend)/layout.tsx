import type { Metadata, Viewport } from 'next'
import './styles.css'
import './features.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agriva.com.bd'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'AGRIVA — কৃষির জ্ঞান, পরিকল্পনা ও সম্ভাবনা', template: '%s | AGRIVA' },
  description: 'কৃষি-জ্ঞান, ফসলের গাইড, শেখা ও কৃষি-ব্যবসার জন্য AGRIVA—বাংলাদেশের কৃষি প্ল্যাটফর্ম।',
  applicationName: 'AGRIVA',
  openGraph: { type: 'website', locale: 'bn_BD', siteName: 'AGRIVA', title: 'AGRIVA — Growing Life. Shaping The Future.', description: 'বাংলাদেশের কৃষির জ্ঞান, শেখা ও ব্যবসার প্ল্যাটফর্ম।' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0B6B3A' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bn"><body>{children}</body></html>
}
