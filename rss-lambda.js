import { readFileSync } from "fs";
import * as https from 'node:https';

const PODCAST_URL = "https://api-prod.ilpost.it/podcast/v1/podcast/227474"

const baseText = readFileSync("./feed.xml", "utf8");

function convertJSONToXMLFeed(json) {
  const episodes = json.data.map(episode => {
    return {
      author: "Francesco Costa",
      "itunes:author": "Francesco Costa",
      title: episode.title,
      description: episode.title,
      "itunes:summary": episode.title,
      pubDate: new Date(episode.timestamp * 1000).toUTCString(),
      enclosure: {
        url: episode.episode_raw_url,
        length: `${episode.minutes}:00`,
        type: "audio/mpeg"
      },
      guid: episode.id,
    }
  })
  const episodesXML = episodes.map(episode => {
    return `
      <item>
        <title>${episode.title}</title>
        <description>${episode.description}</description>
        <itunes:summary>${episode.description}</itunes:summary>
        <itunes:author>${episode.author}</itunes:author>
        <pubDate>${episode.pubDate}</pubDate>
        <enclosure url="${episode.enclosure.url}" length="${episode.enclosure.length}" type="${episode.enclosure.type}" />
        <guid>${episode.guid}</guid>
      </item>
    `
  }).join("\n")
  const rss = baseText.replace("{{episodes}}", episodesXML)
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml",
    },
    body: rss,
  }
}

export const handler = (event, context, callback) => {
  const req = https.request(PODCAST_URL, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      body = JSON.parse(body)
      const rss = convertJSONToXMLFeed(body)
      callback(null, rss)
    });
  });
  req.on('error', callback);
  req.write(JSON.stringify({ ciao: "ciao" }));
  req.end();
};

handler(null, null, (err, res) => {
  console.log('res', res)
})