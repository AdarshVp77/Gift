# 💕 Valentine Gift — Will you be my Valentine?

A small React Valentine’s page: one screen with the question and Yes/No buttons, and a celebration screen when she says Yes.

## Features

- **Quote:** “Will you be my Valentine?”
- **Teddy bear** and soft Valentine styling
- **Runaway “No” button** — it moves when she hovers or tries to click it
- **“Yes” button** — takes her to a celebration page
- **Celebration page:** GIF, romantic lines, and **Falling for You** (The 1975) with lyrics. Music auto-plays when she says Yes.
- **Responsive** — works on mobile, tablet, and laptop.

## Add the song (MP4 file)

1. Put your **`falling-for-you.mp4`** file in the **`public`** folder.
2. Path should be: **`public/falling-for-you.mp4`**

The app uses a hidden video element to play the MP4 when she clicks Yes (audio plays; no video is shown on screen).

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

Use the `dist` folder to deploy (e.g. Netlify, Vercel, or any static host).
