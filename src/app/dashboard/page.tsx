'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Sprout, BarChart3, ShieldCheck, ArrowUpRight } from 'lucide-react'

export default function DashboardPage() {
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
    <div className="min-h-screen bg-[#f2f5f0] text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-5 py-8 w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1b4332]">Project Dashboard</h1>
            <p className="text-xs text-gray-600">Track and manage your rooftop greening installations.</p>
          </div>
          <button className="bg-[#1b4332] text-white text-xs px-4 py-2.5 rounded-xl font-semibold hover:bg-emerald-900 transition">
            + New Project Request
          </button>
        </div>

        {/* Stats Summary */}
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

        {/* Project List */}
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
