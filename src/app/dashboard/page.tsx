'use client'

import Link from 'next/link'
import { Sprout, BarChart3, ShieldCheck, ArrowUpRight, Settings, User } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'
import { getSession, type SessionUser } from '@/lib/user-auth'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [user, setUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    setUser(getSession())
  }, [])

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

  return (
    <DashboardShell title="Project Dashboard">
      <div className="space-y-6 max-w-5xl">
        <p className="text-sm text-[#9aa398]">
          {user ? `Welcome back, ${user.name}` : 'Manage your rooftop installations.'}
        </p>

        {user && (
          <div className="bg-[#141714] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-sm inline-flex items-center gap-2 text-[#c7ff45]">
                <User className="w-4 h-4" /> Your profile
              </h2>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c7ff45] hover:underline"
              >
                <Settings className="w-3.5 h-3.5" /> Edit
              </Link>
            </div>
            <dl className="grid sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[#6a7268] text-xs">Name</dt>
                <dd className="font-medium text-white">{user.name}</dd>
              </div>
              <div>
                <dt className="text-[#6a7268] text-xs">Email</dt>
                <dd className="font-medium text-white break-all">{user.email}</dd>
              </div>
              <div>
                <dt className="text-[#6a7268] text-xs">Phone (Canada)</dt>
                <dd className="font-medium text-white">🇨🇦 {user.phone}</dd>
              </div>
              <div>
                <dt className="text-[#6a7268] text-xs">Address</dt>
                <dd className="font-medium text-white">
                  {user.address}
                  <br />
                  {user.city}, {user.region} {user.postalCode}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#141714] border border-white/10 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[#c7ff45]">
              <span className="text-xs font-semibold uppercase text-[#6a7268]">Active Systems</span>
              <Sprout className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-white">1 System</p>
          </div>
          <div className="bg-[#141714] border border-white/10 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[#c7ff45]">
              <span className="text-xs font-semibold uppercase text-[#6a7268]">Coverage Area</span>
              <BarChart3 className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-white">1,650 sq ft</p>
          </div>
          <div className="bg-[#141714] border border-white/10 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[#c7ff45]">
              <span className="text-xs font-semibold uppercase text-[#6a7268]">System Health</span>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-[#c7ff45]">Optimal</p>
          </div>
        </div>

        <div id="installations" className="bg-[#141714] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Your Installations</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-white/10 bg-[#0a0c0a] hover:border-[#c7ff45]/30 transition gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm text-white">{project.title}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        project.status === 'Active'
                          ? 'bg-[#c7ff45]/15 text-[#c7ff45]'
                          : 'bg-amber-500/15 text-amber-300'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#8a9288]">
                    System: {project.system} • Size: {project.area}
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs font-medium text-[#9aa398]">Health: {project.health}</span>
                  <span className="text-[#c7ff45] p-1">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
