import fs from 'fs'
import { resolve } from 'path'
import { Plugin } from 'vite'
import { WebSocketServer } from 'ws'
import { startWebSocketServer } from './ws/server'

interface Option {
  /** 路径前缀 */
  base: string
}

export function ChromeExtensionBuilder(option?: Option): Plugin {
  const { base = '' } = option || {}
  let wss: WebSocketServer | null = null
  return {
    name: 'vite-plugin-chrome-extension-builder',

    configResolved() {
      wss = startWebSocketServer(7878)
    },

    watchChange() {
      wss?.emit('changed')
    },

    generateBundle() {
      // 指定源文件路径
      const srcPath = resolve(process.cwd(), base ? `${base}/manifest.json` : 'manifest.json')
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: fs.readFileSync(srcPath),
      })
    },
  }
}
