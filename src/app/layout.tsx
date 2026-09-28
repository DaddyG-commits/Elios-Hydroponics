import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elios Hydroponics | Canadian Rooftop Greening',
  description:
    'Turn Canadian rooftops into living climate solutions. Cooler roofs, smarter greenery, built for local climate.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
