"use client"

import { useState, useEffect } from 'react'

interface Stats {
  dailyPractice: number[]
  weeklyProgress: number
  monthlyProgress: number
  totalTime: number
  successRate: number
  languageDistribution: {
    fr: number
    es: number
    en: number
  }
}

export default function Statistics() {
  const [stats, setStats] = useState<Stats>({
    dailyPractice: [2, 1, 3, 2, 4, 1, 2], // heures par jour
    weeklyProgress: 75,
    monthlyProgress: 80,
    totalTime: 120,
    successRate: 85,
    languageDistribution: {
      fr: 40,
      es: 35,
      en: 25
    }
  })

  return (
    <div className="space-y-6">
      {/* Vue d'ensemble */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="font-bold mb-2">Temps total</h3>
          <p className="text-3xl text-pink-600">{stats.totalTime}h</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="font-bold mb-2">Taux de réussite</h3>
          <p className="text-3xl text-pink-600">{stats.successRate}%</p>
        </div>
      </div>

      {/* Distribution par langue */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="font-bold mb-4">Distribution par langue</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>🇫🇷 Français</span>
              <span>{stats.languageDistribution.fr}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-pink-600 rounded-full h-2"
                style={{ width: `${stats.languageDistribution.fr}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>🇪🇸 Espagnol</span>
              <span>{stats.languageDistribution.es}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 rounded-full h-2"
                style={{ width: `${stats.languageDistribution.es}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>🇬🇧 Anglais</span>
              <span>{stats.languageDistribution.en}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${stats.languageDistribution.en}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pratique quotidienne */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="font-bold mb-4">Pratique quotidienne</h3>
        <div className="flex justify-between items-end h-32">
          {stats.dailyPractice.map((hours, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-8 bg-pink-600 rounded-t"
                style={{ height: `${hours * 20}px` }}
              />
              <span className="text-sm mt-2">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progrès */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="font-bold mb-4">Progrès</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Cette semaine</span>
              <span>{stats.weeklyProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-pink-600 rounded-full h-2"
                style={{ width: `${stats.weeklyProgress}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Ce mois</span>
              <span>{stats.monthlyProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 rounded-full h-2"
                style={{ width: `${stats.monthlyProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
