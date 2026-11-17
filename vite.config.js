import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fetchChannelVideos } from "./api/_youtube.js";

// Serves /api/videos locally so `npm run dev` behaves like production (Vercel).
const devApi = (env) => ({
  name: "dev-api",
  configureServer(server) {
    server.middlewares.use("/api/videos", async (req, res) => {
      const sort = new URL(req.url, "http://x").searchParams.get("sort");
      res.setHeader("Content-Type", "application/json");
      try {
        const videos = await fetchChannelVideos(env.YOUTUBE_CHANNEL_ID, sort === "popular" ? "popular" : "latest");
        res.end(JSON.stringify({ videos }));
      } catch (e) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: e.message, videos: [] }));
      }
    });
  },
});

export default defineConfig(({ mode }) => ({
  plugins: [react(), devApi(loadEnv(mode, process.cwd(), ""))],
}));
