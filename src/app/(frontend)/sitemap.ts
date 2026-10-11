import type { MetadataRoute } from 'next'
import { getRecentArticles, getRecentQuizzes, getRecentTips } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agriva.com.bd'
  const articles = (await getRecentArticles(1000)).filter((article) => !article.seo?.noIndex)
  const tips = (await getRecentTips(1000)).filter((tip) => !tip.seo?.noIndex)
  const quizzes = (await getRecentQuizzes(1000)).filter((quiz) => !quiz.seo?.noIndex)
  const fixed = [
    '',
    '/about/',
    '/contact/',
    '/editorial-policy/',
    '/privacy/',
    '/terms/',
    ...(articles.length ? ['/blog/'] : []),
    ...(tips.length ? ['/tips/'] : []),
    ...(quizzes.length ? ['/quiz/'] : []),
  ]
  return [
    ...fixed.map((path) => ({ url: `${base}${path}`, changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : 0.5 })),
    ...articles.map((article) => ({ url: `${base}/blog/${article.slug}/`, lastModified: new Date(article.updatedAt), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...tips.map((tip) => ({ url: `${base}/blog/${tip.slug}/`, lastModified: new Date(tip.updatedAt), changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...quizzes.map((quiz) => ({ url: `${base}/quiz/${quiz.slug}/`, lastModified: new Date(quiz.updatedAt), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
