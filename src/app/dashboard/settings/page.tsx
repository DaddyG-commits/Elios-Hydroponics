'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getSession, updateUser, type SessionUser } from '@/lib/user-auth'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<SessionUser | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.replace('/login')
      return
    }
    setUser(session)
    setName(session.name)
    setEmail(session.email)
    setPhone(session.phone)
    setAddress(session.address)
    setCity(session.city)
    setRegion(session.region)
    setPostalCode(session.postalCode)
  }, [router])

  const field =
    'w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800'

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setError('')
    setMessage('')
    if (password && password !== confirm) {
      setError('New passwords do not match.')
      return
    }
    setLoading(true)
    const result = await updateUser(user.id, {
      name,
      email,
      phone,
      address,
      city,
      region,
      postalCode,
      ...(password ? { password } : {}),
    })
    setLoading(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setUser(result.user)
    setPassword('')
    setConfirm('')
    setMessage('Your information was updated.')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f2f5f0] flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-lg mx-auto px-5 py-10 w-full">
          <p className="text-sm text-gray-500">Loading…</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f2f5f0] text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-lg mx-auto px-5 py-10 w-full">
        <div className="mb-5">
          <Link href="/dashboard" className="text-sm text-emerald-800 font-medium hover:underline">
            ← Back to dashboard
          </Link>
          <h1 className="text-2xl font-bold mt-2 text-[#1b4332]">Account settings</h1>
          <p className="text-sm text-gray-600 mt-1">Update your Canadian contact details or password.</p>
        </div>

        <form onSubmit={save} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Full name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={field} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Phone (Canada)</label>
            <div className="flex gap-2">
              <span className="inline-flex items-center border border-gray-300 rounded-xl px-3 text-sm bg-gray-50">🇨🇦 +1</span>
              <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Street address</label>
            <input required value={address} onChange={(e) => setAddress(e.target.value)} className={field} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
              <input required value={city} onChange={(e) => setCity(e.target.value)} className={field} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Province</label>
              <input required value={region} onChange={(e) => setRegion(e.target.value)} className={field} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Postal code</label>
            <input required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={field} />
          </div>

          <hr className="border-gray-100" />

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Change password (optional)</p>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">New password</label>
            <input
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
              placeholder="Leave blank to keep current"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm new password</label>
            <input
              type="password"
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
          {message && (
            <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1b4332] text-white py-3 rounded-xl font-semibold hover:bg-emerald-900 disabled:opacity-60"
          >
            {loading ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
