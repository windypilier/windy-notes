"use client"

import { useState } from 'react'

interface Resource {
  id: string
  title: string
  description: string
  type: 'article' | 'video' | 'audio' | 'document'
  language: 'fr' | 'es' | 'en'
  url: string
  tags: string[]
  category: string
  isFavorite: boolean
  downloadUrl?: string
  createdAt: Date
}

export default function ResourceManager() {
  const [resources, setResources] = useState<Resource[]>([])
  const [selectedType, setSelectedType] = useState<Resource['type'] | 'all'>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<Resource['language'] | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const toggleFavorite = (id: string) => {
    setResources(resources.map(resource =>
      resource.id === id
        ? { ...resource, isFavorite: !resource.isFavorite }
        : resource
    ))
  }

  const addResource = (newResource: Omit<Resource, 'id' | 'createdAt'>) => {
    const resource: Resource = {
      ...newResource,
      id: crypto.randomUUID(),
      createdAt: new Date()
    }
    setResources([resource, ...resources])
    setShowAddForm(false)
  }

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesLanguage && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Barre de recherche et filtres */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <input
          type="text"
          placeholder="Rechercher des ressources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 rounded border"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as Resource['type'] | 'all')}
            className="p-2 rounded border"
          >
            <option value="all">Tous les types</option>
            <option value="article">Articles</option>
            <option value="video">Vidéos</option>
            <option value="audio">Audio</option>
            <option value="document">Documents</option>
          </select>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as Resource['language'] | 'all')}
            className="p-2 rounded border"
          >
            <option value="all">Toutes les langues</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>

          <button
            onClick={() => setShowAddForm(true)}
            className="ml-auto px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Ajouter une ressource
          </button>
        </div>
      </div>

      {/* Liste des ressources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map(resource => (
          <div
            key={resource.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold">{resource.title}</h3>
              <button
                onClick={() => toggleFavorite(resource.id)}
                className="text-2xl"
              >
                {resource.isFavorite ? '⭐' : '☆'}
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {resource.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {resource.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className={`px-2 py-1 rounded-full ${
                resource.type === 'article'
                  ? 'bg-blue-100 text-blue-800'
                  : resource.type === 'video'
                  ? 'bg-red-100 text-red-800'
                  : resource.type === 'audio'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {resource.type}
              </span>

              <div className="flex gap-2">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700"
                >
                  Ouvrir
                </a>
                {resource.downloadUrl && (
                  <a
                    href={resource.downloadUrl}
                    download
                    className="text-pink-600 hover:text-pink-700"
                  >
                    Télécharger
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'ajout de ressource */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Ajouter une ressource</h2>
            {/* Formulaire d'ajout */}
            <form className="space-y-4">
              {/* ... Champs du formulaire ... */}
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
