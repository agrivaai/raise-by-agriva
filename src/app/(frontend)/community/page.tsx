import type { Metadata } from 'next'
import Link from 'next/link'
import { getCommunityQuestions } from '@/lib/articles'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'কৃষি কমিউনিটি', description: 'সম্পাদিত কৃষি প্রশ্ন ও অভিজ্ঞতা—AGRIVA কমিউনিটি।', alternates: { canonical: '/community/' }, robots: { index: false, follow: true } }

export default async function CommunityPage() {
  const questions = await getCommunityQuestions()
  return <main className="simple-page container"><Link className="back-link" href="/">← AGRIVA হোম</Link><p className="eyebrow">কৃষক, কৃষিবিদ ও শেখার সঙ্গী</p><h1>কৃষি কমিউনিটি</h1><p className="simple-lede">প্রশ্ন ও অভিজ্ঞতা moderator যাচাইয়ের পর প্রকাশিত হয়। ব্যক্তিগত ফোন নম্বর, ঠিকানা বা জমির সুনির্দিষ্ট অবস্থান লিখবেন না।</p>{questions.length ? <div className="community-list">{questions.map((item) => <article className="community-question" key={item.id}><h2>{item.title}</h2><p>{item.question}</p>{item.regionName && <small>অঞ্চল: {item.regionName}</small>}</article>)}</div> : <div className="simple-status"><span className="status-dot"/><div><strong>কমিউনিটি প্রশ্নোত্তর প্রস্তুত হচ্ছে</strong><p>moderation ও account ব্যবস্থা চালু হলে সদস্যরা প্রশ্ন জমা দিতে পারবেন। বর্তমানে কোনো user question submission live নয়।</p></div></div>}<p className="community-contact">কৃষি-তথ্যে ভুল বা ঝুঁকিপূর্ণ পরামর্শ দেখলে <Link href="/contact/">AGRIVA-কে জানান</Link>।</p></main>
}
