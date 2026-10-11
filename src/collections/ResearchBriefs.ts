import type { CollectionConfig } from 'payload'

const canResearch = (role?: string) => ['admin', 'editor'].includes(role ?? '')

export const ResearchBriefs: CollectionConfig = {
  slug: 'research-briefs',
  admin: {
    useAsTitle: 'topic',
    defaultColumns: ['topic', 'status', 'priority', 'updatedAt'],
    description: 'কৃষি topic-এর গবেষণা, search signal, content gap ও article plan রাখুন। এটি এখন manual editorial workspace; live web trend collection বা AI draft generation সংযুক্ত নয়।',
  },
  access: {
    admin: ({ req }) => Boolean(req.user && canResearch(req.user.role)),
    read: ({ req }) => Boolean(req.user && canResearch(req.user.role)),
    create: ({ req }) => Boolean(req.user && canResearch(req.user.role)),
    update: ({ req }) => Boolean(req.user && canResearch(req.user.role)),
    delete: ({ req }) => Boolean(req.user?.role === 'admin'),
  },
  fields: [
    { name: 'topic', type: 'text', required: true },
    { name: 'crop', type: 'relationship', relationTo: 'knowledge-entities' },
    { name: 'region', type: 'text' },
    { name: 'audience', type: 'select', options: ['smallholder-farmer', 'commercial-farmer', 'student', 'input-seller', 'general'] },
    { name: 'searchSignals', type: 'array', fields: [
      { name: 'query', type: 'text', required: true },
      { name: 'sourceName', type: 'text' },
      { name: 'sourceUrl', type: 'text' },
      { name: 'observedAt', type: 'date', required: true },
      { name: 'signalNote', type: 'textarea' },
    ] },
    { name: 'sources', type: 'array', fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'publisher', type: 'text' },
      { name: 'url', type: 'text', required: true },
      { name: 'publishedAt', type: 'date' },
      { name: 'accessedAt', type: 'date', required: true },
      { name: 'relevanceNote', type: 'textarea' },
    ] },
    { name: 'contentGap', type: 'textarea' },
    { name: 'readerNeed', type: 'textarea' },
    { name: 'proposedAngle', type: 'textarea' },
    { name: 'outline', type: 'array', fields: [{ name: 'heading', type: 'text', required: true }] },
    { name: 'riskLevel', type: 'select', required: true, defaultValue: 'high', options: ['low', 'medium', 'high'] },
    { name: 'priority', type: 'select', required: true, defaultValue: 'normal', options: ['low', 'normal', 'high'] },
    { name: 'status', type: 'select', required: true, defaultValue: 'candidate', options: ['candidate', 'researching', 'ready-for-draft', 'draft-created', 'rejected'], admin: { position: 'sidebar' } },
    { name: 'draftArticle', type: 'relationship', relationTo: 'articles', admin: { position: 'sidebar' } },
  ],
  hooks: {
    beforeChange: [({ data, req, originalDoc }) => {
      if (!canResearch(req.user?.role)) throw new Error('Research brief তৈরি বা পরিবর্তন করতে editor/admin access প্রয়োজন।')
      for (const signal of data.searchSignals ?? originalDoc?.searchSignals ?? []) {
        if (signal.sourceUrl && !isHttpUrl(signal.sourceUrl)) throw new Error('Search signal source URL বৈধ http/https হতে হবে।')
      }
      const sources = data.sources ?? originalDoc?.sources ?? []
      for (const source of sources) {
        if (!isHttpUrl(source.url)) throw new Error('Research source URL বৈধ http/https হতে হবে।')
      }
      if ((data.status ?? originalDoc?.status) === 'ready-for-draft' && !sources.length) throw new Error('Draft plan তৈরির আগে অন্তত একটি research source যোগ করুন।')
      return data
    }],
  },
  timestamps: true,
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
