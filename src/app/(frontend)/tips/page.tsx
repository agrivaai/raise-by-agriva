import type { Metadata } from 'next'
import Link from 'next/link'
import { getRecentTips } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const tips = await getRecentTips(1)
  return { title: 'কৃষি টিপস', description: 'উৎস-সহ AGRIVA কৃষি টিপস।', alternates: { canonical: '/tips/' }, robots: { index: tips.length > 0, follow: true } }
}

export default async function TipsPage() {
  const tips = await getRecentTips()
  return <main className="simple-page container"><Link className="back-link" href="/">← AGRIVA হোম</Link><p className="eyebrow">ছোট পরামর্শ, যাচাইকৃত তথ্য</p><h1>কৃষি টিপস</h1><p className="simple-lede">কৃষিবিদ ও সম্পাদকীয় পর্যালোচনায় প্রকাশিত উৎস-সহ টিপস।</p>{tips.length ? <div className="listing-grid">{tips.map((tip) => <Link className="article-card" href={`/blog/${tip.slug}/`} key={tip.id}><span className="article-kicker">উৎস-সহ কৃষি টিপস</span><h2>{tip.title}</h2><p>{tip.summary}</p><span className="article-more">বিস্তারিত পড়ুন →</span></Link>)}</div> : <div className="simple-status"><span className="status-dot"/><div><strong>এখনো কোনো tip প্রকাশিত হয়নি</strong><p>সম্পাদকীয় ও প্রয়োজনীয় কৃষিবিদ যাচাই শেষে টিপস এখানে প্রকাশিত হবে।</p></div></div>}</main>
}
