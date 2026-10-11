import type { CollectionConfig, Where } from 'payload'

const isEditor = (value?: unknown) => {
  const user = value as { role?: string } | null | undefined
  return Boolean(user && ['admin', 'editor'].includes(user.role ?? ''))
}

export const ContentReviews: CollectionConfig = {
  slug: 'content-reviews',
  admin: { useAsTitle: 'decision', defaultColumns: ['article', 'reviewType', 'decision', 'reviewer', 'createdAt'] },
  access: {
    read: ({ req }) => !req.user ? false : isEditor(req.user) ? true : { reviewer: { equals: req.user.id } },
    create: ({ req }) => Boolean(req.user && ['admin', 'editor', 'expert'].includes(req.user.role ?? '')),
    update: ({ req }) => req.user?.role === 'expert' ? { and: [{ reviewer: { equals: req.user.id } }, { decision: { equals: 'pending' } }] } as Where : false,
    delete: ({ req }) => isEditor(req.user),
  },
  fields: [
    { name: 'article', type: 'relationship', relationTo: 'articles', required: true, index: true, access: { update: ({ req }) => isEditor(req.user) } },
    { name: 'reviewer', type: 'relationship', relationTo: 'users', required: true, index: true, access: { update: ({ req }) => isEditor(req.user) } },
    { name: 'reviewType', type: 'select', required: true, options: ['editorial', 'agronomist'], access: { update: ({ req }) => isEditor(req.user) } },
    { name: 'decision', type: 'select', required: true, defaultValue: 'pending', options: ['pending', 'approved', 'changes-requested', 'rejected'] },
    { name: 'notes', type: 'textarea', required: true },
    { name: 'evidenceChecked', type: 'checkbox', defaultValue: false, access: { update: ({ req }) => isEditor(req.user) } },
  ],
  hooks: {
    beforeChange: [async ({ data, req, operation, originalDoc }) => {
      const role = req.user?.role ?? ''
      if (!req.user) throw new Error('রিভিউ জমা দিতে সাইন ইন করুন।')
      if (role === 'expert' && operation === 'create') {
        if (!req.user.expertVerified) throw new Error('কৃষিবিদ পরিচয় যাচাই না হওয়া পর্যন্ত রিভিউ জমা দেওয়া যাবে না।')
        const articleValue = data.article
        const articleID = typeof articleValue === 'object' && articleValue !== null ? articleValue.id : articleValue
        if (!articleID) throw new Error('রিভিউয়ের জন্য লেখা নির্বাচন করুন।')
        const article = await req.payload.findByID({ collection: 'articles', id: articleID, overrideAccess: true })
        const assignedValue = article.assignedReviewer
        const assignedID = typeof assignedValue === 'object' && assignedValue !== null ? assignedValue.id : assignedValue
        if (String(assignedID) !== String(req.user.id)) throw new Error('এই লেখাটি আপনার review queue-তে বরাদ্দ নেই।')
        data.reviewer = req.user.id
        data.reviewType = 'agronomist'
        data.decision = 'pending'
      }
      if (role !== 'expert' && data.reviewType === 'agronomist') throw new Error('কৃষিবিদ রিভিউ কেবল বরাদ্দপ্রাপ্ত, যাচাইকৃত কৃষিবিদই জমা দিতে পারবেন।')
      if (role === 'expert' && data.decision === 'approved' && !req.user.expertVerified) {
        throw new Error('পরিচয় যাচাই না হওয়া পর্যন্ত কৃষিবিদ রিভিউ অনুমোদন করা যাবে না।')
      }
      if (role === 'expert' && operation === 'update' && data.decision === 'approved' && !data.evidenceChecked) {
        data.evidenceChecked = true
      }

      const articleValue = data.article ?? originalDoc?.article
      const articleID = typeof articleValue === 'object' && articleValue !== null ? articleValue.id : articleValue
      if (articleID && ['admin', 'editor', 'expert'].includes(role)) {
        const article = await req.payload.findByID({ collection: 'articles', id: articleID, overrideAccess: true })
        const authorValue = article.author
        const authorID = typeof authorValue === 'object' && authorValue !== null ? authorValue.id : authorValue
        const reviewerID = role === 'expert'
          ? req.user.id
          : typeof data.reviewer === 'object' && data.reviewer !== null
            ? data.reviewer.id
            : data.reviewer ?? req.user.id
        if (String(authorID) === String(reviewerID)) throw new Error('নিজের লেখা নিজে review বা approve করা যাবে না।')

        if (role !== 'expert' && operation === 'create') data.reviewer = req.user.id
      }
      return data
    }],
  },
  timestamps: true,
}
