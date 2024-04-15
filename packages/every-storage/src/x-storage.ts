import { name } from '../package.json'
import { BaseStorage } from './base-storage'
import { ChromeLocalStorage } from './chrome-local-storage'
import { StorageType } from './type'

interface Config {
  type: StorageType
}

const StorageDrivers: Record<StorageType, any> = {
  [StorageType.ChromeLocal]: ChromeLocalStorage,
  [StorageType.WebCookie]: null,
  [StorageType.WebLocal]: null,
  [StorageType.WebSession]: null,
}

export const getStorage = (config: Config): BaseStorage => {
  const storage = StorageDrivers[config.type]
  if (!storage) {
    throw new Error(`[${name}] 暂不支持${config.type}类型的存储`)
  }
  return storage
}
