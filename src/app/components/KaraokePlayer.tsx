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
import { journeyLyrics } from '@/app/data/journeyLyrics';

export default function KaraokePlayer() {
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
      const audio = audioRef.current;
      const currentTime = audio?.currentTime || 0;
      const index = journeyLyrics.findIndex((line, i) => {
        const next = journeyLyrics[i + 1];
        return next
          ? currentTime >= line.time && currentTime < next.time
          : currentTime >= line.time;
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
    <div className="flex flex-col items-center w-full max-w-md mx-auto py-12 px-4 space-y-6 bg-pink-100 min-h-screen">
      <audio ref={audioRef} src="/audio/journey.mp3" preload="metadata" />

      {/* Controles - estilo card */}
      <div className="w-full flex flex-col gap-3 bg-white/30 p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => audioRef.current!.currentTime -= 10}>
            <SkipBack className="w-6 h-6 text-pink-800" />
          </button>

          <button
            onClick={togglePlay}
            className="bg-pink-700 hover:bg-pink-800 text-white w-12 h-12 rounded-full flex items-center justify-center transition"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          <button onClick={() => audioRef.current!.currentTime += 10}>
            <SkipForward className="w-6 h-6 text-pink-800" />
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
            className="w-full accent-pink-700"
          />
          <div className="text-sm text-pink-800 font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Volumen */}
        <div className="w-full flex items-center gap-3">
          {volume === 0 ? (
            <VolumeX className="w-5 h-5 text-pink-800" />
          ) : (
            <Volume2 className="w-5 h-5 text-pink-800" />
          )}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-full accent-pink-700"
          />
        </div>
      </div>

      {/* GIF */}
      <div className="mt-6">
        <img
          src="/images/hello-kiyty-cute.gif"
          alt="hello kitty"
          className="w-32 h-auto mx-auto rounded-xl"
        />
      </div>

      {/* Letras con scroll */}
      <div className="text-center mt-6 px-2 h-60 overflow-y-auto space-y-1">
        {journeyLyrics.map((line, index) => (
          <p
            key={index}
            className={`transition-all duration-300 ${
              index === currentLine
                ? 'text-pink-900 font-bold text-lg'
                : 'text-pink-700/60 text-sm'
            }`}
          >
            {line.text}
          </p>
        ))}
      </div>

      {/* GIF */}
      <div className="mt-6">
        <img
          src="/images/kuromi-dance-melody-dance.gif"
          alt="hello kitty2"
          className="w-32 h-auto mx-auto rounded-xl"
        />
      </div>
    </div>
  );
}
