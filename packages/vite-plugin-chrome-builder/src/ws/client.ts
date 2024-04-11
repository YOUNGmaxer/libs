import { Event } from './event'
import { ping } from './health-check'

const info = (...args: any[]) => console.log('[WS Client]', ...args)

export const startWebSocketClient = (url: string) => {
  const client = new WebSocket(url)

  client.onopen = () => {
    ping(client)
  }

  client.onmessage = (ev) => {
    if (ev.data === Event.FileChanged) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          const tabId = tabs[0].id
          setTimeout(() => {
            chrome.tabs.reload(tabId)
          }, 200)
        }
      })
    }
  }

  client.onclose = () => {
    info('Closed.')
  }
}
