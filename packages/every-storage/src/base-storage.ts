interface Options {
  /** 打印日志前缀 */
  prefix: string
}

type MaybePromise<T> = T | Promise<T>

export abstract class BaseStorage {
  private prefix: string = '[BaseStorage]'

  constructor(options?: Options) {
    if (options?.prefix) this.prefix = options.prefix
  }

  protected info(msg: string): void {
    console.info(`${this.prefix} ${msg}`)
  }

  protected error(msg: string): void {
    console.error(`${this.prefix} ${msg}`)
  }

  abstract get<T>(key: string): MaybePromise<T>

  abstract set(key: string, value: any): MaybePromise<void>

  abstract remove(key: string): MaybePromise<void>
}
