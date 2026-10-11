import type { Metadata } from 'next'
import Link from 'next/link'
import { getCMS } from '@/lib/payload'

export const metadata: Metadata = { title: 'সার্চ', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q?.trim().slice(0, 100) ?? ''
  const cms = await getCMS()
  const results = query && cms ? await cms.find({ collection: 'articles', where: { and: [{ _status: { equals: 'published' } }, { contentKind: { in: ['article', 'tip', 'quiz'] } }, { or: [{ title: { contains: query } }, { summary: { contains: query } }] }] }, limit: 20, locale: 'bn' }) : null
  return <main className="simple-page container"><Link className="back-link" href="/">← AGRIVA হোম</Link><p className="eyebrow">কৃষি জ্ঞান খুঁজুন</p><h1>সার্চ</h1><form className="search-form search-page-form" action="/search/"><label className="sr-only" htmlFor="q">সার্চ শব্দ</label><input id="q" name="q" defaultValue={query} placeholder="ফসল, রোগ-পোকা বা গাইড"/><button className="button">খুঁজুন</button></form>{!query ? <p className="simple-lede">কোনো ফসল বা বিষয় লিখে খুঁজুন।</p> : results?.docs.length ? <div className="listing-grid">{results.docs.map((item) => { const kind = item.contentKind; const href = kind === 'quiz' ? `/quiz/${item.slug}/` : `/blog/${item.slug}/`; return <Link className="article-card" href={href} key={item.id}><span className="article-kicker">{kind === 'quiz' ? 'কৃষি কুইজ' : kind === 'tip' ? 'কৃষি টিপস' : 'কৃষি গাইড'}</span><h2>{item.title}</h2><p>{item.summary}</p></Link>})}</div> : <div className="simple-status"><strong>কোনো প্রকাশিত লেখা মেলেনি</strong><p>বানান বা শব্দ বদলে চেষ্টা করুন, অথবা AGRIVA-র কৃষি গাইড দেখুন।</p></div>}</main>
}
