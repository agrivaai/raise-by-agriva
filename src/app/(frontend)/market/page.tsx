import type { Metadata } from 'next'
import { SectionPage } from '@/components/SectionPage'
export const metadata: Metadata = { title: 'কৃষি বাজার', description: 'কৃষিপণ্য ও ফসলের marketplace।', robots: { index: false, follow: false } }
export default function Page() { return <SectionPage eyebrow="কৃষি বাজার" title="মার্কেটপ্লেস প্রস্তুত হচ্ছে" description="যাচাইকৃত বিক্রেতা, listing, অভিযোগ ও inquiry ব্যবস্থাপনা প্রস্তুত না হওয়া পর্যন্ত এখানে কোনো পণ্য বা লেনদেন দেখানো হবে না।" label="কেনাবেচা ও পেমেন্ট এখনো চালু নয়।"/> }
