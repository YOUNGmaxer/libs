import { RawData, WebSocketServer } from 'ws'

export const ping = (client: WebSocket) => {
  setInterval(() => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('ping')
    }
  }, 5000)
}

export const pong = (socket: WebSocket, data: RawData) => {}
