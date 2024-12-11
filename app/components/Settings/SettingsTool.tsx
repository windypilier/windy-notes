"use client"

import { useState } from 'react'

interface Settings {
  darkMode: boolean
  notifications: boolean
  language: 'fr' | 'es' | 'en'
  autoSync: boolean
  fontSize: 'small' | 'medium' | 'large'
  soundEffects: boolean
}

export default function SettingsTool() {
  const [settings, setSettings] = useState<Settings>({
    darkMode: false,
    notifications: true,
    language: 'fr',
    autoSync: true,
    fontSize: 'medium',
    soundEffects: true
  })

  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Apparence</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Mode sombre</span>
            <button
              onClick={() => updateSetting('darkMode', !settings.darkMode)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.darkMode ? 'bg-pink-600' : 'bg-gray-200'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                settings.darkMode ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div>
            <span className="block mb-2">Taille du texte</span>
            <select
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', e.target.value as Settings['fontSize'])}
              className="w-full p-2 rounded border"
            >
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Langue</h2>
        <select
          value={settings.language}
          onChange={(e) => updateSetting('language', e.target.value as Settings['language'])}
          className="w-full p-2 rounded border"
        >
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Notifications push</span>
            <button
              onClick={() => updateSetting('notifications', !settings.notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications ? 'bg-pink-600' : 'bg-gray-200'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                settings.notifications ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <span>Effets sonores</span>
            <button
              onClick={() => updateSetting('soundEffects', !settings.soundEffects)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.soundEffects ? 'bg-pink-600' : 'bg-gray-200'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                settings.soundEffects ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Synchronisation</h2>
        <div className="flex justify-between items-center">
          <span>Synchronisation automatique</span>
          <button
            onClick={() => updateSetting('autoSync', !settings.autoSync)}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.autoSync ? 'bg-pink-600' : 'bg-gray-200'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
              settings.autoSync ? 'translate-x-7' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
    </div>
  )
}
