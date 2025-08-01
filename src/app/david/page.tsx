'use client';

import { useEffect, useState } from 'react';
import KaraokePlayer from '@/app/components/KaraokePlayerDavid';

export default function DavidPage() {
  const [showLyrics, setShowLyrics] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLyrics(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-black">
      {!showLyrics ? (
        <div className="animate-fade-in space-y-4 max-w-md">
          <h1 className="text-3xl font-bold text-white">Ahora te presento mi canción.</h1>
          <p className="text-lg text-white/90">
            Es la que me levanta el ánimo cuando todo parece apagado.
          </p>
          <p className="text-base text-white/80">
            Espero que también te abrace un poco.  
            Y si te hace llorar, que sea de esperanza y felicidad.
          </p>
          <p className="text-sm italic text-white/60">(Escucha xd...)</p>
        </div>
      ) : (
        <KaraokePlayer />
      )}
    </main>
  );
}
