"use client"

import { useState } from 'react'

interface Note {
  id: string
  title: string
  content: string
  language: 'fr' | 'es' | 'en'
  tags: string[]
  highlights: {
    text: string
    color: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export default function NoteTaking() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('yellow')

  const colors = [
    { name: 'yellow', class: 'bg-yellow-200' },
    { name: 'pink', class: 'bg-pink-200' },
    { name: 'blue', class: 'bg-blue-200' },
    { name: 'green', class: 'bg-green-200' }
  ]

  const createNewNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Nouvelle note',
      content: '',
      language: 'fr',
      tags: [],
      highlights: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setNotes([newNote, ...notes])
    setCurrentNote(newNote)
  }

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    const updatedNotes = notes.map(note =>
      note.id === noteId
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    )
    setNotes(updatedNotes)
  }

  const addHighlight = (text: string) => {
    if (!currentNote) return
    
    const newHighlight = {
      text,
      color: selectedColor
    }
    
    updateNote(currentNote.id, {
      highlights: [...currentNote.highlights, newHighlight]
    })
  }

  return (
    <div className="h-full flex">
      {/* Liste des notes */}
      <div className="w-1/4 border-r p-4 space-y-4">
        <button
          onClick={createNewNote}
          className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg"
        >
          ✏️ Nouvelle note
        </button>

        <div className="space-y-2">
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => setCurrentNote(note)}
              className={`p-3 rounded-lg cursor-pointer ${
                currentNote?.id === note.id
                  ? 'bg-pink-100'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <h3 className="font-bold">{note.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(note.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Éditeur de note */}
      {currentNote ? (
        <div className="flex-1 p-4">
          <div className="mb-4">
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => updateNote(currentNote.id, { title: e.target.value })}
              className="w-full text-2xl font-bold p-2 border-b"
            />
          </div>

          <div className="mb-4 flex gap-2">
            {colors.map(color => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-8 h-8 rounded-full ${color.class} ${
                  selectedColor === color.name ? 'ring-2 ring-pink-600' : ''
                }`}
              />
            ))}
          </div>

          <textarea
            value={currentNote.content}
            onChange={(e) => updateNote(currentNote.id, { content: e.target.value })}
            className="w-full h-[calc(100vh-300px)] p-4 border rounded-lg"
            placeholder="Commencez à écrire..."
          />

          <div className="mt-4">
            <h4 className="font-bold mb-2">Passages surlignés</h4>
            <div className="space-y-2">
              {currentNote.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${colors.find(c => c.name === highlight.color)?.class}`}
                >
                  {highlight.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Sélectionnez ou créez une note
        </div>
      )}
    </div>
  )
}
