"use client"

import { useState, useEffect } from 'react'

interface SearchResult {
  id: string
  type: 'term' | 'note' | 'verse' | 'practice'
  title: string
  content: string
  language: 'fr' | 'es' | 'en'
  tags: string[]
}

export default function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedType, setSelectedType] = useState<SearchResult['type'] | 'all'>('all')

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    try {
      // Simuler une recherche
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Exemple de résultats
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'term',
          title: 'Interprétation simultanée',
          content: 'Définition et explications...',
          language: 'fr',
          tags: ['technique', 'interprétation']
        },
        // Ajoutez plus de résultats simulés...
      ]

      setResults(mockResults)
    } catch (error) {
      console.error('Erreur de recherche:', error)
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      performSearch(searchQuery)
    }, 300)

    return () => clearTimeout(debounceTimeout)
  }, [searchQuery])

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 pl-12 rounded-lg border bg-white dark:bg-gray-800
                   focus:ring-2 focus:ring-pink-600 focus:border-transparent"
        />
        <span className="absolute left-4 top-4 text-gray-400">
          🔍
        </span>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-4 py-2 rounded-full ${
            selectedType === 'all'
              ? 'bg-pink-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          Tout
        </button>
        <button
          onClick={() => setSelectedType('term')}
          className={`px-4 py-2 rounded-full ${
            selectedType === 'term'
              ? 'bg-pink-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          Termes
        </button>
        <button
          onClick={() => setSelectedType('note')}
          className={`px-4 py-2 rounded-full ${
            selectedType === 'note'
              ? 'bg-pink-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          Notes
        </button>
        <button
          onClick={() => setSelectedType('verse')}
          className={`px-4 py-2 rounded-full ${
            selectedType === 'verse'
              ? 'bg-pink-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          Versets
        </button>
        <button
          onClick={() => setSelectedType('practice')}
          className={`px-4 py-2 rounded-full ${
            selectedType === 'practice'
              ? 'bg-pink-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          Exercices
        </button>
      </div>

      {/* Résultats */}
      <div className="space-y-4">
        {isSearching ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto" />
            <p className="mt-2 text-gray-600">Recherche en cours...</p>
          </div>
        ) : results.length > 0 ? (
          results
            .filter(result => selectedType === 'all' || result.type === selectedType)
            .map(result => (
              <div
                key={result.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{result.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    result.type === 'term'
                      ? 'bg-blue-100 text-blue-800'
                      : result.type === 'note'
                      ? 'bg-green-100 text-green-800'
                      : result.type === 'verse'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {result.type}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {result.content}
                </p>
                <div className="flex gap-2">
                  {result.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
        ) : searchQuery ? (
          <div className="text-center py-8 text-gray-600">
            Aucun résultat trouvé pour "{searchQuery}"
          </div>
        ) : null}
      </div>
    </div>
  )
}
