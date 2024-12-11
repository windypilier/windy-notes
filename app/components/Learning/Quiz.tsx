"use client"

import { useState, useEffect } from 'react'
import * as confetti from 'canvas-confetti'

interface Question {
  id: string
  question: {
    fr: string
    es: string
    en: string
  }
  options: string[]
  correctAnswer: number
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<'fr' | 'es' | 'en'>('fr')

  const checkAnswer = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Sélecteur de langue */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedLanguage('fr')}
          className={`px-4 py-2 rounded-lg ${
            selectedLanguage === 'fr' ? 'bg-pink-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇫🇷 FR
        </button>
        <button
          onClick={() => setSelectedLanguage('es')}
          className={`px-4 py-2 rounded-lg ${
            selectedLanguage === 'es' ? 'bg-pink-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇪🇸 ES
        </button>
        <button
          onClick={() => setSelectedLanguage('en')}
          className={`px-4 py-2 rounded-lg ${
            selectedLanguage === 'en' ? 'bg-pink-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇬🇧 EN
        </button>
      </div>

      {/* Quiz */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {!showResult ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <span className="text-sm text-gray-600">
                  Score: {score}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {questions[currentQuestion]?.question[selectedLanguage]}
              </h3>
              <div className="space-y-3">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => checkAnswer(index)}
                    className="w-full p-4 text-left rounded-lg border hover:bg-pink-50 
                             dark:hover:bg-pink-900/20 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Quiz terminé !</h3>
            <p className="text-xl mb-6">
              Votre score : {score}/{questions.length}
            </p>
            <button
              onClick={() => {
                setCurrentQuestion(0)
                setScore(0)
                setShowResult(false)
              }}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Recommencer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
