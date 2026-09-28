import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function createClient() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('[db] DATABASE_URL is missing')
  }
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const db = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

/** Safe probe used by health / login diagnostics */
export async function dbReady(): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    if (!process.env.DATABASE_URL) {
      return { ok: false, error: 'DATABASE_URL is not set in Vercel environment variables.' }
    }
    await db.$queryRaw`SELECT 1`
    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[db] connection failed:', msg)
    return { ok: false, error: msg }
  }
}
