"use client"

import { motion } from 'framer-motion'

interface Stats {
  streak: number
  todayMinutes: number
  totalWords: number
  nextReview: number
}

export default function QuickStats() {
  const stats: Stats = {
    streak: 7,
    todayMinutes: 45,
    totalWords: 1250,
    nextReview: 3
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
      >
        <h3 className="text-sm text-gray-600 dark:text-gray-400">Série</h3>
        <p className="text-2xl font-bold text-pink-600">
          {stats.streak} jours 🔥
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
      >
        <h3 className="text-sm text-gray-600 dark:text-gray-400">Aujourd'hui</h3>
        <p className="text-2xl font-bold text-pink-600">
          {stats.todayMinutes} min
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
      >
        <h3 className="text-sm text-gray-600 dark:text-gray-400">Vocabulaire</h3>
        <p className="text-2xl font-bold text-pink-600">
          {stats.totalWords} mots
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
      >
        <h3 className="text-sm text-gray-600 dark:text-gray-400">À réviser</h3>
        <p className="text-2xl font-bold text-pink-600">
          {stats.nextReview} termes
        </p>
      </motion.div>
    </div>
  )
}
