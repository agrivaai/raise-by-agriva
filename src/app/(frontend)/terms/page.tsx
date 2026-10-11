import type { Metadata } from 'next'
import { SectionPage } from '@/components/SectionPage'
export const metadata: Metadata = { title: 'ব্যবহারের শর্ত', description: 'AGRIVA ব্যবহারের শর্তাবলি।', robots: { index: false, follow: false } }
export default function Page() { return <SectionPage eyebrow="ব্যবহারের শর্ত" title="ব্যবহারের শর্তাবলি" description="সেবা, ব্যবহারকারী কনটেন্ট, marketplace এবং কৃষি-তথ্যের সীমাবদ্ধতা নির্দিষ্ট করে চূড়ান্ত শর্ত প্রকাশ করা হবে।" label="চূড়ান্ত terms এখনো প্রকাশের জন্য প্রস্তুত নয়।"/> }
