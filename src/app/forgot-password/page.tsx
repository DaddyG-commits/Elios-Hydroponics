'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { requestPasswordReset } from '@/lib/user-auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [resetPath, setResetPath] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const result = await requestPasswordReset(email)
    setLoading(false)
    setDone(true)
    if (result.ok && result.token) {
      setResetPath(`/reset-password?token=${encodeURIComponent(result.token)}`)
    } else {
      setResetPath(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#f2f5f0] text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-md mx-auto w-full px-5 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-7 space-y-5 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold">Reset password</h1>
            <p className="text-sm text-gray-600 mt-1">Enter the email on your Elios account.</p>
          </div>

          {!done ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1b4332] text-white py-3 rounded-xl font-semibold hover:bg-emerald-900 disabled:opacity-60"
              >
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                If an account exists for that email, a reset link is ready. In production this would be
                emailed; for this site the link is shown below when the account is found.
              </p>
              {resetPath ? (
                <Link
                  href={resetPath}
                  className="block text-center bg-[#1b4332] text-white py-3 rounded-xl font-semibold hover:bg-emerald-900"
                >
                  Continue to set a new password
                </Link>
              ) : (
                <p className="text-gray-500">You can try again or contact support if needed.</p>
              )}
            </div>
          )}

          <p className="text-xs text-center text-gray-600">
            <Link href="/login" className="text-emerald-800 font-semibold underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
