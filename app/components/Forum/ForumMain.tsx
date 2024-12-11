"use client"

import { useState } from 'react'

interface Post {
  id: string
  title: string
  content: string
  author: string
  language: 'fr' | 'es' | 'en'
  likes: number
  comments: Comment[]
  createdAt: Date
}

interface Comment {
  id: string
  content: string
  author: string
  createdAt: Date
}

export default function ForumMain() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [selectedLanguage, setSelectedLanguage] = useState<'fr' | 'es' | 'en'>('fr')

  const createPost = () => {
    if (!newPost.title || !newPost.content) return

    const post: Post = {
      id: crypto.randomUUID(),
      title: newPost.title,
      content: newPost.content,
      author: 'Utilisateur',
      language: selectedLanguage,
      likes: 0,
      comments: [],
      createdAt: new Date()
    }

    setPosts([post, ...posts])
    setNewPost({ title: '', content: '' })
  }

  return (
    <div className="space-y-6">
      {/* Sélecteur de langue */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedLanguage('fr')}
          className={`px-4 py-2 rounded-lg ${
            selectedLanguage === 'fr' ? 'bg-pink-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇫🇷 FR
        </button>
        <button
          onClick={() => setSelectedLanguage('es')}
          className={`px-4 py-2 rounded-lg ${
            selectedLanguage === 'es' ? 'bg-pink-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇪🇸 ES
        </button>
        <button
          onClick={() => setSelectedLanguage('en')}
          className={`px-4 py-2 rounded-lg ${
            selectedLanguage === 'en' ? 'bg-pink-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇬🇧 EN
        </button>
      </div>

      {/* Formulaire de création de post */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <input
          type="text"
          placeholder="Titre de votre question..."
          className="w-full p-3 rounded-lg border mb-4"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Votre question..."
          className="w-full p-3 rounded-lg border mb-4 h-32"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button
          onClick={createPost}
          className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
        >
          Publier
        </button>
      </div>

      {/* Liste des posts */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex gap-4">
                <button className="flex items-center gap-1">
                  ❤️ {post.likes}
                </button>
                <button className="flex items-center gap-1">
                  💬 {post.comments.length}
                </button>
              </div>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
