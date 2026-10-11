import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: unknown } }) => (req.user as { role?: string } | null)?.role === 'admin'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role', type: 'select', required: true, defaultValue: 'contributor',
      options: [
        { label: 'কৃষক/পাঠক', value: 'farmer' },
        { label: 'কন্ট্রিবিউটর', value: 'contributor' },
        { label: 'কৃষিবিদ', value: 'expert' },
        { label: 'সম্পাদক', value: 'editor' },
        { label: 'অ্যাডমিন', value: 'admin' },
      ],
      access: { update: ({ req }) => isAdmin({ req }), create: ({ req }) => isAdmin({ req }) },
    },
    { name: 'expertVerified', type: 'checkbox', defaultValue: false, access: { update: ({ req }) => isAdmin({ req }) } },
    { name: 'bio', type: 'textarea' },
  ],
  access: {
    admin: ({ req }) => Boolean(req.user && ['admin', 'editor', 'expert', 'contributor'].includes(req.user.role ?? '')),
    create: ({ req }) => Boolean(req.user && ['admin', 'editor'].includes(req.user.role ?? '')),
    read: ({ req }) => isAdmin({ req }) ? true : { id: { equals: req.user?.id } },
    update: ({ req }) => isAdmin({ req }) ? true : { id: { equals: req.user?.id } },
    delete: ({ req }) => isAdmin({ req }),
  },
  timestamps: true,
}
