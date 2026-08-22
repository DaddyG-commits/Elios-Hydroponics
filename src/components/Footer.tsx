import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0f281e] text-white pt-12 pb-8 px-6 mt-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-red-500">🍁</span>
              <div>
                <span className="font-bold text-lg tracking-wider block leading-tight">ELIOS</span>
                <span className="text-xs text-emerald-300 tracking-widest block">HYDROPONICS</span>
              </div>
            </div>
            <p className="text-sm text-emerald-200">Greener rooftops. Cooler futures.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-bold text-emerald-300">Explore</h4>
              <ul className="space-y-1 text-emerald-100">
                <li><Link href="/#solutions">Solutions</Link></li>
                <li><Link href="/#why-green-roofs">Why green roofs</Link></li>
                <li><Link href="/chat" className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Admin Chat</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-emerald-300">Account</h4>
              <ul className="space-y-1 text-emerald-100">
                <li><Link href="/login">Sign in</Link></li>
                <li><Link href="/register">Create account</Link></li>
                <li><Link href="/admin">Admin panel</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-900 pt-6 text-xs text-emerald-400">
          © {new Date().getFullYear()} Elios Hydroponics - Canada - Built for greener cities.
        </div>
      </div>
    </footer>
  )
}
