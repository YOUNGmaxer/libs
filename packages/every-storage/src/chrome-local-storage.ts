import { BaseStorage } from './base-storage'

export class ChromeLocalStorage extends BaseStorage {
  private storage: chrome.storage.LocalStorageArea = chrome.storage.local

  constructor() {
    super({ prefix: '[ChromeLocalStorage]' })
  }

  async get<T>(key: string): Promise<T> {
    const res = await this.storage.get(key)
    return res[key]
  }

  async set(key: string, value: any): Promise<void> {
    try {
      await this.storage.set({
        [key]: value,
      })
    } catch (err: any) {
      this.error(err)
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.storage.remove(key)
    } catch (err: any) {
      this.error(err)
    }
  }
}
