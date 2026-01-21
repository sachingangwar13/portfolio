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
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

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

    // console.log(songNameFromSpotify);

    if (!songNameFromSpotify) return;

    console.log(encodeURIComponent(songNameFromSpotify));
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

  const formatTime = (t) =>
    Number.isFinite(t)
      ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`
      : "0:00";

  const seekToPosition = (clientX, element) => {
    if (!audioRef.current || !duration) return;

    const rect = element.getBoundingClientRect();
    const percent = Math.min(
      Math.max((clientX - rect.left) / rect.width, 0),
      1,
    );

    audioRef.current.currentTime = percent * duration;
  };

  // for scrolling seek bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

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
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!seeking) return;

    const handleMove = (e) => {
      const bar = document.querySelector("[data-progress-bar]");
      if (!bar) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      seekToPosition(clientX, bar);
    };

    const stopSeeking = () => setSeeking(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopSeeking);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", stopSeeking);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopSeeking);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", stopSeeking);
    };
  }, [seeking, duration]);

  return (
    <div className="flex flex-col  mt-2 w-full">
      <div className={`w-full flex flex-col shadow-[inset_0_0_6px_rgba(0,0,0,0.3)] backdrop-blur-lg overflow-scroll p-4 rounded-xl border border-white/10 ${playing ?"gap-5": "gap-0"}`}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            {albumArt && (
              <img
                src={albumArt}
                alt="Album Art"
                className="w-12 h-12 rounded-md shadow-md border-1 border-black/20 dark:border-white/20"
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

          <audio
            ref={audioRef}
            src={canPlay ? audioUrl : null}
            preload="auto"
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            playing
              ? "max-h-12 opacity-100 translate-y-0 pointer-events-auto"
              : "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
          }`}
        >
          <div
            className={`flex justify-between items-center gap-2 text-[10px] opacity-70 transition-all ${
              playing ? "mt-1 mb-0.5" : "mt-0"
            }`}
          >
            <span>{formatTime(progress)}</span>
            <div
              data-progress-bar
              className="relative w-full h-1 dark:bg-white/20 bg-black/20 rounded cursor-pointer"
              onClick={(e) => {
                if (!audioRef.current || !duration) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                audioRef.current.currentTime = percent * duration;
              }}
              onMouseDown={(e) => {
                setSeeking(true);
                seekToPosition(e.clientX, e.currentTarget);
              }}
              onTouchStart={(e) => {
                setSeeking(true);
                seekToPosition(e.touches[0].clientX, e.currentTarget);
              }}
            >
              <div
                className="absolute left-0 top-0 h-1 bg-black dark:bg-white/80  rounded"
                style={{
                  width: `${duration ? (progress / duration) * 100 : 0}%`,
                }}
              />

              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 border-1 border-neutral-950 bg-white dark:bg-black dark:border-neutral-200 hover:ring-3  hover:ring-neutral-500/50 dark:hover:ring-neutral-400/40 transition-all py-1 duration-200 rounded-full shadow-md"
                style={{
                  left: `calc(${duration ? (progress / duration) * 100 : 0}% - 6px)`,
                }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
