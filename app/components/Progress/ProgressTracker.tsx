"use client"

import { useState, useEffect } from 'react'

interface Achievement {
  id: string
  title: string
  description: string
  progress: number
  maxProgress: number
  completed: boolean
  reward: string
  icon: string
}

interface Skill {
  id: string
  name: string
  level: number
  progress: number
  category: 'interpretation' | 'language' | 'technical'
}

export default function ProgressTracker() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Premier pas',
      description: 'Complétez votre première session de pratique',
      progress: 1,
      maxProgress: 1,
      completed: true,
      reward: '100 XP',
      icon: '🎯'
    },
    {
      id: '2',
      title: 'Étudiant assidu',
      description: 'Pratiquez 7 jours consécutifs',
      progress: 5,
      maxProgress: 7,
      completed: false,
      reward: '500 XP',
      icon: '📚'
    }
  ])

  const [skills, setSkills] = useState<Skill[]>([
    {
      id: '1',
      name: 'Interprétation consécutive',
      level: 3,
      progress: 75,
      category: 'interpretation'
    },
    {
      id: '2',
      name: 'Vocabulaire technique',
      level: 2,
      progress: 45,
      category: 'language'
    }
  ])

  const [stats, setStats] = useState({
    totalPracticeTime: 0,
    sessionsCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    xpEarned: 0,
    level: 1
  })

  return (
    <div className="space-y-8">
      {/* Vue d'ensemble */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Niveau</h3>
          <p className="text-2xl font-bold text-pink-600">{stats.level}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">XP Total</h3>
          <p className="text-2xl font-bold text-pink-600">{stats.xpEarned}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Série actuelle</h3>
          <p className="text-2xl font-bold text-pink-600">{stats.currentStreak} jours</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Sessions</h3>
          <p className="text-2xl font-bold text-pink-600">{stats.sessionsCompleted}</p>
        </div>
      </div>

      {/* Compétences */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Compétences</h2>
        <div className="space-y-6">
          {skills.map(skill => (
            <div key={skill.id}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-bold">{skill.name}</h3>
                  <p className="text-sm text-gray-600">Niveau {skill.level}</p>
                </div>
                <span className="text-sm bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                  {skill.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-pink-600 rounded-full h-2"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Succès */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Succès</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                achievement.completed
                  ? 'border-green-200 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h3 className="font-bold">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{achievement.progress}/{achievement.maxProgress}</span>
                  <span className="text-pink-600">{achievement.reward}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-pink-600 rounded-full h-2"
                    style={{
                      width: `${(achievement.progress / achievement.maxProgress) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
