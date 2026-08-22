'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle auth logic here
  }

  return (
    <div className="min-h-screen bg-[#f2f5f0] text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-md mx-auto px-5 py-12 w-full flex flex-col justify-center">
        <div className="bg-white border border-gray-200 p-8 rounded-2xl space-y-6 shadow-sm">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold">Sign in to Elios</h1>
            <p className="text-xs text-gray-500">Access your rooftop project support dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1b4332] text-white py-3 rounded-xl font-semibold hover:bg-emerald-900 transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-xs text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-emerald-800 font-semibold underline">
              Create account
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
