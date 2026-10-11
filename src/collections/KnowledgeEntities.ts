import type { CollectionConfig } from 'payload'

const isEditor = ({ req }: { req: { user?: unknown } }) => {
  const user = req.user as { role?: string } | null
  return Boolean(user && ['admin', 'editor'].includes(user.role ?? ''))
}

export const KnowledgeEntities: CollectionConfig = {
  slug: 'knowledge-entities',
  admin: { useAsTitle: 'nameBn', defaultColumns: ['nameBn', 'entityType', 'status', 'updatedAt'] },
  access: {
    read: ({ req }) => req.user ? true : { status: { equals: 'published' } },
    create: ({ req }) => Boolean(req.user && ['admin', 'editor', 'expert'].includes(req.user.role ?? '')),
    update: ({ req }) => isEditor({ req }),
    delete: ({ req }) => isEditor({ req }),
  },
  fields: [
    { name: 'entityType', type: 'select', required: true, options: ['crop', 'variety', 'pest', 'disease', 'symptom', 'soil', 'nutrient', 'practice', 'season', 'region'], index: true },
    { name: 'nameBn', type: 'text', required: true, localized: true },
    { name: 'nameEn', type: 'text', localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'aliases', type: 'array', fields: [{ name: 'value', type: 'text', required: true }, { name: 'locale', type: 'select', options: ['bn', 'en'], defaultValue: 'bn' }] },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'status', type: 'select', defaultValue: 'draft', options: ['draft', 'published', 'archived'], access: { update: ({ req }) => isEditor({ req }) } },
    { name: 'sources', type: 'array', fields: [{ name: 'title', type: 'text', required: true }, { name: 'publisher', type: 'text' }, { name: 'url', type: 'text', required: true }, { name: 'accessedAt', type: 'date', required: true }] },
  ],
  timestamps: true,
}
