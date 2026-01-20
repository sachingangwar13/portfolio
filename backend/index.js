import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./db/connect.js";
import Song from "./models/Songs.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
  //   console.log("token response:", data);
  return data;
}

app.get("/song-info", async (req, res) => {
  const track = await getLastPlayed();
  if (!track) return res.status(404).end();

  res.json({
    title: track.name,
    artist: track.artists[0].name,
    albumArt: track.album.images[0].url,
    spotifyUrl: track.external_urls.spotify,
  });

  console.log("song: ", {
    title: track.name,
    artist: track.artists[0].name,
    albumArt: track.album.images[0].url,
    spotifyUrl: track.external_urls.spotify,
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
    },
  );

  //   console.log("Spotify status:", res.status);

  const text = await res.text();
  //   console.log("Spotify raw:", text);

  if (!res.ok) return null;

  const data = JSON.parse(text);

  if (!data.items || !data.items.length) return null;

  return data.items[0].track;
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/song", async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Song name required" });
    }

    await connectDB();

    const query = name.trim();

    const normalized = name
      .toLowerCase()
      .replace(/[-–—]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    console.log(normalized);
    const song = await Song.findOne({
      name: {
        $regex: normalized.split(" ").join(".*"),
        $options: "i",
      },
    });

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.json({
      title: song.name,
      artist: song.artist,
      albumArt: song.cover,
      audioUrl: song.audio,
      color: song.color,
    });
  } catch (err) {
    console.error("song error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
