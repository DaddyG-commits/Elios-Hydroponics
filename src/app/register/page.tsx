'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { registerUser } from '@/lib/user-auth'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const field =
    'w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    const result = await registerUser({
      name,
      email,
      phone,
      address,
      city,
      region,
      postalCode,
      password,
    })
    setLoading(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f2f5f0] text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-lg mx-auto px-5 py-10 w-full">
        <div className="bg-white border border-gray-200 p-7 rounded-2xl space-y-5 shadow-sm">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-xs text-gray-500">Elios Hydroponics · Canada 🍁</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full name *</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Jane Doe" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Phone (Canada) *</label>
              <div className="flex gap-2">
                <span className="inline-flex items-center border border-gray-300 rounded-xl px-3 text-sm bg-gray-50 whitespace-nowrap">
                  🇨🇦 +1
                </span>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={field}
                  placeholder="416-555-1234"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Street address *</label>
              <input required value={address} onChange={(e) => setAddress(e.target.value)} className={field} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">City *</label>
                <input required value={city} onChange={(e) => setCity(e.target.value)} className={field} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Province *</label>
                <input required value={region} onChange={(e) => setRegion(e.target.value)} className={field} placeholder="ON" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Postal code *</label>
              <input required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={field} placeholder="M5V 2T6" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
                autoComplete="new-password"
              />
              <p className="text-[11px] text-gray-500 mt-1">At least 6 characters</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm password *</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={field}
                autoComplete="new-password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1b4332] text-white py-3 rounded-xl font-semibold hover:bg-emerald-900 transition disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="text-xs text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-800 font-semibold underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
