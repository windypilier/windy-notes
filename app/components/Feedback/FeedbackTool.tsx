"use client"

import { useState } from 'react'

interface Feedback {
  id: string
  type: 'bug' | 'feature' | 'improvement' | 'other'
  title: string
  description: string
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected'
  createdAt: Date
  response?: string
}

export default function FeedbackTool() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newFeedback, setNewFeedback] = useState({
    type: 'improvement',
    title: '',
    description: ''
  })

  const submitFeedback = () => {
    if (!newFeedback.title || !newFeedback.description) return

    const feedback: Feedback = {
      id: crypto.randomUUID(),
      ...newFeedback,
      status: 'pending',
      createdAt: new Date()
    }

    setFeedbacks([feedback, ...feedbacks])
    setShowForm(false)
    setNewFeedback({
      type: 'improvement',
      title: '',
      description: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Bouton d'ajout */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full px-4 py-3 bg-pink-600 text-white rounded-lg 
                 hover:bg-pink-700 flex items-center justify-center gap-2"
      >
        ✨ Donner mon avis
      </button>

      {/* Formulaire de feedback */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
                      justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Nouveau feedback</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Type</label>
                <select
                  value={newFeedback.type}
                  onChange={(e) => setNewFeedback({
                    ...newFeedback,
                    type: e.target.value as Feedback['type']
                  })}
                  className="w-full p-2 rounded border"
                >
                  <option value="improvement">Amélioration</option>
                  <option value="bug">Bug</option>
                  <option value="feature">Nouvelle fonctionnalité</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Titre</label>
                <input
                  type="text"
                  value={newFeedback.title}
                  onChange={(e) => setNewFeedback({
                    ...newFeedback,
                    title: e.target.value
                  })}
                  className="w-full p-2 rounded border"
                  placeholder="Résumé court de votre feedback"
                />
              </div>

              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  value={newFeedback.description}
                  onChange={(e) => setNewFeedback({
                    ...newFeedback,
                    description: e.target.value
                  })}
                  className="w-full p-2 rounded border h-32"
                  placeholder="Décrivez en détail votre feedback..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={submitFeedback}
                className="px-4 py-2 bg-pink-600 text-white rounded 
                         hover:bg-pink-700"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des feedbacks */}
      <div className="space-y-4">
        {feedbacks.map(feedback => (
          <div
            key={feedback.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold">{feedback.title}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${
                feedback.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : feedback.status === 'reviewing'
                  ? 'bg-blue-100 text-blue-800'
                  : feedback.status === 'accepted'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {feedback.status}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {feedback.description}
            </p>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{feedback.type}</span>
              <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
            </div>

            {feedback.response && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-sm italic">{feedback.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
