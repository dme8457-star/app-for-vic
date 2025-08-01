'use client';

import { useEffect, useState } from 'react';
import KaraokePlayer from '@/app/components/KaraokePlayer';

export default function VickyPage() {
  const [showLyrics, setShowLyrics] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLyrics(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {!showLyrics ? (
        <div className="animate-fade-in space-y-4 max-w-md">
          <h1 className="text-3xl font-bold text-pink-900">Te presento esta canción.</h1>
          <p className="text-lg text-pink-800">
            Me la mostró alguien que no pensé que me fuera a importar tanto tan rápido... xd
          </p>
          <p className="text-sm italic text-pink-700/70">(Y mira ahora)</p>

        </div>
      ) : (
        <KaraokePlayer />
      )}
    </main>
  );
}
