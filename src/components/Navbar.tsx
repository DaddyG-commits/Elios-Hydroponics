'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MessageSquare, LogIn } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#f2f5f0] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl text-red-600">🍁</span>
          <div>
            <span className="font-bold text-xl tracking-wider text-gray-900 block leading-tight">ELIOS</span>
            <span className="text-xs text-gray-500 tracking-widest block">HYDROPONICS</span>
          </div>
        </Link>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-gray-800 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#f2f5f0] px-6 py-6 border-b border-gray-200 flex flex-col gap-5 text-gray-800 font-medium">
          <Link href="#solutions" onClick={() => setIsOpen(false)} className="hover:text-emerald-800">Solutions</Link>
          <Link href="#why-green-roofs" onClick={() => setIsOpen(false)} className="hover:text-emerald-800">Why green roofs</Link>
          <Link href="#about" onClick={() => setIsOpen(false)} className="hover:text-emerald-800">About</Link>
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
