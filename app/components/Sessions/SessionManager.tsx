"use client"

import { useState, useRef } from 'react'

interface Session {
  id: string
  title: string
  type: 'consecutive' | 'simultaneous' | 'sight'
  duration: number
  sourceLanguage: 'fr' | 'es' | 'en'
  targetLanguage: 'fr' | 'es' | 'en'
  recording?: Blob
  notes: string
  feedback?: string
  score?: number
  createdAt: Date
}

export default function SessionManager() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [currentSession, setCurrentSession] = useState<Partial<Session>>({
    type: 'consecutive',
    sourceLanguage: 'fr',
    targetLanguage: 'es',
    notes: ''
  })
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data])
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error)
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  const saveSession = () => {
    if (!currentSession.title) return

    const recording = new Blob(recordedChunks, { type: 'audio/webm' })
    const session: Session = {
      id: crypto.randomUUID(),
      title: currentSession.title,
      type: currentSession.type as 'consecutive',
      duration: 0, // À calculer
      sourceLanguage: currentSession.sourceLanguage as 'fr',
      targetLanguage: currentSession.targetLanguage as 'es',
      recording,
      notes: currentSession.notes || '',
      createdAt: new Date()
    }

    setSessions([session, ...sessions])
    setCurrentSession({
      type: 'consecutive',
      sourceLanguage: 'fr',
      targetLanguage: 'es',
      notes: ''
    })
    setRecordedChunks([])
  }

  return (
    <div className="space-y-6">
      {/* Configuration de la session */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Nouvelle session</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Titre</label>
            <input
              type="text"
              value={currentSession.title || ''}
              onChange={(e) => setCurrentSession({
                ...currentSession,
                title: e.target.value
              })}
              className="w-full p-2 rounded border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Type</label>
              <select
                value={currentSession.type}
                onChange={(e) => setCurrentSession({
                  ...currentSession,
                  type: e.target.value as Session['type']
                })}
                className="w-full p-2 rounded border"
              >
                <option value="consecutive">Consécutive</option>
                <option value="simultaneous">Simultanée</option>
                <option value="sight">À vue</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Langues</label>
              <div className="flex gap-2">
                <select
                  value={currentSession.sourceLanguage}
                  onChange={(e) => setCurrentSession({
                    ...currentSession,
                    sourceLanguage: e.target.value as Session['sourceLanguage']
                  })}
                  className="flex-1 p-2 rounded border"
                >
                  <option value="fr">FR</option>
                  <option value="es">ES</option>
                  <option value="en">EN</option>
                </select>
                <span className="self-center">→</span>
                <select
                  value={currentSession.targetLanguage}
                  onChange={(e) => setCurrentSession({
                    ...currentSession,
                    targetLanguage: e.target.value as Session['targetLanguage']
                  })}
                  className="flex-1 p-2 rounded border"
                >
                  <option value="fr">FR</option>
                  <option value="es">ES</option>
                  <option value="en">EN</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2">Notes</label>
            <textarea
              value={currentSession.notes}
              onChange={(e) => setCurrentSession({
                ...currentSession,
                notes: e.target.value
              })}
              className="w-full p-2 rounded border h-32"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-6 py-3 rounded-lg ${
                isRecording
                  ? 'bg-red-600 text-white'
                  : 'bg-pink-600 text-white'
              }`}
            >
              {isRecording ? '⏹️ Arrêter' : '🎙️ Enregistrer'}
            </button>
            
            {recordedChunks.length > 0 && (
              <button
                onClick={saveSession}
                className="px-6 py-3 bg-green-600 text-white rounded-lg"
              >
                Sauvegarder la session
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Liste des sessions */}
      <div className="space-y-4">
        {sessions.map(session => (
          <div
            key={session.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold">{session.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(session.createdAt).toLocaleString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                session.type === 'consecutive'
                  ? 'bg-blue-100 text-blue-800'
                  : session.type === 'simultaneous'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {session.type}
              </span>
            </div>

            <div className="flex gap-2 text-sm">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                {session.sourceLanguage.toUpperCase()} → {session.targetLanguage.toUpperCase()}
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                {session.duration} min
              </span>
            </div>

            {session.notes && (
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {session.notes}
              </p>
            )}

            {session.recording && (
              <audio
                controls
                className="mt-4 w-full"
                src={URL.createObjectURL(session.recording)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
