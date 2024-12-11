"use client"

import { useState } from 'react'

interface Event {
  id: string
  title: string
  description: string
  date: Date
  type: 'practice' | 'meeting' | 'deadline'
  language: 'fr' | 'es' | 'en'
}

export default function CalendarTool() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    type: 'practice',
    language: 'fr'
  })

  const addEvent = () => {
    if (!newEvent.title) return

    const event: Event = {
      id: crypto.randomUUID(),
      title: newEvent.title!,
      description: newEvent.description || '',
      date: selectedDate,
      type: newEvent.type as 'practice',
      language: newEvent.language as 'fr'
    }

    setEvents([...events, event])
    setShowAddEvent(false)
    setNewEvent({
      title: '',
      description: '',
      type: 'practice',
      language: 'fr'
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  return (
    <div className="space-y-6">
      {/* En-tête du calendrier */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          ◀️
        </button>
        <h2 className="text-xl font-bold">
          {selectedDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          ▶️
        </button>
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-2">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
          <div key={day} className="text-center font-bold py-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: getFirstDayOfMonth(selectedDate) }).map((_, i) => (
          <div key={`empty-${i}`} className="p-4" />
        ))}
        
        {Array.from({ length: getDaysInMonth(selectedDate) }).map((_, i) => {
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1)
          const dayEvents = events.filter(event => 
            event.date.toDateString() === date.toDateString()
          )
          
          return (
            <div
              key={i}
              onClick={() => {
                setSelectedDate(date)
                setShowAddEvent(true)
              }}
              className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 
                         dark:hover:bg-gray-800 ${
                date.toDateString() === new Date().toDateString() 
                  ? 'bg-pink-100 dark:bg-pink-900/20' 
                  : ''
              }`}
            >
              <div className="font-bold">{i + 1}</div>
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded mt-1 ${
                    event.type === 'practice' 
                      ? 'bg-green-100 text-green-800'
                      : event.type === 'meeting'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Modal d'ajout d'événement */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Nouvel événement</h3>
            
            <input
              type="text"
              placeholder="Titre"
              className="w-full p-2 mb-4 rounded border"
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            
            <textarea
              placeholder="Description"
              className="w-full p-2 mb-4 rounded border"
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            
            <select
              className="w-full p-2 mb-4 rounded border"
              value={newEvent.type}
              onChange={e => setNewEvent({ ...newEvent, type: e.target.value as any })}
            >
              <option value="practice">Pratique</option>
              <option value="meeting">Réunion</option>
              <option value="deadline">Deadline</option>
            </select>
            
            <select
              className="w-full p-2 mb-4 rounded border"
              value={newEvent.language}
              onChange={e => setNewEvent({ ...newEvent, language: e.target.value as any })}
            >
              <option value="fr">Français</option>
              <option value="es">Espagnol</option>
              <option value="en">Anglais</option>
            </select>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddEvent(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={addEvent}
                className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
