import { fetchChannelVideos } from "./_youtube.js";

export default async function handler(req, res) {
  try {
    const sort = req.query?.sort === "popular" ? "popular" : "latest";
    const videos = await fetchChannelVideos(process.env.YOUTUBE_CHANNEL_ID, sort);
    // Cached at the edge for 30 min: new uploads appear automatically, YouTube isn't hammered.
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).json({ videos });
  } catch (e) {
    res.status(500).json({ error: e.message, videos: [] });
  }
}
