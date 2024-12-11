"use client"

import { useState } from 'react'
import confetti from 'canvas-confetti'

interface Flashcard {
  id: string
  front: {
    text: string
    language: 'fr' | 'es' | 'en'
  }
  back: {
    text: string
    language: 'fr' | 'es' | 'en'
  }
  category: string
  tags: string[]
  lastReviewed?: Date
  nextReview?: Date
  difficulty: 1 | 2 | 3 | 4 | 5
  mastered: boolean
}

export default function FlashcardManager() {
  const [cards, setCards] = useState<Flashcard[]>([])
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null)
  const [showBack, setShowBack] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isAdding, setIsAdding] = useState(false)
  const [newCard, setNewCard] = useState<Partial<Flashcard>>({
    front: { text: '', language: 'fr' },
    back: { text: '', language: 'es' },
    category: '',
    tags: []
  })

  const flipCard = () => {
    setShowBack(!showBack)
  }

  const nextCard = () => {
    const remainingCards = cards.filter(card => card.id !== currentCard?.id)
    if (remainingCards.length > 0) {
      const nextCard = remainingCards[Math.floor(Math.random() * remainingCards.length)]
      setCurrentCard(nextCard)
      setShowBack(false)
    } else {
      setCurrentCard(null)
    }
  }

  const rateCard = (cardId: string, rating: Flashcard['difficulty']) => {
    const now = new Date()
    const nextReviewDays = Math.pow(2, rating - 1) // Système de répétition espacée
    const nextReview = new Date(now.setDate(now.getDate() + nextReviewDays))

    setCards(cards.map(card =>
      card.id === cardId
        ? {
            ...card,
            difficulty: rating,
            lastReviewed: new Date(),
            nextReview,
            mastered: rating === 5
          }
        : card
    ))

    if (rating === 5) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

    nextCard()
  }

  const addCard = () => {
    if (!newCard.front?.text || !newCard.back?.text) return

    const card: Flashcard = {
      id: crypto.randomUUID(),
      front: newCard.front as Flashcard['front'],
      back: newCard.back as Flashcard['back'],
      category: newCard.category || 'General',
      tags: newCard.tags || [],
      difficulty: 1,
      mastered: false
    }

    setCards([...cards, card])
    setIsAdding(false)
    setNewCard({
      front: { text: '', language: 'fr' },
      back: { text: '', language: 'es' },
      category: '',
      tags: []
    })
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded border"
          >
            <option value="all">Toutes les catégories</option>
            {/* Liste des catégories uniques */}
            {Array.from(new Set(cards.map(card => card.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Nouvelle carte
        </button>
      </div>

      {/* Zone de pratique */}
      {currentCard ? (
        <div className="flex justify-center">
          <div
            className={`w-96 h-64 cursor-pointer perspective-1000 ${
              showBack ? 'rotate-y-180' : ''
            }`}
            onClick={flipCard}
          >
            <div className="relative w-full h-full transition-transform duration-500">
              <div className="absolute w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-center items-center">
                <span className="text-sm text-gray-500 mb-2">
                  {currentCard.front.language.toUpperCase()}
                </span>
                <p className="text-xl text-center">{currentCard.front.text}</p>
              </div>
              <div className="absolute w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-center items-center rotate-y-180 backface-hidden">
                <span className="text-sm text-gray-500 mb-2">
                  {currentCard.back.language.toUpperCase()}
                </span>
                <p className="text-xl text-center">{currentCard.back.text}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Aucune carte à réviser pour le moment
          </p>
        </div>
      )}

      {/* Boutons de notation */}
      {currentCard && showBack && (
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              onClick={() => rateCard(currentCard.id, rating as Flashcard['difficulty'])}
              className={`w-12 h-12 rounded-full ${
                rating === 1
                  ? 'bg-red-100 text-red-800'
                  : rating === 2
                  ? 'bg-orange-100 text-orange-800'
                  : rating === 3
                  ? 'bg-yellow-100 text-yellow-800'
                  : rating === 4
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
      )}

      {/* Modal d'ajout de carte */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nouvelle carte</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Recto</label>
                <textarea
                  value={newCard.front?.text}
                  onChange={(e) => setNewCard({
                    ...newCard,
                    front: { ...newCard.front, text: e.target.value }
                  })}
                  className="w-full p-2 rounded border"
                />
                <select
                  value={newCard.front?.language}
                  onChange={(e) => setNewCard({
                    ...newCard,
                    front: { ...newCard.front, language: e.target.value as 'fr' | 'es' | 'en' }
                  })}
                  className="mt-2 p-2 rounded border"
                >
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Verso</label>
                <textarea
                  value={newCard.back?.text}
                  onChange={(e) => setNewCard({
                    ...newCard,
                    back: { ...newCard.back, text: e.target.value }
                  })}
                  className="w-full p-2 rounded border"
                />
                <select
                  value={newCard.back?.language}
                  onChange={(e) => setNewCard({
                    ...newCard,
                    back: { ...newCard.back, language: e.target.value as 'fr' | 'es' | 'en' }
                  })}
                  className="mt-2 p-2 rounded border"
                >
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Catégorie</label>
                <input
                  type="text"
                  value={newCard.category}
                  onChange={(e) => setNewCard({
                    ...newCard,
                    category: e.target.value
                  })}
                  className="w-full p-2 rounded border"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={addCard}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
