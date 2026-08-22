'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MessageSquare, ArrowRight, Bot } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([
    {
      sender: 'ADMIN',
      text: "Hi! Welcome to Elios Admin Chat 💬. Tell me about your building, roof, city or project goal and we'll help you work out the next step."
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input
    if (!text.trim()) return

    setMessages((prev) => [...prev, { sender: 'USER', text }])
    if (!textToSend) setInput('')

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ADMIN',
          text: 'Thank you for reaching out! A representative will review your roof specifications and get back to you shortly.'
        }
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#f2f5f0] text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-5 py-8 space-y-6 w-full">
        <div className="space-y-2">
          <span className="text-xs tracking-widest text-emerald-800 uppercase font-semibold flex items-center gap-1">
            Admin Chat <MessageSquare className="w-3.5 h-3.5" />
          </span>
          <h1 className="text-3xl font-bold">Chat with Elios about your rooftop project.</h1>
          <p className="text-sm text-gray-600">
            Get first-step guidance on green roof concepts, planting, heat, maintenance and project preparation.
          </p>
        </div>

        {/* Sample Prompt Chips */}
        <div className="space-y-2 pt-2">
          {[
            'What information do you need to assess my roof?',
            'How can rooftop greenery reduce summer heat?',
            'What should I budget for before requesting a quote?'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="w-full text-left bg-white border border-gray-200 p-3.5 rounded-xl text-sm font-medium hover:bg-emerald-50 transition block text-gray-800"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Feed */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-4 min-h-[250px]">
          <div className="flex items-center gap-2 border-b pb-3">
            <Bot className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="text-sm font-bold">Elios Admin Chat</h3>
              <p className="text-xs text-gray-500">Support • Rooftop greening questions</p>
            </div>
          </div>

          <div className="space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-sm max-w-[85%] ${
                  msg.sender === 'USER'
                    ? 'bg-[#1b4332] text-white ml-auto'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sign in to start chatting"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
            />
            <button
              onClick={() => handleSend()}
              className="bg-[#1b4332] text-white px-5 rounded-xl flex items-center justify-center hover:bg-emerald-900 transition"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Sign in or create an account to start a private support conversation.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
