"use client"

import { useState } from 'react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

interface Tutorial {
  id: string
  title: string
  description: string
  videoUrl?: string
  steps: string[]
}

export default function HelpCenter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('general')
  const [searchQuery, setSearchQuery] = useState('')

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: "Comment utiliser le mode hors ligne ?",
      answer: "Le mode hors ligne vous permet d'accéder à vos notes et au dictionnaire sans connexion internet. Pour l'activer, allez dans Paramètres > Mode hors ligne et activez la synchronisation.",
      category: 'general'
    },
    {
      id: '2',
      question: "Comment pratiquer l'interprétation simultanée ?",
      answer: "Utilisez notre outil de pratique simultanée dans la section Pratique. Vous pouvez choisir différents niveaux de difficulté et types de discours.",
      category: 'practice'
    }
  ]

  const tutorials: Tutorial[] = [
    {
      id: '1',
      title: "Débuter avec Windy Notes",
      description: "Guide complet pour bien démarrer avec l'application",
      steps: [
        "Créez votre compte",
        "Configurez vos langues de travail",
        "Explorez les différentes fonctionnalités",
        "Commencez votre première session de pratique"
      ]
    }
  ]

  return (
    <div className="space-y-8">
      {/* Recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder="Comment pouvons-nous vous aider ?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 pl-12 rounded-lg border bg-white dark:bg-gray-800"
        />
        <span className="absolute left-4 top-4 text-gray-400">
          🔍
        </span>
      </div>

      {/* Catégories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['general', 'practice', 'dictionary', 'notes'].map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Tutoriels */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Tutoriels</h2>
        <div className="grid gap-4">
          {tutorials.map(tutorial => (
            <div
              key={tutorial.id}
              className="border rounded-lg p-4 hover:border-pink-600 cursor-pointer"
            >
              <h3 className="font-bold mb-2">{tutorial.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {tutorial.description}
              </p>
              <ol className="list-decimal list-inside space-y-2">
                {tutorial.steps.map((step, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Questions fréquentes</h2>
        <div className="space-y-4">
          {faqItems
            .filter(item => 
              item.category === selectedCategory &&
              (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map(item => (
              <details
                key={item.id}
                className="border rounded-lg p-4 group"
              >
                <summary className="font-bold cursor-pointer">
                  {item.question}
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {item.answer}
                </p>
              </details>
            ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Besoin d'aide supplémentaire ?</h2>
        <div className="space-y-4">
          <button className="w-full px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
            Contacter le support
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Temps de réponse moyen : 24 heures
          </p>
        </div>
      </div>
    </div>
  )
}
