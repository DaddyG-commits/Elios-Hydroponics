'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Sprout, BarChart3, ShieldCheck, ArrowUpRight, Settings, LogOut, User } from 'lucide-react'
import { clearSession, getSession, type SessionUser } from '@/lib/user-auth'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<SessionUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setUser(getSession())
    setReady(true)
  }, [])

  const logout = () => {
    clearSession()
    router.push('/login')
  }

  const projects = [
    {
      id: '1',
      title: 'Toronto Downtown Commercial Roof',
      status: 'Active',
      system: 'Deep Water Culture (DWC)',
      area: '1,200 sq ft',
      health: '98%',
    },
    {
      id: '2',
      title: 'Vancouver Residential Terrace',
      status: 'Planning',
      system: 'Drip Irrigation',
      area: '450 sq ft',
      health: 'Pending Setup',
    },
  ]

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#f2f5f0] flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto px-5 py-8 w-full">
          <p className="text-sm text-gray-500">Loading…</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f2f5f0] text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-5 py-8 w-full space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1b4332]">Project Dashboard</h1>
            <p className="text-xs text-gray-600">
              {user ? `Welcome, ${user.name}` : 'Sign in to manage your rooftop installations.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard/settings"
                  className="inline-flex items-center gap-1.5 border border-gray-300 bg-white text-xs px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4" /> Settings
                </Link>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 border border-gray-300 bg-white text-xs px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="bg-[#1b4332] text-white text-xs px-4 py-2.5 rounded-xl font-semibold">
                  Sign in
                </Link>
                <Link href="/register" className="border border-gray-300 bg-white text-xs px-4 py-2.5 rounded-xl font-semibold">
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>

        {user && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-3">
            <h2 className="font-semibold text-sm inline-flex items-center gap-2 text-[#1b4332]">
              <User className="w-4 h-4" /> Your profile
            </h2>
            <dl className="grid sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-gray-500 text-xs">Name</dt>
                <dd className="font-medium">{user.name}</dd>
              </div>
              <div>
                <dt className="text-gray-500 text-xs">Email</dt>
                <dd className="font-medium break-all">{user.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500 text-xs">Phone (Canada)</dt>
                <dd className="font-medium">🇨🇦 {user.phone}</dd>
              </div>
              <div>
                <dt className="text-gray-500 text-xs">Address</dt>
                <dd className="font-medium">
                  {user.address}
                  <br />
                  {user.city}, {user.region} {user.postalCode}
                </dd>
              </div>
            </dl>
            <Link href="/dashboard/settings" className="text-xs font-semibold text-emerald-800 underline">
              Update your information →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-emerald-800">
              <span className="text-xs font-semibold uppercase text-gray-500">Active Systems</span>
              <Sprout className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1 System</p>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-emerald-800">
              <span className="text-xs font-semibold uppercase text-gray-500">Coverage Area</span>
              <BarChart3 className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1,650 sq ft</p>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-emerald-800">
              <span className="text-xs font-semibold uppercase text-gray-500">System Health</span>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-emerald-700">Optimal</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Your Installations</h2>

          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-gray-100 bg-[#f9faf8] hover:border-emerald-200 transition gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-gray-900">{project.title}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        project.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    System: {project.system} • Size: {project.area}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs font-medium text-gray-600">Health: {project.health}</span>
                  <button className="text-emerald-800 hover:text-emerald-900 p-1">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
