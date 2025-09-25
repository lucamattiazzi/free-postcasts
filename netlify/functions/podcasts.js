async function getPodcastList() {
  const response = await fetch(`https://api-prod.ilpost.it/podcast/v1/podcast/?pg=1&hits=100`)
  const data = await response.json()
  const stringified = JSON.stringify(data)
  return new Response(stringified)
}

export default async function (event, context) {
  const { id } = context.params
  if (!id) return await getPodcastList()
  const response = await fetch(`https://api-prod.ilpost.it/podcast/v1/podcast/${id}`)
  const data = await response.json()
  const stringified = JSON.stringify(data)
  return new Response(stringified)
}

export const config = {
  path: ["/podcasts/:id", "/podcasts"],
}
