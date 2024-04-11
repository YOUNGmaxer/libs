const info = (...args: any[]) => console.log('[WS Client]', ...args)

const ping = (client: WebSocket) => {
  setInterval(() => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('Ping')
    }
  })
}

export const startWebSocketClient = (url: string) => {
  const client = new WebSocket(url)

  client.onopen = () => {
    info('WebSocket Client Connected.')
  }

  client.onmessage = () => {}

  client.onclose = () => {}
}
