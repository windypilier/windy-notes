"use client"

import { useState } from 'react'

interface Feedback {
  id: string
  type: 'bug' | 'feature' | 'improvement' | 'other'  // Type strict
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
    type: 'improvement' as const,  // Type strict
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

  // ... reste du code ...
}
