import { getCMS } from './payload'

export type PublicArticle = {
  id: string | number
  title: string
  slug: string
  summary?: string | null
  updatedAt: string
  publishedAt?: string | null
  author?: { name?: string | null } | string | number | null
  assignedReviewer?: { name?: string | null } | string | number | null
  body?: unknown
  sources?: { title: string; publisher?: string | null; url: string; accessedAt: string }[] | null
  seo?: { title?: string | null; description?: string | null; noIndex?: boolean | null } | null
  contentKind?: 'article' | 'tip' | 'quiz' | null
  quizQuestions?: { question: string; options: { label: string }[]; correctOption: number; explanation: string }[] | null
}

async function getRecentByKind(kinds: string[], limit: number): Promise<PublicArticle[]> {
  const cms = await getCMS()
  if (!cms) return []
  const result = await cms.find({
    collection: 'articles',
    where: { and: [{ _status: { equals: 'published' } }, { contentKind: { in: kinds } }] },
    sort: '-publishedAt',
    limit,
    locale: 'bn',
    depth: 1,
  })
  return result.docs as PublicArticle[]
}

export function getRecentArticles(limit = 4): Promise<PublicArticle[]> {
  return getRecentByKind(['article'], limit)
}

export function getRecentTips(limit = 30): Promise<PublicArticle[]> {
  return getRecentByKind(['tip'], limit)
}

export function getRecentQuizzes(limit = 30): Promise<PublicArticle[]> {
  return getRecentByKind(['quiz'], limit)
}

export async function getArticle(slug: string): Promise<PublicArticle | null> {
  const cms = await getCMS()
  if (!cms) return null
  const result = await cms.find({
    collection: 'articles',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }, { contentKind: { in: ['article', 'tip'] } }] },
    limit: 1,
    locale: 'bn',
    depth: 1,
  })
  return (result.docs[0] as PublicArticle | undefined) ?? null
}

export async function getCommunityQuestions(limit = 20) {
  const cms = await getCMS()
  if (!cms) return []
  const result = await cms.find({
    collection: 'community-questions',
    where: { and: [{ _status: { equals: 'published' } }, { moderationStatus: { equals: 'approved' } }] },
    sort: '-updatedAt',
    limit,
    locale: 'bn',
    depth: 1,
  })
  return result.docs as { id: string | number; title: string; slug: string; question: string; regionName?: string | null; updatedAt: string }[]
}

export async function getQuiz(slug: string): Promise<PublicArticle | null> {
  const cms = await getCMS()
  if (!cms) return null
  const result = await cms.find({
    collection: 'articles',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }, { contentKind: { equals: 'quiz' } }] },
    limit: 1,
    locale: 'bn',
    depth: 1,
  })
  return (result.docs[0] as PublicArticle | undefined) ?? null
}
