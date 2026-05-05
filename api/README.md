# Nice Touch — Transcribe API

A small Hono-on-Node service that proxies file uploads from `/transcribe` on
`nicetouch.app` to AssemblyAI, with a daily spend cap stored in Redis.

This is the only backend the free transcription tool needs (DEV-392).

## Why a backend at all?

The AssemblyAI API key cannot safely live in the browser. Anything in
`import.meta.env.VITE_*` is inlined into the public JS bundle. This service
keeps the key server-side, gates the daily spend, and gives the frontend a
clean two-route API.

## Routes

| Method | Path                       | Purpose                                                            |
| ------ | -------------------------- | ------------------------------------------------------------------ |
| GET    | `/healthz`                 | Liveness probe                                                     |
| POST   | `/api/transcribe/submit`   | Streams the file to AssemblyAI, submits a transcript job          |
| GET    | `/api/transcribe/:id`      | Polls AssemblyAI status, increments spend on completion           |
| GET    | `/api/transcribe/_/spend`  | Debug: returns today's spend, cap, and remaining USD              |

### Request shape

`POST /api/transcribe/submit` takes the file body as `application/octet-stream`
(no multipart). Flags go in the query string.

```
POST /api/transcribe/submit?speakers=true
Content-Type: audio/mpeg
Content-Length: 12345678
<...file bytes...>
```

Response: `{ "id": "abcd1234", "status": "queued" }`

`GET /api/transcribe/:id` returns:

```json
{
  "id": "abcd1234",
  "status": "completed",
  "text": "...",
  "audio_duration": 3540,
  "language_code": "en",
  "utterances": [...],
  "words": [...],
  "error": null
}
```

## Local development

```bash
cd api
cp .env.example .env
# fill in ASSEMBLYAI_API_KEY (REDIS_URL is optional locally)
npm install
npm run dev
```

The dev server listens on `http://localhost:8787`. CORS is configured to
allow `http://localhost:5173` (Vite default) when `NODE_ENV !== production`.

`REDIS_URL` is optional in development. When it's not set, the API falls back
to an in-memory store for the spend counter — fine for testing on your machine,
but it doesn't persist across restarts and isn't safe across multiple
instances. For production-like local testing, run a local Redis:

```bash
docker run -p 6379:6379 redis:7-alpine
# then in api/.env: REDIS_URL=redis://localhost:6379
```

## Sevalla deployment

1. **Create a Redis database** in Sevalla. Smallest tier is fine — we store one
   counter per UTC day plus one flag per transcript ID, all 48h TTL.
2. **Create an Application** from this repo, with:
   - Build context: `api/`
   - Buildpack: nixpacks (Node), or use the included `Dockerfile`
   - Start command: `node dist/index.js` (Dockerfile already does this)
   - Internal port: `8787`
3. **Bind the Redis** as an internal connection so `REDIS_URL` resolves over
   the private network.
4. **Set environment variables** on the application:
   - `ASSEMBLYAI_API_KEY` (secret, the AssemblyAI account key)
   - `REDIS_URL` (internal connection URL Sevalla generates for you)
   - `ALLOWED_ORIGIN` = `https://nicetouch.app`
   - `NODE_ENV` = `production`
   - `DAILY_CAP_USD` (default `127`, equivalent of GBP 100 at ~1.27)
   - `RATE_PER_SEC` (default `0.000103`, AssemblyAI Universal-2 rate)
   - `PORT` = `8787` (or whatever Sevalla expects)
5. **Add a custom domain** — `api.nicetouch.app` is the suggested choice.
6. **Wire the frontend** by setting `VITE_TRANSCRIBE_API_URL=https://api.nicetouch.app`
   on the static-site build.

## Spend cap behaviour

- Counter key: `transcribe:spend:YYYY-MM-DD` in Redis (UTC date)
- Each transcript completion increments by `audio_duration * RATE_PER_SEC`
- A per-id flag `transcribe:counted:<id>` ensures we only count once even if
  the client polls past completion
- When `spend >= DAILY_CAP_USD`, new submit requests get `429 daily_cap`
- Both keys TTL to 48h so old days self-clean

To monitor: `GET /api/transcribe/_/spend`.

## Tunables

If you need to bump or lower the cap without redeploy, edit `DAILY_CAP_USD` in
the Sevalla application env vars and restart. Same for `MAX_BYTES`.
