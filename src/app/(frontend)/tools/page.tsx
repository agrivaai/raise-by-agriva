import type { Metadata } from 'next'
import { SectionPage } from '@/components/SectionPage'
export const metadata: Metadata = { title: 'কৃষি টুলস', description: 'কৃষিকাজের হিসাব ও পরিকল্পনার AGRIVA টুলস।', robots: { index: false, follow: false } }
export default function Page() { return <SectionPage eyebrow="কৃষি টুলস" title="ব্যবহারিক কৃষি টুলস তৈরি হচ্ছে" description="ক্যালকুলেটর চালুর আগে সূত্র, একক, স্থানীয় উপযোগিতা ও assumptions যাচাই করা হবে।" label="কোনো ক্যালকুলেটর এখনো live নয়।"/> }
