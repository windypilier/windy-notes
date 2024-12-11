"use client"

import { useState } from 'react'
import DailyVerse from './components/DailyVerse'
import Navigation from './components/Navigation'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-pink-100 to-purple-100'}`}>
      <main className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <header className="text-center mb-12 relative">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="absolute right-4 top-4 text-2xl"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">
            Windy Notes
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Application d'interprétation trilingue avec versets bibliques
          </p>
        </header>

        {/* Verset du jour */}
        <DailyVerse />

        {/* Menu principal */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-pink-600 dark:text-pink-400 mb-2">📚 Dictionnaire</h3>
            <p className="text-gray-600 dark:text-gray-300">Termes spécialisés FR-ES-EN</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-2">🎙️ Pratique</h3>
            <p className="text-gray-600 dark:text-gray-300">Exercices d'interprétation</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-pink-600 dark:text-pink-400 mb-2">📝 Notes</h3>
            <p className="text-gray-600 dark:text-gray-300">Prenez des notes et révisez</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-2">💭 Forum</h3>
            <p className="text-gray-600 dark:text-gray-300">Échangez avec la communauté</p>
          </div>
        </div>

        {/* Navigation */}
        <Navigation />
      </main>
    </div>
  )
}
