"use client"

import { useState, useEffect } from 'react'
import * as confetti from 'canvas-confetti'

interface VocabCard {
  id: string
  term: {
    fr: string
    es: string
    en: string
  }
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  lastReviewed?: Date
  nextReview?: Date
  successRate: number
}

export default function VocabularyPractice() {
  const [cards, setCards] = useState<VocabCard[]>([])
  const [currentCard, setCurrentCard] = useState<VocabCard | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState({
    from: 'fr',
    to: 'es'
  })

  const reviewCard = (success: boolean) => {
    if (!currentCard) return

    // Mettre à jour les statistiques de la carte
    const updatedCard = {
      ...currentCard,
      lastReviewed: new Date(),
      nextReview: new Date(Date.now() + (success ? 3 : 1) * 24 * 60 * 60 * 1000),
      successRate: (currentCard.successRate * 0.8) + (success ? 0.2 : 0)
    }

    // Mettre à jour la liste des cartes
    setCards(cards.map(card =>
      card.id === currentCard.id ? updatedCard : card
    ))

    // Afficher confetti si succès
    if (success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

    // Passer à la carte suivante
    setShowAnswer(false)
    const remainingCards = cards.filter(card => card.id !== currentCard.id)
    if (remainingCards.length > 0) {
      const nextCard = remainingCards[Math.floor(Math.random() * remainingCards.length)]
      setCurrentCard(nextCard)
    } else {
      setCurrentCard(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Sélection des langues */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex justify-between items-center gap-4">
          <select
            value={selectedLanguages.from}
            onChange={(e) => setSelectedLanguages({
              ...selectedLanguages,
              from: e.target.value
            })}
            className="flex-1 p-2 rounded border"
          >
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
          
          <span>→</span>
          
          <select
            value={selectedLanguages.to}
            onChange={(e) => setSelectedLanguages({
              ...selectedLanguages,
              to: e.target.value
            })}
            className="flex-1 p-2 rounded border"
          >
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* Carte de vocabulaire */}
      {currentCard ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {currentCard.term[selectedLanguages.from as keyof typeof currentCard.term]}
            </h2>
            
            {showAnswer ? (
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {currentCard.term[selectedLanguages.to as keyof typeof currentCard.term]}
              </p>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Voir la réponse
              </button>
            )}
          </div>

          {showAnswer && (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => reviewCard(false)}
                className="px-6 py-3 bg-red-100 text-red-800 rounded-lg hover:bg-red-200"
              >
                À revoir
              </button>
              <button
                onClick={() => reviewCard(true)}
                className="px-6 py-3 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
              >
                Je connais
              </button>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-500">
            Taux de réussite : {Math.round(currentCard.successRate * 100)}%
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Toutes les cartes ont été revues !
          </p>
          <button
            onClick={() => {
              // Réinitialiser les cartes
              const resetCards = cards.map(card => ({
                ...card,
                lastReviewed: undefined,
                nextReview: undefined
              }))
              setCards(resetCards)
              setCurrentCard(resetCards[0])
            }}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Recommencer
          </button>
        </div>
      )}

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Cartes revues</h3>
          <p className="text-2xl font-bold text-pink-600">
            {cards.filter(card => card.lastReviewed).length}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">À revoir</h3>
          <p className="text-2xl font-bold text-pink-600">
            {cards.filter(card => 
              card.nextReview && new Date(card.nextReview) <= new Date()
            ).length}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Taux moyen</h3>
          <p className="text-2xl font-bold text-pink-600">
            {Math.round(
              cards.reduce((acc, card) => acc + card.successRate, 0) / cards.length * 100
            )}%
          </p>
        </div>
      </div>
    </div>
  )
}
