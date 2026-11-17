# Anita Studio website

React + Vite + React Router, plus a small serverless API that pulls the parlour's YouTube videos automatically.

## Run locally
```bash
npm install
cp .env.example .env     # set YOUTUBE_CHANNEL_ID
npm run dev
```

## YouTube auto-sync
- `api/videos.js` reads the channel's public RSS feed (no API key, no quota) and returns the 10 newest videos, or the most viewed of the latest 15 with `?sort=popular`.
- Cached 30 minutes at the edge, so new uploads appear with no code change.
- The RSS feed exposes only the latest 15 uploads, so "Most watched" ranks within those. For all-time top videos, use YouTube Data API v3 (`search.list`, `order=viewCount`) with an API key env var.

## Deploy (Vercel, free)
Import the repo, add env var `YOUTUBE_CHANNEL_ID`, deploy. `vercel.json` handles SPA routing.

## Edit content
- Business details: `src/config/site.js`
- Services and testimonials: `src/data/services.js`
- Colours and fonts: top of `src/styles/global.css`

## Google setup (free, uses the owner's existing Gmail)
Photos, videos and bookings all live in her own Google account. No other account or server.

1. **Drive:** create a folder `Anita Studio Media` with five subfolders named exactly `Makeup`, `Mehndi`, `Skin care`, `Nail art`, `Hair care`. Right-click the main folder > Share > General access > *Anyone with the link* > Viewer. Copy the folder ID from its URL (the text after `/folders/`).
2. **Sheet:** create a new Google Sheet `Anita Studio Bookings`. Extensions > Apps Script. Paste `google-apps-script/Code.gs`, set `ROOT_FOLDER_ID` and `ADMIN_KEY` (your admin passcode), save.
3. **Deploy:** Deploy > New deployment > type *Web app* > Execute as *Me* > Who has access *Anyone* > Deploy. Approve the permission prompts (Advanced > Go to project). Copy the Web app URL ending in `/exec`.
4. **Connect:** put the URL in `.env` as `VITE_APPS_SCRIPT_URL` (and the Drive folder link as `VITE_DRIVE_FOLDER_URL`). On Vercel add the same two variables and redeploy. Restart `npm run dev` locally.

**Daily use**
- Photos and videos: drop files into the matching Drive subfolder. They show on that service page within 5 minutes.
- Bookings: each form submission opens WhatsApp and adds a Pending row to the Sheet. Open `/admin`, enter the passcode, then set Confirmed, Completed or Cancelled (kept as history), or Delete. The same data is in the Google Sheet if she prefers it.
- After changing `Code.gs`, use Deploy > Manage deployments > Edit > New version.
