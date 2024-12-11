import './globals.css'
import type { Metadata } from 'next'
import Navigation from './components/UI/Navigation'
import { ThemeProvider } from './providers/ThemeProvider'

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
      <body>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
            <main className="container mx-auto px-4 py-8 pb-24">
              {children}
            </main>
            <Navigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
