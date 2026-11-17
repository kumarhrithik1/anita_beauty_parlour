// Reads the channel's public RSS feed (latest 15 uploads, with view counts).
// No API key or quota. Runs server-side because browsers block YouTube's feed (CORS).
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

export async function fetchChannelVideos(channelId, sort = "latest", limit = 10) {
  if (!/^UC[\w-]{22}$/.test(channelId || "")) {
    throw new Error("YOUTUBE_CHANNEL_ID is missing or invalid. It must start with UC.");
  }
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
  if (!res.ok) throw new Error(`YouTube feed returned ${res.status}`);
  const xml = await res.text();
  const pick = (e, re) => (e.match(re)?.[1] ? decode(e.match(re)[1]) : "");

  let videos = xml.split("<entry>").slice(1).map((e) => {
    const id = pick(e, /<yt:videoId>(.*?)<\/yt:videoId>/);
    return {
      id,
      title: pick(e, /<title>(.*?)<\/title>/),
      published: pick(e, /<published>(.*?)<\/published>/),
      views: Number(pick(e, /<media:statistics views="(\d+)"/)) || 0,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  });
  if (sort === "popular") videos.sort((a, b) => b.views - a.views);
  return videos.slice(0, limit);
}
