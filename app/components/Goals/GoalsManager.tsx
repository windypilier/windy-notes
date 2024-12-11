"use client"

import { useState } from 'react'

interface Goal {
  id: string
  title: string
  description: string
  deadline: Date
  progress: number
  category: 'daily' | 'weekly' | 'monthly' | 'custom'
  type: 'practice' | 'vocabulary' | 'interpretation' | 'other'
  completed: boolean
  subgoals?: Goal[]
}

export default function GoalsManager() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Goal['category']>('daily')
  const [showAddForm, setShowAddForm] = useState(false)

  const addGoal = (newGoal: Omit<Goal, 'id' | 'progress' | 'completed'>) => {
    const goal: Goal = {
      ...newGoal,
      id: crypto.randomUUID(),
      progress: 0,
      completed: false
    }
    setGoals([...goals, goal])
    setShowAddForm(false)
  }

  const updateProgress = (goalId: string, progress: number) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? { ...goal, progress, completed: progress === 100 }
        : goal
    ))
  }

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId))
  }

  return (
    <div className="space-y-6">
      {/* En-tête et filtres */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {(['daily', 'weekly', 'monthly', 'custom'] as Goal['category'][]).map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Nouvel objectif
        </button>
      </div>

      {/* Liste des objectifs */}
      <div className="space-y-4">
        {goals
          .filter(goal => goal.category === selectedCategory)
          .map(goal => (
            <div
              key={goal.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold">{goal.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {goal.description}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  goal.type === 'practice'
                    ? 'bg-green-100 text-green-800'
                    : goal.type === 'vocabulary'
                    ? 'bg-blue-100 text-blue-800'
                    : goal.type === 'interpretation'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {goal.type}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progression</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-pink-600 rounded-full h-2 transition-all"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Échéance : {new Date(goal.deadline).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateProgress(goal.id, Math.min(goal.progress + 10, 100))}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                  >
                    +10%
                  </button>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              {goal.subgoals && goal.subgoals.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-gray-200">
                  {goal.subgoals.map(subgoal => (
                    <div
                      key={subgoal.id}
                      className="mt-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={subgoal.completed}
                          onChange={() => {
                            // Mettre à jour le sous-objectif
                          }}
                          className="rounded text-pink-600"
                        />
                        <span>{subgoal.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Modal d'ajout d'objectif */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nouvel objectif</h2>
            {/* Formulaire d'ajout */}
            <form className="space-y-4">
              {/* ... Champs du formulaire ... */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
