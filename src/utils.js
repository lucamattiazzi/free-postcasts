function ignoreCorsFetch(url) {
  return fetch(`https://corsproxy.io/?url=${url}`)
}

export async function getPodcast(id) {
  const resp = await ignoreCorsFetch(`https://api-prod.ilpost.it/podcast/v1/podcast/${id}`)
  return await resp.json()
}

export async function getConfig() {
  const resp = await ignoreCorsFetch("https://ws.ovolab.com/ilpost/ios/config-40.json")
  return await resp.json()
}

export function formatTime(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`
}