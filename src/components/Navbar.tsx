'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, MessageSquare, LogIn } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#f2f5f0] border-b border-gray-200 sticky top-0 z-50">
      {/* Wide logo banner across the top */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center min-w-0 flex-1">
            <Image 
              src="/logo.png" 
              alt="Elios Hydroponics" 
              width={480} 
              height={120} 
              className="h-14 sm:h-16 md:h-[72px] w-auto max-w-[85%] object-contain object-left"
              priority 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-800 shrink-0">
            <Link href="/#solutions" className="hover:text-emerald-800 transition">Solutions</Link>
            <Link href="/#why-green-roofs" className="hover:text-emerald-800 transition">Why green roofs</Link>
            <Link href="/chat" className="flex items-center gap-1.5 hover:text-emerald-800 transition">
              <MessageSquare className="w-4 h-4" /> Admin Chat
            </Link>
            <Link 
              href="/login" 
              className="bg-[#1b4332] text-white px-5 py-2 rounded-lg flex items-center gap-2 font-semibold hover:bg-emerald-900 transition"
            >
              <LogIn className="w-4 h-4" /> Sign in
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-gray-800 focus:outline-none p-1 shrink-0"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#f2f5f0] px-6 py-6 border-b border-gray-200 flex flex-col gap-5 text-gray-800 font-medium">
          <Link href="/#solutions" onClick={() => setIsOpen(false)} className="hover:text-emerald-800">Solutions</Link>
          <Link href="/#why-green-roofs" onClick={() => setIsOpen(false)} className="hover:text-emerald-800">Why green roofs</Link>
          <Link href="/chat" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-emerald-800">
            <MessageSquare className="w-4 h-4" /> Admin Chat
          </Link>
          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)} 
            className="mt-2 w-full bg-[#1b4332] text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-emerald-900 transition"
          >
            <LogIn className="w-4 h-4" /> Sign in
          </Link>
        </div>
      )}
    </nav>
  )
}
