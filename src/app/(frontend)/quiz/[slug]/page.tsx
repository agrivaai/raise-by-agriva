import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { QuizRunner } from '@/components/QuizRunner'
import { getQuiz } from '@/lib/articles'

type Props = { params: Promise<{ slug: string }> }
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const quiz = await getQuiz(slug)
  if (!quiz) return { title: 'কুইজ পাওয়া যায়নি', robots: { index: false, follow: false } }
  return { title: quiz.seo?.title || quiz.title, description: quiz.seo?.description || quiz.summary || undefined, alternates: { canonical: `/quiz/${quiz.slug}/` }, robots: { index: !quiz.seo?.noIndex, follow: true } }
}

export default async function QuizPage({ params }: Props) {
  const { slug } = await params
  const quiz = await getQuiz(slug)
  if (!quiz) notFound()
  const questions = quiz.quizQuestions ?? []
  const body = quiz.body as DefaultTypedEditorState | undefined
  return <main className="article-page container"><Link className="back-link" href="/quiz/">← সব কুইজ</Link><article><p className="eyebrow">AGRIVA শেখা</p><h1>{quiz.title}</h1>{quiz.summary && <p className="article-summary">{quiz.summary}</p>}{body ? <div className="rich-content"><RichText data={body} /></div> : null}{questions.length ? <QuizRunner questions={questions} /> : <div className="simple-status"><strong>এই কুইজের প্রশ্ন এখনো প্রকাশিত নয়।</strong></div>}{quiz.sources?.length ? <section className="article-sources"><h2>তথ্যসূত্র</h2><ol>{quiz.sources.map((source, index) => <li key={`${source.url}-${index}`}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>{source.publisher && <span> — {source.publisher}</span>}</li>)}</ol></section> : null}</article></main>
}
