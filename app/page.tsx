"use client"

import { useState } from 'react'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-pink-100 to-purple-100'}`}>
      <main className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            Windy Notes
          </h1>
          <p className="text-gray-600">
            Application d'interprétation trilingue avec versets bibliques
          </p>
        </header>
      </main>
    </div>
  )
}
