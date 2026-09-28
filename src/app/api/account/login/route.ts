import { NextResponse } from 'next/server'
import { db, dbReady } from '@/lib/db'
import { hashPassword, publicUser } from '@/lib/password'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = String(body.email || '').trim().toLowerCase()
    const password = String(body.password || '')

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'Email and password are required.' }, { status: 400 })
    }

    const ready = await dbReady()
    if (!ready.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Database unavailable. Set DATABASE_URL and DIRECT_URL in Vercel (Neon pooler + direct), then redeploy. ' +
            (ready.error.includes('P1001') || ready.error.includes('connect')
              ? 'Connection refused — check the Neon string and that the project is active.'
              : ready.error.slice(0, 160)),
        },
        { status: 503 }
      )
    }

    const user = await db.user.findUnique({ where: { email } })
    if (!user || user.password !== hashPassword(password)) {
      return NextResponse.json({ ok: false, error: 'Invalid email or password.' }, { status: 401 })
    }
    return NextResponse.json({ ok: true, user: publicUser(user) })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[login]', msg)
    return NextResponse.json(
      {
        ok: false,
        error:
          msg.includes('does not exist') || msg.includes('P2021')
            ? 'Database tables missing. Run: npx prisma db push'
            : 'Login failed. Check Neon DATABASE_URL / DIRECT_URL and redeploy.',
      },
      { status: 500 }
    )
  }
}
