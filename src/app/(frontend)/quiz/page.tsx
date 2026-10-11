import type { Metadata } from 'next'
import Link from 'next/link'
import { getRecentQuizzes } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const quizzes = await getRecentQuizzes(1)
  return { title: 'কৃষি কুইজ', description: 'ফসল ও কৃষি বিষয়ে শেখার জন্য উৎস-সহ AGRIVA কুইজ।', alternates: { canonical: '/quiz/' }, robots: { index: quizzes.length > 0, follow: true } }
}

export default async function QuizIndexPage() {
  const quizzes = await getRecentQuizzes()
  return <main className="simple-page container"><Link className="back-link" href="/learning/">← শেখার বিভাগ</Link><p className="eyebrow">শিখুন, অনুশীলন করুন</p><h1>কৃষি কুইজ</h1><p className="simple-lede">প্রতিটি quiz সম্পাদকীয়ভাবে যাচাই করা এবং প্রাসঙ্গিক তথ্যসূত্র-সহ প্রকাশিত হবে।</p>{quizzes.length ? <div className="listing-grid">{quizzes.map((quiz) => <Link className="article-card" href={`/quiz/${quiz.slug}/`} key={quiz.id}><span className="article-kicker">AGRIVA শেখা</span><h2>{quiz.title}</h2><p>{quiz.summary}</p><span className="article-more">কুইজ শুরু করুন →</span></Link>)}</div> : <div className="simple-status"><span className="status-dot"/><div><strong>কুইজ প্রস্তুত হচ্ছে</strong><p>যাচাইকৃত quiz প্রকাশ হলে এখানে দেখা যাবে।</p></div></div>}</main>
}
