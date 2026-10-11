import type { Metadata } from 'next'
import Link from 'next/link'
import { getRecentArticles } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const articles = await getRecentArticles(1)
  return { title: 'কৃষি ব্লগ ও গাইড', description: 'AGRIVA-র কৃষি বিষয়ক গাইড ও সম্পাদকীয় লেখা।', alternates: { canonical: '/blog/' }, robots: { index: articles.length > 0, follow: true } }
}

export default async function BlogPage() {
  const articles = await getRecentArticles(30)
  return <main className="simple-page container"><Link className="back-link" href="/">← AGRIVA হোম</Link><p className="eyebrow">জ্ঞান ও অভিজ্ঞতা</p><h1>কৃষি ব্লগ ও গাইড</h1><p className="simple-lede">উৎস-সহ, সম্পাদিত ও প্রয়োজনমতো কৃষিবিদ-পর্যালোচিত লেখা।</p>{articles.length ? <div className="listing-grid">{articles.map((article) => <Link className="article-card" href={`/blog/${article.slug}/`} key={article.id}><span className="article-kicker">সম্পাদিত লেখা</span><h2>{article.title}</h2><p>{article.summary}</p><span className="article-more">পড়ুন →</span></Link>)}</div> : <div className="simple-status"><span className="status-dot"/><div><strong>এখনো কোনো লেখা প্রকাশিত হয়নি</strong><p>সম্পাদকীয় যাচাই শেষ হলে প্রকাশিত গাইড এখানে দেখা যাবে।</p></div></div>}</main>
}
