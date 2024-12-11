"use client"

import { useState, useEffect } from 'react'

interface OfflineData {
  notes: any[]
  dictionary: any[]
  practice: any[]
  lastSync: Date | null
}

export default function OfflineMode() {
  const [isOffline, setIsOffline] = useState(false)
  const [offlineData, setOfflineData] = useState<OfflineData>({
    notes: [],
    dictionary: [],
    practice: [],
    lastSync: null
  })
  const [syncProgress, setSyncProgress] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    // Vérifier l'état de la connexion
    setIsOffline(!navigator.onLine)

    // Écouter les changements de connexion
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const syncData = async () => {
    if (isOffline) return

    setIsSyncing(true)
    setSyncProgress(0)

    try {
      // Simuler une synchronisation
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setSyncProgress(i)
      }

      setOfflineData(prev => ({
        ...prev,
        lastSync: new Date()
      }))
    } catch (error) {
      console.error('Erreur de synchronisation:', error)
    } finally {
      setIsSyncing(false)
      setSyncProgress(0)
    }
  }

  return (
    <div className="space-y-6">
      {/* État de la connexion */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">État de la connexion</h2>
          <span className={`px-3 py-1 rounded-full text-sm ${
            isOffline 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {isOffline ? 'Hors ligne' : 'En ligne'}
          </span>
        </div>

        {!isOffline && (
          <button
            onClick={syncData}
            disabled={isSyncing}
            className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg 
                     hover:bg-pink-700 disabled:opacity-50"
          >
            {isSyncing ? 'Synchronisation en cours...' : 'Synchroniser les données'}
          </button>
        )}

        {isSyncing && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-600 rounded-full h-2 transition-all"
                style={{ width: `${syncProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Données disponibles hors ligne */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Données disponibles hors ligne</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Notes</span>
            <span className="text-gray-600">{offlineData.notes.length} éléments</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Dictionnaire</span>
            <span className="text-gray-600">{offlineData.dictionary.length} termes</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Exercices de pratique</span>
            <span className="text-gray-600">{offlineData.practice.length} exercices</span>
          </div>

          {offlineData.lastSync && (
            <div className="text-sm text-gray-600">
              Dernière synchronisation: {offlineData.lastSync.toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Paramètres hors ligne */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Paramètres hors ligne</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Télécharger automatiquement les mises à jour</span>
            <button className="w-12 h-6 bg-pink-600 rounded-full">
              <div className="w-4 h-4 bg-white rounded-full transform translate-x-7" />
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Limiter l'utilisation des données</span>
            <button className="w-12 h-6 bg-gray-200 rounded-full">
              <div className="w-4 h-4 bg-white rounded-full transform translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
