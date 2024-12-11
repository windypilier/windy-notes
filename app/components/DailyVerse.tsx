"use client"

import { useState, useEffect } from 'react'

interface Verse {
  reference: string
  text: {
    fr: string
    es: string
    en: string
  }
}

const verses: Verse[] = [
  {
    reference: "Philippiens 4:13",
    text: {
      fr: "Je peux tout par celui qui me fortifie.",
      es: "Todo lo puedo en Cristo que me fortalece.",
      en: "I can do all things through Christ who strengthens me."
    }
  },
  {
    reference: "Josué 1:9",
    text: {
      fr: "Ne t'ai-je pas donné cet ordre : Fortifie-toi et prends courage ?",
      es: "Mira que te mando que te esfuerces y seas valiente;",
      en: "Have I not commanded you? Be strong and courageous."
    }
  }
]

export default function DailyVerse() {
  const [verse, setVerse] = useState<Verse>(verses[0])

  useEffect(() => {
    const today = new Date()
    const index = (today.getFullYear() + today.getMonth() + today.getDate()) % verses.length
    setVerse(verses[index])
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
        ✝️ Verset du jour
      </h2>
      <div className="space-y-4">
        <p className="text-lg italic">🇫🇷 {verse.text.fr}</p>
        <p className="text-lg italic">🇪🇸 {verse.text.es}</p>
        <p className="text-lg italic">🇬🇧 {verse.text.en}</p>
        <p className="text-right font-bold text-gray-600 dark:text-gray-400">
          {verse.reference}
        </p>
      </div>
    </div>
  )
}
