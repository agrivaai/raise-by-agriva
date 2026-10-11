import config from '../src/payload.config'
import { getPayload } from 'payload'

const email = process.env.BOOTSTRAP_ADMIN_EMAIL
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD
const name = process.env.BOOTSTRAP_ADMIN_NAME

if (!email || !password || !name) throw new Error('Set BOOTSTRAP_ADMIN_EMAIL, BOOTSTRAP_ADMIN_PASSWORD and BOOTSTRAP_ADMIN_NAME for this one-time command.')
if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) throw new Error('DATABASE_URL and PAYLOAD_SECRET are required.')

const payload = await getPayload({ config })
const existingAdmins = await payload.find({ collection: 'users', overrideAccess: true, where: { role: { equals: 'admin' } }, limit: 1 })
if (existingAdmins.totalDocs) throw new Error('An admin account already exists. Bootstrap is disabled.')

await payload.create({
  collection: 'users',
  overrideAccess: true,
  data: { email, password, name, role: 'admin' },
})

payload.logger.info('Initial AGRIVA administrator created. Remove bootstrap environment values after this one-time operation.')
process.exit(0)
