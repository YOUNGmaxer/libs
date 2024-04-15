export abstract class BaseStorage {
  abstract get<T>(key: string): T
  abstract get<T>(key: string): Promise<T>

  abstract set(key: string, value: any): void
  abstract set(key: string, value: any): Promise<void>

  abstract remove(key: string): void
  abstract remove(key: string): Promise<void>
}
