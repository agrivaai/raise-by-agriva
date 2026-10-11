import type { Metadata } from 'next'
import { SectionPage } from '@/components/SectionPage'
export const metadata: Metadata = { title: 'কৃষি-পরামর্শ', description: 'উৎস-ভিত্তিক কৃষি পরামর্শ ও গাইড।', robots: { index: false, follow: false } }
export default function Page() { return <SectionPage eyebrow="কৃষি-পরামর্শ" title="কৃষি-পরামর্শ বিভাগ প্রস্তুত হচ্ছে" description="যাচাইকৃত উৎস ও বিশেষজ্ঞ review ছাড়া AGRIVA এখানে কোনো crop advice প্রকাশ করবে না।" label="এই ফিচার এখনো চালু হয়নি।"/> }
