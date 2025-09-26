import 'dotenv/config'
import { config } from 'dotenv'
import { randomUUID } from 'crypto'
import { PrismaClient } from 'generated/prisma/client'
import { execSync } from 'node:child_process'
import { DomainEvents } from '@/core/events/domain-events'
import { Redis } from 'ioredis'
import { envSchema } from '@/infra/env/env'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)
const prisma = new PrismaClient()
const schemaId = randomUUID()
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

function generateUniqueDataBaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the environment variables.')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)
  return url.toString()
}

beforeAll(async () => {
  const databaseURL = generateUniqueDataBaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  DomainEvents.shouldRun = false

  await redis.flushdb()

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`)
  await prisma.$disconnect()
})
