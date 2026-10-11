import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'কৃষি শেখা', description: 'কৃষি শিক্ষা ও কুইজ—AGRIVA শেখার বিভাগ।', robots: { index: false, follow: false } }
export default function Page() { return <main className="simple-page container"><p className="eyebrow">শেখা ও অনুশীলন</p><h1>কৃষি শেখা</h1><p className="simple-lede">উৎস-সহ editor-পর্যালোচিত কুইজ চালু আছে। ধারাবাহিক lesson ও অগ্রগতি-সংরক্ষণ পরের ধাপে যুক্ত হবে।</p><Link className="button" href="/quiz/">কৃষি কুইজ দেখুন</Link></main> }
