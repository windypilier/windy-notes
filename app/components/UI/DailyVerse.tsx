"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Verse {
  reference: string
  text: {
    fr: string
    es: string
    en: string
  }
  category: string
}

export default function DailyVerse() {
  const [verse, setVerse] = useState<Verse>({
    reference: "Philippiens 4:13",
    text: {
      fr: "Je peux tout par celui qui me fortifie.",
      es: "Todo lo puedo en Cristo que me fortalece.",
      en: "I can do all things through Christ who strengthens me."
    },
    category: "motivation"
  })

  const [showTranslation, setShowTranslation] = useState<'fr' | 'es' | 'en'>('fr')

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400">
          ✝️ Verset du jour
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowTranslation('fr')}
            className={`px-2 py-1 rounded ${
              showTranslation === 'fr' 
                ? 'bg-pink-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            🇫🇷
          </button>
          <button
            onClick={() => setShowTranslation('es')}
            className={`px-2 py-1 rounded ${
              showTranslation === 'es' 
                ? 'bg-pink-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            🇪🇸
          </button>
          <button
            onClick={() => setShowTranslation('en')}
            className={`px-2 py-1 rounded ${
              showTranslation === 'en' 
                ? 'bg-pink-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            🇬🇧
          </button>
        </div>
      </div>

      <motion.div
        key={showTranslation}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <p className="text-lg italic text-center">
          {verse.text[showTranslation]}
        </p>
        <p className="text-right font-bold text-gray-600 dark:text-gray-400">
          {verse.reference}
        </p>
      </motion.div>

      <div className="mt-4 flex justify-center gap-4">
        <button className="text-pink-600 hover:text-pink-700">
          ❤️ Favori
        </button>
        <button className="text-pink-600 hover:text-pink-700">
          📤 Partager
        </button>
        <button className="text-pink-600 hover:text-pink-700">
          📝 Note
        </button>
      </div>
    </motion.div>
  )
}
