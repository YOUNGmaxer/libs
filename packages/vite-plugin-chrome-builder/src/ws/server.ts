import { WebSocketServer } from 'ws'
import { Event } from './event'

const info = (...args: any[]) => console.log('[WS Server]', ...args)

export const startWebSocketServer = (port: number) => {
  const wss = new WebSocketServer({ port })

  wss.on('changed', () => {
    wss.clients.forEach((client) => {
      client.send(Event.FileChanged)
    })
  })

  wss.on('connection', (socket) => {
    socket.on('close', () => {
      info('Socket Closed.')
    })
  })

  wss.on('error', (error) => {
    info('Start Error:', error)
  })

  wss.on('close', () => {
    info('Closed.')
  })

  return wss
}
