import config from '@payload-config'
import { getPayload } from 'payload'

let payloadPromise: ReturnType<typeof getPayload> | undefined

export function getCMS() {
  if (!process.env.DATABASE_URL && !process.env.NETLIFY_DB_URL) return null
  payloadPromise ??= getPayload({ config })
  return payloadPromise
}
