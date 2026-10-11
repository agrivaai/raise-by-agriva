import type { Metadata } from 'next'
import { SectionPage } from '@/components/SectionPage'
export const metadata: Metadata = { title: 'গোপনীয়তা নীতি', description: 'AGRIVA-র ব্যক্তিগত তথ্য ও গোপনীয়তা নীতি।', robots: { index: false, follow: true } }
export default function Page() { return <SectionPage eyebrow="আপনার তথ্যের নিয়ন্ত্রণ" title="গোপনীয়তা নীতি" description="ব্যক্তিগত তথ্য, খামারের রেকর্ড ও analytics-এর ব্যবহার সম্পর্কে পূর্ণ নীতি প্রকাশের আগে কোনো ব্যবহারকারী-ডেটা collection চালু করা হবে না।" label="চূড়ান্ত privacy notice ও consent flow এখনো তৈরি হয়নি।"/> }
