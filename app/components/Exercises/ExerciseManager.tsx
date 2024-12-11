"use client"

import { useState } from 'react'

interface Exercise {
  id: string
  title: string
  type: 'consecutive' | 'simultaneous' | 'sight' | 'numbers' | 'memory'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  sourceLanguage: 'fr' | 'es' | 'en'
  targetLanguage: 'fr' | 'es' | 'en'
  content: {
    text?: string
    audio?: string
    video?: string
  }
  duration: number
  instructions: string
  completed: boolean
  score?: number
}

export default function ExerciseManager() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [selectedType, setSelectedType] = useState<Exercise['type']>('consecutive')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Exercise['difficulty']>('beginner')
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)

  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise)
  }

  const completeExercise = (exerciseId: string, score: number) => {
    setExercises(exercises.map(ex =>
      ex.id === exerciseId
        ? { ...ex, completed: true, score }
        : ex
    ))
    setCurrentExercise(null)
  }

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Type d'exercice</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as Exercise['type'])}
              className="w-full p-2 rounded border"
            >
              <option value="consecutive">Consécutive</option>
              <option value="simultaneous">Simultanée</option>
              <option value="sight">Traduction à vue</option>
              <option value="numbers">Chiffres</option>
              <option value="memory">Mémoire</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Niveau</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Exercise['difficulty'])}
              className="w-full p-2 rounded border"
            >
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="advanced">Avancé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des exercices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises
          .filter(ex => 
            ex.type === selectedType && 
            ex.difficulty === selectedDifficulty
          )
          .map(exercise => (
            <div
              key={exercise.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold">{exercise.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {exercise.duration} minutes
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  exercise.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {exercise.completed ? 'Complété' : 'À faire'}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {exercise.instructions}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                    {exercise.sourceLanguage.toUpperCase()} → {exercise.targetLanguage.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                    {exercise.difficulty}
                  </span>
                </div>

                {exercise.completed ? (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Score: {exercise.score}/100
                  </div>
                ) : (
                  <button
                    onClick={() => startExercise(exercise)}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                  >
                    Commencer
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Modal d'exercice en cours */}
      {currentExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">{currentExercise.title}</h2>
            
            {/* Contenu de l'exercice */}
            <div className="space-y-4">
              {currentExercise.content.text && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                  {currentExercise.content.text}
                </div>
              )}
              
              {currentExercise.content.audio && (
                <audio controls className="w-full">
                  <source src={currentExercise.content.audio} type="audio/mpeg" />
                </audio>
              )}
              
              {currentExercise.content.video && (
                <video controls className="w-full">
                  <source src={currentExercise.content.video} type="video/mp4" />
                </video>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setCurrentExercise(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
              >
                Abandonner
              </button>
              <button
                onClick={() => completeExercise(currentExercise.id, Math.floor(Math.random() * 40) + 60)}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg"
              >
                Terminer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
