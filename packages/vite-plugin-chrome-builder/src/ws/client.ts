import { Event } from './event'
import { ping } from './health-check'

const info = (...args: any[]) => console.log('[WS Client]', ...args)

export const startWebSocketClient = (url: string) => {
  const client = new WebSocket(url)

  client.onopen = () => {
    info('Connected.')
    ping(client)
  }

  client.onmessage = (ev) => {
    info('Recieved Message:', ev.data)
    if (ev.data === Event.FileChanged) {
      info('Recieved Reload Sign.')
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          const tabId = tabs[0].id
          setTimeout(() => {
            chrome.tabs.reload(tabId)
          }, 500)
        }
      })
    }
  }

  client.onclose = () => {
    info('Closed.')
  }
}
