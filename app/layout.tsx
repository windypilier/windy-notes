import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Windy Notes',
  description: 'Application d\'interprétation trilingue avec versets bibliques',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
