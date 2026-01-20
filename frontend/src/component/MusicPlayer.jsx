import { useRef, useState, useEffect } from "react";
import { Play, Pause, Loader2, AlertTriangle } from "lucide-react";
import { SpotifySVG } from "../svgs/Svgs";
import { API_BASE } from "../lib/config";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [songName, setSongName] = useState("");
  const [albumArt, setAlbumArt] = useState("");
  const [artistName, setArtistName] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [canPlay, setCanPlay] = useState(true);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!canPlay) {
      setError(true);
      setLoading(false);
      return;
    }

    setError(false);

    if (audio.paused) {
      try {
        setLoading(true);
        await audio.play();
      } catch (e) {
        setError(true);
      }
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    // console.log("API BASE:", API_BASE);
    fetch(`${API_BASE}/song-info`)
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        setSongName(data.title);
        setAlbumArt(data.albumArt);
        setArtistName(data.artist);
        setAudioUrl(data.audioUrl);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  useEffect(() => {
    const songNameFromSpotify = songName.trim();

    // console.log(songNameFromSpotify)

    if (!songNameFromSpotify) return;

    // console.log(encodeURIComponent(songNameFromSpotify));
    fetch(`${API_BASE}/song?name=${encodeURIComponent(songNameFromSpotify)}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Song not playable");
        }
        // console.log(res);
        
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setAudioUrl(data.audioUrl);
      })
      .catch(() => {
        setCanPlay(false);
        setError(true);
        setAudioUrl("");
      });
  }, [songName]);

  useEffect(() => {
    setError(false);
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      setPlaying(true);
      setLoading(false);
    };

    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoading(true);
    const onPlaying = () => setLoading(false);
    const onError = () => {
      setError(true);
      setLoading(false);
      setPlaying(false);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("error", onError);
    };
  }, []);

  return (
    <div className="flex items-center justify-between mt-2 gap-4 shadow-[inset_0_0_6px_rgba(0,0,0,0.3)] backdrop-blur-lg p-4 rounded-xl border border-white/10">
      <div className="flex items-center gap-3">
        {albumArt && (
          <img
            src={albumArt}
            alt="Album Art"
            className="w-12 h-12 rounded-md shadow-md border-1 border-white/15"
          />
        )}

        <div>
          <div className="flex items-center gap-1">
            <SpotifySVG />
            <p className="text-[10px] font-extralight tracking-wide">
              {" "}
              last played
            </p>
          </div>
          <p className="text-sm font-semibold tracking-wide">
            {songName || "No song playing"}
          </p>
          <p className="text-[10px] font-extralight">
            by {artistName || "Unknown Artist"}
          </p>
        </div>
      </div>

      <div className="flex items-end gap-1 h-8">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className={`w-1.5 bg-green-500 rounded-full transition-all ${
              playing && !loading ? "animate-wave" : "h-2 opacity-0"
            }`}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      <button
        onClick={toggle}
        disabled={loading}
        className="w-10 h-10  rounded-lg shadow-[inset_0_0_6px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_0_6px_rgba(255,255,255,0.2)] dark:bg-black text-neutral-700 bg-neutral-100 hover:scale-105 transition-all duration-75 dark:text-neutral-400 flex items-center justify-center text-sm"
      >
        {loading ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : error ? (
          <div className="relative group flex items-center justify-center">
            <AlertTriangle className="text-red-500 h-4 w-4 cursor-pointer" />

            <div className="absolute border bottom-full mb-4 hidden group-hover:block transition-all duration-900 whitespace-nowrap rounded-sm bg-neutral-950 px-2 py-1 text-[8px] text-white shadow-lg z-50">
              Unable to play right now
            </div>
          </div>
        ) : playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </button>

      <audio ref={audioRef} src={canPlay ? audioUrl : null} preload="auto" />
    </div>
  );
}
