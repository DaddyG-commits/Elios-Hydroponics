import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MessageSquare, ArrowRight, Sun, Leaf, Zap, CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f2f5f0] text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-5 py-8 space-y-12">
        {/* Hero Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
            <span>🍁</span> Canadian rooftop greening
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Turn rooftops into living climate solutions.
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Elios Hydroponics designs and builds rooftop greenery systems that bring shade, planting and cooler surfaces to Canadian buildings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link 
              href="/chat" 
              className="bg-[#1b4332] text-white px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-900 transition"
            >
              Open Admin Chat <MessageSquare className="w-4 h-4" /> <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="#solutions" 
              className="border border-gray-400 text-gray-800 px-6 py-3.5 rounded-xl font-semibold text-center hover:bg-gray-200 transition"
            >
              Explore solutions
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 pt-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Designed with practical roof, climate and maintenance considerations in mind.
          </div>
        </section>

        {/* Mission Graphic Banner */}
        <section id="about" className="bg-[#1b4332] text-white rounded-3xl p-8 space-y-4">
          <span className="text-xs tracking-widest text-emerald-300 uppercase font-semibold">Our mission</span>
          <h2 className="text-2xl sm:text-3xl font-bold">Greener rooftops. Cooler futures.</h2>
          <p className="text-emerald-100">
            We make underused roof space work harder for people, buildings and cities.
          </p>
        </section>

        {/* Feature Cards */}
        <section id="why-green-roofs" className="space-y-4">
          <span className="text-xs tracking-widest text-emerald-800 uppercase font-semibold">Why Elios</span>
          <h2 className="text-3xl font-bold">Green infrastructure with a clear purpose.</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3">
              <Sun className="w-6 h-6 text-emerald-700" />
              <h3 className="font-bold text-lg">Cooler roofs</h3>
              <p className="text-sm text-gray-600">Vegetation shades roof surfaces and helps moderate heat during warm Canadian summers.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3">
              <Leaf className="w-6 h-6 text-emerald-700" />
              <h3 className="font-bold text-lg">Smarter greenery</h3>
              <p className="text-sm text-gray-600">Purpose-designed planting systems turn unused roof area into living infrastructure.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3">
              <Zap className="w-6 h-6 text-emerald-700" />
              <h3 className="font-bold text-lg">Lower cooling demand</h3>
              <p className="text-sm text-gray-600">Green roof systems can help reduce heat flow and cooling requirements.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
              <h3 className="font-bold text-lg">Built for Canada</h3>
              <p className="text-sm text-gray-600">Solutions are planned around local climate, roof conditions and practical maintenance.</p>
            </div>
          </div>
        </section>

        {/* Four Step Approach */}
        <section id="solutions" className="bg-[#1b4332] text-white p-8 rounded-3xl space-y-6">
          <span className="text-xs tracking-widest text-emerald-300 uppercase font-semibold">The Elios Approach</span>
          <h2 className="text-3xl font-bold leading-snug">From empty roof to living layer.</h2>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-[#2d5a45] p-4 rounded-xl">
              <span className="text-emerald-300 text-xs font-bold">01</span>
              <h4 className="font-bold text-lg">Assess</h4>
              <p className="text-xs text-emerald-100">Roof, structure, exposure and goals</p>
            </div>
            <div className="bg-[#2d5a45] p-4 rounded-xl">
              <span className="text-emerald-300 text-xs font-bold">02</span>
              <h4 className="font-bold text-lg">Design</h4>
              <p className="text-xs text-emerald-100">Planting and system specification</p>
            </div>
            <div className="bg-[#2d5a45] p-4 rounded-xl">
              <span className="text-emerald-300 text-xs font-bold">03</span>
              <h4 className="font-bold text-lg">Build</h4>
              <p className="text-xs text-emerald-100">Professional installation</p>
            </div>
            <div className="bg-[#2d5a45] p-4 rounded-xl">
              <span className="text-emerald-300 text-xs font-bold">04</span>
              <h4 className="font-bold text-lg">Care</h4>
              <p className="text-xs text-emerald-100">Maintenance and seasonal support</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-4 pt-4">
          <span className="text-xs tracking-widest text-emerald-800 uppercase font-semibold">Ready to start?</span>
          <h2 className="text-3xl font-bold">Have a rooftop in mind?</h2>
          <p className="text-gray-700">Tell our support team what you are working with and get practical next-step guidance.</p>
          <Link 
            href="/chat" 
            className="inline-flex items-center gap-2 bg-[#1b4332] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-emerald-900 transition"
          >
            <MessageSquare className="w-4 h-4" /> Start a conversation
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
