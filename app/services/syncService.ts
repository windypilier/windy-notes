interface SyncItem {
  id: string;
  type: 'note' | 'term' | 'practice';
  data: any;
  synced: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class SyncService {
  private readonly STORAGE_KEY = 'windy_notes_sync';

  // Sauvegarder un élément en local
  saveItem(type: SyncItem['type'], data: any): void {
    const items = this.getItems();
    const newItem: SyncItem = {
      id: crypto.randomUUID(),
      type,
      data,
      synced: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    items.push(newItem);
    this.saveItems(items);
  }

  // Récupérer tous les éléments
  getItems(): SyncItem[] {
    const items = localStorage.getItem(this.STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  }

  // Récupérer les éléments non synchronisés
  getUnsyncedItems(): SyncItem[] {
    return this.getItems().filter(item => !item.synced);
  }

  // Marquer un élément comme synchronisé
  markAsSynced(id: string): void {
    const items = this.getItems();
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, synced: true, updatedAt: new Date() } : item
    );
    this.saveItems(updatedItems);
  }

  // Sauvegarder la liste des éléments
  private saveItems(items: SyncItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  // Synchroniser avec le serveur
  async syncWithServer(): Promise<void> {
    const unsyncedItems = this.getUnsyncedItems();
    
    for (const item of unsyncedItems) {
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Si la synchronisation réussit, marquer comme synchronisé
        this.markAsSynced(item.id);
      } catch (error) {
        console.error(`Erreur de synchronisation pour l'item ${item.id}:`, error);
      }
    }
  }

  // Vérifier la connexion Internet
  isOnline(): boolean {
    return navigator.onLine;
  }

  // Écouter les changements de connexion
  listenToConnectionChanges(
    onOnline: () => void,
    onOffline: () => void
  ): () => void {
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }
}

export const syncService = new SyncService();
