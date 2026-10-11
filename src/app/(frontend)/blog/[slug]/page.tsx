import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { getArticle } from '@/lib/articles'

type Props = { params: Promise<{ slug: string }> }
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'লেখা পাওয়া যায়নি', robots: { index: false, follow: false } }
  return { title: article.seo?.title || article.title, description: article.seo?.description || article.summary || undefined, alternates: { canonical: `/blog/${article.slug}/` }, robots: { index: !article.seo?.noIndex, follow: true }, openGraph: { type: 'article', title: article.seo?.title || article.title, description: article.seo?.description || article.summary || undefined, publishedTime: article.publishedAt || undefined, modifiedTime: article.updatedAt } }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()
  const body = article.body as DefaultTypedEditorState | undefined
  const author = typeof article.author === 'object' && article.author ? article.author.name ?? 'লেখক' : 'লেখক'
  return <main className="article-page container"><Link className="back-link" href="/blog/">← সব লেখা</Link><article><p className="eyebrow">{article.contentKind === 'tip' ? 'AGRIVA কৃষি টিপস' : 'AGRIVA কৃষি গাইড'}</p><h1>{article.title}</h1>{article.summary && <p className="article-summary">{article.summary}</p>}<div className="article-byline">লেখক: {author}{article.publishedAt ? ` · প্রকাশিত: ${new Date(article.publishedAt).toLocaleDateString('bn-BD')}` : ''} · সর্বশেষ হালনাগাদ: {new Date(article.updatedAt).toLocaleDateString('bn-BD')}</div>{body ? <div className="rich-content"><RichText data={body} /></div> : <div className="simple-status"><strong>এই লেখার মূল কনটেন্ট উপলভ্য নয়।</strong></div>}{article.sources?.length ? <section className="article-sources"><h2>তথ্যসূত্র</h2><ol>{article.sources.map((source, index) => <li key={`${source.url}-${index}`}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>{source.publisher && <span> — {source.publisher}</span>}</li>)}</ol></section> : null}<aside className="source-note"><strong>তথ্য যাচাই করুন</strong><p>কৃষি-পরামর্শের ক্ষেত্রে স্থানীয় অবস্থা ও অনুমোদিত নির্দেশনা বিবেচনা করুন। ভুল বা পুরোনো তথ্য পেলে AGRIVA-কে জানান।</p></aside></article></main>
}
