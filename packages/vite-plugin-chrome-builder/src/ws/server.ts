import { WebSocketServer } from 'ws'

const info = (...args: any[]) => console.log('[WS Server]', ...args)

export const startWebSocketServer = (port: number) => {
  const wss = new WebSocketServer({ port })

  wss.on('connection', (socket) => {
    socket.on('message', (data) => {
      info('[wss] Received Message:', data)
    })

    socket.on('close', () => {
      info('[wss] WebSocket Server Closed.')
    })
  })

  return wss
}
