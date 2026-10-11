import type { Metadata } from 'next'
import { SectionPage } from '@/components/SectionPage'
export const metadata: Metadata = { title: 'রোগ-পোকা ও ফসল সমস্যা', description: 'ফসলের সমস্যা বিষয়ে AGRIVA-র সহায়তা।', robots: { index: false, follow: false } }
export default function Page() { return <SectionPage eyebrow="ফসলের সমস্যা" title="রোগ-পোকা নির্দেশিকা প্রস্তুত হচ্ছে" description="সম্ভাব্য কারণ ও করণীয় সতর্কতার সঙ্গে উপস্থাপনের আগে কৃষি-উৎস ও review workflow তৈরি করা হচ্ছে।" label="এখানে এখনো রোগ নির্ণয় বা live AI চালু নেই।"/> }
