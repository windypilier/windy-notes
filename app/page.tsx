export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100">
      <main className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            Windy Notes
          </h1>
          <p className="text-gray-600">
            Application d'interprétation trilingue avec versets bibliques
          </p>
        </header>

        {/* Verset du jour */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            ✝️ Verset du jour
          </h2>
          <div className="space-y-4">
            <p className="text-lg italic">🇫🇷 Je peux tout par celui qui me fortifie.</p>
            <p className="text-lg italic">🇪🇸 Todo lo puedo en Cristo que me fortalece.</p>
            <p className="text-lg italic">🇬🇧 I can do all things through Christ who strengthens me.</p>
            <p className="text-right font-bold text-gray-600">Philippiens 4:13</p>
          </div>
        </div>

        {/* Menu principal */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-pink-600 mb-2">📚 Dictionnaire</h3>
            <p className="text-gray-600">Accédez au dictionnaire trilingue</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-purple-600 mb-2">🎙️ Pratique</h3>
            <p className="text-gray-600">Exercices d'interprétation</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-pink-600 mb-2">📝 Notes</h3>
            <p className="text-gray-600">Prenez des notes et révisez</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-purple-600 mb-2">💭 Forum</h3>
            <p className="text-gray-600">Échangez avec la communauté</p>
          </div>
        </div>
      </main>
    </div>
  )
}
