import { Injectable } from '@angular/core';
import { Database, getDatabase, set, ref, get, DataSnapshot } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private db: Database;

  constructor() { 
    this.db = getDatabase(); 
  }

  // Metodo per ottenere dati da Firebase Realtime Database
  async getData(path: string): Promise<any> {
    const dataRef = ref(this.db, path);
    const snapshot: DataSnapshot = await get(dataRef);
    const result = snapshot.val();
    console.log('Dati recuperati dal database:', result); // Aggiungi questa riga per il debug
    return result;
  }

  // Metodo per impostare dati in Firebase Realtime Database
  async setData(path: string, data: any): Promise<void> {
    const dataRef = ref(this.db, path);
    await set(dataRef, data);
  }
}
