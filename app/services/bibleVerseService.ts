export interface BibleVerse {
  id: string;
  reference: string;
  text: {
    fr: string;
    es: string;
    en: string;
  };
  category: string;
}

class BibleVerseService {
  private verses: BibleVerse[] = [
    {
      id: '1',
      reference: "Philippiens 4:13",
      text: {
        fr: "Je peux tout par celui qui me fortifie.",
        es: "Todo lo puedo en Cristo que me fortalece.",
        en: "I can do all things through Christ who strengthens me."
      },
      category: 'motivation'
    },
    {
      id: '2',
      reference: "Josué 1:9",
      text: {
        fr: "Ne t'ai-je pas donné cet ordre : Fortifie-toi et prends courage ? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.",
        es: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.",
        en: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."
      },
      category: 'courage'
    },
    {
      id: '3',
      reference: "Psaumes 119:105",
      text: {
        fr: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.",
        es: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
        en: "Your word is a lamp for my feet, a light on my path."
      },
      category: 'guidance'
    }
  ];

  // Obtenir le verset du jour
  getDailyVerse(): BibleVerse {
    const today = new Date();
    const index = (today.getFullYear() + today.getMonth() + today.getDate()) % this.verses.length;
    return this.verses[index];
  }

  // Obtenir tous les versets
  getAllVerses(): BibleVerse[] {
    return this.verses;
  }

  // Obtenir les versets par catégorie
  getVersesByCategory(category: string): BibleVerse[] {
    return this.verses.filter(verse => verse.category === category);
  }

  // Rechercher des versets
  searchVerses(query: string): BibleVerse[] {
    const searchTerm = query.toLowerCase();
    return this.verses.filter(verse => 
      verse.reference.toLowerCase().includes(searchTerm) ||
      verse.text.fr.toLowerCase().includes(searchTerm) ||
      verse.text.es.toLowerCase().includes(searchTerm) ||
      verse.text.en.toLowerCase().includes(searchTerm)
    );
  }
}

export const bibleVerseService = new BibleVerseService();
