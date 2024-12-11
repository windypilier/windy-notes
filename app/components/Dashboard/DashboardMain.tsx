"use client"

import { useState, useEffect } from 'react'
import DailyVerse from '../DailyVerse'

interface DashboardStats {
  todayPracticeTime: number
  weeklyGoalProgress: number
  streakDays: number
  nextReviewDue: number
}

interface UpcomingEvent {
  id: string
  title: string
  date: Date
  type: 'practice' | 'meeting' | 'deadline'
}

export default function DashboardMain() {
  const [stats, setStats] = useState<DashboardStats>({
    todayPracticeTime: 0,
    weeklyGoalProgress: 0,
    streakDays: 0,
    nextReviewDue: 0
  })

  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  return (
    <div className="space-y-6">
      {/* Verset du jour */}
      <DailyVerse />

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">
            Pratique aujourd'hui
          </h3>
          <p className="text-2xl font-bold text-pink-600">
            {stats.todayPracticeTime}min
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">
            Objectif hebdomadaire
          </h3>
          <p className="text-2xl font-bold text-pink-600">
            {stats.weeklyGoalProgress}%
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">
            Série actuelle
          </h3>
          <p className="text-2xl font-bold text-pink-600">
            {stats.streakDays} jours 🔥
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">
            Révisions à faire
          </h3>
          <p className="text-2xl font-bold text-pink-600">
            {stats.nextReviewDue}
          </p>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow 
                         hover:shadow-lg transition-shadow text-center">
          <span className="text-2xl mb-2 block">🎙️</span>
          <span className="font-medium">Pratique rapide</span>
        </button>

        <button className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow 
                         hover:shadow-lg transition-shadow text-center">
          <span className="text-2xl mb-2 block">📚</span>
          <span className="font-medium">Révision</span>
        </button>

        <button className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow 
                         hover:shadow-lg transition-shadow text-center">
          <span className="text-2xl mb-2 block">📝</span>
          <span className="font-medium">Nouvelle note</span>
        </button>

        <button className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow 
                         hover:shadow-lg transition-shadow text-center">
          <span className="text-2xl mb-2 block">🎯</span>
          <span className="font-medium">Objectifs</span>
        </button>
      </div>

      {/* Événements à venir */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Événements à venir</h2>
        <div className="space-y-4">
          {upcomingEvents.map(event => (
            <div
              key={event.id}
              className="flex justify-between items-center p-3 bg-gray-50 
                       dark:bg-gray-700 rounded-lg"
            >
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {event.date.toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                event.type === 'practice'
                  ? 'bg-green-100 text-green-800'
                  : event.type === 'meeting'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Activité récente */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Activité récente</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-50 
                       dark:bg-gray-700 rounded-lg"
            >
              {/* Contenu de l'activité */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
