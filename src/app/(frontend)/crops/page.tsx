import type { Metadata } from 'next'
import { SectionPage } from '@/components/SectionPage'
export const metadata: Metadata = { title: 'ফসলের গাইড', description: 'ফসলভিত্তিক AGRIVA গাইড।', robots: { index: false, follow: false } }
export default function Page() { return <SectionPage eyebrow="ফসলের গাইড" title="ফসলের জ্ঞানভাণ্ডার তৈরি হচ্ছে" description="প্রতিটি ফসলের পাতায় উৎস, অঞ্চল ও review status থাকবে। যাচাইকৃত কনটেন্ট প্রস্তুত হলে এখানে প্রকাশিত হবে।" label="এখনো কোনো ফসলের গাইড প্রকাশিত হয়নি।"/> }
