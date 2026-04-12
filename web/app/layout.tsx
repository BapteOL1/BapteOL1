import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Settle — Votre relocation à NYC',
  description: 'Settle simplifie votre déménagement à New York. Services, timeline, documents — tout en un.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
