import { ping } from './health-check'

const info = (...args: any[]) => console.log('[WS Client]', ...args)

export const startWebSocketClient = (url: string) => {
  const client = new WebSocket(url)

  client.onopen = () => {
    info('Connected.')
    ping(client)
  }

  client.onmessage = (ev) => {
    info('Recieved Message:', ev)
    if (ev.data === 'reload') {
      info('Recieved Reload Sign.')
    }
  }

  client.onclose = () => {
    info('Closed.')
  }
}
