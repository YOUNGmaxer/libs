import WebSocket, { WebSocketServer } from 'ws'

export const ping = (client: WebSocket) => {
  setInterval(() => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('ping')
    }
  })
}

export const pong = (socket: WebSocket, data: WebSocket.RawData) => {}
