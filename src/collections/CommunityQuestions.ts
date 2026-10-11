import type { CollectionConfig, Where } from 'payload'

const isModerator = (role?: string) => ['admin', 'editor'].includes(role ?? '')

export const CommunityQuestions: CollectionConfig = {
  slug: 'community-questions',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'moderationStatus', 'author', 'updatedAt'], description: 'প্রশ্ন public করার আগে moderationStatus=approved করে publish করুন।' },
  access: {
    read: ({ req }) => req.user && isModerator(req.user.role) ? true : { and: [{ _status: { equals: 'published' } }, { moderationStatus: { equals: 'approved' } }] } as Where,
    create: ({ req }) => Boolean(req.user && ['farmer', 'contributor', 'expert', 'editor', 'admin'].includes(req.user.role ?? '')),
    update: ({ req }) => Boolean(req.user && isModerator(req.user.role)),
    delete: ({ req }) => Boolean(req.user && isModerator(req.user.role)),
  },
  versions: { drafts: true, maxPerDoc: 10 },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'question', type: 'textarea', required: true, localized: true },
    { name: 'crop', type: 'relationship', relationTo: 'knowledge-entities' },
    { name: 'regionName', type: 'text' },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true, index: true, access: { create: () => true, update: ({ req }) => isModerator(req.user?.role) }, admin: { position: 'sidebar' } },
    { name: 'moderationStatus', type: 'select', required: true, defaultValue: 'pending', options: ['pending', 'approved', 'rejected'], access: { create: () => true, update: ({ req }) => isModerator(req.user?.role) }, admin: { position: 'sidebar' } },
    { name: 'moderationNote', type: 'textarea', access: { read: ({ req }) => isModerator(req.user?.role), create: ({ req }) => isModerator(req.user?.role), update: ({ req }) => isModerator(req.user?.role) }, admin: { position: 'sidebar' } },
  ],
  hooks: {
    beforeChange: [({ data, req }) => {
      const moderator = isModerator(req.user?.role)
      if (!req.user) throw new Error('কমিউনিটিতে প্রশ্ন জমা দিতে সাইন ইন করুন।')
      if (!moderator) {
        data.author = req.user.id
        data.moderationStatus = 'pending'
        data._status = 'draft'
      }
      if ((data._status ?? 'draft') === 'published' && data.moderationStatus !== 'approved') {
        throw new Error('প্রশ্ন public করার আগে moderator approval আবশ্যক।')
      }
      return data
    }],
  },
  timestamps: true,
}
