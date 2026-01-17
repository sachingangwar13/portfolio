import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { spawn } from "child_process";
import cors from 'cors';

const app = express();
const PORT = 5000;
dotenv.config();
app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CODE = process.env.CODE;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

console.log("Client ID:", CLIENT_ID?.slice(0, 5));

// curl -X POST https://accounts.spotify.com/api/token \
//   -H "Content-Type: application/x-www-form-urlencoded" \
//   -d "grant_type=authorization_code" \
//   -d "code=AQBRfFTiE07RFQ9ie0F9w54ddYW0iBvGYtBxxyZ8P1ofSg6JJ7BTjVqO-tjjl8Iu4ETh8ywN4YPPBXOr1nP31kQuWpE5K7RNHRmmwFoe6CVLyAxDttiBB1v6fcpzjvtqYg8TdjqlqsBA935Ugk185vCFOSVyeUPya71fb0yW5Bd1lHfrnG6y8e6sP3qNNrejnYdARrNPyH052paoujYGD7PANG85NiRQVBjKpQJIfW86mg4git7EwOIB" \
//   -d "redirect_uri=http://127.0.0.1:8000/callback" \
//   -d "client_id=46d6eeb7f36c4eaa89ccac9a8468c027" \
//   -d "client_secret=b9db7643b07649a787b76215ae1e3c1a"
const hit = {
  access_token:
    "BQA2u9AUA-z4ZOd1R_Qz_pGJSRfMQx2TdiPAL3kvqAHuZjdvzHba0I3jFIjYLBRpGwNhirIy7CTyDCG2yAaIAh4b2WURUQdyIywV5ePiSDBWGEPuEfuI_Hj7wZKL6BhRMVwx7iGz0BpL2Ax1hsma7qFEqJ2wqkiBMCfbUJwV2M2JVDIT90EUMh2IwWpbCfPg0DcTwCqsffV7-JoH3BHbNcMwczxu2CxTDyvCCj3kPl5UjeE9EN0G1fYaKg",
  token_type: "Bearer",
  expires_in: 3600,
  refresh_token:
    "AQAtfD67iYyFw3oKDy8c6oIcc1gXSH_dP8K9GzvPPm_QYiVeCCjvm91rGOwxy4MIMnckaxRcCY6Ti2t_ySzb_oDmm691-xrdYHiuXU4vIzd2yIeeuVj2BedhdqSDQVRbM_A",
  scope: "user-read-currently-playing user-read-recently-played",
};
// https://accounts.spotify.com/authorize?client_id=46d6eeb7f36c4eaa89ccac9a8468c027&response_type=code&redirect_uri=http://127.0.0.1:8000/callback&scope=user-read-currently-playing

// curl https://api.spotify.com/v1/me/player/currently-playing \
//  -H "Authorization: Bearer BQAP9UTsdJ8JbceC3cq1r09Rei0WkEmZbfIoXn6ILmVYzA_u1khg-etGUsoc2zhGmw-WEC3QhFPJNdgyL7TzrvZt_arRuIWcpeglpRrc1RBxx8zzt70jGQLhlxmLl3Rt1hK_ekobjs2kXatO2iRdxsp5P-RBfEWjxkog0MVkPPTKY5CecxsXXoOXmQWr_CZlnaI-CofsvTfBnZbmqttWcfEL_nx4tztY-7jVE8PRBQBaWxfofg9zeC0"

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
