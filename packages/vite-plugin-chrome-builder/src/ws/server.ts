import { WebSocketServer } from 'ws'

const info = (...args: any[]) => console.log('[WS Server]', ...args)

export const startWebSocketServer = (port: number) => {
  const wss = new WebSocketServer({ port })

  wss.on('listening', () => {
    info(`Listening on ${wss.options.port}`)
  })

  wss.on('connection', (socket) => {
    info('Connection')

    socket.on('message', (data) => {
      info('Received Message:', data.toString())
    })

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
