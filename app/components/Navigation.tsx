"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t p-4">
      <div className="flex justify-around max-w-md mx-auto">
        <Link 
          href="/"
          className={`text-2xl ${activeTab === 'home' ? 'text-pink-600' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          🏠
        </Link>
        <Link 
          href="/dictionary"
          className={`text-2xl ${activeTab === 'dictionary' ? 'text-pink-600' : ''}`}
          onClick={() => setActiveTab('dictionary')}
        >
          📚
        </Link>
        <Link 
          href="/practice"
          className={`text-2xl ${activeTab === 'practice' ? 'text-pink-600' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          🎙️
        </Link>
        <Link 
          href="/profile"
          className={`text-2xl ${activeTab === 'profile' ? 'text-pink-600' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤
        </Link>
      </div>
    </nav>
  )
}
