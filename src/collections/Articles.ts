import type { CollectionConfig, Where } from 'payload'

const canPublish = ({ req }: { req: { user?: unknown } }) => {
  const user = req.user as { role?: string } | null
  return Boolean(user && ['admin', 'editor'].includes(user.role ?? ''))
}

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'author', 'updatedAt'] },
  access: {
    read: ({ req }) => {
      if (!req.user) return { _status: { equals: 'published' } } as Where
      if (['admin', 'editor'].includes(req.user.role ?? '')) return true
      if (req.user.role === 'expert') return { or: [{ author: { equals: req.user.id } }, { assignedReviewer: { equals: req.user.id } }, { _status: { equals: 'published' } }] } as Where
      return { author: { equals: req.user.id } } as Where
    },
    create: ({ req }) => Boolean(req.user && ['contributor', 'expert', 'editor', 'admin'].includes(req.user.role ?? '')),
    update: ({ req }) => {
      if (!req.user) return false
      if (['admin', 'editor'].includes(req.user.role ?? '')) return true
      return { and: [{ author: { equals: req.user.id } }, { _status: { equals: 'draft' } }] } as Where
    },
    delete: ({ req }) => canPublish({ req }),
  },
  versions: { drafts: true, maxPerDoc: 30 },
  fields: [
    { name: 'contentKind', type: 'select', required: true, defaultValue: 'article', options: [
      { label: 'ব্লগ/গাইড', value: 'article' },
      { label: 'কৃষি টিপস', value: 'tip' },
      { label: 'কুইজ', value: 'quiz' },
    ], admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', required: true, localized: true },
    { name: 'quizQuestions', type: 'array', admin: { condition: (_, siblingData) => siblingData?.contentKind === 'quiz', description: 'কুইজ প্রকাশের আগে প্রতিটি প্রশ্ন ও সঠিক উত্তর editor-কে যাচাই করতে হবে।' }, fields: [
      { name: 'question', type: 'text', required: true, localized: true },
      { name: 'options', type: 'array', minRows: 2, maxRows: 6, fields: [{ name: 'label', type: 'text', required: true, localized: true }] },
      { name: 'correctOption', type: 'number', required: true, min: 0, admin: { description: 'শূন্য থেকে শুরু; options তালিকার সঠিক উত্তরের index' } },
      { name: 'explanation', type: 'textarea', required: true, localized: true },
    ] },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true, index: true, access: { create: ({ req }) => canPublish({ req }), update: ({ req }) => canPublish({ req }) }, admin: { position: 'sidebar' } },
    { name: 'assignedReviewer', type: 'relationship', relationTo: 'users', access: { create: ({ req }) => canPublish({ req }), update: ({ req }) => canPublish({ req }) }, admin: { position: 'sidebar' } },
    { name: 'entities', type: 'relationship', relationTo: 'knowledge-entities', hasMany: true, index: true },
    { name: 'riskLevel', type: 'select', defaultValue: 'high', options: ['low', 'medium', 'high'], access: { create: ({ req }) => canPublish({ req }), update: ({ req }) => canPublish({ req }) }, admin: { position: 'sidebar', description: 'লেখক জমা দিলে ডিফল্টভাবে high-risk থাকবে; editor/admin যাচাই করে স্তর নির্ধারণ করবেন।' } },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar', readOnly: true } },
    { name: 'sources', type: 'array', fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'publisher', type: 'text' },
      { name: 'url', type: 'text', required: true },
      { name: 'publishedAt', type: 'date' },
      { name: 'accessedAt', type: 'date', required: true },
      { name: 'supports', type: 'textarea' },
    ] },
    { name: 'seo', type: 'group', fields: [
      { name: 'title', type: 'text', localized: true },
      { name: 'description', type: 'textarea', localized: true },
      { name: 'noIndex', type: 'checkbox', defaultValue: false },
    ] },
  ],
  hooks: {
    beforeChange: [async ({ data, req, originalDoc, operation }) => {
      const role = req.user?.role ?? ''
      const isPublisher = ['admin', 'editor'].includes(role)
      if (!req.user) throw new Error('সাইন ইন করে কনটেন্ট জমা দিন।')
      if (!isPublisher) data.author = req.user.id

      // New submissions always start as drafts; only an authorized editor can
      // publish an existing record after its approval records are in place.
      if (!isPublisher || operation === 'create') data._status = 'draft'

      const riskLevel = data.riskLevel ?? originalDoc?.riskLevel
      const status = data._status ?? originalDoc?._status
      if (status === 'published') {
        const contentKind = data.contentKind ?? originalDoc?.contentKind ?? 'article'
        if (contentKind === 'quiz') {
          const questions = data.quizQuestions ?? originalDoc?.quizQuestions ?? []
          if (!questions.length) throw new Error('প্রকাশের আগে কুইজে অন্তত একটি প্রশ্ন যোগ করুন।')
          for (const question of questions) {
            const options = question.options ?? []
            if (options.length < 2 || !Number.isInteger(question.correctOption) || question.correctOption < 0 || question.correctOption >= options.length) {
              throw new Error('প্রতিটি কুইজ প্রশ্নে অন্তত দুইটি option এবং বৈধ সঠিক উত্তর নির্বাচন করুন।')
            }
          }
        }
        const sources = data.sources ?? originalDoc?.sources ?? []
        if (!sources.length) throw new Error('প্রকাশের আগে অন্তত একটি যাচাইযোগ্য তথ্যসূত্র যোগ করুন।')
        for (const source of sources) {
          try {
            const url = new URL(source.url)
            if (!['https:', 'http:'].includes(url.protocol)) throw new Error()
          } catch {
            throw new Error('তথ্যসূত্রের URL অবশ্যই বৈধ http বা https ঠিকানা হতে হবে।')
          }
        }
      }
      if (status === 'published') {
        if (!isPublisher) throw new Error('উচ্চ ঝুঁকির কৃষি-তথ্য প্রকাশের অনুমতি নেই।')
        const articleID = originalDoc?.id ?? data.id
        if (!articleID) throw new Error('আগে লেখাটি draft হিসেবে সংরক্ষণ করে review approval যোগ করুন।')
        const editorialReviews = await req.payload.find({ collection: 'content-reviews', overrideAccess: true, limit: 1, depth: 1, where: { and: [{ article: { equals: articleID } }, { reviewType: { equals: 'editorial' } }, { decision: { equals: 'approved' } }] } })
        if (!editorialReviews.docs.length) throw new Error('প্রকাশের আগে admin/editor-এর অনুমোদিত editorial review আবশ্যক।')
        data.publishedAt = originalDoc?.publishedAt ?? data.publishedAt ?? new Date().toISOString()
      }
      if (status === 'published' && riskLevel === 'high') {
        if (!isPublisher) throw new Error('উচ্চ ঝুঁকির কৃষি-তথ্য প্রকাশের অনুমতি নেই।')
        const articleID = originalDoc?.id ?? data.id
        const reviews = await req.payload.find({ collection: 'content-reviews', overrideAccess: true, limit: 1, depth: 1, where: { and: [{ article: { equals: articleID } }, { reviewType: { equals: 'agronomist' } }, { decision: { equals: 'approved' } }, { evidenceChecked: { equals: true } }] } })
        const approvedReview = reviews.docs[0] as { reviewer?: { role?: string; expertVerified?: boolean } | string | number } | undefined
        const reviewer = approvedReview?.reviewer
        if (!reviewer || typeof reviewer !== 'object' || reviewer.role !== 'expert' || !reviewer.expertVerified) throw new Error('উচ্চ ঝুঁকির লেখা প্রকাশের আগে যাচাইকৃত কৃষিবিদের প্রমাণ-সহ অনুমোদিত রিভিউ আবশ্যক।')
      }
      return data
    }],
  },
  timestamps: true,
}
