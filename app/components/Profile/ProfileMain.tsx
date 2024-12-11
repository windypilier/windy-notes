"use client"

import { useState } from 'react'

interface UserStats {
  practiceTime: number
  notesCount: number
  savedTerms: number
  streak: number
  level: number
  xp: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  completed: boolean
}

export default function ProfileMain() {
  const [stats, setStats] = useState<UserStats>({
    practiceTime: 0,
    notesCount: 0,
    savedTerms: 0,
    streak: 0,
    level: 1,
    xp: 0
  })

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Premier pas',
      description: 'Commencez votre voyage d\'interprétation',
      icon: '🎯',
      completed: true
    },
    {
      id: '2',
      title: 'Studieux',
      description: 'Pratiquez 7 jours de suite',
      icon: '📚',
      completed: false
    },
    // Ajoutez plus d'achievements...
  ])

  return (
    <div className="space-y-8">
      {/* En-tête du profil */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-bold">Utilisateur</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Niveau {stats.level} • {stats.xp} XP
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="font-bold mb-2">Temps de pratique</h3>
          <p className="text-2xl text-pink-600">{stats.practiceTime}h</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="font-bold mb-2">Série actuelle</h3>
          <p className="text-2xl text-pink-600">{stats.streak} jours 🔥</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="font-bold mb-2">Notes créées</h3>
          <p className="text-2xl text-pink-600">{stats.notesCount}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="font-bold mb-2">Termes sauvegardés</h3>
          <p className="text-2xl text-pink-600">{stats.savedTerms}</p>
        </div>
      </div>

      {/* Succès */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Succès</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(achievement => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                achievement.completed 
                  ? 'border-pink-200 bg-pink-50 dark:bg-pink-900/20' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h4 className="font-bold">{achievement.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paramètres */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Paramètres</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Mode sombre</span>
            <button className="w-12 h-6 bg-pink-600 rounded-full"></button>
          </div>
          <div className="flex justify-between items-center">
            <span>Notifications</span>
            <button className="w-12 h-6 bg-gray-200 rounded-full"></button>
          </div>
        </div>
      </div>
    </div>
  )
}
