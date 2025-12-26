"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Props = {
  src: string;
  duration: number;
};

export function VoicePlayer({ src, duration }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(duration);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrent(audio.currentTime);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.paused ? audio.play() : audio.pause();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const format = (t: number) =>
    `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="min-w-40 px-3 py-2 flex flex-row items-center gap-2 bg-black">
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        onClick={toggle}
        className="w-10 h-10 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <div className="w-full space-y-1 overflow-hidden">
        <div
          ref={barRef}
          onClick={seek}
          className="relative h-1.5 rounded-full bg-foreground/10 cursor-pointer"
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-end text-[11px] text-muted-foreground">
          {format(current)}
        </div>
      </div>
    </div>
  );
}
