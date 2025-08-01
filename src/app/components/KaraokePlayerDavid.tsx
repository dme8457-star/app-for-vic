'use client';

import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { kilometrosLyrics } from '@/app/data/kilometrosLyrics';

export default function KaraokePlayerDavid() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const updateLine = () => {
      const current = audioRef.current?.currentTime || 0;
      const index = kilometrosLyrics.findIndex((line, i) => {
        const next = kilometrosLyrics[i + 1];
        return next
          ? current >= line.time && current < next.time
          : current >= line.time;
      });
      if (index !== -1 && index !== currentLine) {
        setCurrentLine(index);
      }
      requestAnimationFrame(updateLine);
    };
    requestAnimationFrame(updateLine);
  }, [currentLine]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const formatTime = (time: number): string => {
    const mins = Math.floor(time / 60).toString().padStart(2, '0');
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md space-y-6">
      <audio ref={audioRef} src="/audio/kilometros.mp3" preload="metadata" />

      {/* Controles */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => audioRef.current!.currentTime -= 10}>
            <SkipBack className="w-6 h-6 text-white/80" />
          </button>

          <button
            onClick={togglePlay}
            className="bg-white hover:bg-white/90 text-black w-12 h-12 rounded-full flex items-center justify-center transition"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          <button onClick={() => audioRef.current!.currentTime += 10}>
            <SkipForward className="w-6 h-6 text-white/80" />
          </button>
        </div>

        {/* Tiempo y progreso */}
        <div className="w-full flex flex-col items-center gap-1">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-white"
          />
          <div className="text-sm text-white/70 font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Volumen */}
        <div className="w-full flex items-center gap-3">
          {volume === 0 ? (
            <VolumeX className="w-5 h-5 text-white/70" />
          ) : (
            <Volume2 className="w-5 h-5 text-white/70" />
          )}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-full accent-white"
          />
        </div>
      </div>

      <div className="mt-6">
        <img
          src="/images/dance-duck.gif"
          alt="Patito bailando"
          className="w-32 h-auto mx-auto rounded-xl shadow-lg"
        />
      </div>

      {/* Letras */}
      <div className="text-center space-y-1 mt-6">
        {kilometrosLyrics.map((line, index) => (
          <p
            key={index}
            className={`transition-all duration-300 ${index === currentLine
                ? 'text-white font-bold text-lg'
                : 'text-white/50 text-sm'
              }`}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
