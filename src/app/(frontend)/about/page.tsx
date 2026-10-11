import type { Metadata } from 'next'
import { SectionPage } from '@/components/SectionPage'
export const metadata: Metadata = { title: 'AGRIVA সম্পর্কে', description: 'বাংলাদেশের কৃষির জ্ঞান ও ব্যবসার প্ল্যাটফর্ম AGRIVA সম্পর্কে।', robots: { index: false, follow: true } }
export default function Page() { return <SectionPage eyebrow="আমাদের উদ্দেশ্য" title="কৃষির জ্ঞান ও সম্ভাবনাকে একসঙ্গে এগিয়ে নেওয়া" description="AGRIVA কৃষক, কৃষিবিদ, শিক্ষার্থী ও কৃষি উদ্যোক্তাদের জন্য নির্ভরযোগ্য জ্ঞান ও ব্যবহারিক সহায়তার একটি বাংলাদেশি উদ্যোগ।" label="প্রতিষ্ঠান-সংক্রান্ত বিস্তারিত শিগগির যোগ হবে।"/> }
