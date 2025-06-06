import 'dotenv/config'
import { randomUUID } from 'crypto'
import { PrismaClient } from 'generated/prisma/client'
import { execSync } from 'node:child_process'

const prisma = new PrismaClient()
const schemaId = randomUUID()

function generateUniqueDataBaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the environment variables.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)
  return url.toString()
}

beforeAll(async () => {
  const databaseURL = generateUniqueDataBaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL
  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`)
  await prisma.$disconnect()
})
