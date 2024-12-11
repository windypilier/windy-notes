"use client"

import { useState, useEffect } from 'react'

interface ReviewItem {
  id: string
  type: 'term' | 'note' | 'flashcard' | 'exercise'
  content: {
    title: string
    description: string
    lastReviewed?: Date
    nextReview?: Date
  }
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed'
  score?: number
}

export default function ReviewManager() {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([])
  const [selectedType, setSelectedType] = useState<ReviewItem['type'] | 'all'>('all')
  const [selectedPriority, setSelectedPriority] = useState<ReviewItem['priority'] | 'all'>('all')
  const [currentItem, setCurrentItem] = useState<ReviewItem | null>(null)

  // Calculer les statistiques de révision
  const stats = {
    total: reviewItems.length,
    completed: reviewItems.filter(item => item.status === 'completed').length,
    pending: reviewItems.filter(item => item.status === 'pending').length,
    inProgress: reviewItems.filter(item => item.status === 'in-progress').length,
    averageScore: reviewItems
      .filter(item => item.score !== undefined)
      .reduce((acc, item) => acc + (item.score || 0), 0) / 
      reviewItems.filter(item => item.score !== undefined).length || 0
  }

  const startReview = (item: ReviewItem) => {
    setCurrentItem(item)
    setReviewItems(reviewItems.map(i =>
      i.id === item.id
        ? { ...i, status: 'in-progress' }
        : i
    ))
  }

  const completeReview = (score: number) => {
    if (!currentItem) return

    setReviewItems(reviewItems.map(item =>
      item.id === currentItem.id
        ? {
            ...item,
            status: 'completed',
            score,
            content: {
              ...item.content,
              lastReviewed: new Date(),
              nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // +7 jours
            }
          }
        : item
    ))
    setCurrentItem(null)
  }

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Total</h3>
          <p className="text-2xl font-bold text-pink-600">{stats.total}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Complétés</h3>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">En attente</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Score moyen</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.averageScore.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ReviewItem['type'] | 'all')}
            className="p-2 rounded border"
          >
            <option value="all">Tous les types</option>
            <option value="term">Termes</option>
            <option value="note">Notes</option>
            <option value="flashcard">Flashcards</option>
            <option value="exercise">Exercices</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as ReviewItem['priority'] | 'all')}
            className="p-2 rounded border"
          >
            <option value="all">Toutes les priorités</option>
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>
        </div>
      </div>

      {/* Liste des éléments à réviser */}
      <div className="space-y-4">
        {reviewItems
          .filter(item => 
            (selectedType === 'all' || item.type === selectedType) &&
            (selectedPriority === 'all' || item.priority === selectedPriority)
          )
          .map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{item.content.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.content.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    item.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : item.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    item.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {item.content.lastReviewed && (
                    <span>
                      Dernière révision: {new Date(item.content.lastReviewed).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                {item.status !== 'completed' && (
                  <button
                    onClick={() => startReview(item)}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                  >
                    Réviser
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Modal de révision */}
      {currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{currentItem.content.title}</h2>
            
            <div className="space-y-4">
              <p>{currentItem.content.description}</p>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setCurrentItem(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                >
                  Plus tard
                </button>
                <button
                  onClick={() => completeReview(Math.floor(Math.random() * 40) + 60)}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg"
                >
                  Terminer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
