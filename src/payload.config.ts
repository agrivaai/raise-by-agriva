import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { Articles } from './collections/Articles'
import { CommunityQuestions } from './collections/CommunityQuestions'
import { ContentReviews } from './collections/ContentReviews'
import { KnowledgeEntities } from './collections/KnowledgeEntities'
import { ResearchBriefs } from './collections/ResearchBriefs'
import { Users } from './collections/Users'

const secret = process.env.PAYLOAD_SECRET
if (!secret && process.env.NODE_ENV === 'production') throw new Error('PAYLOAD_SECRET is required in production')

export default buildConfig({
  secret: secret ?? 'development-only-change-me',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  localization: { locales: [{ code: 'bn', label: 'বাংলা' }, { code: 'en', label: 'English' }], defaultLocale: 'bn', fallback: true },
  admin: { user: Users.slug, importMap: { baseDir: process.cwd() } },
  collections: [Users, Articles, ContentReviews, KnowledgeEntities, CommunityQuestions, ResearchBriefs],
  editor: lexicalEditor(),
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL ?? process.env.NETLIFY_DB_URL ?? '' } }),
  typescript: { outputFile: './src/payload-types.ts' },
})
