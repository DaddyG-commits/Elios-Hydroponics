'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clearSession, getSession, type SessionUser } from '@/lib/user-auth'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<SessionUser | null>(null)
  const [ready, setReady] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setUser(getSession())
    setReady(true)
  }, [pathname])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const logout = () => {
    clearSession()
    setUser(null)
    setOpen(false)
    router.push('/login')
  }

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || 'U'
  const isAccountArea =
    pathname?.startsWith('/dashboard') || pathname?.startsWith('/chat')

  return (
    <header className="eh-header">
      <div className="eh-container">
        <div className="eh-nav">
          <Link href="/" className="eh-brand" style={{ color: '#f4f5f0' }}>
            <span className="eh-brand-mark">E</span>
            <span className="eh-brand-name">Elios Hydroponics</span>
          </Link>

          <div className="eh-nav-links">
            {user && isAccountArea ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/settings">Settings</Link>
                <Link href="/chat">Chat</Link>
                <Link
                  href="/dashboard"
                  className="eh-back-btn"
                  style={{ padding: '8px 14px', fontSize: 12 }}
                >
                  ← Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/#solutions">Solutions</Link>
                <Link href="/#why">Why us</Link>
                <Link href="/#approach">Approach</Link>
                <Link href="/chat">Chat</Link>
                {ready && user ? (
                  <Link
                    href="/dashboard"
                    className="eh-btn eh-btn-primary"
                    style={{ padding: '10px 16px' }}
                  >
                    Dashboard
                  </Link>
                ) : ready ? (
                  <Link
                    href="/login"
                    className="eh-btn eh-btn-primary"
                    style={{ padding: '10px 16px' }}
                  >
                    Sign in
                  </Link>
                ) : null}
              </>
            )}
          </div>

          <button
            type="button"
            className="eh-menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        <div className={`eh-mobile-menu${open ? ' open' : ''}`}>
          {user ? (
            <>
              <p className="eh-menu-section">Account</p>
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <Link href="/dashboard/settings" onClick={() => setOpen(false)}>
                Settings
              </Link>
              <Link href="/chat" onClick={() => setOpen(false)}>
                Chat
              </Link>
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>

              <div className="eh-user-card">
                <span className="eh-user-avatar">{initial}</span>
                <div className="eh-user-meta">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
              </div>

              <button type="button" className="eh-signout-btn" onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link href="/#solutions" onClick={() => setOpen(false)}>
                Solutions
              </Link>
              <Link href="/#why" onClick={() => setOpen(false)}>
                Why us
              </Link>
              <Link href="/#approach" onClick={() => setOpen(false)}>
                Approach
              </Link>
              <Link href="/chat" onClick={() => setOpen(false)}>
                Chat
              </Link>
              {ready && (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="eh-btn eh-btn-primary"
                  style={{ width: '100%' }}
                >
                  Sign in
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
