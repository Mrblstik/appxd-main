import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init(); // Inicializa el almacenamiento al crear el servicio
  }

  // Inicializa el almacenamiento local
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guarda un dato con su clave
  async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  // Obtiene un dato mediante su clave
  async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  // Elimina un dato mediante su clave
  async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  // Limpia todo el almacenamiento
  async clear(): Promise<void> {
    await this._storage?.clear();
  }
}
