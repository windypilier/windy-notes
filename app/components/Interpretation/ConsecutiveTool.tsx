"use client"

import { useState, useRef } from 'react'

interface Speech {
  id: string
  title: string
  audioUrl: string
  transcript: {
    fr: string
    es: string
    en: string
  }
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
}

export default function ConsecutiveTool() {
  const [recording, setRecording] = useState(false)
  const [currentSpeech, setCurrentSpeech] = useState<Speech | null>(null)
  const [notes, setNotes] = useState<string>('')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.start()
      setRecording(true)
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error)
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  return (
    <div className="space-y-6">
      {/* Sélecteur de langues */}
      <div className="flex gap-4">
        <select className="p-2 rounded border">
          <option value="fr-es">Français → Espagnol</option>
          <option value="fr-en">Français → Anglais</option>
          <option value="es-fr">Espagnol → Français</option>
          <option value="en-fr">Anglais → Français</option>
        </select>

        <select className="p-2 rounded border">
          <option value="beginner">Débutant</option>
          <option value="intermediate">Intermédiaire</option>
          <option value="advanced">Avancé</option>
        </select>
      </div>

      {/* Zone de pratique */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {currentSpeech?.title || "Sélectionnez un discours"}
          </h3>
          {currentSpeech && (
            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
              {currentSpeech.duration}min
            </span>
          )}
        </div>

        {/* Contrôles audio */}
        <div className="flex gap-4 mb-4">
          <button 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            onClick={() => audioRef.current?.play()}
          >
            ▶️ Lecture
          </button>
          <button 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            onClick={() => audioRef.current?.pause()}
          >
            ⏸️ Pause
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${
              recording 
                ? 'bg-red-600 text-white' 
                : 'bg-pink-600 text-white'
            }`}
            onClick={recording ? stopRecording : startRecording}
          >
            {recording ? '⏹️ Arrêter' : '🎙️ Enregistrer'}
          </button>
        </div>

        {/* Zone de prise de notes */}
        <textarea
          className="w-full p-4 rounded-lg border h-40 mb-4"
          placeholder="Prenez vos notes ici..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Liste des discours disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Exemple de discours */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer hover:shadow-lg"
          onClick={() => setCurrentSpeech({
            id: '1',
            title: 'Introduction à l\'interprétation',
            audioUrl: '',
            transcript: {
              fr: 'Texte en français',
              es: 'Texto en español',
              en: 'Text in English'
            },
            duration: 5,
            difficulty: 'beginner',
            category: 'general'
          })}
        >
          <h4 className="font-bold">Introduction à l'interprétation</h4>
          <div className="flex justify-between text-sm text-gray-600">
            <span>5 minutes</span>
            <span>Débutant</span>
          </div>
        </div>
      </div>
    </div>
  )
}
