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
    type: 'improvement' as const,
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
      type: 'improvement' as const,
      title: '',
      description: ''
    })
  }

  return (  // Ajout du return ici
    <div className="space-y-6">
      <button
        onClick={() => setShowForm(true)}
        className="w-full px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
      >
        Donner un feedback
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Nouveau feedback</h3>
            <div className="space-y-4">
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

              <input
                type="text"
                placeholder="Titre"
                value={newFeedback.title}
                onChange={(e) => setNewFeedback({
                  ...newFeedback,
                  title: e.target.value
                })}
                className="w-full p-2 rounded border"
              />

              <textarea
                placeholder="Description"
                value={newFeedback.description}
                onChange={(e) => setNewFeedback({
                  ...newFeedback,
                  description: e.target.value
                })}
                className="w-full p-2 rounded border h-32"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Annuler
                </button>
                <button
                  onClick={submitFeedback}
                  className="px-4 py-2 bg-pink-600 text-white rounded"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {feedbacks.map(feedback => (
          <div
            key={feedback.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <h4 className="font-bold">{feedback.title}</h4>
            <p className="text-gray-600 dark:text-gray-300">{feedback.description}</p>
            <div className="mt-2 flex justify-between">
              <span className="text-sm text-gray-500">
                {feedback.status}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
