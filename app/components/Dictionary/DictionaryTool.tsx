"use client"

import { useState } from 'react'

interface Term {
  id: string
  fr: string
  es: string
  en: string
  category: string
  isSaved: boolean
  highlights: string[]
}

export default function DictionaryTool() {
  const [terms, setTerms] = useState<Term[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<'fr' | 'es' | 'en'>('fr')
  const [selectedHighlight, setSelectedHighlight] = useState<string>('yellow')

  const highlightColors = [
    { name: 'yellow', class: 'bg-yellow-200' },
    { name: 'pink', class: 'bg-pink-200' },
    { name: 'blue', class: 'bg-blue-200' },
    { name: 'green', class: 'bg-green-200' }
  ]

  const addHighlight = (termId: string) => {
    setTerms(terms.map(term => 
      term.id === termId 
        ? { ...term, highlights: [...term.highlights, selectedHighlight] }
        : term
    ))
  }

  const toggleSave = (termId: string) => {
    setTerms(terms.map(term =>
      term.id === termId
        ? { ...term, isSaved: !term.isSaved }
        : term
    ))
  }

  return (
    <div className="p-4 space-y-6">
      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un terme..."
          className="w-full p-3 rounded-lg border bg-white dark:bg-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sélecteur de langue */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedLanguage('fr')}
          className={`px-4 py-2 rounded-lg ${
            selectedLanguage === 'fr' ? 'bg-pink-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇫🇷 FR
        </button>
        <button
          onClick={() => setSelectedLanguage('es')}
          className={`px-4 py-2 rounded-lg ${
            selectedLanguage === 'es' ? 'bg-pink-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇪🇸 ES
        </button>
        <button
          onClick={() => setSelectedLanguage('en')}
          className={`px-4 py-2 rounded-lg ${
            selectedLanguage === 'en' ? 'bg-pink-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇬🇧 EN
        </button>
      </div>

      {/* Sélecteur de surligneur */}
      <div className="flex gap-2">
        {highlightColors.map(color => (
          <button
            key={color.name}
            onClick={() => setSelectedHighlight(color.name)}
            className={`w-8 h-8 rounded-full ${color.class} ${
              selectedHighlight === color.name ? 'ring-2 ring-pink-600' : ''
            }`}
          />
        ))}
      </div>

      {/* Liste des termes */}
      <div className="space-y-4">
        {terms.map(term => (
          <div 
            key={term.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">🇫🇷 {term.fr}</p>
                <p>🇪🇸 {term.es}</p>
                <p>🇬🇧 {term.en}</p>
              </div>
              <button onClick={() => toggleSave(term.id)}>
                {term.isSaved ? '⭐' : '☆'}
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              {highlightColors.map(color => (
                <button
                  key={color.name}
                  onClick={() => addHighlight(term.id)}
                  className={`w-6 h-6 rounded-full ${color.class}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
