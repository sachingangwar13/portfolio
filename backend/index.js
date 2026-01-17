import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { spawn } from "child_process";
import cors from 'cors';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000 ;
app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CODE = process.env.CODE;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
  });

  const data = await res.json();
  console.log("token response:", data);
  return data;
}

app.get("/song-info", async (req, res) => {
  const track = await getLastPlayed();
  if (!track) return res.status(404).end();

  res.json({
    title: track.name,
    artist: track.artists[0].name,
    albumArt: track.album.images[0].url,
    spotifyUrl: track.external_urls.spotify
  });

  console.log("song: ",{
    title: track.name,
    artist: track.artists[0].name,
    albumArt: track.album.images[0].url,
    spotifyUrl: track.external_urls.spotify
  });
});


async function getLastPlayed() {
  const token = await getAccessToken();

  if (!token.access_token) {
    console.log("No access token");
    return null;
  }

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Accept: "application/json",
      },
    }
  );

  console.log("Spotify status:", res.status);

  const text = await res.text();
  console.log("Spotify raw:", text);

  if (!res.ok) return null;

  const data = JSON.parse(text);

  if (!data.items || !data.items.length) return null;

  return data.items[0].track;
}

app.get("/stream", async (req, res) => {
  const track = await getLastPlayed();
  if (!track) return res.status(404).end();

  const query = `${track.name} ${track.artists[0].name}`;
  console.log("Streaming:", query);

  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });

  const ytdlp = spawn("yt-dlp", [
    "--no-playlist",
    "--quiet",
    "--concurrent-fragments", "8",
    "--extract-audio",
    "--audio-format", "mp3",
    "--audio-quality", "0",
    "-o", "-",
    `ytsearch1:${query}`
  ]);

  // Safely pipe to browser
  ytdlp.stdout.on("data", chunk => {
    if (!res.writableEnded) {
      try { res.write(chunk); }
      catch {}
    }
  });

  ytdlp.on("close", () => {
    if (!res.writableEnded) res.end();
  });

  const cleanup = () => {
    ytdlp.kill("SIGKILL");
    if (!res.writableEnded) res.end();
  };

  req.on("close", cleanup);
  res.on("close", cleanup);
  ytdlp.on("error", cleanup);
});


app.get("/test-spotify", async (req, res) => {
  const track = await getLastPlayed();
  res.json(track);
});

app.listen(PORT, () => {
  console.log("Backend running on http://localhost:5000");
});

export default app;