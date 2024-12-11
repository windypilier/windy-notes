"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      {/* Navigation principale style TikTok */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t p-4 z-50">
        <div className="flex justify-around max-w-md mx-auto">
          <Link href="/" className="text-2xl">🏠</Link>
          <Link href="/dictionary" className="text-2xl">📚</Link>
          <button 
            onClick={() => setShowMenu(!showMenu)} 
            className="text-2xl bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center"
          >
            +
          </button>
          <Link href="/practice" className="text-2xl">🎙️</Link>
          <Link href="/profile" className="text-2xl">👤</Link>
        </div>
      </nav>

      {/* Menu complet */}
      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="bg-white dark:bg-gray-800 rounded-t-xl p-4 absolute bottom-16 left-0 right-0 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              <Link href="/dictionary" className="text-center p-4">
                <span className="text-2xl">📚</span>
                <span className="block text-sm">Dictionnaire</span>
              </Link>
              <Link href="/forum" className="text-center p-4">
                <span className="text-2xl">💭</span>
                <span className="block text-sm">Forum</span>
              </Link>
              <Link href="/notes" className="text-center p-4">
                <span className="text-2xl">📝</span>
                <span className="block text-sm">Notes</span>
              </Link>
              <Link href="/practice" className="text-center p-4">
                <span className="text-2xl">🎙️</span>
                <span className="block text-sm">Pratique</span>
              </Link>
              <Link href="/resources" className="text-center p-4">
                <span className="text-2xl">📚</span>
                <span className="block text-sm">Ressources</span>
              </Link>
              <Link href="/career" className="text-center p-4">
                <span className="text-2xl">💼</span>
                <span className="block text-sm">Carrière</span>
              </Link>
              <Link href="/mentoring" className="text-center p-4">
                <span className="text-2xl">👥</span>
                <span className="block text-sm">Mentoring</span>
              </Link>
              <Link href="/progress" className="text-center p-4">
                <span className="text-2xl">📊</span>
                <span className="block text-sm">Progrès</span>
              </Link>
              <Link href="/calendar" className="text-center p-4">
                <span className="text-2xl">📅</span>
                <span className="block text-sm">Calendrier</span>
              </Link>
              <Link href="/quiz" className="text-center p-4">
                <span className="text-2xl">🎯</span>
                <span className="block text-sm">Quiz</span>
              </Link>
              <Link href="/offline" className="text-center p-4">
                <span className="text-2xl">📱</span>
                <span className="block text-sm">Mode hors ligne</span>
              </Link>
              <Link href="/settings" className="text-center p-4">
                <span className="text-2xl">⚙️</span>
                <span className="block text-sm">Paramètres</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
