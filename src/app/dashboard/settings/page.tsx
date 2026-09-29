'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardShell from '@/components/DashboardShell'
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
    'w-full border border-white/15 bg-[#0a0c0a] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#6a7268] focus:outline-none focus:ring-2 focus:ring-[#c7ff45]/40'

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
      <DashboardShell title="Account settings">
        <p className="text-sm text-[#8a9288]">Loading…</p>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell title="Account settings">
      <div className="max-w-lg space-y-4">
        <p className="text-sm text-[#9aa398]">Update your Canadian contact details or password.</p>

        <form onSubmit={save} className="bg-[#141714] border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9aa398] mb-1">Full name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={field} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9aa398] mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9aa398] mb-1">Phone (Canada)</label>
            <div className="flex gap-2">
              <span className="inline-flex items-center border border-white/15 rounded-xl px-3 text-sm bg-[#0a0c0a] text-[#9aa398]">
                🇨🇦 +1
              </span>
              <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9aa398] mb-1">Street address</label>
            <input required value={address} onChange={(e) => setAddress(e.target.value)} className={field} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#9aa398] mb-1">City</label>
              <input required value={city} onChange={(e) => setCity(e.target.value)} className={field} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9aa398] mb-1">Province</label>
              <input required value={region} onChange={(e) => setRegion(e.target.value)} className={field} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9aa398] mb-1">Postal code</label>
            <input required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={field} />
          </div>

          <hr className="border-white/10" />

          <p className="text-xs font-semibold text-[#6a7268] uppercase tracking-wide">Change password (optional)</p>
          <div>
            <label className="block text-xs font-semibold text-[#9aa398] mb-1">New password</label>
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
            <label className="block text-xs font-semibold text-[#9aa398] mb-1">Confirm new password</label>
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
            <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{error}</p>
          )}
          {message && (
            <p className="text-sm text-[#c7ff45] bg-[#c7ff45]/10 border border-[#c7ff45]/20 rounded-xl px-3 py-2">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c7ff45] text-[#11150b] py-3 rounded-xl font-bold hover:brightness-105 disabled:opacity-60"
          >
            {loading ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </div>
    </DashboardShell>
  )
}
