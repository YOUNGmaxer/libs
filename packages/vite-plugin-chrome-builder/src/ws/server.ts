import { WebSocketServer } from 'ws'

const info = (...args: any[]) => console.log('[WS Server]', ...args)

export const startWebSocketServer = (port: number) => {
  const wss = new WebSocketServer({ port })

  wss.on('listening', () => {
    info(`WebSocket Server Listening on ${wss.options.port}`)
  })

  wss.on('connection', (socket) => {
    info('WebSocket Server Connection')

    socket.on('message', (data) => {
      info('Received Message:', data)
    })

    socket.on('close', () => {
      info('Socket Closed.')
    })
  })

  wss.on('error', (error) => {
    info('Start WebSocket Server Error:', error)
  })

  wss.on('close', () => {
    info('WebSocket Server Closed.')
  })

  return wss
}
