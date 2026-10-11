import type { Metadata } from 'next'
import { SectionPage } from '@/components/SectionPage'
export const metadata: Metadata = { title: 'যোগাযোগ', description: 'AGRIVA-র সঙ্গে যোগাযোগের তথ্য।', robots: { index: false, follow: true } }
export default function Page() { return <SectionPage eyebrow="আমাদের সঙ্গে কথা বলুন" title="যোগাযোগ" description="কৃষি কনটেন্টে সংশোধন, অংশীদারিত্ব বা সহায়তার জন্য যোগাযোগের মাধ্যম যাচাই করা হলে এখানে প্রকাশ করা হবে।" label="যোগাযোগ ফর্ম এখনো সংযুক্ত নয়।"/> }
