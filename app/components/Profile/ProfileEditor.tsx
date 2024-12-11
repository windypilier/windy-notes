"use client"

import { useState } from 'react'

interface UserProfile {
  id: string
  username: string
  email: string
  avatar?: string
  nativeLanguage: string
  workingLanguages: string[]
  specialties: string[]
  experience: number
  bio: string
  preferences: {
    darkMode: boolean
    notifications: boolean
    emailUpdates: boolean
    autoSync: boolean
  }
}

export default function ProfileEditor() {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    username: '',
    email: '',
    nativeLanguage: 'fr',
    workingLanguages: ['es', 'en'],
    specialties: [],
    experience: 0,
    bio: '',
    preferences: {
      darkMode: false,
      notifications: true,
      emailUpdates: true,
      autoSync: true
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'info' | 'preferences'>('info')

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }))
  }

  const handleLanguageToggle = (language: string) => {
    const updatedLanguages = profile.workingLanguages.includes(language)
      ? profile.workingLanguages.filter(lang => lang !== language)
      : [...profile.workingLanguages, language]
    
    updateProfile({ workingLanguages: updatedLanguages })
  }

  const handleSpecialtyToggle = (specialty: string) => {
    const updatedSpecialties = profile.specialties.includes(specialty)
      ? profile.specialties.filter(spec => spec !== specialty)
      : [...profile.specialties, specialty]
    
    updateProfile({ specialties: updatedSpecialties })
  }

  return (
    <div className="space-y-6">
      {/* En-tête du profil */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                '👤'
              )}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-pink-600 text-white rounded-full">
              📷
            </button>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold">{profile.username || 'Utilisateur'}</h2>
            <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setSelectedTab('info')}
          className={`pb-2 px-4 ${
            selectedTab === 'info'
              ? 'border-b-2 border-pink-600 text-pink-600'
              : 'text-gray-600'
          }`}
        >
          Informations
        </button>
        <button
          onClick={() => setSelectedTab('preferences')}
          className={`pb-2 px-4 ${
            selectedTab === 'preferences'
              ? 'border-b-2 border-pink-600 text-pink-600'
              : 'text-gray-600'
          }`}
        >
          Préférences
        </button>
      </div>

      {/* Contenu des onglets */}
      {selectedTab === 'info' ? (
        <div className="space-y-6">
          {/* Informations personnelles */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Informations personnelles</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Nom d'utilisateur</label>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => updateProfile({ username: e.target.value })}
                  className="w-full p-2 rounded border"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  className="w-full p-2 rounded border h-32"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block mb-2">Expérience (années)</label>
                <input
                  type="number"
                  value={profile.experience}
                  onChange={(e) => updateProfile({ experience: parseInt(e.target.value) })}
                  className="w-full p-2 rounded border"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Langues */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Langues</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Langue maternelle</label>
                <select
                  value={profile.nativeLanguage}
                  onChange={(e) => updateProfile({ nativeLanguage: e.target.value })}
                  className="w-full p-2 rounded border"
                  disabled={!isEditing}
                >
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Langues de travail</label>
                <div className="flex gap-2 flex-wrap">
                  {['fr', 'es', 'en'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageToggle(lang)}
                      className={`px-4 py-2 rounded-lg ${
                        profile.workingLanguages.includes(lang)
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      disabled={!isEditing}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Spécialités */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Spécialités</h3>
            
            <div className="flex gap-2 flex-wrap">
              {['Juridique', 'Médical', 'Technique', 'Commercial', 'Littéraire'].map(specialty => (
                <button
                  key={specialty}
                  onClick={() => handleSpecialtyToggle(specialty)}
                  className={`px-4 py-2 rounded-lg ${
                    profile.specialties.includes(specialty)
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  disabled={!isEditing}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Préférences</h3>
          
          <div className="space-y-4">
            {Object.entries(profile.preferences).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <button
                  onClick={() => updateProfile({
                    preferences: {
                      ...profile.preferences,
                      [key]: !value
                    }
                  })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    value ? 'bg-pink-600' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    value ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex justify-end gap-4">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
            >
              Annuler
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg"
            >
              Sauvegarder
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg"
          >
            Modifier
          </button>
        )}
      </div>
    </div>
  )
}
