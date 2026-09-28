'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="eh-header">
      <div className="eh-container">
        <div className="eh-nav">
          <Link href="/" className="eh-brand">
            <span className="eh-brand-mark">E</span>
            <span className="eh-brand-name">Elios Hydroponics</span>
          </Link>

          <div className="eh-nav-links">
            <Link href="/#solutions">Solutions</Link>
            <Link href="/#why">Why us</Link>
            <Link href="/#approach">Approach</Link>
            <Link href="/chat">Chat</Link>
            <Link href="/login" className="eh-btn eh-btn-primary" style={{ padding: '10px 16px' }}>
              Sign in
            </Link>
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
          <Link href="/#solutions" onClick={() => setOpen(false)}>Solutions</Link>
          <Link href="/#why" onClick={() => setOpen(false)}>Why us</Link>
          <Link href="/#approach" onClick={() => setOpen(false)}>Approach</Link>
          <Link href="/chat" onClick={() => setOpen(false)}>Chat</Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="eh-btn eh-btn-primary"
            style={{ width: '100%' }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  )
}
