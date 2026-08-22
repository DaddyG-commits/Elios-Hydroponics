'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, MessageSquare, LogIn } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#f2f5f0] border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-3 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center min-w-0 flex-1">
            <Image
              src="/logo.png"
              alt="Elios Hydroponics"
              width={1200}
              height={320}
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 480px, 560px"
              className="h-16 sm:h-[4.5rem] md:h-20 w-auto max-w-[min(100%,560px)] object-contain object-left"
              priority
              quality={95}
            />
          </Link>

          <div className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-gray-800 shrink-0">
            <Link href="/#solutions" className="hover:text-emerald-800 transition">Solutions</Link>
            <Link href="/#why-green-roofs" className="hover:text-emerald-800 transition">Why green roofs</Link>
            <Link href="/chat" className="flex items-center gap-1.5 hover:text-emerald-800 transition">
              <MessageSquare className="w-4 h-4" /> Admin Chat
            </Link>
            <Link
              href="/login"
              className="bg-[#1b4332] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold hover:bg-emerald-900 transition"
            >
              <LogIn className="w-4 h-4" /> Sign in
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 focus:outline-none p-2 -mr-1 shrink-0"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#f2f5f0] px-5 py-5 border-t border-gray-200 flex flex-col gap-4 text-gray-800 font-medium">
          <Link href="/#solutions" onClick={() => setIsOpen(false)} className="hover:text-emerald-800">Solutions</Link>
          <Link href="/#why-green-roofs" onClick={() => setIsOpen(false)} className="hover:text-emerald-800">Why green roofs</Link>
          <Link href="/chat" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-emerald-800">
            <MessageSquare className="w-4 h-4" /> Admin Chat
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="mt-1 w-full bg-[#1b4332] text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-emerald-900 transition"
          >
            <LogIn className="w-4 h-4" /> Sign in
          </Link>
        </div>
      )}
    </nav>
  )
}
