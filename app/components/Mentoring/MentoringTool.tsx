"use client"

import { useState } from 'react'

interface Mentor {
  id: string
  name: string
  languages: string[]
  specialties: string[]
  experience: number
  rating: number
  availability: {
    day: string
    slots: string[]
  }[]
  price: number
}

interface Session {
  id: string
  mentorId: string
  date: Date
  status: 'scheduled' | 'completed' | 'cancelled'
  notes: string
}

export default function MentoringTool() {
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: '1',
      name: 'Marie Dubois',
      languages: ['fr', 'es', 'en'],
      specialties: ['Consécutive', 'Simultanée', 'Juridique'],
      experience: 10,
      rating: 4.8,
      availability: [
        {
          day: 'Lundi',
          slots: ['10:00', '14:00', '16:00']
        },
        {
          day: 'Mercredi',
          slots: ['11:00', '15:00']
        }
      ],
      price: 50
    }
  ])

  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string>('')

  const bookSession = () => {
    if (!selectedMentor || !selectedSlot) return

    const session: Session = {
      id: crypto.randomUUID(),
      mentorId: selectedMentor.id,
      date: new Date(),
      status: 'scheduled',
      notes: ''
    }

    setSessions([...sessions, session])
    setSelectedMentor(null)
    setSelectedSlot('')
  }

  return (
    <div className="space-y-8">
      {/* Liste des mentors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map(mentor => (
          <div 
            key={mentor.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{mentor.name}</h3>
                <div className="flex gap-2 mt-2">
                  {mentor.languages.map(lang => (
                    <span 
                      key={lang}
                      className="px-2 py-1 bg-pink-100 dark:bg-pink-900/20 
                               text-pink-800 dark:text-pink-200 rounded-full text-sm"
                    >
                      {lang === 'fr' ? '🇫🇷' : lang === 'es' ? '🇪🇸' : '🇬🇧'}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  ⭐ {mentor.rating}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {mentor.experience} ans d'expérience
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-bold mb-2">Spécialités</h4>
              <div className="flex flex-wrap gap-2">
                {mentor.specialties.map(specialty => (
                  <span 
                    key={specialty}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 
                             text-purple-800 dark:text-purple-200 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-bold mb-2">Disponibilités</h4>
              {mentor.availability.map(({ day, slots }) => (
                <div key={day} className="mb-2">
                  <div className="font-medium">{day}</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {slots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedMentor(mentor)
                          setSelectedSlot(slot)
                        }}
                        className="px-3 py-1 text-sm border rounded-full hover:bg-gray-50
                                 dark:hover:bg-gray-700"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold">{mentor.price}€/heure</span>
              <button
                onClick={() => setSelectedMentor(mentor)}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg 
                         hover:bg-pink-700"
              >
                Réserver
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de réservation */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
                      justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              Réserver une session avec {selectedMentor.name}
            </h3>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Créneau sélectionné</h4>
              <div className="text-lg">{selectedSlot}</div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedMentor(null)
                  setSelectedSlot('')
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={bookSession}
                className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sessions réservées */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Mes sessions</h3>
        <div className="space-y-4">
          {sessions.map(session => (
            <div 
              key={session.id}
              className="border-b pb-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">
                    {mentors.find(m => m.id === session.mentorId)?.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {session.date.toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  session.status === 'scheduled' 
                    ? 'bg-green-100 text-green-800'
                    : session.status === 'completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {session.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
